---
title: Hexo搭建个人博客：yilia主题配置(二) - 背景图片
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
tags:
  - yilia
  - 背景图片
categories:
  - 网站
  - Hexo
abbrlink: 4235
date: 2020-02-18 17:36:44
---
本文主要讲述 `Hexo-yilia` 主题中，关于背景和图片的相关配置。与前面一样，使用主题： [hexo-theme-yilia-plus](https://github.com/JoeyBling/hexo-theme-yilia-plus)
<!-- more -->

## 1.头像与网站图标


### 1.1.添加头像和网站图标

打开主题配置文件 `_config.yml`, 添加：

```yaml
# 网站图标
favicon: /img/favicon.ico
# 你的头像url
avatar: /images/avatar.jpg 
```
**头像地址可以分两种**：
- 本地
  - 根目录中的 `source` 目录：可以在 `source` 目录下建立 `images` 文件夹，存放图片
  - 主题目录的 `source` 目录：建立 `img` 文件夹，存放图片
- 网络
  - 配置后写链接地址

### 1.2.头像旋转

修改 `yilia-plus\source\main.b8fa34.css` 文件 (原ylia主题是 `main.0cf68a.css` 文件)
文本编辑器 `Ctrl+F` , 搜索 `.left-col #header .profilepic img` ,修改为：
```css
.left-col #header .profilepic img {
    width: 100%;
    height: 100%;
    background: #88acdb;
    border-radius: 50%;
    border: 0;
    -webkit-transition: -webkit-transform 1s ease-out;
    -moz-transition: -moz-transform 1s ease-out;
    -o-transition: -o-transform 1s ease-out;
    -ms-transition: -ms-transform 1s ease-out
}

.left-col #header .profilepic img.show {
    width: 100%;
    height: 100%;
    opacity: 1
}

.left-col #header .profilepic img:hover {
    transform: rotate(1turn)
}

```

## 2.左侧边栏配置

> 同上，可以在css文件中设置，这里 `yilia-plus` 做了灵活的配置。

### 2.1.头像上方动图

- 打开主题配置文件 `themes\yilia-plus\_config.yml`，找到 `style` 配置项，作如下修改：

```yaml
style:
# 左侧头像板块动态图效果
  gif:
    # 是否启用
    enable: true
    # 自定义背景图路径(默认可以不设置，提供默认背景图biubiubiu.gif)
    path: 这里是gif图片地址
```

- 打开left-col.ejs文件，修改配置：

```
<% var defaultBg = '#4d4d4d'; %>
<% var defaultBgImg = '/img/biubiubiu.gif'; %>
<% var overlayBgImg= theme.style.gif && theme.style.gif.enable && theme.style.gif.path ? theme.style.gif.path : defaultBgImg; %>

<div class="overlay" style="background: <%= theme.style && theme.style.header ? theme.style.header : defaultBg %>;<% if (theme.style.gif && theme.style.gif.enable){ %>background: url('<%- url_for(overlayBgImg) %>') no-repeat ;<%}%> z-index:-1"></div>
```

### 2.2.左侧边栏背景

- 打开主题配置文件 `themes\yilia-plus\_config.yml`，找到 `style` 配置项，作如下修改：

```yaml
style:
  # 头像上面的背景颜色 e.g. linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))
  # header: '#D3D1DC'
  header: 'rgba(0,0,0,0.5)' #设置背景透明度，不然头像上方是默认色
  #左侧头像板块的背景颜色(IE兼容设置：filter:alpha(opacity=80);)
  left_ground: 
    enable: true
    default: 'rgba(0,0,0,0.5)'
    url: 'url(这里是图片链接) no-repeat 100%;background-size:cover;opacity:0.8;filter:alpha(opacity=80);'
  
```
- 打开布局文件 `themes\yilia-plus\layout\layout.ejs`，找到 `<div class="left-col" ... </div>` ，改成:

```
<div class="left-col" q-class="show:isShow"  style="background: <%= theme.style && theme.style.left_ground.enable && theme.style.left_ground.url ? theme.style.left_ground.url : theme.style.left_ground.default %>">
      <%- partial('_partial/left-col', null, {cache: !config.relative_link}) %>
    </div>
```

- 打开样式文件 `yilia-plus\source\main.b8fa34.css`，搜索 `.left-col` ，修改背景颜色如下：

```css
.left-col {
    /*background: #fff;*/
    background-color: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
    width: 300px;
    position: fixed;
    opacity: 1;
    transition: all .2s ease-in;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 15px
}

```

### 2.3.右滑板块背景

打开主题配置文件 `themes\yilia-plus\_config.yml`，找到 `style` 配置项修改 `slider`：
```yaml
style:
  # 右滑板块背景
  slider: 'linear-gradient(200deg,#ccc,#000)' 
```
可以根据自己喜好调整

### 2.4.背景音乐插件

> 插入音乐视频前，先安装插件：

```bash
npm install hexo-tag-dplayer --save
npm install hexo-tag-aplayer --save
```

- 这里用[网易云](https://music.163.com/)插件，打开一首歌，下方有 `生成外链` 提示，如：
<div align="center">
    <img src="/blog/images/wangyiyun/changyemanman-20-02-20.png" width="400px">
</div>

- 点击该链接，然后复制生成的HTML代码，配置时用。：

<div align="center">
    <img src="/blog/images/wangyiyun/changyemanman-link-20-02-20.png" width="450px">
</div>

- 在主题配置文件 `_config.yml` 找到

```yaml
# 网易云音乐插件
music:
  enable: true
  # 播放器尺寸类型(1：短尺寸、2：长尺寸)
  type: 2
  id: 411907505  # 网易云分享的音乐ID(更换音乐请更改此配置项)
  autoPlay: true  # 是否开启自动播放
  # 提示文本(关闭请设置为false)
  text: '写一段说明文字'
```

- 在left-col.ejs文件中，添加配置：

```
<% if (theme.music && theme.music.enable){ %>
            <%# "网易云音乐插件" %>
            <%# "bottom:120px; left:auto;position:absolute;  width:85%" %>
            <% var defaultHeight = theme.music.type == 1 ? '32' : '66'; %>
            <% var defaultIframeHeight = theme.music.type == 1 ? '52' : '86'; %>
            <div style="margin-right:10px;margin-left:0; padding:5px 0">
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="250" height="<%=defaultIframeHeight%>" src="//music.163.com/outchain/player?type=2&id=<%=theme.music.id||411907505%>&auto=<%=theme.music.autoPlay?1:0%>&height=<%=defaultHeight%>"></iframe>
            </div>
            <% if (theme.music.text || theme.music.text == null){ %>
                <% var musicText = ( theme.music.text == null || theme.music.text == true ) ? "默认说明文字" : theme.music.text; %>
                <p style="font-size: 12px;"><%-musicText%><p>
            <% } %>
        <% } %>
```


## 3.右边正文背景

- 和左侧边栏修改类似，打开文件 `themes\yilia-plus\_config.yml`，找到 `style` 配置项，作如下修改：

```yaml
style:
  # 正文的背景颜色(IE兼容设置：opacity:0.8;filter:alpha(opacity=80);)
  article_ground: 
    enable: true
    default: 'rgba(25, 25, 25, 0)'  #设置背景透明度
    url: 'url(图片链接地址) no-repeat 100%;background-size:cover;opacity:0.7;filter:alpha(opacity=70);'
```

- 打开布局文件 `themes\yilia-plus\layout\layout.ejs`，找到 `<div class="mid-col" ... >` ，修改:

```
<div class="mid-col" q-class="show:isShow,hide:isShow|isFalse" style="background: <%= theme.style && theme.style.article_ground.enable && theme.style.article_ground.url ? theme.style.article_ground.url : theme.style.article_ground.default %>">
```

- 如果想修改正文显示部分的样式，可以打开样式文件 `yilia-plus\source\main.b8fa34.css`，搜索 `.article`、`.article-inner` 、`.archives-wrap` 、 `.archives .archive-article-title` 等，修改字体、背景颜色：

```css
.article {
    margin: 30px;
    position: relative;
    border: 1px solid #ddd;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    /*background: #fff;*/
    background: rgba(255,255,255,.5);
    transition: all .2s ease-in;
}
/*主页*/
.article-inner {
    /*border-color: #d1d1d1；*/
    background-color: rgba(193, 194, 195,0.6);
}
.left-col {
    background-color: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255,255, 0.5));
    width: 300px;
    position: fixed;
    opacity: 1;
    transition: all .2s ease-in;
    height: 100%;
    z-index: 999;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 15px
}
/*归档*/
.archives-wrap {
    position: relative;
    margin: 0 30px;
    padding-right: 60px;
    border-bottom: 1px solid #eee;
    /*background: #fff;*/
    background-color: rgba(236, 236, 236,0.6);
}
/*字体*/
.archives .archive-article-title {
    font-size: 16px;
    font-weight: bold;
    /*color: #333;*/
    /*transition: color .3s*/
    background: transparent;
    text-decoration: none;
    color: # af9;
}

```

## 4.动态线条背景

> 安装插件: npm install --save canvas-nest.js，或直接显式配置

- 主题配置，在文件 `themes\yilia-plus\_config.yml` 中，添加：

```yaml
# 动态线条效果，会向鼠标集中
canvas_nest:
  enable: true
  color: '206, 187, 95'
  pointColor: '249, 72, 97'     
  opacity: '0.9'             
  count: '136'     
  zIndex: '-1'  
```

- 找到文件 `themes\yilia-plus\layout\layout.ejs`，添加：

```
<% if (theme.canvas_nest){ %>
<script type="text/javascript"
color="0,0,255" opacity='0.9' zIndex="-1" count="300" src="<%- url_for('//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js') %>"></script>
<% } %>

```


## 5.雪花特效

- 在主题目录 `source/lib` 下新建 `snow.js` 文件，内容添加：

```javascript
var snow = {
  info: {
    top: 0,
    left: 0,
    zIndex: 500,
    number: 70
  },
  down: function () {
    var f = window.innerWidth;
    var g = window.innerHeight;
    var d = document.createElement("canvas");
    d.style.position = "fixed";
    d.style.pointerEvents = "none";
    d.style.top = snow.info.top + "px";
    d.style.left = snow.info.left + "px";
    d.style.zIndex = snow.info.zIndex;
    d.width = f;
    d.height = g;
    document.body.appendChild(d);
    var c = [];
    for (var a = 0; a < snow.info.number; a++) {
      c.push({
        x: Math.random() * f,
        y: Math.random() * g,
        r: Math.random() * 4 + 1,
        n: Math.random() * 70
      })
    }
    var b = d.getContext("2d");
    var e = 0;
    setInterval(function () {
        b.clearRect(0, 0, f, g);
        b.fillStyle = "rgba(255, 255, 255, 0.6)";
        b.shadowBlur = 5;
        b.shadowColor = "rgba(255, 255, 255, 0.9)";
        b.beginPath();
        for (var j = 0; j < 70; j++) {
          var h = c[j];
          b.moveTo(h.x, h.y);
          b.arc(h.x, h.y, h.r, 0, Math.PI * 2, 0)
        }
        b.fill();
        e += 0.01;
        for (var j = 0; j < 70; j++) {
          var h = c[j];
          h.y += Math.cos(e + h.n) + h.r / 2;
          h.x += Math.sin(e) * 2;
          if (h.x > f + 5 || h.x < -5 || h.y > g) {
            c[j] = j % 3 > 0 ? {
              x: Math.random() * f,
              y: -10,
              r: h.r,
              n: h.n
            } : Math.sin(e) > 0 ? {
              x: -5,
              y: Math.random() * g,
              r: h.r,
              n: h.n
            } : {
              x: f + 5,
              y: Math.random() * g,
              r: h.r,
              n: h.n
            }
          }
        }
      },
      15)
  }
};
// yilia-plus主题已经集成了，可以直接用
```

- 布局文件`layout.ejs`，添加：

```
<% if (theme.snow){ %>
  <script type="text/javascript" src="<%- url_for('lib/snow.js') %>"></script>
  <script type="text/javascript" src="<%- url_for('lib/jquery-2.1.4.min.js') %>"></script>
  <script>
    snow.down();
    $(window).resize(function() {
      $("canvas").css("z-index","500").remove();
      snow.down();
    });
  </script>
  <% } %>
```

- 最后更新一下主题配置文件 `_config.yml`:

```
# 飘雪特效
# https://github.com/MlgmXyysd/snow.js
snow: true
```


> 可以参考这篇博客： [hexo多种特效配置](https://yansheng836.github.io/article/cf9c6a5e.html#%E5%8A%A8%E6%80%81%E7%BA%BF%E6%9D%A1%E8%83%8C%E6%99%AF)


---