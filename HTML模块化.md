# HTML 模块化

HTML 的模块化，将 HTML 需要复用的部分拆分为单独的文件，然后进行组合。

## gulp-file-inclue

地址： https://github.com/haoxins/gulp-file-include#readme

```bash
# 下载依赖库
npm install gulp gulp-file-inclue --save-dev
# 目录结构
# |-node_modules
# |-src
#	|-inclue 公共部分 html 存放文件夹
#	|-*.html
# |- 编译后的 html 文件
# |-gulpfile.js
```

```js
// gulpfile.js
var gulp = require('gulp');
var fileinclude  = require('gulp-file-include');

gulp.task('fileinclude', function() {
    gulp.src('src/**.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('dist'));
});
```

```html
<!-- header.html -->

<h1>这是 header 的内容</h1>

<!-- footer.html -->

<h1>这是 footer 的内容</h1>

<!-- layout.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    @@include('include/header.html')

    <p> 这是 layout 的内容 </p>

    @@include('include/footer.html')
</body>
</html>

<!-- 最后使用 gulp fileinclude 编译，完成后 dist 下出现一个layout.html的文件 -->
```

### 模板引擎

ejs： https://ejs.bootcss.com/ 有很多可以选择自己喜欢的来用。

```js
// npm install gulp gulp-ejs --save-dev 
// gulpfile.js
var gulp = require('gulp');
var ejs  = require('gulp-ejs');

gulp.task('ejs', function() {
    gulp.src('src/**.ejs')
        .pipe(ejs())
    .pipe(gulp.dest('dist'));
});

```

```html
<!-- layout.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <%-include include/header  %>

    <p> 这是 layout 的内容 </p>

    <%-include include/footer  %>
</body>
</html>
    
<!-- 最后使用 gulp ejs 编译，完成后 dist 下出现一个layout.html的文件 -->
```

