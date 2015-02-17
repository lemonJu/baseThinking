/* part = 模块引入
--------------------------------------------*/

/* part = 私有部分
--------------------------------------------*/
var itcp, //定义的拦截器对象数组
    url, //当前当问的url
    i, k; 
var reg, //用于匹配url的 RegExp对象
    itcpor, //当前拦截体对象
    result; //执行拦截器后返回的值
/* part = 共有部分
--------------------------------------------*/
exports.intercept = function(request, response) {
    //执行拦截器
    itcp = CONFIG.intercept;
    url = request.url;
    for (i = 0; i < itcp.length; i++) {
        for (k = 0; k < itcp[i].length - 1; k++) {
            reg = Module.util.genReg(itcp[i][k]);
            if (reg.test(url)) {
                try {
                    itcpor = require(itcp[i][itcp[i].length - 1]);
                    result = itcpor.intercept(request, response);
                    if (result === false) {
                        return false;
                    } else if (result && CONFIG.actionConst[result]) {
                        //输出对应的值
                        response.getWriter().printFile(CONFIG.actionConst[result]);
                        return false;
                    }
                } catch (e) {
                    Module.log.print("ERROR IN: " + itcp[i][itcp[i].length - 1]);
                    console.log(Module.util.inspect(e));
                    response.getWriter().printConst("404");
                    return false
                }

            }
        }

    }
    return true;
}
