var http = require('http'),
    url = require('url');
 
function start(route, urls){

    function onRequest(request, response) {
     
        console.log('request starting...');
        
        // Get the request
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(urls, pathname, response);
        
    }
    
    http.createServer(onRequest).listen(8080);
     
    console.log('Server running at http://127.0.0.1:8080/');
}

exports.start = start;