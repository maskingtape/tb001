// GLOBALS
var globals = {
    PORT : '8080',
    HOST : 'localhost',
    ENCODING : 'utf-8',
    REST_PATH : '/api',
    TEMPLATE_PATH : '/copy/json',
    HTML_PATH : '/copy/html',
    MEDIA_PATH : '/media',
    HTML_EXTN : '.html',
    PAGE_404_ID : "R404",
    SUPPORTED_MEDIA : [
        { 
            'type' :'png',
            'mimeType' : 'image/png'
        },
        { 
            'type' :'jpg',
            'mimeType' : 'image/jpeg'
        },
        { 
            'type' :'gif',
            'mimeType' : 'image/gif'
        },
        { 
            'type' :'css',
            'mimeType' : 'text/css'
        },
        { 
            'type' :'js',
            'mimeType' : 'text/javascript'
        },
        { 
            'type' :'txt',
            'mimeType' : 'text/plain'
        },
        { 
            'type' :'ico',
            'mimeType' : 'image/x-icon'
        }
    ]
};
    
exports.globals = globals;