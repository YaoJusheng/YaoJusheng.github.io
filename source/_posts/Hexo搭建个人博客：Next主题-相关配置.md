---
title: Hexo搭建个人博客：Next主题-相关配置
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 32ea94eb
date: 2020-02-25 17:37:37
tags:
  - next
  - 基本配置
categories:
  - [网站]
  - [Hexo]
---

网上关于搭建个人博客网站所用主题，yilia和next两款比较多，这里记录一下next5.1.4相关的一些配置。

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


---