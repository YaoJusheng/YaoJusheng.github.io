---
title: web前端（六）：静态资源压缩
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: 3d25ddbc
date: 2020-04-08 21:47:19
tags:
  - 资源压缩
categories:
  - [编程]
  - [前端]
---

> 前端的静态资源压缩的方式有很多，这里记录一下 `Grunt` 和  `Gulp` 的使用

<!-- more -->

## 1. Grunt压缩
Grunt3是基于NodeJS的一个自动化压缩、合并、测试等构建工具，可用npm安装，任务文件Gruntfile.js放在项目的根目录下。

### 1.1.安装
```bash
npm install -g grunt-cli
```

### 1.2.新建 `package.json`
文件内容如下：
```json
{
  "name": "project-name",
  "version": "1.0.0",
  // ...
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-concat": "^1.0.0",
    "grunt-contrib-cssmin": "^0.12.3",
    "grunt-contrib-imagemin": "^1.0.0",
    "grunt-contrib-jshint": "^0.12.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "^0.5.1"
  }
}
```

### 1.3.安装依赖
执行命令:
```bash
npm install
```

### 1.4.新建 `Gruntfile.js`
添加配置任务，如：
```javascript
module.exports = function(grunt) {
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  
  //压缩 js
  uglify: {
    options: {
      banner: '/*压缩文件声明文本...*/\n'
    },
    build:{
     files:[{
      src: ['a.js', 'b.js', 'c.js'],
      dest: 'abc.min.js'  //合并压缩后生成的文件
     },{
      src: ['d.js'],
      dest: 'd.min.js'
     }]
   }
  },
  //压缩 css
  cssmin: {
    options: {
      keepSpecialComments: 0
    },
    compress: {
      files: [{
        src: ["a.css", "b.css"],
        dest: 'ab.min.css'  //合并压缩后生成的文件
      },{
        src: ['c.css'],
        dest: 'c.min.css'
      }]
    }
  },
  //压缩 图片
  imagemin: {
    /* 压缩图片大小 */
    dist: {
      options: {
        optimizationLevel: 3 //定义 PNG 图片优化水平
      },
      files: [{
        expand: true,
        cwd: 'images',
        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
        dest: 'images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示（建议新建一个目录）
      }]
    }
  }
});

  /* 加载任务插件 */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  /* 默认被执行的任务列表 */
  grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin]);
};
```

## 2. Gulp压缩

### 2.1.安装
```bash
npm install gulp -g
# or
npm install gulp-cli -g
```

### 2.2.新建 `package.json` 文件
添加依赖项：
```json
{
  "name": "project-name",
  "version": "1.0.0",
  // ...
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-minify-css": "^1.2.1",
    "gulp-rename": "^1.2.2",
    "gulp-htmlclean": "^2.7.22",
    "gulp-htmlmin": "^5.0.1",
    "gulp-uglify": "^3.0.2",
    "babel-core": "^6.26.3",
    "gulp-babel": "^7.0.1",
    "gulp-imagemin": "^7.1.0",
    "gulp-sass": "^4.0.2"
  },
}
```

### 2.3.安装依赖
执行命令：
```bash
npm install
```

### 2.4.新建 `gulpfile.js` 文件
添加任务配置，如：
```javascript
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var htmlmin     = require('gulp-htmlmin');
var htmlclean   = require('gulp-htmlclean');
var babel       = require('gulp-babel');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');


// 压缩 html
gulp.task('minify-html', function() {
  return gulp.src('./*.html')
      .pipe(htmlclean())
      .pipe(htmlmin({
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
      }))
      .pipe(gulp.dest('./public'));
  done();
});

// 压缩 css
gulp.task('compressCSS', function() {
  return gulp.src(['src/css/*.scss','src/css/*.css'])
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/src/css/'))
        .pipe(browserSync.stream());
  done();
});

// 压缩 js
gulp.task('minify-js', function (done) {
  return gulp.src(['src/js/*.js'])
      .pipe(uglify())
      .pipe(gulp.dest('./public/src/js/'));
  done();
});

// 压缩 图片
gulp.task('minify-images', function() {
    return gulp.src('*.ico', 'src/img/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}),
        imagemin.optipng({'optimizationLevel': 7}),
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public/src/images'))
});

gulp.task('font', function (done) {
  return gulp.src(['./font/*'])
      .pipe(gulp.dest('./public/font'));
  done();
});


gulp.task('default',gulp.series(gulp.parallel('compressCSS','minify-js', 'minify-images', 'font', 'minify-html')), function () {
  console.log("----------gulp Finished----------");
  // Do something after a, b, and c are finished.
});
```

> 另外，其他同类插件的使用，可参考：[fis3使用](https://fis.baidu.com/fis3/docs/lv3.html)、[gzip压缩](https://juejin.im/entry/5a577f64518825733a30a050)、[Webpack 构建前端资源](https://blog.7v1.net/front-end/webpack.html)

**参考**：
[1]. [Web前端性能优化实践](https://borninsummer.com/2015/01/03/web-performance-in-practice/)
[2]. [Gruntjs 压缩合并前端静态资源](https://lanqy.xyz/2018/05/21/grunt-example/)

---