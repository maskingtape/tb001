// INCLUDES
var fs = require('fs'),
    mustache = require('./mustache');

// TODO create a get service to return this as json via HTTP    
var lists = [];
    lists.push(require('./copy/L001-list').L001);
    lists.push(require('./copy/L002-another-list').L002);
    

    
// GLOBALS
var ENCODING = 'utf-8';
    
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
            
            response.writeHead(responseType, {"Content-Type": "text/" + mimeType});
            
            var filename = __dirname + url.pathname,
                readStream = fs.createReadStream(filename, { 'encoding' : ENCODING }),
                outputContents = "";
                
            // Construct Mustache view object
            var templateView = {
                title : url.title,
                lists : lists //  object lit. declared globally // TO DO - globally?
            }
            
            readStream.on('open', function () {
                 // pipe the read stream to the response object (which goes to the client)
               // readStream.pipe(response);
            });
            
            // Append the file contents to a variable TO DO add to stream
            readStream.on('data', function(data) {
            
                // Process and Add the header                
                outputContents = mustache.to_html(headerHTML, templateView) + data;
                
                console.log("templateView")
                console.log(templateView)
                
                // Mustache any content in body
                outputContents = mustache.render(outputContents, templateView);
                
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