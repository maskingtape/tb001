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
        
            var filename = __dirname + globals.HTML_PATH + '/' + url.filename,
                readStream = fs.createReadStream(filename, { 'encoding' : globals.ENCODING }),
                outputContents = "";

            
            // Append the page contents to a variable // TODO add to stream
            readStream.on('data', function(data) {
                
                // generic template obj for mustache to use
                var template = {}; 
                
                // TODO decouple from this page (move from urls.js to each page's template file)
                template.title = url.title; // from request for this page
                    
                if(jsonTemplate){ 
                    
                    // merge it into the generic template
                    template  = utils.mergeRecursive(template, jsonTemplate);  //  TODO no need for the merge in the case there's no default template params
                }
                   
                // Process and Add the header                
                outputContents = mustache.to_html(headerHTML, template) + data;
                
                console.log("template")
                console.log(template)
                
                // Mustache any content in body
                outputContents = mustache.render(outputContents, template);
                
                // Add the footer
                outputContents += footerHTML;
                
                response.write(outputContents);
                
                
            });
            
            
            readStream.on('end', function() {
                response.end();
            });

            readStream.on('error', function(err) {
                response.end(err);
            });
            
            
        }
    };
})();

exports.view = view;