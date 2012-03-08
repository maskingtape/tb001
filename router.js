// INCLUDES
var view = require("./view").view;

// GLOBALS
var PAGE_404_ID = "R404";

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
            // Using the lookup hash table, get the uid of the content mapped to this request
            
            
            // TODO create a get service to return son via HTTP  for things like skills objects
            
            // TODO switch here based on url path. (html or json) i.e. render a page or render json
            
            var found = false;
            
            for (var i in urls) {
                if (urls[i].url === pathname) {
                
                    // fetch the content for the file and write it out
                    view.writeResponse(response, 200, "html", urls[i]);
                    
                    found = true;
                    return; 
                    
                }
            }
            
            if(!found) {
                
                console.log("No request handler found for " + pathname);
                view.writeResponse(response, 404, "html", router.getPage(urls, PAGE_404_ID));
            }
        },

        isMedia : function isMedia(pathname){
            var isMedia = false;
            return isMedia;
        },

        getPage : function getPage(urls, id){
            for (var i in urls) {
               if(i === id){
                    return urls[i];
               }
            }
        }
    }

})();

exports.router = router;

 