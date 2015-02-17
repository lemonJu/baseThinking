/*
 * 服务器启动模块
 * params setting callback
 */

/* part = 模块引入
--------------------------------------------*/
var http = require("http"),
    httpRequest = require("./httpRequest"),
    httpResponse = require("./httpResponse"),
    url = require("url");


/* part = 私有部分
--------------------------------------------*/
function start(setting, callbacks) {

    function onRequest(res, resp) {
        var request = new httpRequest(res);
        var response = new httpResponse(resp);
        var postData = "";
        var pathname = url.parse(request.url).pathname;


        request.url = pathname;

        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        //数据存储结束
        request.addListener("end", function () {
            postData = postData || url.parse(request.url).query || "";
            callbacks(request, response, postData);
        });
    }

    function makeError(reason, request, response) {
        Module.log.error(reason.word);
        response.writeHead(reason.code, {
            "Content-Type": "text/html"
        });
        response.write(reason.word);
        response.end();
    }

    http.createServer(onRequest).listen(setting.port);
    Module.log.print("服务器开始启动,监听端口：" + setting.port);
}

/* part = 共有部分
--------------------------------------------*/
exports.start = start