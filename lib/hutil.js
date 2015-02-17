/* part = 模块引入
--------------------------------------------*/
var util = require("util");

/* part = 私有部分
--------------------------------------------*/
var j = function(element, type) {
    return Object.prototype.toString.call(element) == "[object " + type + "]";
}

/* part = 共有部分
--------------------------------------------*/
exports = module.exports = {
    startWith: function(str, dest) {
        return str.substring(0, dest.length) == dest;
    },
    genReg: function(str) {
        if(str.indexOf("*") != -1) {
            str = str.replace("*", ".*");
            return new RegExp("^" + str)
        }else{
            return new RegExp("^" + str)
        }
    },
    endWith: function(str, dest) {
        return str.substring(str.length - str.length, str.length) == dest;
    },
    inherits: function(objsrc, objdest) {
        if (this.isFunction(objsrc) && this.isFunction(objdest)) {
            util.inherits(objsrc, objdest)
        }
    },
    overRide: function(src, dest, sign) {
        //sign = true代表覆盖，false代表不覆盖
        sign = sign || true;
        for (var d in dest) {
            if (!sign && src[d]) continue;
            src[d] = dest[d];
        }
    },
    isFunction: function(element) {
        return j(element, "Function")
    },
    inherits: util.inherits,
    inspect: util.inspect,
    isArray: util.isArray,
    isRegExp: util.isRegExp,
    isDate: util.isDate,
    isError: util.isError

}
