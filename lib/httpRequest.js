/* part = 模块引入
--------------------------------------------*/


/* part = 私有部分
--------------------------------------------*/
var session = {},
    params = {};

/* part = 共有部分
--------------------------------------------*/
function httpRequest(request) {
    var r
    for (r in request) {
        if (typeof request[r] === "function") {
            this[r] = request[r].bind(request);
        } else {
            this[r] = request[r];
        }
    }
}

httpRequest.prototype = {
    getSession: function(){
        return session
    },
    setSession: function(s){
        session = s
    },
    getParams: function() {
        return params
    },
    setParams: function(p) {
        params = p
    },
    getAttr: function(key) {
        return params[key]
    },
    setAttr: function(key, value) {
        params[key] = value
    },
    /**
     * 返回用户IP
     */
    getClientIp: function() {
        return this.headers['x-forwarded-for'] ||
            this.connection.remoteAddress ||
            this.socket.remoteAddress ||
            this.connection.socket.remoteAddress
    },
    getCookie: function() {
        var cookieObj = {};

        var pairs = this.headers.cookie ? this.headers.cookie.split(/[;,] */) : [];
        for (var i = 0; i < pairs.length; i++) {
            var idx = pairs[i].indexOf('=');
            var key = pairs[i].substr(0, idx).trim()
            var val = pairs[i].substr(++idx, pairs[i].length).trim();
            cookieObj[key] = val;
        }
        return cookieObj;
    },
    eStack: 0,
    execute: function(method, callback) {
        if (this.method.toLowerCase() == method) {
            //this.eStack[method] = callback;
            this.eStack++;
            callback();
        }
    },
    doGet: function(callback) {
        this.execute("get", callback);
    },
    doPost: function(callback) {
        this.execute("post", callback);
    },
    doOther: function(callback) {
        if (this.eStack == 0) {
            callback();
        }
    }
}

module.exports = httpRequest;