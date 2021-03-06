# CSS 笔记

本书翻译自 [CSS Notes for Professionals](https://goalkicker.com/CSSBook/)

## 第一章: CSS 入门

发布版本：

  1. 1996-12-17
  2. 1998-05-12
  3. 2015-10-13

### 1.1 小节：外部样式表（External Stylesheet）

通过在每个 HTML 文件中放置一个<link>标签，能将外部CSS样式表应用于任意数量的 HTML 文件中。
<link> 标签的属性rel必须设置为 "stylesheet"，href 属性应设置为样式表的相对或绝对路径。 虽然通常认为使用相对 URL 路径是一种好习惯，但也可以使用绝对路径。在 HTML5 中，可以省略 type 属性。
<link> 标签应该被放置在 <head> 标签中，以便于样式在应用之前被加载。否则应用样式时会出现一次闪烁。

```html
<!-- hello-world.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
   <h1>Hello world!</h1>
   <p>I ♥ CSS</p>
</body>
</html>

```

```css
/* style.css */
h1 {
 color: green;
 text-decoration: underline;
}
p {
 font-size: 25px;
 font-family: 'Trebuchet MS', sans-serif;
}
```
href 推荐使用相对路径，也可以使用绝对路径。当有很多的页面时，将公共部分提取出来作为单独的样式表来加载可以提高后期修改的效率。

```html
<link rel="stylesheet" type="text/css" href="main.css">
<link rel="stylesheet" type="text/css" href="css/override.css">
```

### 1.2 内部样式表（Internal Styles）

在 html 页面中直接写入样式表

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: green;
      text-decoration: underline;
    }
    p {
      font-size: 25px;
      font-family: 'Trebuchet MS', sans-serif;
    }
  </style>
</head>
<body>
  <h1>Hello world!</h1>
  <p>I ♥ CSS</p>
</body>
</html>
```

### 1.3 CSS @import 规则 (CSS 的规则之一)

```html
<style>
  /* 导入根目录的样式 */
  @import url('/css/styles.css');
  /* 导入外部样式，常见的是导入字体文件 */
  @import 'https://fonts.googleapis.com/css?family=Lato';
  /* 第二个可选参数是媒体查询列表 */
  @import '/print-styles.css' print;
  @import url('landscape.css') screen and (orientation:landscape);
</style>

```

### 1.4 行内样式(Inline Styles)

行内样式一般用于 js 设置标签的 CSS 属性

```html
<h1 style="color: green; text-decoration: underline;">Hello world!</h1>
<p style="font-size: 25px; font-family: 'Trebuchet MS';">I ♥ CSS</p>
```

### 1.5 JS 操作行内样式

```js
  var el = document.getElementById("element");
  el.style.opacity = 0.5;
  el.style.fontFamily = 'sans-serif';
// jQuery
$('#element').css('margin', '5px');
// 多个
$('#element').css({
  margin: "5px",
  padding: "10px",
  color: "black"
});
// 驼峰属性名
$('.example-class').css({
  "background-color": "blue",
  fontSize: "10px"
});

```

### 1.5 CSS 样式列表

css 可以设置多种样式，每个样式都有很多的属性值。如：list-style

```css
/* list-style 是 list-style-type list-style-image list-styleposition 的简写属性，以任何顺序接受一个，二个或者三个关键词
*/
/* list-style:list-style-type list-style-image list-styleposition; */
.one {
  list-style: circle;
}

.two {
  list-style: square inside;
}
```

## 第二章: CSS 的结构和格式规则

### 2.1 CSS 属性列表

一些属性可以采用多个值，这些值统称为属性列表。

```css
/* 此属性列表中有两个值 */
/*  */
span {
  text-shadow: yellow 0 0 3px, green 4px 4px 10px;
}
/* Alternate Formatting 备用格式，格式化后的格式，便于检查*/
span {
  text-shadow:
      yellow 0 0 3px,
      green 4px 4px 10px;
}
```

### 2.2 多个选择器

对CSS选择器进行分组时，可以将相同的样式应用于多个不同的元素，而无需在样式表中重复样式。使用逗号分隔多个分组的选择器。
```css
/* 所有的 div 和 p 标签内的字体颜色都是蓝色 */
div, p { color: blue; }
/* 所有的 p 标签, class="blue", id="first" 和 div 下的 span 标签的字体颜色为蓝色  */
p, .blue, #first, div span{ color : blue; }
```

### 2.3 规则，选择器和声明块

一个 css 的规则由一个选择器和一个声明块组成,声明快内部书写具体样式列表。
```css

h1{
  color: red;
}

```

## 第三章: 注释 （Comments）

```css
/* 单行注释 */
div {
  color: red; /* This is a CSS comment */
}
/* 
  多行
  注释 
*/

div {
  color: red;
}
```

## 第四章: 选择器 （Selectors）

### 4.1 基础选择器

|      选择器      |                               解释                                |
| :--------------: | :---------------------------------------------------------------: |
|        *         |                           选择所有标签                            |
|       div        |                    标签选择器，选择所有的 div                     |
|      .blue       |                     选择 class 有 blue 的标签                     |
|      #first      |                      选择 id 为 first 的标签                      |
|  :pseudo-class   |                            伪类选择器                             |
| ::pseudo-element | 伪元素选择器,例如：`::first-letter/::first-line/::after/::before` |
|    :lang(en)     |      匹配有lang属性的标签 ，例如：`<span lang="en"></span>`       |
|     div > p      |                           子元素选择器                            |

参考：https://www.w3.org/TR/selectors-3/#selectors

### 4.2 属性选择器

|     选择器     |           匹配示例           |                  释义                   |
| :------------: | :--------------------------: | :-------------------------------------: |
|     [attr]     |         `<div attr>`         |              有 attr 属性               |
|  [attr='val']  |      `<div attr="val">`      |            attr 属性值为 val            |
| [attr~='val']  | `<div attr="val val2 val3">` |            值列表中存在 val             |
| [attr^='val']  |   `<div attr="val1 val2">`   |       值列表中存在以 val 开头的值       |
| [attr$='val']  |   `<div attr="sth aval">`    |       值列表中存在以 val 结尾的值       |
| [attr*='val']  |  `<div attr="somevalhere">`  |        值列表中存在包含 val 的值        |
| [attr\|='val'] |  `<div attr="val-sth etc">`  |  值恰好为val 或者val 开头后跟连字符 -   |
| [attr='val' i] |      `<div attr="val">`      | i 不区分大小写，s区分大小写，兼容性较差 |

#### [attribute]

```html
<style>
div[data-color] {
  color: red;
}
</style>

<div data-color="red">This will be red</div>
<div data-color="green">This will be red</div>
<div data-background="red">This will NOT be red</div>
```

#### [attribute="value"]

```html
<style>
div[data-color="red"] {
 color: red;
}
</style>
<div data-color="red">This will be red</div>
<div data-color="green">This will NOT be red</div>
<div data-color="blue">This will NOT be red</div>
```

#### [attribute*="value"]

```html
<style>
[class*="foo"] {
 color: red;
}
</style>

<div class="foo-123">This will be red</div>
<div class="foo123">This will be red</div>
<div class="bar123foo">This will be red</div>
<div class="barfooo123">This will be red</div>
<div class="barfo0">This will NOT be red</div>
```

#### [attribute~="value"]

```html
<style>
[class~="color-red"] {
 color: red;
}
</style>

<div class="color-red foo-bar the-div">This will be red</div>
<div class="color-blue foo-bar the-div">This will NOT be red</div>
```

#### [attribute^="value"]

```html
<style>
[class^="foo-"] {
 color: red;
}
</style>

<div class="foo-123">This will be red</div>
<div class="foo-234">This will be red</div>
<div class="bar-123">This will NOT be red</div>
```

#### [attribute$="value"]

```html
<style>
[class$="file"] {
 color: red;
}
</style>

<div class="foobar-file">This will be red</div>
<div class="foobar-file">This will be red</div>
<div class="foobar-input">This will NOT be red</div>
```

#### [attribute|="value"]

```html
<style>
[lang|="EN"] {
 color: red;
}
</style>
<div lang="EN-us">This will be red</div>
<div lang="EN-gb">This will be red</div>
<div lang="PT-pt">This will NOT be red</div>
```

#### [attribute="value" i]

```html
<style>
[lang="EN" i] {
 color: red;
}
</style>

<div lang="EN">This will be red</div>
<div lang="en">This will be red</div>
<div lang="PT">This will NOT be red</div>
```

#### Other

```css
*[type=checkbox]{} /* 0-1-0 */
[id="my-ID"] /* 使用属性选择器会相对优先级比较低 */
```

### 组合选择器

|   选择器   |                       解释                       |
| :--------: | :----------------------------------------------: |
|  div span  |            后代选择器，所有层级的后代            |
| div > span |                    子代选择器                    |
|  a ~ span  | 兄弟标签选择器，选择 a 之后的所有的同层级的 span |
|  a + span  |     相邻兄弟选择器，所有 a 之后的第一个 span     |

#### 后代选择器

```html
<style>
div p {
 color:red;
}
</style>

<div>
 <p>My text is red</p>
 <section>
 <p>My text is red</p>
 </section>
</div>
<p>My text is not red</p>
```

#### 子代选择器

```html
<style>
div > p {
 color:red;
}
</style>

<div>
 <p>My text is red</p>
 <section>
 <p>My text is not red</p>
 </section>
 </div>
```

#### 兄弟选择器

```html
<style>
p ~ p {
 color:red;
}
</style>

<p>My text is not red</p>
<p>My text is red</p>
<hr>
<h1>And now a title</h1>
<p>My text is red</p>

```

#### 相邻兄弟选择器

```html
<style>
p + p {
 color:red;
}
</style>

