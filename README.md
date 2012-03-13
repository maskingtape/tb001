# Every page has:
- An entry in config/urls.js.

 Example:

```javascript
"ID" : {
    "url" : "/paths/to", // the http path
    "filename" : "file.html", // the file on disk
    "title" : "My Page title" // the page's title
}
```

- An html file (with optional mustache templating)
- A template file to construct the mustache template object
- A json file
    