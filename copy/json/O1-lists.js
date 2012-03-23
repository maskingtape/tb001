var utils = require("../../lib/utils").utils;   
var pageTemplate = {},
    lists = [];
    
    // utils.compileJsonArray(lists, "L");
utils.compileJsonArray(lists, "lists", setPageTemplate);
    
function setPageTemplate(jsonArray){
    pageTemplate.lists = jsonArray;
    console.log("jsonArray")
    console.log(jsonArray)
    exports.pageTemplate = pageTemplate;
} 
console.log("I'm being fetched!")
