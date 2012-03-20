var http = require('http'),
    globals = require('./config/config').globals,
    url = require('url');
 
function start(route, urls){

    function onRequest(request, response) {
     
        console.log('request starting...');
        
        // Get the request
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(urls, pathname, response);
        
    }
    
    http.createServer(onRequest).listen(globals.PORT);
     
    console.log('Server running at http://127.0.0.1:' + globals.PORT);
}

exports.start = start;