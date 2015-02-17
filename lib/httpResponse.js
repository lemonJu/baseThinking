/* part = 模块引入
--------------------------------------------*/
var fs = require("fs");
var log = require("./log");

/* part = 私有部分
--------------------------------------------*/
var cookieArr = [],
    template = null,
    code = 200; //保存该response的状态码

function flush(resp, type, data) {
    type = type || "text/html";

    if (typeof words == "string") {
        type = type + ";charset=" + CONFIG.server.charset;
    }
    resp.writeHead(resp.getCode(), {
        "Content-Type": type,
        "Server": "baseThinking/0.0.1 (Win64) nodeJS"
    });

    resp.write(data, 'binary');
    resp.end()
}

/* part = 共有部分
--------------------------------------------*/
function httpResponse(response) {
    var r
    for (r in response) {
        if (Module.util.isFunction(response[r])) {
            this[r] = response[r].bind(response)
        } else {
            this[r] = response[r]
        }
    }
}

httpResponse.prototype = {
    /**
     * 保存模块引擎，此引擎必须实现规定接口
     */
    getTemplate: function() {
        return template
    },
    setTemplate: function(t) {
        template = t
    },
    setCode: function(c) {
        code = c
    },
    getCode: function() {
        return code
    },
    /**
     * 重定向
     * 将http状态码自动设置为302并向浏览器发送重定向请求
     * @param url
     * 需要重定向的url
     */
    sendRedirect: function(url) {
        this.setCode(302);
        this.setHeader("Location", url);
        flush(this, "text/html", "")
    },
    getWriter: function() {
        var _this = this, suffix, type;
        return {
            printFile: function(file, data, setCode) {
                if(file.indexOf(":") == -1) file = USER_DIR + file; //相对路径
                
                data = data || {};
                fs.exists(file, function(exists) {
                    if (exists) {
                        _this.getTemplate().render(file, data, function(binary) {

                            suffix = file.substring(file.lastIndexOf("."), file.length);
                            type;

                            for (s in CONFIG.mime) {
                                if (suffix == s) {
                                    type = CONFIG.mime[s];
                                }
                            }
                            flush(_this, type, binary);
                        })
                    } else {
                        //输出错误页面
                        _this.setCode(404);
                        _this.getWriter().printFile(CONFIG.actionConst["404"])
                    }
                })
            },
            //输出自定义的文件
            printConst: function(code) {
                _this.getWriter().printFile(CONFIG.actionConst[code])
            },
            print: function(words, httpContent) {
                flush(_this, httpContent, words)
            }
        }
    },


    setCookie: function(name, value, expires, path, domain) {
        var cookieSrt = '', today, time, new_date, expiresDate;
        cookieStr = name + '=' + value + ';';
        //cookie有效期时间  
        if (expires != undefined) {
            expires = parseInt(expires);
            today = new Date();
            time = today.getTime() + expires * 1000;
            new_date = new Date(time);
            expiresDate = new_date.toGMTString(); //转换成 GMT 格式。  
            cookieStr += 'expires=' + expiresDate + ';';
        }
        //目录  
        if (path != undefined) {
            cookieStr += 'path=' + path + ';';
        }
        //域名  
        if (domain != undefined) {
            cookieStr += 'domain=' + domain + ';';
        }
        cookieArr.push(cookieStr);
        return this
    },
    getCookieArr: function() {
        return cookieArr
    },
    removeCookie: function(name) {
        this.setCookie(name, '', -1)
    },
    flushCookie: function() {
        this.setHeader("Set-Cookie", cookieArr)
    }
}

module.exports = httpResponse
