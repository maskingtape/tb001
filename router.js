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

        routeContent : function routeContent(urls, pathname, response){
            
            var found = false,
                mimeType = 'text/html',
                api = pathname.indexOf(globals.REST_PATH) === 0 ? true : false; // is this an api request? set flag to true...
            
            if(api){ 
                
                // ...and standardise the path
                pathname = pathname.substring(globals.REST_PATH.length, pathname.length);
                
                /* TODO set model for this reqest with 
                    restObj = {
                        verb : 'GET',
                        params : {
                            ...etc
                        }   
                        ... etc
                    }
                */
                
            }
            
            pathname = pathname === '/' ? pathname : utils.stripTrailingSlash(pathname);
            
        
            // Using the lookup object, route based on the url mapped to this request
            for (var i in urls) {
            
                if (urls[i].url === pathname) {
                
                    
                    // switch here based on url path. (html or json)
                    if(api){
                       
                       // render json 
                       mimeType = 'application/json';
                      
                    }
                    
                    // get the data
                        // .. do http request
                        // pass json in to write response
                    
                    // fetch the content for the file and write it out
                    view.writeResponse(response, 200, mimeType, urls[i]);
                    
                    found = true;
                    return; 
                    
                }
            }
            
            if(!found) {
                
                console.log("No request handler found for " + pathname);
                view.writeResponse(response, 404, mimeType, utils.getPage(urls, globals.PAGE_404_ID));
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

 