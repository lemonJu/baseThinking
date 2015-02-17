/**
 * 该类作为模板引擎的适配器而存在
 * 自定义模板引擎时只需在render方法中返回编译后的结果即可
 */

/* part = 模块引入
--------------------------------------------*/
var template = require("./template"),
    util,
    fs,
    suffix;

/* part = 共有部分
--------------------------------------------*/
module.exports = {
    render: function(sc, data, callback, options) {
        suffix = sc.substring(sc.lastIndexOf("."), sc.length);
        util = Module.util;
        fs = Module.fs;
        
        if (suffix == ".think") {
            return template.render(sc, data, options);
        } else {
            fs.readFile(sc, 'binary', function(err, file) {
                if (err) callback("");
                else callback(file);
            });
        }

    }
}
