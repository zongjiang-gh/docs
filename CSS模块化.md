# CSS模块化方案

在less、sass、stylus等预处理器的import/mixin特性支持下实现、css modules。虽然SASS、LESS、Stylus等预处理器实现了CSS的文件拆分，但没有解决CSS模块化的一个重要问题：选择器的全局污染问题;
CSS in JS是彻底抛弃CSS，使用JS或JSON来写样式。这种方法很激进，不能利用现有的CSS技术，而且处理伪类等问题比较困难；
CSS Modules 原理：使用JS 来管理样式模块，它能够最大化地结合CSS生态和JS模块化能力，通过在每个 class 名后带一个独一无二 hash 值，这样就不有存在全局命名冲突的问题了。
webpack 自带的 css-loader 组件，自带了 CSS Modules，通过简单的配置即可使用。

```js
{
    test: /\.css$/,
    loader: "css?modules&amp;localIdentName=[name]__[local]--[hash:base64:5]"
}
```

