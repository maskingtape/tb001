// INCLUDES
var fs = require('fs'),
    mustache = require('./lib/mustache'),
    globals = require('./config/config').globals,
    utils = require('./lib/utils').utils;


// fetch the text constants into memory on load // Is this really on load?
var headerHTML = "",
    footerHTML = "";
   
// TODO create model
        
fs.readFile(__dirname+"/header.html", function (err, data) {
  if(err){
    throw err;
  }
  headerHTML = data.toString(); 
});

fs.readFile(__dirname+"/footer.html", function (err, data) {
  if(err){
    throw err;
  }
  footerHTML = data.toString(); 
});
         



// MAIN FUNCTION
var view = (function() {
    
    return {
    
        writeResponse : function writeResponse(response, responseType, mimeType, url){
            
            
            
            response.writeHead(responseType, {"Content-Type": mimeType});
            
            var filename = __dirname + globals.HTML_PATH + '/' + url.filename,
                readStream = fs.createReadStream(filename, { 'encoding' : globals.ENCODING }),
                outputContents = "";
            
            readStream.on('open', function () {
                // pipe the read stream to the response object (which goes to the client)
                // readStream.pipe(response);
            });
            
            // Append the page contents to a variable // TODO add to stream
            readStream.on('data', function(data) {
            
                
                // generic template obj for mustache to use
                var template = {}; 
                // add defaults // TODO decouple from this page (add to some kind of config)
                template.title = url.title; // from request for this page
                
                    
                if(url.template){ // TODO - remove this - every page will have a template file
                    // get the template for this page url
                    var pageTemplate = require("." + globals.TEMPLATE_PATH + '/' + url.template).pageTemplate;
                    // merge it into the generic template
                    template  = utils.mergeRecursive(template, pageTemplate);  
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
            
            readStream.on('close', function () {
               
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