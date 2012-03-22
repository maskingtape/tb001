// INCLUDES
var view = require("./view").view,
    globals = require('./config/config').globals,
    utils = require('./lib/utils').utils;

// MAIN FUNCTION
var router = (function(){
    
    return {
    
        route : function route(urls, pathname, response) {
        
            var mediaType;
            console.log("About to route a request for " + pathname);
            
            // Filter out static media
            if(mediaType = router.isMedia(pathname)){
                // serve media
                console.log("Routing media file");
                router.routeMedia(pathname, response, mediaType);
            }else{
                router.routeContent(urls, pathname, response);
            }
            
        },
        
        routeMedia : function routeMedia(pathname, response, mediaType){
            // TODO caching, 304s..replacement with express.js..
            view.writeMedia(response, 200, mediaType.mimeType, pathname);
        },
        
        /** 
        *  For any path that exists, fetch the api/ version as json
        *  send to be written to stream within View.
        *  (if the path doesn't start with api , write mustached file template for 
        *  /path/to using json to stream else write json)
        */
        
        routeContent : function routeContent(urls, pathname, response){
            
            var found = false,
                mimeType = 'text/html',
                path,                   // the 'canonical' version of the url
                template = null;               // the json template for the page
                
            // sanitise path
            path = pathname === '/' ? pathname : utils.stripTrailingSlash(pathname);  // except home page
            
            // is this an api request? 
            var api = path.indexOf(globals.REST_PATH) === 0 ? true : false;
            
            if(api){ // get 'canonical' pathname
                path = path.substring(globals.REST_PATH.length, path.length); 
            }
        
            // Using the lookup object, route based on the url mapped to this request
            for (var i in urls) {
            
                if (urls[i].url === path) {
                
                    var url = urls[i];  
                    
                    console.log("fetching data for " + path);
                    
                    // fetch json from flat file for this path 
                    try {
                        template = require("." + globals.TEMPLATE_PATH + '/' + url.filename).pageTemplate;
                    }catch(e){
                        console.log("Note: " + e);
                        console.log("Using default template");
                        template = null;
                    }
                    
                    if(api){
                        if(template){ 
                            mimeType = 'application/json';
                        }else{ // 404
                            break; 
                        } 
                    }
                    
                    // fetch the content for the file and write it out
                    view.writeResponse(response, 200, mimeType, urls[i], template);
                    
                    found = true;
                    break; 
                    
                }
            }
            
            if(!found) {
                
                console.log("No request handler found for " + pathname);
                view.writeResponse(response, 404, mimeType, urls[globals.PAGE_404_ID]);
                
            }
            
        },
        
        // TODO 
        isMedia : function isMedia(pathname){
            supportedMedia = globals.SUPPORTED_MEDIA;
            var isMedia = false,
                suffix = pathname.substring(pathname.lastIndexOf('.') + 1, pathname.length);
                
            
            for (var item in supportedMedia){
                if(supportedMedia[item].type === suffix){
                    var isMedia = supportedMedia[item];
                }
            }
            
            return isMedia;
        }
        
    }

})();

exports.router = router;

 