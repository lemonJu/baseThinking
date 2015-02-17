/* part = 私有部分
--------------------------------------------*/

function session(sid) {
    var attrs = {}; //属性
    this.Sessionkey = {
        lastTime: 'lastTime', //最后访问时间
        state: 'state' //会话状态
    };
    this.Sessionkey.lastTime = Date.now();
    this.Sessionkey.state = 1;
    this.sid = sid;
    
    //state = 1; //会话状态
    //bid = bid; //绑定ID
    //lastTime = new Date(); //最后访问时间
    this.getAllAttr = function() {
        return attrs;
    };
    this.getAttr = function(key) {
        return attrs[key];
    }; //获取属性
    this.removeAttr = function(key) {
        delete attrs[key]
    }; //删除属性
    this.setAttr = function(key, value) {
        attrs[key] = value;
        return this;
    }; //设置属性
    this.close = function() {
        this.setAttr(this.Sessionkey.state, 0);
    }; //关闭会话
    this.destory = function() {
        this.setAttr(this.Sessionkey.state, - 1);
    }; //销毁会话
    this.replace = function(session) {
        var allAttr = session.getAllAttr();
        for (var key in allAttr) attrs[key] == null && attrs[key] = allAttr[key];
    }; //替换会话
    this.refreshLastTime = function() { //刷新最后访问时间
        this.Sessionkey.lastTime = Date.now();
        this.Sessionkey.state = 1;
    }
}

/* part = 公有部分
--------------------------------------------*/
module.exports = session
