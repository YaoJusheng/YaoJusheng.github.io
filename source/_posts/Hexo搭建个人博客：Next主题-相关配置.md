---
title: Hexo搭建个人博客：Next主题-相关配置
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 32ea94eb
date: 2020-02-28 17:37:37
tags:
  - next
  - 基本配置
categories:
  - [网站]
  - [Hexo]
---

网上关于搭建个人博客网站所用主题，yilia和next两款比较多，这里记录一下next5.1.4相关的一些配置。

目前升级到 7+
<!-- more -->

## 1.页面显示问题

### 1.1.subnav链接错误

修改主题配置文件后，运行时，出现 `subnav子导航` 链接中多了 `%20` 这样的字样，这是主题内置字符串切割时出现错误，可以修改配置，将空格去掉，如：

将
```yaml
menu:
  home: / || home
  # about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
```

改为：
```yaml
menu:
  home: /||home
  # about: /about/||user
  tags: /tags/||tags
  categories: /categories/||th
```

### 1.2.站点概览中的链接错误
在 `themes\hexo-theme-next\layout_macro` 中，打开 `sidebar.swig` 文件，找到 `<div class="site-state-item site-state-posts">`，

将:

```
<a href="{{ url_for(theme.menu.archives).split('||')[0] | trim }}">
```

改为：
```
<a href="{{ url_for(theme.menu.archives.split('||')[0]) | trim }}">
```