<p>My text is not red</p>
<p>My text is red</p>
<p>My text is red</p>
<hr>
<p>My text is not red</p>
```

### 4.4 伪类选择器

`selector:pseudo-class { property: VALUE;}`, 常用的有 `:active`,`:hover`,`:link`,`visited`

### 4.5 child 伪类选择器

|  pseudo-selector   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |  10   |
| :----------------: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|    :first-child    |   √   |       |       |       |       |       |       |       |       |       |
|   :nth-child(3)    |       |       |   √   |       |       |       |       |       |       |       |
|  :nth-child(n+3)   |       |       |   √   |   √   |   √   |   √   |   √   |   √   |   √   |   √   |
|   :nth-child(3n)   |       |       |   √   |       |       |   √   |       |       |   √   |       |
|  :nth-child(3n+1)  |   √   |       |       |   √   |       |       |   √   |       |       |   √   |
|  :nth-child(-n+3)  |   √   |   √   |   √   |       |       |       |       |       |       |       |
|  :nth-child(odd)   |   √   |       |   √   |       |   √   |       |   √   |       |   √   |       |
|  :nth-child(even)  |       |   √   |       |   √   |       |   √   |       |   √   |       |   √   |
|    :last-child     |       |       |       |       |       |       |       |       |       |   √   |
| :nth-last-child(3) |       |       |       |       |       |       |       |   √   |       |       |

### 4.6 类名选择器

```css
.c-red{
  color:red;
}
.important {
 color: orange;
}
.warning {
 color: blue;
}
.warning.important {
 color: red;
}
```

### 4.7 id 选择器

```css
#element { ... } /* High specificity will override many selectors */
[id="element"] { ... } /* Low specificity, can be overridden easily */
```

### 4.8  :last-of-type

```html
<style>
p:last-of-type {
 background: #C5CAE9;
}
h1:last-of-type {
 background: #CDDC39;
}
</style>

<div class="container">
 <p>First paragraph</p>
 <p>Second paragraph</p>
 <p>Last paragraph</p>  <!-- #C5CAE9 -->
 <h1>Heading 1</h1>
 <h2>First heading 2</h2>
 <h2>Last heading 2</h2>  <!-- #CDDC39 -->
</div>

```

### 4.9 CSS3 :in-range 

```html
<style>
input:in-range {
 border: 1px solid blue;
}
</style>

<input type="number" min="10" max="20" value="15">
<p>The border for this value will be blue</p>

```

### 4.10 :not & :focus-within

```html
<style>
input:not([disabled]):not(.example) {
  background-color: #ccc;
}
/* 级别4 中支持，其他不支持 */
input:not([disabled], .example){
 background-color: #ccc;
}
div {
 height: 80px;
}
input{
 margin:30px;
}
/* 支持性较差 */
div:focus-within {
 background-color: #1565C0;
}

</style>

<form>
 Phone: <input type="tel" class="example">
 E-mail: <input type="email" disabled="disabled">
 Password: <input type="password">  <!-- #ccc -->
</form>

 <h3>Background is blue if the input is focused .</p>
 <div>
 <input type="text">
 </div>

```

### :checked

```html
<!-- 无 js 的弹窗层 -->
<style>
body {
  margin: 0;
}

/* animate EVERYTHING! - well, almost. */
* {
  transition: all .2s, height 1ms;
}

[for] {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#container, #footer {
  width: calc(100% - 2em);
  color: #555;
  padding: 1em;
}
#darkThemeUsed:checked ~ #container,
#darkThemeUsed:checked ~ #footer {
  color: #eee;
}

#container {
  height: calc(100vh - 2em);
  background: #eee;
}
#darkThemeUsed:checked ~ #container {
  background: #333;
}

#sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 260px;
  background: #2196f3;
  margin-right: -304px;
  padding: 100px;
  color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, .5);
}
#sidebarShown:checked ~ #container #sidebar {
  margin-right: 0;
}
#darkThemeUsed:checked ~ #container #sidebar {
  background: #303f9f;
}

h3, h4 {
  margin: 0;
  margin-top: 1.5em;
  margin-bottom: .6em;
}

label {
  cursor: pointer;
}

label[for=darkThemeUsed]:after {
  content: "No"
}
#darkThemeUsed:checked ~ #container label[for=darkThemeUsed]:after {
  content: "Yes"
}

.button {
  display: inline-block;
  font-weight: bold;
  line-height: 36px;
  text-align: center;
  padding: 0 8px;
  min-width: 100px;
  background: rgba(0, 0, 0, .1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
  text-transform: uppercase;
  font-size: 90%
}
#darkThemeUsed:checked ~ * .button {
  background: rgba(255, 255, 255, .1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .8);
}

#footer {
  height: 100px;
  position: fixed;
  bottom: 0;
  background: #ddd;
}
#darkThemeUsed:checked ~ #footer {
  background: #444;
}
</style>

<input type="checkbox" id="sidebarShown" hidden />
<input type="checkbox" id="darkThemeUsed" hidden />

<!-- here begins actual content, for example: -->
<div id="container">
    <div id="sidebar">
        <label for="sidebarShown" class="button">x</label>
        <h3>Super cool sidebar</h3>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
    </div>

    <h3>Sample page</h3>
    
    <p>
        <label for="darkThemeUsed">Use dark theme? – </label>
    </p>
    
    <label for="sidebarShown" class="button">Toggle sidebar</label>
</div>

<div id="footer">
    (c) The 0815 Company
</div>
```

### 4.12 ID 选择器

```html
<style>
#exampleID {
 width: 100px;
}

</style>

<div id="exampleID">
 <p>Example</p>
</div>

```
### 4.13 如何引用样式在 一个 `type=range` input 上

```html
<input type="range" />

```

```css
/* Thumb */
input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb,
input[type=range]::-ms-thumb{}
/* Track */
input[type=range]::-webkit-slider-runnable-track, input[type=range]::-moz-range-track,
input[type=range]::-ms-track{}
/* OnFocus */
input[type=range]:focus{}
/* Lower part of the track */
input[type=range]::-moz-range-progress, input[type=range]::-ms-fill-lower{}/* (not possiblein WebKit browsers currently - JS needed) */
```

### 4.14 :only-child

```html
<style>
  p:only-child {
   color: blue;
  }
</style>

<div>
  <p>This paragraph is the only child of the div, it will have the color blue</p><!--blue-->
</div>
<div>
  <p>This paragraph is one of the two children of the div</p>
  <p>This paragraph is one of the two children of its parent</p>
</div>

```

## 第五章: Backgrounds

使用CSS，您可以将颜色，渐变和图像设置为元素的背景。
可以指定图像，颜色和渐变的各种组合，并调整 size，position和 repeat（以及其他）。

### 5.1 background-color

能在所有的标签上生效，`::first-letter/::first-line`伪元素也可以生效。

可以使用的值有：颜色值，transparent，inherit，initial。颜色值可以使用颜色名（如：`red`），Hex 颜色值（如：`#de1205`），RGB/RGBa 颜色值（如：`rgb(23,23,23)/rgba(0,0,0,0.5)`），HSL/HSLa 颜色值（如：`hsl(120 100% 50%)/hsla(120,100%,50%,.3)`）。

示例：

```css
/* 颜色值具体可以查看 https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value */
div {
 background-color: red; /* red */
}
/* 每两位代表一个16进制颜色值，最大ff */
body {
 background-color: #de1205; /* red */
}
.main {
 background-color: #00f; /* blue */
}
/* 每个逗号分隔代表一个10进制颜色值，最大255 */
header {
 background-color: rgb(0, 0, 0); /* black */
}
/* 透明度 0-1 ，1 完全不透明 */
footer {
 background-color: rgba(0, 0, 0, 0.5); /* black with 50% opacity */
}
/* HSL代表色调，饱和度和亮度 色调是色轮上的度数（从0到360）。饱和度是介于0％和100％之间的百分比。亮度也是0％到100％之间的百分比。 */
li a {
 background-color: hsl(120, 100%, 50%); /* green */
}
/* 透明度 0-1 ，1 完全不透明 */
#p1 {
 background-color: hsla(120, 100%, 50%, .3); /* green with 30% opacity */
}
```

**和background-image 组合使用**

```css
/* 这种是等价的，它们都会导致图像下方显示红色，其中图像的各个部分是透明的，或图像未显示（可能是由于背景重复）。 */
body {
 background: red;
 background-image: url(partiallytransparentimage.png);
}
body {
 background-color: red;
 background-image: url(partiallytransparentimage.png);
}
body {
 background-image: url(partiallytransparentimage.png);
 background-color: red;
}
body {
 background: red url(partiallytransparentimage.png);
}
/* 这种会被覆盖 */
body {
 background-image: url(partiallytransparentimage.png);
 background: red;
}
```

### 5.2 背景颜色的渐变（ Background Gradients）

渐变是 CSS3 中添加的类型，使用 background-image 属性设置渐变或使用 background 简写属性。
渐变函数有两种类型，线性渐变（linear-gradient）和径向渐变（radial-gradient）。 每种类型都有一个非重复的变体和一个重复的变体：

- **linear-gradient()** 
- **repeating-linear-gradient()** 
- **radial-gradient()** 
- **repeating-radial-gradient()**

#### linear-gradient()

语法： 

> background: linear-gradient( <direction>?, <color-stop-1>,<color-stop-2> ,...);

- <direction>：to top, to bottom, to right, to left 还可以使用deg，grad，rad，turn。为空则从上到下
- <color-stop>：颜色 位置，如：yellow 10%，rgba(0,0,0,0.5) 40px, #fff 100% ...

例如：

```css
.linear-gradient {
  /* 从右到左，从红色过渡到蓝色的线性渐变*/
  background: linear-gradient(to left, red, blue); /* you can also use 270deg */
}
/* 从右下角到左上角，从红色到黄色再到红色的线性渐变 从10%-100%都是黄色*/
.diagonal-linear-gradient {
  background: linear-gradient(to left top, red, yellow 10%);
}
/* 都好分隔可以有任意多个线性渐变 */
.linear-gradient-rainbow {
  background: linear-gradient(to left, red, orange, yellow, green, blue, indigo, violet);
}
/* 径向渐变 https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient() */
.radial-gradient-simple {
  background: radial-gradient(red, blue);
}
/* 渐变的形状的值可以为 circle 或者 ellipse（椭圆） 默认值是椭圆 */
/* 渐变的结束形状多大  closest-side, farthestside, closest-corner, farthest-corner*/
/* 最近的一个边，最远的一个边，最近的顶点，最远的顶点 */
/* 中心点的位置 */
.radial-gradient {
  background: radial-gradient(circle farthest-corner at top left, red, blue);
}
/* 平铺，不会由最后的颜色一致到结尾，会重复填充 */
.bullseye {
  background: repeating-radial-gradient(red, red 10%, white 10%, white 20%);
}
.warning {
  background: repeating-linear-gradient(-45deg, yellow, yellow 10%, black 10%, black 20%);
}

```

