Every page has:
- An entry in config/urls.js.

 Example:

```javascript
"ID" : {
    "url" : "/paths/to", // the http path
    "filename" : "file", // the file on disk
    "title" : "My Page title" // the page's title
}
```

- An html file (with optional mustache templating)
- An optional json template file to construct the mustache template object (if this is not specified, only the default template will be used (which is just the title!)


Media is served, can be configured in config/config.js

The json file can be accessed directly via e.g. /api/path/to