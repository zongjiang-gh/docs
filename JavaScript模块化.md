# 前端模块化

## AMD

AMD 是 [RequireJS](https://requirejs.org/) 给出的模块加载方案。 支持递归依赖解析、模块异步加载。
使用注意的点：

  - 源文件中，模块应该匿名编写。区分好“使用 AMD 语法”和“模块化”，充分利用 AMD 又不被套牢。
  - 一个模块对应一个文件。每个模块是一个单独的源文件，每个文件只包含一个模块定义。
  - 避免手动写依赖列表，可以通过编译工具自动生成。
  - 独立维护的工具模块，应当通过打包编译隐藏其内部结构。

> define(id?,dependencies?,factory);

require.js 使用

```js
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main"></script>


/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});

// 定义方式一：定义math.js模块
define(function () {
    var basicNum = 0;
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum :basicNum
    };
});

// 定义方式二：定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});
```

> AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

## CommonJS

> CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)} require()用来引入外部模块； exports对象用于导出当前模块的方法或变量，唯一的导出口； module对象就代表模块本身。
>
> CommonJS是同步加载的，因此更适合服务器端。Browserify 将 Commonjs 用到浏览器端。

```js
//CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}

//require()用来引入外部模块；
//exports对象用于导出当前模块的方法或变量，唯一的导出口；
//module对象就代表模块本身。

// nodejs主要就是使用 Commonjs

// 定义模块math.js

function add(a, b) {
  return a + b;
}
module.exports = { //对外暴露的函数、变量
  add: add
}

/ main.js 

// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// sever.js

// 引用核心模块时，不需要带路径
var http = require("http"),
    PORT = 8000;

http.createServer(function(req, res){
    res.end("Hello World");
}).listen(PORT);

console.log("listenning to " + PORT);
```



## CMD

CMD与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。

[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242) 、[seajs](https://github.com/seajs/seajs)

> CMD规范，全称”Common Module Definition”，称为 通用模块加载规范 。
>
> 一般也是用在浏览器端。浏览器端异步加载库 Sea.js 实现的就是CMD规范。
>
> 在 CMD 规范中，一个模块就是一个文件

```js
//define(id?, deps?, factory)
//id:模块标识 
//deps：模块依赖 
//factory：可以是一个函数，也可以是一个对象或字符串。

/** AMD写法 **/
define(["a", "b", "c"], function(a, b, c) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    } 
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); //在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = function(a,b){
        return a+b;
    }
    exports.add = add;
});

// 加载模块
seajs.use(['math.js'], function(math){
    var sum = math.add(1+2);
});
```

## UMD

兼容 AMD 和 CommonJS 

UMD的实现很简单：

1. 先判断是否支持 Node.js 模块格式（exports是否存在），存在则使用 Node.js 模块格式。
2. 再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。
3. 前两个都不存在，则将模块公开到全局（window或global）。

[UMD-github](https://github.com/umdjs/umd)

```js
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```



## ES6 Module

实际在使用的模块规范，经过编译可以兼容所有模块化方案

```js
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}
```

## Typescript Module

https://www.typescriptlang.org/docs/handbook/modules.html

可以搬移为以上任何模块规范

```typescript
declare let $: JQuery;
export default $;

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator }

export * from "./StringValidator";

import "./my-module.js";

import $ from "jquery";

import { ZipCodeValidator } from "./ZipCodeValidator";

import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

// 也可以在文件内使用 namespace

```