### 5.3 背景图片

```css
/* 值 none initial inherit 和 url("URI") 默认值 initial */
.myClass {
   background-image: url('/path/to/image.jpg');
}

.myClass {
   background-image: url('/path/to/image.jpg'),
 				     url('/path/to/image2.jpg');
}

```

### 5.4 Background 属性简写

```css
/*
background: [<background-image>] [<background-color>] [<background-position>]/[<background-size>]
[<background-repeat>] [<background-origin>] [<background-clip>] [<background-attachment>]
[<initial|inherit>]; 
*/
.css{
    background: red;
    background: border-box red;
    background: no-repeat center url("somepng.jpg");
    background: url('pattern.png') green;
    background: #000000 url("picture.png") top left / 600px auto no-repeat;
}
```

### 5.5 background-size

```css
.my-class{
    /* 省略的值为auto */
    background-size: 50px;
    /* 需要保持缩放比，可以设置一个值为 auto */
	background-size: 50px auto;
	background-size: auto 50px;
	background-size: 50px 50px;
    background-size: 100% 66%; /* 相对于宽高的百分比 */
    /*保持宽高比的情况下，让图片可以全部显示 */
	background-size: contain;
    /* 保持宽高比的情况下，填充满整个空间 */
    background-size: cover;
}

```

示例：

```html
<style>
div > div {
 background-image: url(http://i.stack.imgur.com/r5CAq.jpg);
 background-repeat: no-repeat;
 background-position: center center;
 background-color: #ccc;
 border: 1px solid;
 width: 20em;
 height: 10em;
}
div.contain {
 background-size: contain;
}
div.cover {
 background-size: cover;
}
/********************************************
 Additional styles for the explanation boxes
*********************************************/
div > div {
 margin: 0 1ex 1ex 0;
 float: left;
}
div + div {
 clear: both;
 border-top: 1px dashed silver;
 padding-top:1ex;
}
div > div::after {
 background-color: #000;
 color: #fefefe;
GoalKicker.com – CSS Notes for Professionals 31
 margin: 1ex;
 padding: 1ex;
 opacity: 0.8;
 display: block;
 width: 10ex;
 font-size: 0.7em;
 content: attr(class);
}
</style>
<div>
 <div class="contain"></div>
 <p>Note the grey background. The image does not cover the whole region, but it's fully
<em>contained</em>.
 </p>
</div>
<div>
 <div class="cover"></div>
 <p>Note the ducks/geese at the bottom of the image. Most of the water is cut, as well as a part
of the sky. You don't see the complete image anymore, but neither do you see any background color;
the image <em>covers</em> all of the <code>&lt;div&gt;</code>.</p>
</div>

```

### 5.6 background-position

可以使用 left，top，bottom，right center 等关键字，或百分比值，px值，rem值来设置

```css
.my-class{
  /* x y */
  background-image: url('path/to/image.jpg');
  background-position: 50% 50%;
  background-position: center;
  background-position: 0 10px;
  background-position: 10% 0;
  background-position: 1rem 0;
}
```

### 5.7 background-origin

background-position移动的原点，值有 padding-box，border-box，content-box，inherit，initial

```html
<style>
.example {
  width: 300px;
  border: 100px solid rgba(196,196,196,.3);
  padding: 50px;
  background: url(https://static.pexels.com/photos/6440magazines-desk-work-workspace-medium.  jpg);
  background-repeat: no-repeat;
}
.example1 {background-origin: padding-box;}
.example2 { background-origin: border-box; }
.example3 { background-origin: content-box; }
</style>

<p>No background-origin (padding-box is default):</p>
GoalKicker.com – CSS Notes for Professionals 33
<div class="example example1">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>
<p>background-origin: border-box:</p>
<div class="example example2">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>
<p>background-origin: content-box:</p>
<div class="example example3">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>
```

- More:
  https://www.w3.org/TR/css-backgrounds-3/#the-background-origin
  https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin

### 5.8 多张背景图片

```css
#mydiv {
  background-image: url(img_1.png), /* top image */
  url(img_2.png), /* middle image */
  url(img_3.png); /* bottom image */
  background-position: right bottom,left top,right top;
  background-repeat: no-repeat,repeat,no-repeat;
}
#mydiv {
  background: url(img_1.png) right bottom no-repeat,
  url(img_2.png) left top repeat,
  url(img_3.png) right top no-repeat;
}

#mydiv {
  background: url(image.png) right bottom no-repeat,
  linear-gradient(to bottom, #fff 0%,#000 100%);
}
```

### 5.9 background-attachment

background-attachment属性设置背景图像是固定的还是与页面的其余部分一起滚动。值有：scroll，fixed，local，initial，inherit。默认scroll

```css
body {
  background-image: url('img.jpg');
  background-attachment: fixed;
}
/* 当div滚动时背景图滚动 */
div{
  background-image: url('image.jpg');
  background-attachment: local;
}
```

### 5.10  background-clip

background-clip属性指定背景的绘制区域。默认值：border-box，其他值：content-box，padding-box，inherit。

```html
<style>
.example {
 width: 300px;
 border: 100px solid rgba(196,196,196,.3);
 padding: 50px;
 background: url(https://static.pexels.com/photos/6440/magazines-desk-work-workspace-medium.jpg);
 background-repeat: no-repeat;
}
.example1 { background-clip: padding-box;}
.example2 { background-clip: border-box; }
.example3 { background-clip: content-box;}
</style>

<p>No background-clip (padding-box is default):</p>
<div class="example example1">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>
<p>background-clip: border-box:</p>
<div class="example example2">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>
<p>background-clip: content-box:</p>
<div class="example example3">
 <h2>Lorem Ipsum Dolor</h2>
 <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
 <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
aliquip ex ea commodo consequat.</p>
</div>

```

### 5.11 background-repeat

当背景图小于标签宽高是的是否重复的设置，值有：repeat，repeat-y，repeat-x，no-repeat。

```html
<style>
.my-div {
  width: 300px;
  height: 200px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(to right, black 0%,white 100%),
  url('https://static.pexels.com/photos/54624/strawberry-fruit-red-sweet-54624-medium.jpeg');
  background-blend-mode:saturation;
}
</style>
<div class="my-div">Lorem ipsum</div>
```

` background-blend-mode: normal | multiply | screen | overlay | darken | lighten | color-dodge | saturation | color | luminosity;`

background-blend-mode 属性定义了背景层的混合模式（图片与颜色）。IE 不支持

### 5.13  背景颜色不透明度

```css
/* Fallback for web browsers that don't support RGBa */
background-color: rgb(0, 0, 0);
/* RGBa with 0.6 opacity */
background-color: rgba(0, 0, 0, 0.6);
/* For IE 5.5 - 7*/
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);
/* For IE 8*/
-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000,
endColorstr=#99000000)";
```

## 第六章 居中

### 6.1 flexbox

```html
<style>
html, body, .container {
  height: 100%;
}
.container {
  display: flex;
  justify-content: center; /* horizontal center */
}
img {
  align-self: center; /* vertical center */
}

</style>
<div class="container">
  <img src="http://lorempixel.com/400/200" />
</div>

<style>
html, body {
 height: 100%;
}
body {
 display: flex;
 justify-content: center; /* horizontal center */
 align-items: center; /* vertical center */
}
img {
  align-self: center; /* vertical center */
}

</style>

<img src="http://lorempixel.com/400/200" />
```

浏览器支持：

