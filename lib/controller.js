/**
 * @name controller
 * 处理静态文件，分发请求
 * 如果是静态路径，静态文件，直接请求，如果没有找到路径会调
 * 用ERROR对应的html文件
 * 如果是动态路径，转发请求，没有找到返回ERROR对应路径
 */


/* part = 模块引入
--------------------------------------------*/

/* part = 私有部分
--------------------------------------------*/
var url,
    s, i, r, c,
    suffix,
    reg,
    type,
    local,
    staticFile = false,
    controller,
    method;
/* part = 共有部分
--------------------------------------------*/
exports.execute = function(request, response) {
    //变量初始化
    url = request.url,
    suffix = url.substring(url.lastIndexOf("."), url.length),
    method = request.method;
    local = CONFIG._static.local;

    //判断url是否是静态路径
    for (i = 0; i < local.length; i++) {
        reg = Module.util.genReg(local[i])
        if (reg.test(url)) {
            staticFile = true;
            break;
        }
    }
    //判断url是否是静态资源
    if (!staticFile) {
        for (s in CONFIG._static) {
            if (suffix == s) {
                type = CONFIG._static[s];
                staticFile = true;
            }
        }
    }

    if (staticFile) {
        response.setCode(200);
        response.getWriter().printFile(url);
    } else {
        for (r in CONFIG.routes) {
            reg = Module.util.genReg(r);
            if (reg.test(url)) {
                try {
                    //找到对应的处理程序
                    controller = require(USER_DIR + CONFIG.routes[r]);
                    for (c in controller) {
                        if (c == url) {
                            //分发请求
                            controller[c](request, response);
                            return;
                        }
                    }
                    Module.log.print("controller: " + CONFIG.routes[r] + " has no method to resolve request from '" + url + "'");
                    response.setCode(404);
                    response.getWriter().printConst("404");
                } catch (e) {
                    Module.log.print("ERROR IN: " + CONFIG.routes[r]);
                    console.log(Module.util.inspect(e));
                    response.setCode(404);
                    response.getWriter().printConst("404");
                }
                return;
            }
        }
        response.setCode(404);
        response.getWriter().printConst("404");
    }
}
