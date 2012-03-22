// INCLUDES
var fs = require('fs'),
    mustache = require('./lib/mustache'),
    globals = require('./config/config').globals,
    utils = require('./lib/utils').utils;


// fetch the text constants into memory on load // Is this really on load?
var headerHTML, footerHTML;

// TODO fetch these via a service
// create the json(s) for the nav items, etc
// create the urls.js entries
//utils.fetchLocalHttp(callback, path);
        
fs.readFile(__dirname+globals.HTML_PATH+"/header.html", function (err, data) {
  if(err){
    throw err;
  }
  headerHTML = data.toString(); 
});

fs.readFile(__dirname+globals.HTML_PATH+"/footer.html", function (err, data) {
  if(err){
    throw err;
  }
  footerHTML = data.toString(); 
});
         



// MAIN FUNCTION
var view = (function() {
    
    return {
        /**
        * @param template {object}
        */
        writeResponse : function writeResponse(response, responseType, mimeType, url, template){
            var api = mimeType === "application/json" ? true: false;
            
            response.writeHead(responseType, {"Content-Type": mimeType});
            
            if(api){
                view.writeJsonStream(response, template);
            }else{
                view.writeHtmlStream(response, url, template);
            }
        },
        
        writeJsonStream : function writeJsonStream(response, template){
            response.write( JSON.stringify(template) );
            response.end('\n');
        },
        
        /**
        * @param jsonTemplate {object} 
        */
        writeHtmlStream : function writeHtmlStream(response, url, jsonTemplate){
        
            var filename = __dirname + globals.HTML_PATH + '/' + url.filename + globals.HTML_EXTN,
                readStream = fs.createReadStream(filename, { 'encoding' : globals.ENCODING });

            
            // Append the page contents to a variable // TODO add to stream
            readStream.on('data', function(data) {
                
                // generic template obj for mustache to use
                var template = {}; 
                
                if("title" in url){
                    template.title = url.title; // from request for this page
                }   
                
                if(jsonTemplate){ 
                    
                    // merge it into the generic template
                    template  = utils.mergeRecursive(template, jsonTemplate);  //  TODO no need for the merge in the case there's no default template params
                }
                   
                console.log("template")
                console.log(template)
                
                // Process and Add the header
                response.write(mustache.to_html(headerHTML, template)); //fire custom event
                console.log("header written");
                
                // Mustache any content in body
                response.write(mustache.render(data, template));
                console.log("body written");
                
                response.write(footerHTML);
                console.log("footer written");
                
                
            });
            
            
            readStream.on('end', function() {
                response.end();
            });

            readStream.on('error', function(err) {
                response.end(err);
            });
            
            
        }, 
        
        writeMedia : function writeMedia(response, responseType, mimeType, pathname){
            var dataType = mimeType.indexOf('text') === 0 ? 'utf8':'binary';
            
            fs.readFile(__dirname+globals.MEDIA_PATH+pathname, function (err, data) {
                if(err){
                    console.log(err);
                    response.writeHead(404, {"Content-Type": 'utf8'});
                    response.end();
                }else{
                    // TODO gzip and so on
                    if(dataType === "utf8"){
                        data = data.toString();
                    }
                    response.writeHead(responseType, {"Content-Type": mimeType});
                    response.end(data, dataType);
                }
                console.log("done: " + pathname)
            });
                
        }
    };
})();

exports.view = view;