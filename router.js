// INCLUDES
var view = require("./view").view,
    globals = require('./config/config').globals,
    utils = require('./lib/utils').utils;

// MAIN FUNCTION
var router = (function(){
    
    return {
    
        route : function route(urls, pathname, response) {
           
            console.log("About to route a request for " + pathname);
            
            // Filter out static media
            if(router.isMedia(pathname)){
                // serve media
            }else{
                router.routeContent(urls, pathname, response);
            }
            
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
            
            var api = path.indexOf(globals.REST_PATH) === 0 ? true : false;
                
            console.log("path")
            console.log(path)
            console.log("api")
            console.log(api)
            
            // is this an api request? 
            if(api){
               
               path = path.substring(globals.REST_PATH.length, path.length); // match standard path for lookup
               
            }
            
            console.log("path")
            console.log(path)
        
            // Using the lookup object, route based on the url mapped to this request
            for (var i in urls) {
            
                if (urls[i].url === path) {
                
                    var url = urls[i];  
                    
                    console.log("fetching data for " + path);
                    
                    if("template" in url){
                        
                        console.log("url.template")
                        // fetch json from flat file for this path
                        template = require("." + globals.TEMPLATE_PATH + '/' + url.template).pageTemplate;
                    }else{
                        console.log("no url.template")
                        var noTemplate = true;
                    }
                      
                    if(api){
                        if(noTemplate){ // 404
                            break; 
                        }else{
                            mimeType = 'application/json';
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
            var isMedia = false;
            return isMedia;
        }
        
    }

})();

exports.router = router;

 