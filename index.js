var server = require("./server"),
    router = require("./router"),
    urls = require("./urls")

server.start(router.router.route, urls.urls);