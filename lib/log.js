/* part = 私有部分
--------------------------------------------*/
var log = exports = module.exports,
    fs = require("fs"),
    folder = process.cwd() + "\\" + "logs" + "\\",
    defaultFile = folder + getTime() + ".txt",
    isWriteToFile = true;

function getTime(){
    var date = new Date();
    return date.getYear() + "-" + date.getMonth() + "-" + date.getDate();
}


/* part = 共有部分
--------------------------------------------*/
log.init = function(config) {
    isWriteToFile = config.isWriteToFile || false;
    folder = config.folder || folder;
};

log.write = function(word) {
    var date = new Date();
    word += "\r\n" +date.getHours() + ":" +date.getMinutes() + ":" + date.getSeconds() + "\r\n";
    fs.appendFile(defaultFile, word, function (err) {
        if (err) throw err;
    });
};

log.print = function(word) {
    console.log(word);
    isWriteToFile && this.write(word);
};

log.error = function(word) {
	console.log(word);
    isWriteToFile && this.write(word);
};
