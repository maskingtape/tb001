var utils = {

    /*
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
    
    
    getPage : function getPage(urls, id){
        for (var i in urls) {
           if(i === id){
                return urls[i];
           }
        }
    },
    
    // http://stackoverflow.com/a/6680858
    
    stripTrailingSlash : function stripTrailingSlash(str) {
        if(str.substr(-1) == '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    }
}

exports.utils = utils;