- 除10之前的IE版本外，所有主要浏览器均支持Flexbox。
- 某些最新的浏览器版本（例如Safari 8和IE10）需要供应商前缀。
- 为了快速生成前缀，可以使用第三方工具[Autoprefixer](https://autoprefixer.github.io/)。
- 对于较旧的浏览器（例如IE 8和9），可以使用[Polyfill]( https://github.com/jonathantneal/flexibility)。并不完美
- 有关Flexbox浏览器支持的更多详细信息，请参见 [http://caniuse.com/#search=flex](http://caniuse.com/#search=flex)。

### 6.2 transform

```html
<style>
.container {
  position: relative;
}
.element {
  position: absolute;
  top: 50%;
  left: 50%;
 -webkit-transform: translate(-50%, -50%); /* Chrome, Safari, Opera, Android */
 -ms-transform: translate(-50%, -50%); /* IE 9 */
 transform: translate(-50%, -50%);
}
/*图像和文字变虚可以使用这个文章解决方案 https://stackoverflow.com/questions/6411361/webkit-based-blurry-distorted-text-post-animation-via-translate3d/32329785#32329785 */
/* transform: translateX(-50%) translateX(.5px) */

</style>

<div class="container">
 <div class="element"></div>
</div>
```

- 在此居中方法中使用非静态宽度/高度元素会导致居中的元素显得压扁。 这主要发生在包含文本的元素上，可以通过添加以下内容来解决：margin-right：-50％; margin-bottom：-50％;。 [查看此处](https://jsfiddle.net/4xxmxca0/)以获取更多信息。

### 6.3 使用 margin: 0 auto;

`margin: 0 auto`使用在有宽高的块级元素上，让其水平居中

```css
<style>
.containerDiv {
 width: 100%;
 height: 100px;
 padding-bottom: 40px;
}
#centeredDiv {
 margin: 0 auto;
 width: 200px;
 height: 100px;
 border: 1px solid #000;
}
#centeredParagraph {
 width: 200px;
 margin: 0 auto;
}
#centeredImage {
 display: block;
 width: 200px;
 margin: 0 auto;
}
</style>

<div class="containerDiv">
 <div id="centeredDiv"></div>
</div>
<div class="containerDiv">
 <p id="centeredParagraph">This is a centered paragraph.</p>
</div>
<div class="containerDiv">
 <img id="centeredImage"
src="https://i.kinja-img.com/gawker-media/image/upload/s--c7Q9b4Eh--/c_scale,fl_progressive,q_80,w_
800/qqyvc3bkpyl3mfhr8all.jpg" />
</div>

```

### 6.4 text-align

文本居中，也可以使 `dispaly:inline-block;`，`dispaly:inline;`的元素居中。

```css
p{
    text-align:center; /* center left right*/
}
```

### 6.5 position: absolute;

ie8 以上都支持

```html
<style>
/* 居中的演示地址 https://codepen.io/shshaw/details/gEiDt */
.parent {
  position: relative;
  height: 500px;
}
.center {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
<div class="parent">
 <img class="center" src="http://lorempixel.com/400/200/" />
</div>
```

### 6.6 calc()

ie9 以上都支持,需要前缀 -webkit-， -moz- 。需要固定的宽高

```html
<style>
.center {
  position: absolute;
  height: 50px;
  width: 50px;
  background: red;
  top: calc(50% - 50px / 2); /* height divided by 2*/
  left: calc(50% - 50px / 2); /* width divided by 2*/
}

</style>

<div class="center"></div>
```

### 6.7line-height

使单行的文本垂直居中，可以使用 vertical-align 来精确修改。

```css
div{
  width: 200px;
  height:200px;
  line-height: 200px;
  text-align: center;
  vertical-align: middle;
}
```

### 6.8 多行文字居中

ie9 以上都支持,需要前缀 -webkit-， -moz- -ms-。需要父元素有固定的高度

```html
<style>
div.vertical {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<div class="vertical">
  Vertical aligned text!<br />
  Vertical aligned text!
</div>
```

### 6.9 相对于另一个项目居中

ie8 以上都支持,container 必须 `display:table;`，details 必须要有宽度并且`display:table-cell;vertical-align: middle;`， thumb 必须有 `width:100%;`宽度受 details的影响占据剩余空间。

```html
<style>
.content * {
  box-sizing: border-box;
}
.content .position-container {
  display: table;
}
.content .details {
  display: table-cell;
  vertical-align: middle;
  width: 33.333333%;
  padding: 30px;
  font-size: 17px;
  text-align: center;
}
.content .thumb {
  width: 100%;
}
.content .thumb img {
  width: 100%;
}
</style>

<div class="content">
  <div class="position-container">
    <div class="thumb">
      <img src="http://lorempixel.com/400/200/">
    </div>
    <div class="details">
      <p class="banner-title">text 1</p>
      <p class="banner-text">content content content content content content content content
        content content content content content content</p>
      <button class="btn">button</button>
    </div>
  </div>
</div>
```

### 6.9 伪元素技巧

ie8 以上都支持,container 必须 `display:table;`，details 必须要有宽度并且`display:table-cell;vertical-align: middle;`， thumb 必须有 `width:100%;`宽度受 details的影响占据剩余空间。

```html
<style>
  /* 此父级可以是任何宽度和高度 */
  .block {
    text-align: center;
    /* 如果容器有可能比内部元素窄，则可能要这样做*/
    white-space: nowrap;
  }

  /* 伪元素 */
  .block:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    /* 幽灵元素和.centered之间存在间隙，这是由渲染的空格字符引起的。 可以通过轻推.centered（轻推距离取决于字体系列），或将.parent中的font-size归零，然后在.centered中将其重置为（可能为1rem）来消除。 */
    margin-right: -0.25em;
  }

  /* 要居中的元素，也可以是任何宽度和高度 */
  .centered {
    display: inline-block;
    vertical-align: middle;
    width: 300px;
    white-space: normal;
    /* 重置继承的 nowrap 行为 */
  }
</style>

<div class="block">
  <div class="centered"></div>
</div>
```

### 6.11 垂直和水平居中，无需担心高度或宽度

- **outer-container** 必须具有 `display:table;`
- **inner-container** 必须具有 `display:table-cell; vertical-align:middle;text-align:center;`
- **content-box** 必须具有 `display:inline-block;`,可以将文本顺序调整为 left，不然将继承 center


```html
<style>
  body {
    margin: 0;
  }

  .outer-container {
    position: absolute;
    display: table;
    width: 100%;  /* 可以是任何宽 */
    height: 100%; /* 可以是任何高 */
    background: #ccc;
  }

  .inner-container {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .centered-content {
    display: inline-block;
    text-align: left;
    background: #fff;
    padding: 100px;
    border: 1px solid #000;
  }
</style>

<div class="outer-container">
  <div class="inner-container">
    <div class="centered-content">
      You can put anything here!
    </div>
  </div>
</div>

```

###  6.12 在div中垂直对齐图像

```html
<style>
  .wrap {
    height: 50px;
    /* max image height */
    width: 100px;
    border: 1px solid blue;
    text-align: center;
  }

  .wrap:before {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    width: 1px;
  }

  img {
    vertical-align: middle;
  }
</style>

<div class="wrap">
  <img src="http://lorempixel.com/400/200/" />
</div>
```

### 6.13 以固定大小居中

```html
/* 也可以单独使用top margin-top，left margin-left 来单独设置垂直和水平的居中 */
<style>
.center {
  position: absolute;
  background: #ccc;
  left: 50%;
  width: 150px;
  margin-left: -75px; /* width * -0.5 */
  top: 50%;
  height: 200px;
  margin-top: -100px; /* height * -0.5 */
}
</style>

<div class="center">
  Center vertically and horizontally
</div>
```

### 6.14 垂直对齐动态高度元素

```html
/* 
   使用辅助元素来解决问题 
   https://stackoverflow.com/questions/12415661/using-marginauto-to-vertically-align-a-div/12417336#12417336 
*/
<style>
  .vcenter--container {
    display: table;
    height: 100%;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  .vcenter--helper {
    display: table-cell;
    vertical-align: middle;
  }

  .vcenter--content {
    margin: 0 auto;
    width: 200px;
  }
</style>

<div class="vcenter--container">
  <div class="vcenter--helper">
    <div class="vcenter--content">
      <!--stuff-->
    </div>
  </div>
</div>

```

### 6.14 使用表格进行水平和垂直居中

```html
/* 也可以单独使用top margin-top，left margin-left 来单独设置垂直和水平的居中 */
<style>
.wrapper {
  display: table;
  vertical-align: center;
  width: 200px;
  height: 200px;
  background-color: #9e9e9e;
}
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  width: 100px;
  height: 100px;
  background-color: teal;
}
</style>

<div class="wrapper">
  <div class="parent">
    <div class="child"></div>
  </div>
</div>

```

## 盒模型

|    参数     |                       释义                       |
| :---------: | :----------------------------------------------: |
| content-box |       Width 和 height 只包含 content area.       |
| padding-box |     Width 和 height 包含 content 和 padding.     |
| border-box  | Width 和 height 包含 content, padding 和 border. |
|   initial   |                 设置到默认的状态                 |
|   inherit   |                    继承父元素                    |

### 7.1 什么是盒模型

![img](./img/box-model.png)

> Edges：边缘，TM：Top margin BP：Bottom padding 。

### 7.2 box-sizing

默认值：content-box，其他值：padding-box,border-box，inherit。

![img](./img/box-sizing.png)

```css
textarea {
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
}
/* 应用到所有元素 */
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

```

## 第 8 章 Margin

|      参数       |                    释义                    |
| :-------------: | :----------------------------------------: |
|        0        |                  无外边距                  |
|      auto       | 自动计算，其他影响值固定则自动占据剩余位置 |
| 单位值，如：1px |               设置数值+单位                |
|     inherit     |                    继承                    |
|     initial     |               重置到初始化值               |

### 8.1 margin 合并

当两个外边距垂直相互接触时，它们将被合并。 水平接触时不会。如两个上下相邻的元素，父元素和第一个子元素的 margin-top，父元素和最后一个子元素的margin-bottom。合并时取最大值。

```html
<!-- div 之间的空间为 10px -->
<style>
div{
  margin:10px;
}
</style>
<div>some content</div>
<div>some more content</div>
<!-- 父子之间 -->
<style>
.outer-top{
  margin: 10px;
}
.inner-top{
  margin: 15px;
}
.outer-bottom{
  margin: 100px;
}
.inner-bottom{
  margin: 25px;
}
</style>
<div class="outer-top">
  <div class="inner-top">
    some content
  </div>
</div>
<div class="outer-bottom">
  <div class="inner-bottom">
    some more content
  </div>
</div>
<!-- 当加入 div{border:1px solid red;} 时，父子之间垂直外边距不再合并，outer 之间的垂直外边距继续合并取最大值 -->
```

### 8.2 在给定边上应用 margin 值

有四个属性，分别对应四条边：`margin-top`，`margin-right`，`margin-bottom`，`margin-left`，简写属性：`margin: <top> <right> <bottom> <left>;`。

### 8.3 简写属性示例

```css
p {
 margin:1px; /* 1px margin in all directions */

 /*equals to:*/

 margin:1px 1px;

 /*equals to:*/

 margin:1px 1px 1px;

 /*equals to:*/

 margin:1px 1px 1px 1px;
}

p{
 margin:10px 15px; /* 10px margin-top & bottom And 15px margin-right & left*/

 /*equals to:*/

 margin:10px 15px 10px 15px;

 /*equals to:*/

 margin:10px 15px 10px;
 /* margin left will be calculated from the margin right value (=15px) */
}

```

### margin 水平居中

```css

#myDiv{
  width: 80%;
  margin: 0 auto;
}
```

### margin 百分比值相对于他的父元素

margin 的百分比值的基础值都是父元素的 width 值。

```css
.parent {
  width : 500px;
  height: 300px;
}
.child {
  width : 100px;
  height: 100px;
  margin-left: 10%; /* (parentWidth * 10/100) => 50px */
  margin-top: 20%; /* (parentWidth * 20/100) => 100px */
}

```

### margin 的负值

负值让元素向相反的方向移动

```css
div{
  display: inline;
}
#over{
  margin-left: -100px;
}

```
```html
<div>Base div</div>
<div id="over">Overlapping div</div>
```

## 第 9 章 内边距 padding

### 9.1 padding 的简写

```html
<style>
 .myDiv {
   padding: 25px 50px 75px 100px; /* top right bottom left; */
 }
</style>
<div class="myDiv"></div>

<style>
 .myDiv {
   padding: 25px 50px 75px; /* top left/right bottom */
 }
</style>
<div class="myDiv"></div>

<style>
 .myDiv {
   padding: 25px 50px; /* top/bottom left/right */
 }
</style>
<div class="myDiv"></div>

<style>
 .myDiv {
   padding: 25px;  /* top/right/bottom/left */
 }
</style>
<div class="myDiv"></div>
```

### 单独设置一条边的 padding

```html
<!-- padding-top padding-right padding-bottom padding-left -->

<style>
.myClass {
  padding-top: 5px;
}
</style>
<div class="myClass"></div>
```

## 第 10 章 边框 border

### 10.1 border-radius

border-radius 属性改变元素边框为圆角。元素的每个角最多可以有两个值，即该角的垂直和水平半径（最多8个值）

![img](./img/border-radius.png)

`border-radius: 10px 5% / 100px 25em 30px 35em;` 第一组值定义水平半径，可选的第二组值(以 / 开头)定义了垂直半径。如果仅仅提供一组值，则将其应用于水平和垂直半径。

10px是 top-left 和 bottom-right 的水平半径。 5％是 top-right 和 bottom-left 的水平半径。 '/'之后的其他四个值是top-left，top-right，bottom-right 和 bottom-left 的垂直半径。

`border-radius: 50%;` 元素从矩形变为圆形，但所占空间认为矩形

```css
/* 单独设置 */
 -webkit-border-top-right-radius: 4px;
 -webkit-border-bottom-right-radius: 4px;
 -webkit-border-bottom-left-radius: 0;
 -webkit-border-top-left-radius: 0;
 -moz-border-radius-topright: 4px;
 -moz-border-radius-bottomright: 4px;
 -moz-border-radius-bottomleft: 0;
 -moz-border-radius-topleft: 0;
 border-top-right-radius: 4px;
 border-bottom-right-radius: 4px;
 border-bottom-left-radius: 0;
 border-top-left-radius: 0;
```

### 10.2 border-style

border-style属性设置元素边框的样式。 此属性可以有一到四个值（对于元素的每一侧都有一个值。）

<div>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:solid;">solid</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:dotted;">dotted</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:dashed;">dashed</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:double;">double</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:groove;">groove</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:ridge;">ridge</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:inset;">inset</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:100px;height:100px;border-style:outset;">outset</span>
</div> 

border-style也可以使用值none和hidden，它们具有相同的效果。在具有多个边框的`<table>`中，none优先级最低（边框会显示出来），而 hidden 的优先级最高（在冲突中，边框不会显示）。

### 10.3 多个边框

**outline**

```css
.div1{
  border: 3px solid black;
  outline: 6px solid blue;
  width: 100px;
  height: 100px;
  margin: 20px;
}
```

**box-shadow**

```css
.div2{
  border: 5px solid green;
  box-shadow: 0px 0px 0px 4px #000;
  width: 100px;
  height: 100px;
  margin: 20px;
}
```

**pseudo element 伪元素**

```css
.div3 {
  position: relative;
  border: 5px solid #000;
  width: 100px;
  height: 100px;
  margin: 20px;
}
.div3:before {
  content: " ";
  position: absolute;
  border: 5px solid blue;
  z-index: -1;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
}
```

<div style="height:120px;">
  <span style="float:left;display:inline-block;border: 3px solid black;outline: 6px solid blue;width: 100px;height: 100px;margin: 20px;"></span>
  <span style="float:left;display:inline-block;border: 5px solid green;box-shadow: 0px 0px 0px 4px #000;width: 100px;height: 100px;margin: 20px;"></span>
  <img style="float:left;display:inline-block;width:168px;margin:0;" src="img/CSS 笔记/border-pseudo.png" />
</div>



### 10.4 border 简写

```css
div{
  border-width: 1px;
  border-style: solid;
  border-color: #000;
  border-top-width:2px;
}
.div1{
  border: 1px solid #000;
}
.div2{
  border-top: 2px double #aaaaaa;
}
```

### 10.5 border-collapse

border-collapse属性仅适用于 table（以及显示为display：table或inlinetable的元素），设置边框是否折叠。

- collapse 边框会合并为一个单一的边框。忽略 border-spacing 和 empty-cells 属性
- separate 默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性
- inherit 规定应该从父元素继承 border-collapse 属性的值

```css
table {
 border-collapse: separate; /* default */
 border-spacing: 2px; /* 仅在边框不折叠的情况下有效 */
}
```

### 10.6 border-image

使用border-image属性，您可以设置要使用的图像，而不是普通的边框样式。ie11+

border-image 主要由以下几个部分组成: 

`border-image: source slice width outset repeat|initial|inherit;`

- border-image-source 图片路径
- border-image-slice 指定用于将图像分为九个区域（四个角，四个边缘和一个中间）的偏移量
- border-image-width	图像边界的宽度
- border-image-outset	用于指定在边框外部绘制 border-image-area 的量
- border-image-repeat 指定如何缩放边框图像的侧面和中间的图像

```css
#borderimg { 
    -webkit-border-image: url(border.png) 30 round; /* Safari3.1-5,Chrome4.0-16.0 */
    -o-border-image: url(border.png) 30 round; /* Opera 11-12.1 */
    -moz-border-image: url(border.png) 30 round;  /*15.0-3.5 Firfox*/
    border-image: url(border.png) 30 round;
}
```

### 10.7 border-image 创建多色边框

```html
<style>
.bordered {
    width:200px;
    height:100px;
  border-image: linear-gradient(to right, red 20%, green 20%, green 40%, blue 40%, blue 60%, maroon 60%, maroon 80%, chocolate 80%);
  border-image-slice: 1;
  border-style: solid;
</style>

<div class='bordered'>Border on all sides</div>
```

![img](img/CSS 笔记/border-image-colors.png)

从左到右渐变，边框的左边是开始颜色，右边是结束的颜色。从上到下渐变的话，上边是开始颜色，下边是结束颜色。可以使用`border-width:5px 0 0 0 `来之歌一个边应用渐变颜色。

**注意：** 任何具有 border-image 属性的元素不支持 border-radius 属性。

### 10.8 border-[left|right|top|bottom]

border- [left | right | top | bottom]属性用于在元素的特定边添加边框。

例如： `border-left: 1px solid red;`

## 第 11 章 Outlines

| outline-style 参数 | 解释                                                |
| ------------------ | --------------------------------------------------- |
| dotted             | 定义点状的轮廓。                                    |
| dashed             | 定义虚线轮廓。                                      |
| solid              | 定义实线轮廓。                                      |
| double             | 定义双线轮廓。双线的宽度等同于 outline-width 的值。 |
| groove             | 定义 3D 凹槽轮廓。此效果取决于 outline-color 值。   |
| ridge              | 定义 3D 凸槽轮廓。此效果取决于 outline-color 值。   |
| inset              | 定义 3D 凹边轮廓。此效果取决于 outline-color 值。   |
| outset             | 定义 3D 凸边轮廓。此效果取决于 outline-color 值。   |
| none               | 默认。定义无轮廓。                                  |
| hidden             | hidden outline                                      |
| inherit            | 规定应该从父元素继承轮廓样式的设置。                |

轮廓线是在边框外的线，不占元素空间，不会影响元素本身和其他元素的位置。常用检查元素。

### 11.1 属性使用

**示例：** `outline: 1px solid red;`， `outline-width:1px;outline-color:red;outline-style:solid;`

### 11.2 outline-style

<div>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:dotted;margin:10px;">dotted outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:dashed;margin:10px;">dashed outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:solid;margin:10px;">solid outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:double;margin:10px;">double outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:groove;margin:10px;">groove outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:ridge;margin:10px;">ridge outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:inset;margin:10px;">inset outline</span>
  <span style="display:inline-block;line-height:100px;text-align:center;width:150px;height:100px;outline-style:outset;margin:10px;">outset outline</span>
</div> 

## 第 12 章 overflow

|   值    |                           说明                           |
| :-----: | :------------------------------------------------------: |
| visible |       默认值。内容不会被修剪，会呈现在元素框之外。       |
| hidden  |          内容会被修剪，并且其余内容是不可见的。          |
| scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
|  auto   | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |
| inherit |         规定应该从父元素继承 overflow 属性的值。         |

### 12.1 overflow-wrap

[overflow-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-wrap) 通知浏览器可以将一行文本折成多行。帮助避免长文本溢出容器导致布局出现问题。常用属性还有[ word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 和[hyphens](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hyphens)

|     值     |                                             说明                                             |
| :--------: | :------------------------------------------------------------------------------------------: |
|   normal   |              默认值。行只能在正常的单词断点处中断。（例如两个单词之间的空格）。              |
| break-word | 内表示如果行内没有多余的地方容纳该单词到结尾，则那些正常的不能被分割的单词会被强制分割换行。 |
|  inherit   |                   内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。                   |

```html
<style>
  div {
    width: 100px;
    outline: 1px dashed #bbb;
  }

  #div1 {
    overflow-wrap: normal;
  }

  #div2 {
    overflow-wrap: break-word;
  }
</style>

<div id="div1">
  <strong>#div1</strong>: Small words are displayed normally, but a long word like <span style="red;">supercalifragilisticexpialidocious</span> is too long so it will overflow past the
  edge of the line-break
</div>
<div id="div2">
  <strong>#div2</strong>: Small words are displayed normally, but a long word like <span style="red;">supercalifragilisticexpialidocious</span> will be split at the line break and continue
  on the next line.
</div>
```

### 12.2 overflow-x 和 overflow-y

这两个属性的工作方式与溢出属性类似，并且接受相同的值。 overflow-x 仅在x轴有效。 overflow-y 在y轴工作。

```html
<style>
  div {
    width: 200px;
    height: 200px;
  }

  #div-x {
    overflow-x: hidden;
  }

  #div-y {
    overflow-y: hidden;
  }
</style>
<div id="div-x">
  If this div is too small to display its contents,
  the content to the left and right will be clipped.
</div>
<div id="div-y">
  If this div is too small to display its contents,
  the content to the top and bottom will be clipped.
</div>
```

### 12.3 overflow:auto;

大部分 PC 浏览器都会显示水平和垂直滚动条，无论是否有超出内容，避免了滚动条的显示消失导致的闪烁。打印机可以打印超出内容。

```html
<div style="width: 100px;height: 100px; overflow: auto;">This div is too small to display its contents to display the effects of the overflow property.</div>
```

### 12.4 overflow:visible;

显示超出部分

```html
<div style="width:50px;height:50px;overflow:visible;">
 Even if this div is too small to display its contents, the content is not clipped.
</div>
```

### 12.5 使用 overflow:hidden; 创建块级格式化上下文

使用后文字不再环绕图片

```html
<style>
  img {
    float: left;
    margin-right: 10px;
  }

  div {
    /* creates block formatting context */
    overflow: hidden;
  }
</style>
<img src="http://placehold.it/100x100">
<div>
  <p>Lorem ipsum dolor sit amet, cum no paulo mollis pertinacia.</p>
  <p>Ad case omnis nam, mutat deseruisse persequeris eos ad, in tollit debitis sea.</p>
</div>
```

## 第 13 章 媒体查询

|     参数      |                          释义                           |
| :-----------: | :-----------------------------------------------------: |
|   mediatype   | （可选）这是媒体的类型。 可能是所有屏幕范围内的任何东西 |
|      not      |           （可选）不将CSS应用于此特定媒体类型           |
| media feature |                        媒体特征                         |

**媒体特征**

| media feature |                                          释义                                           |
| :-----------: | :-------------------------------------------------------------------------------------: |
| aspect-ratio  |                      定义输出设备中的页面可见区域宽度与高度的比率                       |
|     color     |              定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0              |
|  color-index  |         定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0         |
|     grid      |                          用来查询输出设备是否使用栅格或点阵。                           |
|    height     |                           定义输出设备中的页面可见区域高度。                            |
|   max-width   |                         定义输出设备中的页面最大可见区域宽度。                          |
|   min-width   |                         定义输出设备中的页面最小可见区域宽度。                          |
|  max-height   |                         定义输出设备中的页面最大可见区域高度。                          |
|  min-height   |                         定义输出设备中的页面最小可见区域高度。                          |
|  monochrome   |     定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0     |
|  orientation  | 仅当设备使用指定方向时才会显示CSS，定义输出设备中的页面可见区域高度是否大于或等于宽度。 |
|  resolution   |                      定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                       |
|     scan      |                               定义电视类设备的扫描工序。                                |
|     width     |                           定义输出设备中的页面可见区域宽度。                            |

**不推荐使用的特征：**

|    media feature    |                                      释义                                      |
| :-----------------: | :----------------------------------------------------------------------------: |
| device-aspect-ratio |          不推荐使用的CSS仅在高度/宽度比率与指定比率匹配的设备上显示。          |
|  max-device-width   |      已弃用与max-width相同，但测量物理屏幕宽度，而不是显示浏览器的宽度。       |
|  min-device-width   |      已弃用与min-width相同，但测量物理屏幕宽度，而不是显示浏览器的宽度。       |
|  max-device-height  |    已弃用与max-height相同，但测量的是物理屏幕高度，而不是显示浏览器的高度。    |
|  min-device-height  | 不建议使用。与min-height相同，但测量的是物理屏幕高度，而不是显示浏览器的高度。 |

### 13.1 关键字和语法

媒体查询允许人们根据称为媒体类型的设备/媒体（例如屏幕，打印或手持设备）的类型来应用CSS规则，并通过媒体特征（例如颜色或视口尺寸的可用性）描述设备的其他方面。

```css
/* 常用的语法 */
@media [...]{
   /* 单个或者多个 CSS 语法规则被应用，当查询条件满足时。 */ 
}
/* 查询媒体类型 */
@media print{}
/* 查询媒体类型和媒体特征 */
@media screen and (max-width: 600px){}
/* 查询媒体特征和隐含的媒体类型为 all 的查询 */
@media (orientation: protrait){}
```

[菜鸟教程](https://www.runoob.com/cssref/css3-pr-mediaquery.html)、[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)

### 13.2 基础示例

```css
@media screen and (min-width:720;){
  body{
    background-color: skyblue;
  }
}
```

### 13.2 媒体类型

```css
@media print {
  html{
    background-color: white;
  }
}
@media not print {
  html{
    background-color: green;
  }
}
@media only screen {
  .fadeInEffects{
    display: block;
  }
}
```
|     值     |                                 释义                                  |
| :--------: | :-------------------------------------------------------------------: |
|    all     |                           应用到所有的设备                            |
|   screen   |                 用于电脑屏幕，平板电脑，智能手机等。                  |
|   print    |                         用于打印机和打印预览                          |
|  handheld  |          已废弃。 用于掌上设备或更小的装置，如PDA和小型电话           |
| projection |                         已废弃。 用于投影设备                         |
|   aural    |                     已废弃。用于语音和声音合成器                      |
|  braille   |                   已废弃。 应用于盲文触摸式反馈设备                   |
|  embossed  |                    已废弃。 用于打印的盲人印刷设备                    |
|     tv     |                      已废弃。 用于电视和网络电视                      |
|    tty     | 已废弃。 用于固定的字符网格，如电报、终端设备和对字符有限制的便携设备 |
|   speech   |                      应用于屏幕阅读器等发声设备                       |

### 13.4 多个条件联合

```css
/* ----------- Non-Retina Screens ----------- */
@media screen
 and (min-width: 1200px)
 and (max-width: 1600px)
 and (-webkit-min-device-pixel-ratio: 1) {
}
/* ----------- Retina Screens ----------- */
@media screen
 and (min-width: 1200px)
 and (max-width: 1600px)
 and (-webkit-min-device-pixel-ratio: 2)
 and (min-resolution: 192dpi) {
}
```
显示屏中有两种像素。 一个是逻辑像素，另一个是物理像素。 通常，物理像素始终保持不变，因为所有显示设备的物理像素都相同。 逻辑像素根据设备的分辨率而变化，以显示更高质量的像素。 器件像素比率是物理像素和逻辑像素之间的比率。

### 宽度和视口

当我们在媒体查询中使用“宽度”时，正确设置meta标签非常重要。 基本的元标记看起来像这个，它需要放在<head>标记内。
`<meta name="viewport" content="width=device-width,initial-scale=1">`

### 13.6 使用媒体查询适应不同的屏幕大小

```css
@media only screen and (min-width: 300px) and (max-width: 767px) {
  .site-title {
    font-size: 80%;
  }
 /* screen 300px < width < 767px */
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .site-title {
    font-size: 90%;
  }
 /* screen 768px < width < 1023px */
}
@media only screen and (min-width: 1024px) {
  .site-title {
    font-size: 120%;
  }
/* screen 1024px < width */
}
```

### 在 link 标签上使用

`<link rel="stylesheet" media="min-width: 600px" href="example.css" />` 这个样式表仍然会下载，但只应用大于600px的屏幕上

### IE 中的应用

媒体查询不支持 IE 8 及之前的浏览器。但可以增加js来支持

```html
<!--[if lt IE 9]>
<script
  src="respond.min.js">
</script>
<![endif]-->
<!-- 或者 -->
<!--[if lt IE 9]>
<script
  src="css3-mediaqueries.js">
</script>
<![endif]-->
<!-- 对 IE9 以下的应用新的样式 -->
<!--[if lt IE 9]>
<link rel="stylesheet" type="text/css" media="all" href="style-ielt9.css"/>
<![endif]-->
```

[http://browserhacks.com/](http://browserhacks.com/)

## 第 14 章 Floats

### 14.1 文字环绕图片

```html
![float-01](C:/Users/zongjiang.ge/Desktop/float-01.png)<style>
  img {
    float:left;
    margin-right:1rem;
    width: 100px;
  }
</style>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
arcu eget nulla. </p>
<img src="./cat.jpg" />
<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque
nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin
ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
massa. Fusce ac turpis quis ligula lacinia aliquet. </p>
```

![float-01](img/CSS 笔记/float-01.png)

### 14.2 clear

clear 属性与 float 属性相关，主要用来清除浮动带来的影响。

| 值      | 描述                                  |
| :------ | :------------------------------------ |
| left    | 在左侧不允许浮动元素。                |
| right   | 在右侧不允许浮动元素。                |
| both    | 在左右两侧均不允许浮动元素。          |
| none    | 默认值。允许浮动元素出现在两侧。      |
| inherit | 规定应该从父元素继承 clear 属性的值。 |

图片浮动在左侧，并且清除左侧浮动的话，元素会在浮动元素下边开始展示。

### 14.3 Clearfix

clearfix 是一种清除浮动带来影响的方式，还可以清除上下外边距的折叠。

```css
/* 内容的空格是为了兼容 Opera 的bug。table 是为了阻止父子外边距的折叠 */
.cf:before,
.cf:after {
  content: " ";
  display: table;
}
.cf:after {
  clear: both;
}
/**
 * For IE 6/7 only
 * Include this rule to trigger hasLayout and contain floats.
 */
.cf {
  *zoom: 1;
}

```

### 14.4 In-line div 

块级元素浮动后会像行内块一样排列，不糊再独占一行。

```html
<style>
  .inner-div1 {
    width: 50%;
    margin-right: 0px;
    float: left;
    background: #337ab7;
    padding: 50px 0px;
  }

  .inner-div2 {
    width: 50%;
    margin-right: 0px;
    float: left;
    background: #dd2c00;
    padding: 50px 0px;
  }

  p {
    text-align: center;
  }
</style>

<div class="outer-div">
  <div class="inner-div1">
    <p>This is DIV 1</p>
  </div>
  <div class="inner-div2">
    <p>This is DIV 2</p>
  </div>
</div>

```

### 14.5 使用 overflow 属性去清除浮动

将 overflow 设置为 hidden,auto,scroll 之一会清除浮动。设置为scroll 会显示滚动条。

### 14.6 简单的两个固定宽度的列布局

一个简单的两列布局由两个固定宽度的浮动元素组成。 请注意，侧边栏和内容区域在此示例中高度不相同。 这是使用浮动的多列布局的棘手部分之一，并且需要变通办法以使多个列看起来是相同的高度。

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简单的两列固定布局</title>
    <style>
      .wrapper {
        width: 600px;
        padding: 20px;
        background-color: pink;
        /* Floated elements don't use any height. Adding 
        "overflow:hidden;" forces theparent element to expand
         to contain its floated children. */
        overflow: hidden;
      }

      .sidebar {
        width: 150px;
        height:100%;
        float: left;
        background-color: blue;
      }

      .content {
        width: 450px;
        float: right;
        background-color: yellow;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="sidebar">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
      </div>
      <div class="content">
        <h1>Content</h1>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque
          nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin
          ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
          massa. Fusce ac turpis quis ligula lacinia aliquet. </p>
      </div>
    </div>
  </body>

</html>
```

### 14.7 简单的三栏固定宽度布局

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简答的固定布局</title>
    <style>
      .wrapper {
        width: 600px;
        background-color: pink;
        padding: 20px;
        overflow: hidden;
      }

      .left-sidebar {
        width: 150px;
        background-color: blue;
        float: left;
      }

      .content {
        width: 300px;
        background-color: yellow;
        float: left;
      }

      .right-sidebar {
        width: 150px;
        background-color: green;
        float: right;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="left-sidebar">
        <h1>Left Sidebar</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      </div>
      <div class="content">
        <h1>Content</h1>
        <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque
          nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin
          ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
          massa. </p>
      </div>
      <div class="right-sidebar">
        <h1>Right Sidebar</h1>
        <p>Fusce ac turpis quis ligula lacinia aliquet.</p>
      </div>
    </div>

  </body>

</html>
```

### 14.8 两列懒/贪心布局

此布局使用一个浮动列创建没有定义宽度的两列布局。 在这个例子中，左边边栏是“懒惰的”，因为它只占用所需的空间。 另一种说法是，左侧边栏是“shrink-wrapped.” 右侧的内容列为“贪婪”，因为它占据了所有剩余空间。

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
      .sidebar {
        /* `display:table;` shrink-wraps the column */
        display: table;
        float: left;
        background-color: blue;
      }

      .content {
        /* `overflow:hidden;` prevents `.content` from flowing under `.sidebar` */
        overflow: hidden;
        background-color: yellow;
      }
    </style>
  </head>

  <body>
    <div class="sidebar">
      <h1>Sidebar</h1>
      <img src="./cat.jpg" />
    </div>
    <div class="content">
      <h1>Content</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed
        cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
        ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
        arcu eget nulla. </p>
      <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque
        nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin
        ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
        massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper
        vel, tincidunt sed, euismod in, nibh. </p>
    </div>

  </body>

</html>
```

## 文本排版

|    Parameter    |                          Details                          |
| :-------------: | :-------------------------------------------------------: |
|   font-style    |              斜体或者倾斜，italics、oblique               |
|  font-variant   |         小型大写字母         normal or small-caps         |
|   font-weight   |     字体粗细 normal, bold or numeric from 100 to 900.     |
|    font-size    |     字体大小可以使用 %, px, em, 或者其他css允许的单位     |
|   line-height   |     行高单位可以使用 %, px, em, 或者其他css允许的单位     |
|   font-family   |                     使用定义好的字体                      |
|      color      |  字体颜色，例如： red, #00FF00, hsl(240, 100%, 50%) etc.  |
|   text-align    |  start, end, left, right, center, justify, match-parent   |
| text-decoration | none, underline, overline, line-through, initial, inherit |
|  font-stretch   |    font-Stretch属性允许你使文字变宽或变窄,具体查看mdn     |

### 15.1 font 简写属性

```txt
selector{
  font:[font-style] [font-variant] [font-weight] [font-size/line-height] [font-family];
}
```
**例子：**
```css
p{
  font-weigth:bold;
  font-size:20px;
  font-familu: Arial,sans-serif;
}
/* 等价于 */
p{
  font: bold 20px Arial,sans-serif;
}
/* 简写属性必须包含 font-size 和 font-family 不然会被忽略，
可以省略 font-style, font-variant, font-weight 默认值都是 normal*/
```

### 15.2 quotes 属性

quotes 属性用于自定义 <q> 标签的开始和结束引号。`q{quotes:"<<" ">>";}`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<style type="text/css">
q:lang(en)
{
quotes: "~" "~" "'" "'";
}
</style>
</head>
<body>
<!-- ~This is a 'big' quote.~ -->
<p><q>This is a <q>big</q> quote.</q></p>
<p><b>注意:</b>当声明了!DOCTYPE 时， IE8 才支持这些属性。</p>
</body>
</html>
```

### font-size 

设置字体大小

```html
<style>
#element-one {
  font-size: 30px;
}
#element-two {
  font-size: 10px;
}
</style>
<div id="element-one">Hello I am some text.</div>
<div id="element-two">Hello I am some smaller text.</div>
```

### 文本方向

书写模式属性会更改文本的对齐方式，以便可以从上到下或从左到右读取文本，取决于语言。

- `direction: ltr;` 默认值，从左到右
- `direction: rtl;` 从右到左
- `writing-mode: horizontal-tb` 从右到左
- `writing-mode: vertical-lr` 从左到右从上到下
- `writing-mode: vertical-rl` 从右到左从上到下

### font-family

```css
/* 浏览器从左到右尝试，如果不能应用则使用下一个，并在必要是使用用户计算机上的任何等宽字体 */
font-family: 'Segoe UI', Tahoma, sans-serif;
/* 多个单词，即有空格的字体名都需要引号 */
font-family: Consolas, 'Courier New', monospace;
```

### text-overflow

溢出内容的裁剪方式

```css
text {
 overflow: hidden;
 text-overflow: ellipsis;
}
/* 多行 */
.giveMeEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: N; /* number of lines to show */
  line-height: X; /* fallback */
  max-height: X*N; /* fallback */
}

```

### 15.7 text-shadow

```css
/* 蓝色阴影向下2px 向右1px 相对于字体现在位置 */
h1 {
  text-shadow: 1px 2px blue;
}
/* 增加模糊半径 10px 越大越淡*/
h1 {
  text-shadow: 2px 2px 10px #0000FF;
}
/* 多个阴影，颜色会有一点叠加，下边叠加后呈现洋红色 */
h1 {
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
}
```

### 15.8 text-transform

文本的大小写和驼峰等的转换

```css
/* all letters 转换为 */
.example1 {
  text-transform: uppercase; /* ALL LETTERS */
}
.example2 {
  text-transform: capitalize;/* All Letters */
}
.example3 {
  text-transform: lowercase;/* all letters */
}

```

### 15.9 letter-spacing

```css
h1{
  /* 在每个字符之间增加1px的间距 */
  letter-spacing: 1px;
}
/* 支持负值,更紧凑 */
h1 {
  letter-spacing: -1px;
}

```

### text-indent

text-indent 属性指定在元素的文本内容的第一行的开头之前应移动多少水平空间文本。

```css
/* 支持负值，负值一般用在搜索引擎优化上 */
p {
  text-indent: 50px;
}
```

### 15.11 text-decoration

text-decoration属性用于设置文本装饰

```css
/* 默认 黑色 solid */
h1 { text-decoration: none; }/* 无 */
h2 { text-decoration: overline; }/* 上划线 */
h3 { text-decoration: line-through; }/* 中划线 */
h4 { text-decoration: underline; } /* 下划线 */

.title{
  text-decoration:undeline solid red;/* 红色的下划线 */
}
```

### 15.12 单词间隔

- normal 默认值，正常间隔。
- px、em、vh、cm、% 等css单位
- inherit 继承父标签

```html
<style>
.normal { word-spacing: normal; }
.narrow { word-spacing: -3px; }
.extensive { word-spacing: 10px; }
</style>

<p>
 <span class="normal">This is an example, showing the effect of "word-spacing".</span><br>
 <span class="narrow">This is an example, showing the effect of "word-spacing".</span><br>
 <span class="extensive">This is an example, showing the effect of "word-spacing".</span><br>
</p>
```

### font-variant

```css
/* 将小写字母转换为大写字母，并缩小字号。其他值 normal inherit */
h1{
  font-variant: small-caps; 
}
```

## 第 16 章 弹性盒子布局（Flexbox）

flex 布局支持 ie10+ 。弹性盒模型，简称‘Flexbox’，是一种为用户界面设计的盒模型。它允许用户在容器中的不同项目之间对齐和分配空间，以便于当页面布局必须适应不同的屏幕尺寸时，元素的行为是可预测的。Flex容器可扩展项目填充可用空间，或者缩小项目与防止溢出。容器是指应用 display:flex; 的元素，项目指它的子元素。

### 16.1 动态垂直和水平居中(align-items, justify-content)

```html
  <style>
    html,body{
      width: 100%;
      height: 100%;
      margin: 0;
    }
    .aligner{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      height: 100%;
    }
    .aligner-item{
      max-width: 50%;
      width: 100px;
      height: 100px;
      background-color: aqua;
    }
  </style>
  <div class="aligner">
    <div class="aligner-item"></div>
  </div>

```

![](./img/CSS 笔记/flex.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

**容器上的属性**

|      属性       |                           说明                           |
| :-------------: | :------------------------------------------------------: |
| flex-direction  |                         主轴方向                         |
|    flex-wrap    |                         如何换行                         |
|    flex-flow    |             flex-direction和flex-wrap的简写              |
| justify-content |                  项目在主轴上的对齐方式                  |
|   align-items   |                 项目在交叉轴上的对齐方式                 |
|  align-content  | 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用 |

**flex-direction**

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

**flex-wrap**

- nowrap（默认值）：不换行
- wrap：换行，第一行在上方
- wrap-reverse：换行，第一行在下方

**flex-flow**

`flex-flow:<flex-direction> <flex-wrap>`，默认值 row nowrap

**justify-content**

和主轴的方向相关，假设主轴默认从左到右的话。

- flex-start：对齐
- flex-end：右对齐
- center：水平居中
- space-between：两端对齐，项目之间间隔相等
- space-around：每个项目两侧的间隔相等，项目之间间隔比项目与容器之间的间隔大一倍

**align-items**

和交叉轴的方向有关，假设交叉轴从上到下

- flex-start：顶部对齐
- flex-end：底部对齐
- center：垂直居中
- baseline：项目的第一行文字的基线对齐
- strech（默认值）：如果项目未设置高度或者为auto，将占满整个容器的高度

**align-content**

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。

- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- strech（默认值）：轴线占满整个交叉轴。

**项目的属性**

|    属性     |                                                                       说明                                                                        |
| :---------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
|    order    |                                                  项目的排列顺序。数值越小，排列越靠前，默认为0。                                                  |
|  flex-grow  |                                              项目的放大比例，默认为0，即如果存在剩余空间，也不放大。                                              |
| flex-shrink |                                              项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。                                              |
| flex-basis  |       在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。       |
|    flex     |                                  flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。                                   |
| align-self  | 允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 |

 align-self: auto | flex-start | flex-end | center | baseline | stretch; 除auto继承外其他的属性和align-items 相同，如果没有高度，则填充父元素高度。

<div style="width:100%;height:100px;background:#eee;display:flex;flex-direction:row; justify-content:center;">
      <div style="width:100px;height:100px;background:green;"></div>
      <div style="width:100px;height:100px;margin-left:20px;background:green;"></div>
      <div style="width:100px;height:100px;margin-left:20px;background:green;"></div>
</div>

<div style="width:100%;height:340px;background:#eee;display:flex;flex-direction:column; justify-content:center;">
      <div style="width:100px;height:100px;background:green;"></div>
      <div style="width:100px;height:100px;margin-top:20px;background:green;"></div>
      <div style="width:100px;height:100px;margin-top:20px;background:green;"></div>
</div>

<div style="width:100%;height:300px;background:#eee;display:flex;flex-direction:row; justify-content:center;align-items:center">
      <div style="width:100px;height:100px;background:green;"></div>
      <div style="width:100px;height:100px;margin-left:20px;background:green;"></div>
      <div style="width:100px;height:100px;margin-left:20px;background:green;"></div>
</div>

### 16.2 粘性可变高度页脚

content 的高度随body的高度变动。

```html
<style>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  body {
    display: flex;
    flex-direction: column;
  }

  .content {
    /* Include `0 auto` for best browser compatibility. */
    flex: 1 0 auto;
  }

  .header,
  .footer {
    background-color: grey;
    color: white;
    flex: none;
  }
</style>

<header class="header">
  <h2>Header</h2>
</header>
<div class="content">
  <h1>Content</h1>
</div>
<footer class="footer">
  <h4>Footer</h4>
</footer>
```

### 16.3 根据容器宽度自适应

```html
<style>
  .flex-container {
    background-color: #000;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;
  }
  .flex-item {
    background-color: #ccf;
    margin: 0.1em;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 150px;
    /* or % could be used to ensure a specific layout ％ 可用于确保特定的布局 */
  }
</style>
    
<p>Resize preview window to see what this is doing.</p>
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
  <div class="flex-item">4</div>
  <div class="flex-item">5</div>
</div>
```

### 16.4  Holy Grail Layout (圣杯布局) 使用 flex

Holy Grail布局是具有固定高度的页眉和页脚以及中心带有3列的布局。 这3列包括一个固定宽度的侧边导航栏，一个动态的中间内容区和一个用于其他内容（例如广告）的列（动态的中间内容区在html中首先出现）

```html
<style>
  body {
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .header {
    flex: 0 0 50px;
    background-color: bisque;
  }

  .content-body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    background-color: #eee;
  }

  .content-body .content {
    flex: 1 1 auto;
    overflow: auto;
    background-color: aquamarine;
  }

  .content-body .sidenav {
    order: -1;
    flex: 0 0 100px;
    overflow: auto;
    background-color: beige;
  }

  .content-body .ads {
    flex: 0 0 100px;
    overflow: auto;
    background-color: #bfa;
  }

  .footer {
    flex: 0 0 50px;
    background-color: bisque;
  }
</style>

<div class="container">
  <header class="header">Header</header>
  <div class="content-body">
    <main class="content">Content</main>
    <nav class="sidenav">Nav</nav>
    <aside class="ads">Ads</aside>
  </div>
  <footer class="footer">Footer</footer>
</div>
```

### 16.5  使卡片的的 button 对齐在底部

```html
<style>
  body {
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .header {
    flex: 0 0 50px;
  }

  .content-body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
  }

  .content-body .content {
    flex: 1 1 auto;
    overflow: auto;
  }

  .content-body .sidenav {
    order: -1;
    flex: 0 0 100px;
    overflow: auto;
  }

  .content-body .ads {
    flex: 0 0 100px;
    overflow: auto;
  }

  .footer {
    flex: 0 0 50px;
  }

  .cards {
    display: flex;
  }

  .card {
    border: 1px solid #ccc;
    margin: 10px 10px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
  }

  button {
    height: 40px;
    background: #fff;
    padding: 0 40px;
    border: 1px solid #000;
  }

  p:last-child {
    text-align: center;
    margin-top: auto;
  }
</style>

<div class="cards">
  <div class="card">
    <p>Lorem ipsum Magna proident ex anim dolor ullamco pariatur reprehenderit culpa esse enim
      mollit labore dolore voluptate ullamco et ut sed qui minim.</p>
    <p><button>Action</button></p>
  </div>
  <div class="card">
    <p>Lorem ipsum Magna proident ex anim dolor ullamco pariatur reprehenderit culpa esse enim
      mollit labore dolore voluptate ullamco et ut sed qui minim.</p>
    <p>Lorem ipsum Magna proident ex anim dolor ullamco pariatur reprehenderit culpa esse enim
      mollit labore dolore voluptate ullamco et ut sed qui minim.</p>
    <p>Lorem ipsum Magna proident ex anim dolor ullamco pariatur reprehenderit culpa esse enim
      mollit labore dolore voluptate ullamco et ut sed qui minim.</p>
    <p>Lorem ipsum Magna proident ex anim dolor ullamco pariatur reprehenderit culpa esse enim
      mollit labore dolore voluptate ullamco et ut sed qui minim.</p>
    <p><button>Action</button></p>
  </div>
</div>
```

### 16.6 容器内两列高度相同

```html
<style>
  .container {
    display: flex;
    align-items: stretch;
  }
</style>

<div class="container">
  <div style="background-color: red">
    Some <br />
    data <br />
    to make<br />
    GoalKicker.com – CSS Notes for Professionals 108
    a height <br />
  </div>
  <div style="background-color: blue">
    Fewer <br />
    lines <br />
  </div>
</div>
```

## 第 17 章 选择器的优先级（权重）

*、>、~ 没有权重。在样式表中的权重分三个等级，id为最高级，class为第二级，标签选择器为最后一级。最大的优先级是 !important,其次是内联样式，最后是样式表中的权重。当优先级一样时后声明的权重大。

```css
#foo #baz {}   /* a=2, b=0, c=0 */
#foo.bar {}    /* a=1, b=1, c=0 */
#foo {}        /* a=1, b=0, c=0 */
.bar:hover {}  /* a=0, b=2, c=0 */
div.bar {}     /* a=0, b=1, c=1 */
:hover {}      /* a=0, b=1, c=0 */
[title] {}     /* a=0, b=1, c=0 */
.bar {}        /* a=0, b=1, c=0 */
div ul + li {} /* a=0, b=0, c=3 */
p::after {}    /* a=0, b=0, c=2 */
*::before {}   /* a=0, b=0, c=1 */
::before {}    /* a=0, b=0, c=1 */
div {}         /* a=0, b=0, c=1 */
* {}           /* a=0, b=0, c=0 */
```

**1000、100、10、1 这种并不严谨，需要具体测浏览器去测试。标准并没有说怎么实现各个级别的进制关系**

## 第 18 章 颜色

###  18.1 currentColor

```css
div{
    color: red;
    border: 5px solid currentColor;
    box-shadow: 0 0 5px currentColor;
}
/* currentColor 是 red*/
div{
    color: red;
    border: 5px solid currentColor;
    color: green;
}
/* currentColor 是 green*/
/* currentColor 是一个动态计算的值，因此当color被覆盖后边框的颜色就是绿色了*/
.parent-class {
 	color: blue;
}
.parent-class .child-class {
 	background-color: currentColor;
}
/* 子元素背景色是蓝色，color默认是继承的*/
```

### 18.2 颜色的关键字

transparent,rgba(0,0,0,0) 代表完全透明。其他：https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value

### 18.3 十六进制值 （Hexadecimal Value）

```css
.red{
    color: #ff0000; /*相当于 #f00 */
}
/* 不能表示透明 */
```

### 18.4 rgb

```css
.red{
    color: rgb(255,0,0);/*相当于 rgb(100%, 0%, 0%) */
}
/* 取值范围 0-255 或者 0 -100% */
```

### 18.5 rgba

```css
.red{
    color: rgba(255,0,0,1);
}
.red-50p{
    color: rgba(255,0,0,.5);
}
/* 透明度取值范围 0 - 1 的浮点数*/
```

### 18.6 hsl

```css
.blue{
    color: hsl(240,100%,50%);
}
/* 取值范围： 0-360， 0-100%，0-100%*/
```

### 18.7 hsla

```css
.blue-50p{
    color: hsla(240,100%,50%,.5);
}
```

## 第 19 章 Opacity

取值范围 0-1，0：完全透明，1：完全不透明。支持ie9+

```css
/* 表示元素整体的透明度 */
div{
    opacity: 0.8;
}
/* IE 兼容*/
.p60{
    /* for IE 8 & 9 */
 	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; // IE8
 	/* works in IE 8 & 9 too, but also 5, 6, 7 */
 	filter: alpha(opacity=60); // IE 5-7
 	/* Modern Browsers */
 	opacity: 0.6;
}
```

## 第 20 章 长度单位

具体请看https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units