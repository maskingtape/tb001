var http = require('http'),
    urls = require("../config/urls").urls,
    globals = require('../config/config').globals;
    
var utils = {

    fetchLocalHttp : function fetchLocalHttp(callback, path){
        
        var options = {
          host: globals.HOST,
          port: globals.PORT,
          path: path,
          method: "GET"
        };
        
        console.log("fetchLocalHttp: options:")
        console.log(options)
        
        var req = http.request(options, function(res) {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
             // handle the response
                    callback(chunk);
          });
        });

        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });

        // write data to request body
        //req.write('data\n');
        //req.write('data\n');
        req.end();
    
    },
    
    /**
    * using a keyCode e.g. "A" that starts each url's (in /config/urls.js) uid, 
    * iterates through list and fetchs json for those itme
    */
    compileJsonArray : function compileJsonArray(array, keyCode){
        var item = null, id, i=1;
        
         while(urls[keyCode + i] !== undefined){
            item = getItem(urls[keyCode + i].filename);
            
            if(utils.isEmpty(item) == false){
                array.push(item);
            }
            i++;
        }
        
        function getItem(filename){
            return require('..'+ globals.TEMPLATE_PATH + '/' + filename);
        }
    },

    /**
    * Recursively merge properties of two objects 
    * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically#answer-383245
    */
    mergeRecursive : function mergeRecursive(obj1, obj2) {

      for (var p in obj2) {
        try {
          // Property in destination object set; update its value.
          if ( obj2[p].constructor==Object ) {
            obj1[p] = mergeRecursive(obj1[p], obj2[p]);

          } else {
            obj1[p] = obj2[p];

          }

        } catch(e) {
          // Property in destination object not set; create it and set its value.
          obj1[p] = obj2[p];

        }
      }

      return obj1;
    },
    
    
    // http://stackoverflow.com/a/6680858
    
    stripTrailingSlash : function stripTrailingSlash(str) {
        if(str.substr(-1) == '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    },
    
    isEmpty : function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

}

exports.utils = utils;