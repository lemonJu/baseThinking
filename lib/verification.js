
module.exports = {
    do: function(setting) {
        var i, k;
        //检查server域
        setting.port = setting.port || "3333";
        setting.charset = setting.charset || "utf-8";

        //检查actionConst
        setting.actionConst = setting.actionConst || {};

        //检查welcomePage
        setting.welcomePage = setting.welcomePage || "index.html";
        //检查intercept
        setting.检查intercept = setting.检查intercept || [];
        if (!Module.util.isArray(setting.intercept)) {
            log.print("typeof intercept is not array in setting file!");
            return false;
        }
        for (i = 0; i < setting.intercept.length; i++) {
            if (!Module.util.isArray(setting.intercept[i])) {
                log.print("typeof " + i + " intercept is not array  in setting file!");
                return false;
            }
        }
        //检查session配置
        setting.sessionContext = setting.sessionContext || {};
        setting.sessionContext.maxSession = setting.sessionContext.maxSession || 200;
        setting.sessionContext.keepDestoried = setting.sessionContext.keepDestoried || true;
        setting.sessionContext.gcTime = setting.sessionContext.gcTime || 5000;
        setting.sessionContext.expireTime = setting.sessionContext.expireTime || 1200000
    }
}
