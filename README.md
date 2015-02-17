# basethinking -nodejs MVC模块
## 运行你的第一个程序
>要将程序运行起来非常简单，但再次之前你应该了解程序的运行流程，以及你该如何去控制程序。

> + 安装basethinking
> 推荐使用npm进行安装，即在nodejs环境下使用npm install basethinking 安装程序，您也可以直接下载进行安装
> + 配置文件 -web.json，web.json作为整合程序的核心而存在，我们将web中可能使用的到的路由、控制器、静态文件路径等等的配置全部放到了该文件中进行统一配置，之后会详细介绍该文件的配置，而在这里，你可以进入到basethinking的目录中，简单的将该文件复制到你的文件夹下。
> +程序入口 -thinking.js，thinking.js作为程序的入口存在，该模块暴露了一个初始化方法 - init,该方法接受两个存在，一个是配置文件的路径，一个是用户当前的目录，因此您在使用时，可以用以下方法简单的进行初始化。
```js
var thinking = require("basethinking");   
thinking.init("web.json", __dirname);
```
此时，默认用浏览器访问http://localhost:1234 就可以看到程序的运行了
