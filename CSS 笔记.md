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
  padding: 20px;
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
  min-width: 20px;
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
  height: 20px;
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
 width: 20px;
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

### ：only-child

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