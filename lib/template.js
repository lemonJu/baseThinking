var fs = require("fs");

var template = {
    version: "0.0.1"
};

template.render = function(sc, data, options) {
    template.data = data;
    options && setConfig(options);
    return fs.existsSync(sc) ? renderFile(sc, data) : compiler(sc)(data);
};

var defaults = template.defaults = {
    openTag: '<%',
    closeTag: '%>',
    outTag: '='
};

var each = function(src, callback) {
    for (var i in src) callback.call(src[i], i, src[i])
};

var setConfig = template.setConfig = function(vals) {
    for (var v in vals) {
        defaults[v] = vals[v];
    }
};

var cacheStore = template.cache = {};

var renderFile = template.renderFile = function(sc, data) {
    //var fn = cacheStore[sc] || get(sc);
    var fn = get(sc);
    //缓存
    if (!cacheStore[sc]) cacheStore[sc] = fn;
    return fn(data)
};

//返回编译后的函数，编译之后会自动缓存
var get = function(filename) {
    var data = fs.readFileSync(filename, {
        encoding: 'utf8'
    });
    return compiler(data);
}

var compiler = template.compiler = function(source) {

    source = source.replace(/\s*\r?\n\s*/gim, "");
    source = source.replace(/\"/gim, "\\\"");
    var $ot = "var $out='';";
    for (var s in template.data) {
        $ot += "var " + s + "= data." + s + ";"
    }
    each(source.split(defaults.openTag), function(key, value) {
        var code = value.split(defaults.closeTag);
        var $0 = code[0];
        var $1 = code[1];
        if (code.length == 1) {
            $ot += parseHtml($0);
        } else {
            $ot += parseCode($0);
            $ot += parseHtml($1)
        }


    });



    function parseHtml(html) {
        if (html && html !== "") return "$out+=\"" + html + "\";";
        else return ""
    }

    function parseCode(code) {
        if (code && code.indexOf(defaults.outTag) == 0) {
            return "$out+=" + code.substring(1) + ";"
        } else {
            return code
        }
    }
    return new Function("data", $ot + "return $out")
}


module.exports = template;
