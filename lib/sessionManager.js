/* part = 模块引入
--------------------------------------------*/

var session = require("./session");

/* part = 私有部分
--------------------------------------------*/
var instance = null;

function sessionManager() {
    var tempSession, now, s, _this;
    this.auto_sessionContext = null;
    this.sessions = {};
    this.disabled = {};
    this.getSession = function(sid) {
        return this.sessions[sid]
    };
    this.createSession = function(sid) {
        //check max session
        if (this.sessions.length > this.auto_sessionContext.maxSession) {
            Module.log.print('max bind session =' + sid);
        }

        this.sessions[sid] = new session(sid);
        return this.sessions[sid];
    };
    this.destorySession = function(sid) {
        tempSession = this.sessions[sid];
        delete this.sessions[sid];
        if (this.auto_sessionContext.keepDestoried)
            this.destorySession[sid] = tempSession;
    };
    this.initSessionGCProcessor = function() {
        _this = this;
        time = this.auto_sessionContext.gcTime * 1000;

        setInterval(function() {
            now = Date.now();
            
            for (s in _this.sessions) {
                if (parseInt(_this.sessions[s].Sessionkey.lastTime) + parseInt(_this.auto_sessionContext.expireTime) * 1000 < now) {
                    _this.destorySession(s);
                }
            }
        }, time);
    };
    this.init = function(auto_sessionContext) {
        this.auto_sessionContext = auto_sessionContext;
        this.initSessionGCProcessor();
    }
}

module.exports = {
    /**
     * 就程序而言，session管理器类应该只存在一个实例
     * 因此使用单例模式进行管理
     */
    getInstance: function() {
        if(instance === null) {
            return instance = new sessionManager()
        }else{
            return instance
        }
    }
}
