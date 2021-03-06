# basethinking -nodejs MVC模块
## 运行你的第一个程序
要将程序运行起来非常简单，但再次之前你应该了解程序的运行流程，以及你该如何去控制程序。

+ 安装basethinking
 推荐使用npm进行安装，即在nodejs环境下使用npm install basethinking 安装程序，您也可以直接下载进行安装
+ 配置文件 -web.json    
  web.json作为整合程序的核心而存在，我们将web中可能使用的到的路由、控制器、静态文件路径等等的配置全部放到了该文件中进行统一配置，之后会详细介绍该文件的配置，而在这里，你可以进入到basethinking的目录中，简单的将该文件复制到你的文件夹下。
+ 程序入口 -thinking.js    
  thinking.js作为程序的入口存在，该模块暴露了一个初始化方法 - init,该方法接受两个存在，一个是配置文件的路径，一个是用户当前的目录，因此您在使用时，可以用以下方法简单的进行初始化。
```js
var thinking = require("basethinking");   
thinking.init("web.json", __dirname);
```
此时，默认用浏览器访问http://localhost:1234 就可以看到程序的运行了


## web.json配置
web.json几乎集成了程序所有的功能配置，同时用户甚至可以自定义该新的字段做了初始化的值    

+ _static字段
static作为程序静态路径以及静态后缀的配置而存在，为了不与默认的保留字static冲突，所以加了一个下划线作为前缀。默认情况下会带了一个local字段用来配置静态路径
```js
"_static": {
    "local": ["/tx/*"],
    ".html": "text/html"
}
```
这样程序中所有tx文件夹下的请求均会作为静态请求去处理，所有.html后缀而结束的url均会作为静态请求去处理并且返回的数据mime 类型为text/html,通过此方式，用户可以自定义所有的静态请求。
    
+ forbidden字段
```js
"forbidden": ["/pages/*", "/in/*"]
```
做了静止请求的配置而存在，用户请求该配置下的所有url均会被返回404找不到页面
+ server字段
```js
"server": {
        "port": 4444,
        "charset": "utf8"
    }
```
该字段定义了系统启用时的端口号，以及使用字符集
+ sessionContext字段
```js
"sessionContext": {
        "maxSession": 1000,
        "keepDestoried": true,
        "gcTime": 5,
        "expireTime": 10
    }
 ```
 该字段定义了session的相关参数，分别是最大的session数目，session销毁后是否保存在内存中，回收器执行一次回收session的时间（秒），session的过期时间（秒）
+ weblcomePage字段
```js
"welcomePage": "index.html"
```
该字段定义了用户访问跟路径时默认打开的页面
actionConst字段
```js
"actionConst": {
        "ERROR": "./pages/ERROR.html",
        "TEST": "./pages/TEST.html",
        "404": "./pages/404.html"
    }
 ```
 该字段定义程序中能返回静态字段，比如在过滤器中直接返回"TEST"则页面会自动跳转到./pages/TEST.html
+ intercept字段
```js
"intercept": [
        [
            "/in/*",
            "/out/*",
            "../interceptor/charset"
        ],
        [
            "/*",
            "./forbidden"
        ]
    ]
```
 该字段定义了所有的拦截器，数组中最后一个参数是拦截器所在真实路径，前面的参数定义了所有需要拦截的url路径
+ routes字段 
```js
"routes": {
        "/out/*": "/model/restful.js"
    }
```
该字段定义了程序的路由，可以使用*进行匹配，可以直接使用对应的url

## 程序范围Application
该范围中储存的值在整个程序运行过程中均有效，且用户可以在任意位置访问该值
```js
 //保存值
 APP.setAttr("KEY", "VAL");
 //读取值
 APP.getAttr("KEY")
```

## session
session默认保存在request下通过getSession()方法获得

## cookie
获取cookie时请使用 request.getCookie()    
而设置cookie时请使用 response.setCooki(name, value, expires, path, domain) 

## request
希望将值保存在request范围时，请使用getAttr 和 setAttr 但请注意request中保存的值仅在一次请求中有效！

## interceptor --拦截器
程序中内置了一个转换字符集的拦截器
```js
//接口 intercept
exports.intercept = function(req, resp) {
	req.setEncoding(CONFIG.server.charset);
}

```
在自定义拦截器时只需要实现intercept接口并在web.json中进行配置即可，传入的参数为request和responnse，请注意此时的返回值有3种情况    

1.	无返回值  程序按照流程依次执行    
2.	返回false程序中断执行   
3.	返回actionConst中配置的字段，程序返回对应的页面   

## controller配置
程序中内置了一个controller案例
```js
module.exports = {
    "/test/1": function(request, response) {
        request.doGet(function(){
            response.getWriter().printConst("TEST")
        })
        request.doOther(function(){
            response.getWriter().printConst("TEST2");
        })
    },
    "/test/2": function(request, response) {
        //response.getWriter().printConst("TEST");
        response.sendRedirect("http://www.baidu.com")
    }
}
```
当用户访问/test/1 并使用GET方法的时候返回actionConst中TEST对应的页面，其他方法返回TEST2对应的页面，在访问test/2时，程序跳转到百度    

## print.js
该文件定义了一个统一的接口render来方便程序调用，该程序返回的是模板引擎编译后所得到的html代码，不管你使用流行的 ejs  jade 还是默认自带的模板引擎，您所需要做的修改只是这个文件，保持该文件的接口不变就保证程序的正常运行。

