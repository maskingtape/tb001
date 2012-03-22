var utils = require("../../lib/utils").utils;   
var pageTemplate,
    lists = [];
    
    utils.compileJsonArray(lists, "L");
    
        
pageTemplate = {
    title : "Lists",
    lists : lists
}

exports.pageTemplate = pageTemplate;