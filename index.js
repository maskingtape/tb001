var server = require("./server"),
    router = require("./router"),
    urls = require("./config/urls")

server.start(router.router.route, urls.urls);