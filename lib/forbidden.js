/**
 * 拦截所有forbidden路径的请求
 */

/* part = 私有部分
--------------------------------------------*/
var url,forbidden;

/* part = 共有部分
--------------------------------------------*/
exports.intercept = function(request, response) {
    url = request.url;

    for (i = 0; i < CONFIG.forbidden.length; i++) {
        fbdReg = Module.util.genReg(CONFIG.forbidden[i]);
        if (fbdReg.test(url)) {
        	//拦截非法请求
			response.code = 403;
            response.getWriter().print("403","403");
            return false;
        }
    }
}