> 参考：[导航栏链接URL乱码问题](https://blog.csdn.net/fullbug/article/details/103844424)

### 1.3. `hexo g` 运行错误

#### 1) 检查根目录配置文件中 url 和 root

如：
```
url: http://yourname.github.io
root: /
```

#### 2) 更新 hexo 和依赖

如：
```bash
npm update appname -g (or --save)
```

#### 3) 检查 post 提交的md文件格式

> 可参考：[Front-matter](https://hexo.io/zh-cn/docs/front-matter)

### 1.4.文章底部标签样式

位置：`themes\next\layout\_macro\post.swig`，搜索 `<div class="post-tags">`
旧版中，可以将a标签中的 `#` 替换为 `<i class="fa fa-tag"></i>`
新版中，可以在主题配置文件中，找到 `tag_icon` 并改为 `tag_icon: true` 

### 1.5.文章目录编号显示问题

大部分人习惯自己给文章标号，此时，自动编号就成了一种 `` 般的存在。
在主题配置文件中找到 `toc` 节点，修改 `number` 为  `false`

### 1.6.文章图片显示问题

为了方便写文章时，给文章添加图片，尽管markdown有插入图片的语法，但为了灵活性考虑，我们可能会用到 `hexo-asset-image` 这个插件，

它让我们在插入本地图片时变得非常方便，此时，我们要用asset的语法:

```
{% asset_img demo.png This is image %}
```

但这个时候不做任何处理的话，生成的图片链接可能会出现重复上一层目录的情况。

找到插件目录，打开index.js文件，将内容替换成如下代码：

```javascript
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split('.');
hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
      var link = data.permalink;
  if(version.length > 0 && Number(version[0]) == 3)
     var beginPos = getPosition(link, '/', 1) + 1;
  else
     var beginPos = getPosition(link, '/', 3) + 1;
  // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
  var endPos = link.lastIndexOf('/') + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
    if ($(this).attr('src')){
      // For windows style path, we replace '\' to '/'.
      var src = $(this).attr('src').replace('\\', '/');
      if(!/http[s]*.*|\/\/.*/.test(src) &&
         !/^\s*\//.test(src)) {
        // For "about" page, the first part of "src" can't be removed.
        // In addition, to support multi-level local directory.
        var linkArray = link.split('/').filter(function(elem){
        return elem != '';
        });
        var srcArray = src.split('/').filter(function(elem){
        return elem != '' && elem != '.';
        });
        if(srcArray.length > 1)
        srcArray.shift();
        src = srcArray.join('/');
        $(this).attr('src', config.root + link + src);
        console.info&&console.info("update link as:-->"+config.root + link + src);
      }
    }else{
      console.info&&console.info("no src attr, skipped...");
      console.info&&console.info($(this));
    }
      });
      data[key] = $.html();
    }
  }
});
```


### 1.7.文章内容显示不全

在主题目录中，找到主题配置文件，搜索 `motion`，修改如下：

```yaml
motion:
  enable: true
  async: true
```


## 2.添加阅读进度

### 2.1.向上返回按钮加上阅读进度
在主题配置文件中，找到 `scrollpercent` ，更新：
```yaml
scrollpercent: true
```

### 2.2.网页顶部添加阅读进度条

#### 2.2.1.新建文件 `custom_reading.js`
在 `themes\next\source\js\src` 中，新建文件 `custom_reading.js`，添加内容：
```javascript
$(document).ready(function () {
  $(window).scroll(function(){
    $(".top-scroll-bar").attr("style", "width: " + ($(this).scrollTop() / ($(document).height() - $(this).height()) * 100) + "%; display: block;");
  });
});
```
#### 2.2.2.更新 `commons.swig`

打开 `themes\next\layout\_scripts\commons.swig`，在 `js_commons` 中添加：

```
'src/custom_reading.js'
```

#### 2.2.3.修改 `header.swig`

打开 `themes\next\layout\_partials\header.swig`，在 `<div class="custom-logo-site-title">` 上面，添加：
```
{# 顶部阅读进度条 #}
<div class="top-scroll-bar"></div>
```

#### 2.2.4.修改样式
打开 `themes\next\source\css\_custom\custom.styl`，添加：
```
.top-scroll-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: none;
    width: 0;
    height: 2px;
    background: #6d6d6d;
}
```

## 3.修改友链样式

原格式是 `title+link` ，现加上图标和描述，方式自定义。

### 3.1.修改主题配置文件

如：
```yaml
links:
  Google搜索: 
    name: Google搜索
    url: https://www.google.com/
    ico: /images/ico/google.ico
    description: 最受欢迎的搜索引擎，国内使用可用代理或安装助手
  Bing搜索: 
    name: Bing搜索
    url: https://cn.bing.com/
    ico: /images/ico/biying.ico
    description: 必应搜索，一款好用的搜索引擎
```

### 3.2.修改 `sidebar.swig`
打开文件 `themes\next\layout\_macro\sidebar.swig`，找到 `<ul class="links-of-blogroll-list">`，在下面修改：
```
{% for item in theme.links %}
  <li class="links-of-blogroll-item">
    <a href="{{ item.url }}" {% if item.description %} title="{{ item.description }}" {% endif %}  target="_blank">
      {% if item.ico %}
        <img src="{{ config.root }}{{ item.ico }}" class="links-item-img">&emsp;
      {% else %}
        <i class="icon-link icon"></i>
      {% endif %}
      {{ item.name }}
    </a>
  </li>
{% endfor %}
```

## 4.页面背景设置
打开文件 `themes/next/source/css/_custom/custom.styl`，添加：
```
// 修改背景图片
body {
  background:url(https://source.unsplash.com/random/1600x900?wallpapers);
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-position:50% 50%;
}

// 修改主体透明度
.main-inner {
  background: #fff;
  opacity: 0.8;
}

// 修改菜单栏透明度
.header-inner {
  opacity: 0.8;
}
```
> 参考：[next添加背景图片](https://blog.diqigan.cn/posts/add-background-picture-for-next.html)

## 5.加入代码块复制功能

### 5.1.添加 `copy-code.swig` 文件

在 `themes/next/layout/_third-party/` 下，新建 `copy-code.swig` 文件，内容如下：
```
{% if theme.codeblock.copy_button.enable %}
  <style>
    .copy-btn {
      display: inline-block;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      line-height: 20px;
      color: #333;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      background-color: #eee;
      background-image: linear-gradient(#fcfcfc, #eee);
      border: 1px solid #d5d5d5;
      border-radius: 3px;
      user-select: none;
      outline: 0;
    }

    .highlight-wrap .copy-btn {
      transition: opacity .3s ease-in-out;
      opacity: 0;
      padding: 2px 6px;
      position: absolute;
      right: 4px;
      top: 8px;
    }

    .highlight-wrap:hover .copy-btn,
    .highlight-wrap .copy-btn:focus {
      opacity: 1
    }

    .highlight-wrap {
      position: relative;
    }
  </style>
  
  <script>
    $('.highlight').each(function (i, e) {
      var $wrap = $('<div>').addClass('highlight-wrap')
      $(e).after($wrap)
      $wrap.append($('<button>').addClass('copy-btn').append('{{__("post.copy_button")}}').on('click', function (e) {
        var code = $(this).parent().find('.code').find('.line').map(function (i, e) {
          return $(e).text()
        }).toArray().join('\n')
        var ta = document.createElement('textarea')
        document.body.appendChild(ta)
        ta.style.position = 'absolute'
        ta.style.top = '0px'
        ta.style.left = '0px'
        ta.value = code
        ta.select()
        ta.focus()
        var result = document.execCommand('copy')
        document.body.removeChild(ta)
        {% if theme.codeblock.copy_button.show_result %}
          if(result)$(this).text('{{__("post.copy_success")}}')
          else $(this).text('{{__("post.copy_failure")}}')
        {% endif %}
        $(this).blur()
      })).on('mouseleave', function (e) {
        var $b = $(this).find('.copy-btn')
        setTimeout(function () {
          $b.text('{{__("post.copy_button")}}')
        }, 300)
      }).append(e)
    })
  </script>
{% endif %}
```

### 5.2.编辑 `_layout.swig` 文件
返回上一层，在layout文件夹下，修改 _layout.swig，在 `</body>` 上面，加上：
```
{% include '_third-party/copy-code.swig' %}
```

### 5.3.添加复制按钮显示的文字

在 `themes/next/languages/` 目录下，找到 `在zh-CN.yml` 或 `在zh-Hans.yml` 文件中的 `post` 节点，向其中添加：

```yaml
copy_button: 复制
copy_success: 复制成功
copy_failure: 复制失败
```

在 `en.yml` 文件中同一节点位置，添加：
```yaml
copy_button: Copy
copy_success: success
copy_failure: Copy failed
```

### 5.4.修改主题配置文件

更新 `themes/next/_config.yml`，添加：
```yaml
codeblock:
  border_radius:
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Show text copy result
    show_result: true
```

> 参考：[next主题代码块复制](https://qiming.info/Hexo%E5%8D%9A%E5%AE%A2%E4%B8%AD%E5%8A%A0%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97%E5%A4%8D%E5%88%B6%E5%8A%9F%E8%83%BD/)

## 6.修改版权信息

### 6.1.修改主题配置文件

改为：
```yaml
post_copyright:
  enable: true
  license: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
  license_url: https://creativecommons.org/licenses/by-nc-nd/4.0/
```

### 6.2.新建 `my-copyright.swig` 文件
在目录 `themes\next\layout\_macro` 下，新建文件 `my-copyright.swig`，添加内容：
```
<div class="my_post_copyright">
  <script src="//cdn.bootcss.com/clipboard.js/1.5.10/clipboard.min.js"></script>
  
  {# JS库 sweetalert 可修改路径 #}
  <script src="https://cdn.bootcss.com/jquery/2.0.0/jquery.min.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <p><span>本文标题:</span><a href="{{ url_for(page.path) }}">{{ page.title }}</a></p>
  <p><span>文章作者:</span><a href="/" title="访问 {{ theme.author }} 的个人博客">{{ theme.author }}</a></p>
  <p><span>发布时间:</span>{{ page.date.format("YYYY年MM月DD日 - HH:mm") }}</p>
  <p><span>最后更新:</span>{{ page.updated.format("YYYY年MM月DD日 - HH:mm") }}</p>
  <p><span>原始链接:</span><a href="{{ url_for(page.path) }}" title="{{ page.title }}">{{ page.permalink }}</a>
    <span class="copy-path"  title="点击复制文章链接">
      <i class="fa fa-clipboard" data-clipboard-text="{{ page.permalink }}"  aria-label="复制成功！"></i>
    </span>
  </p>
  <p>
    <span>版权声明:</span>
    本博客所有文章除特别声明外，均采用 
    <a rel="license" href="{{ theme.post_copyright.license_url }}" target="_blank" title="{{ theme.post_copyright.license }}">
    <i class="fa fa-creative-commons"></i>BY-NC-SA </a>
    许可协议。转载请注明出处!
  </p>  
</div>
<script> 
    var clipboard = new Clipboard('.fa-clipboard');
      $(".fa-clipboard").click(function(){
      clipboard.on('success', function(){
        swal({   
          title: "",   
          text: '复制成功',
          icon: "success", 
          showConfirmButton: true
          });
        });
    });  
</script>
```

### 6.3.引入版权插件

打开文件 `themes\next\layout\_macro\post.swig`，

找到:
```
{% if theme.post_copyright.enable and not is_index %}
```

将：
```
{% include 'post-copyright.swig' with { post: post } %}
```

改成：
```
{% include 'my-copyright.swig' with { post: post } %}
```

## 7.修改网站统计显示

### 7.1.修改 `footer.swig` 文件

修改文件 `themes\next\layout\_partials\footer.swig`，后面添加：

```
<br>
  {# 访问统计 #}
  <div class="powered-by" style='color: gray'>
    <i class="fa fa-user-md"></i>
    <span id="busuanzi_container_site_uv">
      本站总访客数:&nbsp;<span id="busuanzi_value_site_uv" style='color: silver'></span>&nbsp;人&nbsp;| 
    </span>
    <i class="fa fa-eye"></i>
    <span id="busuanzi_container_site_pv">
        &nbsp;本站总访问量:&nbsp;<span id="busuanzi_value_site_pv" style='color: silver'></span>&nbsp;次
    </span>
  </div>

<br>
  {# 建站时间 #}
  <div>
    <span id="timeDate" class="color: lightblue;"></span>  
    <span id="times" class="color: lightgreen;"></span>
  </div>

</div>

{# 建站时间 #}
<script>
  var now = new Date(); 
  function createtime() { 
      var grt= new Date("02/12/2020 18:00:00"); 
      now.setTime(now.getTime()+250); 
      days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days); 
      hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours); 
      if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum); 
      mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;} 
      seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum); 
      snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;} 
      document.getElementById("timeDate").innerHTML = "本站已安全运行 "+dnum+" 天 "; 
      document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒"; 
  } 
  setInterval("createtime()",250);
</script>
```

### 7.2.修改主题配置文件

```yaml
busuanzi_count:
  # count values only if the other configs are false
  enable: true
  # custom uv span for the whole site
  site_uv: true
  site_uv_header: <i class="fa fa-user"></i>
  site_uv_footer:
  # custom pv span for the whole site
  site_pv: true
  site_pv_header: <i class="fa fa-eye"></i>
  site_pv_footer:
```

## 8.流动线条和页面点击效果

### 8.1.红心效果
在 `themes\next\layout\_layout.swig` 文件中，末尾添加：

```
<script>
! function (e, t, a) {
  function n() {
    c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
  }

  function r() {
    for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
    requestAnimationFrame(r)
  }

  function o() {
    var t = "function" == typeof e.onclick && e.onclick;
    e.onclick = function (e) {
      t && t(), i(e)
    }
  }

  function i(e) {
    var a = t.createElement("div");
    a.className = "heart", d.push({
      el: a,
      x: e.clientX - 5,
      y: e.clientY - 5,
      scale: 1,
      alpha: 1,
      color: s()
    }), t.body.appendChild(a)
  }

  function c(e) {
    var a = t.createElement("style");
    a.type = "text/css";
    try {
      a.appendChild(t.createTextNode(e))
    } catch (t) {
      a.styleSheet.cssText = e
    }
    t.getElementsByTagName("head")[0].appendChild(a)
  }

  function s() {
    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
  }
  var d = [];
  e.requestAnimationFrame = function () {
    return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
      setTimeout(e, 1e3 / 60)
    }
  }(), n()
}(window, document);
</script>
```

### 8.2.流动线条

在主题配置文件中，修改：
```yaml
# 动态线条效果，会向鼠标集中
canvas_nest:
  enable: true
  color: '0,0,255'        # color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  pointColor: '249, 72, 137'     # color of points, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  opacity: '0.8'               # the opacity of line (0~1), default: 0.5.
  count: '99'                  # the number of lines, default: 99.
  zIndex: '-2'                 # z-index property of the background, default: -1. 底层
```

在文件 `themes\next\layout\_scripts\vendors.swig` 中添加：

```
{# 动态线条效果 #}
{% if theme.canvas_nest && theme.canvas_nest.enable  %}
  {% set js_vendors.canvas_nest  = 'canvas-nest/canvas-nest.min.js' %}
  <script 
    type="text/javascript" 
    color="{{ theme.canvas_nest.color }}" 
    opacity="{{ theme.canvas_nest.opacity }}" 
    zIndex="{{ theme.canvas_nest.zIndex }}" 
    count="{{ theme.canvas_nest.count }}" 
    src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js" >
  </script>
{% endif %}
```


## 9.添加 `utterance` 评论系统

> Next 主题集成了常用的几种评论系统，这里只提一下 `utterance`，用来替代 `gitment`、`gitalk` 的最佳选择。

### 9.1.安装utteranc插件

+ `git bash` 或 `Dos` 窗口下，运行：

```bash
npm install --save github:theme-next/hexo-next-utteranc
```

+ 在主题配置文件中，添加：

```yaml
utteranc:
  enable: true
  repo: ''     #Github repo such as :blog/utterance_repo
  pathname: pathname
  # theme: github-light,github-dark,github-dark-orange
  theme: github-light
  cdn: https://utteranc.es/client.js
```

> 针对新版本，可以作如下修改：

### 9.2.自定义添加

+ 配置文件，添加：

```yaml
utterance:
  enable: true
  repo: ''     #仓库名字,格式：你的用户ID/仓库名称，如：blog/utterance_repo
  issue_term: 'title'            #映射配置
  theme: 'github-light'          #主题
```

+ 新建 `utterance.swig` 文件

在路径 `themes\next\layout\_third-party\comments\` 下，新建 `utterance.swig` 文件，添加内容：

```swjg
<script type="text/javascript">
  (function() {
    // 匿名函数，防止污染全局变量
    var utterances = document.createElement('script');
    utterances.type = 'text/javascript';
    utterances.async = true;
    utterances.setAttribute('issue-term','{{ theme.utterance.issue_term }}')
    utterances.setAttribute('theme','{{ theme.utterance.theme }}')
    utterances.setAttribute('repo','{{ theme.utterance.repo }}')
    utterances.crossorigin = 'anonymous';
    utterances.src = 'https://utteranc.es/client.js';
    // content 是要插入评论的地方
    document.getElementById('utterance-container').appendChild(utterances);
  })();
</script>
```

+ 新建 `utterance.js` 文件

在路径 `themes\next\scripts\filters\comment\` 下，新建 `utterance.js` 文件，添加内容：

```js
/* global hexo */

'use strict';

const path = require('path');

// Add comment
hexo.extend.filter.register('theme_inject', injects => {
  let theme = hexo.theme.config;
  if (!theme.utterance || !theme.utterance.enable) return;

  injects.comment.raw('utterance', '<div class="comments" id="utterance-container"></div>', {}, {cache: true});

  injects.bodyEnd.file('utterance', path.join(hexo.theme_dir, 'layout/_third-party/comments/utterance.swig'));

});
```

## 10.静态资源压缩

### 10.1.`hexo-neat` 压缩

+ 安装

```bash
npm install hexo-neat --save-dev
```

+ 在站点目录下的_config.yml的末尾，添加配置信息:

```yaml
# hexo-neat
# 博文压缩
neat_enable: true
# 压缩html
neat_html:
  enable: true
  exclude:  #排除的文件
  
# 压缩css  跳过min.css
neat_css:
  enable: true
  exclude:
    - '**/*.min.css'
    
# 压缩js 跳过min.js
neat_js:
  enable: true
  mangle: true
  output:
  compress:
  exclude:
    - '**/*.min.js'
    - '**/jquery.fancybox.pack.js'
    - '**/index.js'  
# 压缩博文配置结束
# 注意上面的路径 **/* ,需要自己去配置正确的路径。，不然生成的是空白页面，当然你也可以删掉，全部压缩。
```

### 10.2.`gulp` 压缩

+ 安装

```bash
npm install gulp -g
# or
npm install gulp-cli -g

npm install gulp-minify-css gulp-uglify gulp-htmlmin gulp-htmlclean gulp --save
```

+ 博客根目录下新建 `gulpfile.js` ，并添加内容：

```js
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');

// 压缩html
gulp.task('minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      collapseWhitespace: true, //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大
      collapseBooleanAttributes: true, //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>
      removeComments: true, //清除html中注释的部分
      removeEmptyAttributes: true, //清除所有的空属性
      removeScriptTypeAttributes: true, //清除所有script标签中的type="text/javascript"属性。
      removeStyleLinkTypeAttributes: true, //清楚所有Link标签上的type属性。
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('./public'));
});
// 压缩css
gulp.task('minify-css', function() {
  return gulp.src('./public/**/*.css')
    .pipe(minifycss({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./public'));
});
// 压缩js !代表排除的js,例如['!./public/js/**/*min.js']
gulp.task('minify-js', function() {
  return gulp.src(['./public/js/**/.js'])
    .pipe(uglify()) //压缩混淆
    .pipe(gulp.dest('./public'));
});
// 压缩图片
gulp.task('minify-images', function() {
  return gulp.src('./public/images/**/*.*')
    .pipe(imagemin(
    [imagemin.gifsicle({'optimizationLevel': 3}),
    imagemin.jpegtran({'progressive': true}),
    imagemin.optipng({'optimizationLevel': 7}),
    imagemin.svgo()],
    {'verbose': true}))
    .pipe(gulp.dest('./public/images'));
});
// 默认任务
gulp.task('default',gulp.series(gulp.parallel('minify-html','minify-css','minify-js','minify-images')));
```
> 执行 `hexo g && gulp` 就会根据 `gulpfile.js` 中的配置，对 `public` 目录中的静态资源文件进行压缩。

> 参考：[静态资源压缩](https://segmentfault.com/a/1190000021486140)


---