// TODO create a get service to return this as json via HTTP    
var pageTemplate,
    lists = [];
    
    lists.push(require('./L001-list').L001);
    lists.push(require('./L002-another-list').L002);
    
        
pageTemplate = {
    lists : lists
}

exports.pageTemplate = pageTemplate;