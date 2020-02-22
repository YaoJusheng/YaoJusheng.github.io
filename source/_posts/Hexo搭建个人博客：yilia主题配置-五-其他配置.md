---
title: Hexo搭建个人博客：yilia主题配置(五) - 其他配置
date: 2020-02-21 15:59:48
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
tags:
  - yilia
  - 插件
categories:
  - 网站
  - Hexo
abbrlink: 915cb590
---
本文主要讲述 `Hexo-yilia` 主题对于文章持久化及天气等插件的配置。
<!-- more -->

## 1.持久化URL

- 首先，安装插件：

```bash
npm install hexo-abbrlink --save
```

- 在根目录中打开 `_config.yml` 文件，找到 `permalink` 项，修改：

```yaml
# permalink: :year/:month/:day/:title/  # 原代码, 分层较深
permalink: archives/:abbrlink.html
permalink_defaults:
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: hex    # 进制：dec(default) and hex
```

- 分类和标签预设

中英文映射：

```yaml
# e.g.
category_map:
  网站: site
  小程序: miniprogram
  开发工具: tools
tag_map:
  标签分类: kinds
  基础: basic
  Web框架: web_frame
  数据库操作: sql_action
  数据分析: data_analysis
  爬虫: spider
  自动化测试: auto_test
```

> 参考：[hexo持久化配置](https://blog.csdn.net/weixin_41287260/article/details/103049779)

## 2.文章图片的导入

> 在hexo主题中，直接用markdown的语法：如 ![](图片地址)，是不生效的

### 方式一：上传七牛云 [入门详情](https://support.qiniu.com/tickets/new/)

使用： 获取七牛云图片链接

### 方式二：使用插件：

- 安装插件

```bash
npm install hexo-asset-image --save
```
- 打开文件 `node_modules/hexo-asset-image/index.js` ，替换内容为下面的代码：

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

- 打开根目录配置文件 `_config.yml` ，修改如下：

```yaml
# 文章图片路径转换
post_asset_folder: true
```
重新生成后，会在文章同级目录建立一个同名文件夹，可以存放图片。

- 使用：

```
{% asset_img example.jpg This is an example image %}
```


> 参考：[图片引用配置](https://blog.csdn.net/xjm850552586/article/details/84101345)

### 方式三：存放到根目录

- 引用：

```markdown
![描述](/{root}/{图片目录}/你的图片)
<!-- e.g. -->
![issue](/blog/images/gitissue/issue.png)
<!-- 使用样式： -->
<img src="" width="50%" height="50%">
```

> 参考：[知乎提问](https://www.zhihu.com/question/23378396)

## 3.Hexo网站运行时间

在文件 `themes/yelee/layout/_partial/left-col.ejs` 中，（具体位置可自选）加入如下代码：

```
<span id="timeDate">载入天数...</span><span id="times">载入时分秒...</span>
<script>
    var now = new Date(); 
    function createtime() { 
        var grt= new Date("11/23/2018 20:00:00");//此处修改你的建站时间或者网站上线时间 
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

> 日期格式: 月/日/年 时:分:秒。

> 参考：[Hexo-Yilia进阶笔记](https://blog.csdn.net/dta0502/article/details/89607895)

## 4.添加心知天气

### 4.1.注册账号，设置天气样式：

- 进入[官网](https://www.seniverse.com/widgetv3)注册，选择样式：

![心知天气](/blog/images/weather/xinzhi-weather.png)

- 点击生成代码，复制代码：

如：
```javascript
<div id="tp-weather-widget"></div>
  <script>
    (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));
    window.SeniverseWeatherWidget('show', {
      flavor: "bubble",
      location: "WTSQQYHVQ973",
      geolocation: true,
      language: "zh-Hans",
      unit: "c",
      theme: "auto",
      token: "31a8562e-ae28-47fe-860d-d4e01b0867c2",
      hover: "enabled",
      container: "tp-weather-widget"
    })
  </script>
```

### 4.2.添加配置

- 打开主题配置文件 `_config.yml`，添加：

```yaml
# 心知天气
xinzhi_weather: true
```
- 打开 `themes/yilia-plus/layout/_partial/left-col.ejs` 文件，在合适位置添加：

```
<% if(theme.xinzhi_weather){ %>
  <!-- 这是刚刚生成的js代码 -->
  <div id="tp-weather-widget"></div>
  <script>
    (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));
    window.SeniverseWeatherWidget('show', {
      flavor: "bubble",
      location: "WTSQQYHVQ973",
      geolocation: true,
      language: "zh-Hans",
      unit: "c",
      theme: "auto",
      token: "31a8562e-ae28-47fe-860d-d4e01b0867c2",
      hover: "enabled",
      container: "tp-weather-widget"
    })
  </script>
<% } %>
```

> 参考：[添加天气](https://blog.csdn.net/weixin_41287260/article/details/103050663)

## 5.添加百度推送

### 5.1.新建 `baidu-push.ejs` 文件

在 `yilia-plus/layout/_partial` 下添加 `baidu-push.ejs` 文件，内容如下：

```javascript
<% if (theme.baidu_push){ %>
<script>
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
</script>
<% } %> 
```

### 5.2.引用 `baidu-push.ejs`

编辑 `layout/_partial/head.ejs`，添加：

```
<%- partial('baidu-push') %>
```

### 5.3. 添加 `baidu_push` 属性

编辑 `yilia/_config.yml` ，添加：

```yaml
# 百度推送
baidu_push: true
```

## 6.添加版权声明

- 在 `layout/_partial/head.ejs` 或 `layout/_partial/aricle.ejs` 中合适位置，添加：

```
<% if (((theme.copyright_type === 2) || (theme.copyright_type === 1 && post.copyright)) && !index){ %>
    <div class="declare"> 
      <ul class="post-copyright">
        <li>
          <strong>本文作者：</strong>
          <%= config.author%>
        </li>
        <li>
          <strong>本文链接：</strong>
          <a href="<%- yilia_plus_full_url(post.path) %>" title="<%= post.title %>" target="_blank"><%- yilia_plus_full_url(post.path) %></a>
        </li>
        <% if (theme.copyright_text || theme.copyright_text == null){ %>
        <li>
          <strong>版权声明： </strong>
          <% var defaultCopyrightText = '本博客所有文章除特别声明外，均采用 <a href="https://github.com/JoeyBling/hexo-theme-yilia-plus/blob/master/LICENSE" rel="external nofollow" target="_blank">MIT</a> 许可协议。转载请注明出处！'; %>
          <%- ( theme.copyright_text == null || theme.copyright_text == true ) ? defaultCopyrightText : theme.copyright_text %>
        </li>
        <% } %>
      </ul>
    </div>
<% } %>
```

- 打开样式文件 `themes\yilia-plus\source\main.b8fa34.css` ，添加样式：

```css
.post-copyright{
    margin: 0em 0em 0em 0em;
    padding: 0.5em 1em;
    border-left:3px solid #ff1700;
    background-color: #f9f9f9;
    list-style: none;
    font-size: 14px;
}
```

- 添加 `copyright_type` 属性

打开主题配置文件 `_config.yml`，添加：
```yaml
# 版权声明
# type：0-关闭版权声明； 1-存在copyright:true属性的文章，显示版权声明； 2-所有文章均有版权声明
copyright_type: 0
```
> 参考：[Yilia主题优化](https://blog.csdn.net/weixin_30391339/article/details/98582169)

## 7.添加在线聊天

### 7.1.注册

#### 去[官网](http://www.daovoice.io/)注册一个账号，复制我的邀请码[eb35ef31](http://dashboard.daovoice.io/get-started)，然后直接点击开始注册：

<div align="center">
  <img src="/blog/images/daovoice/daovoice_register.png" width="50%">
</div>

#### 完成后，显示如下界面：
<div align="center">
  <img src="/blog/images/daovoice/daovoice_config.png" width="75%">
</div>

可以通过点击 **`点击接入`** ，或路径 **`[应用设置]`** -> **`[安装到网站]`** 找到。

#### 可以修改喜欢的样式

找到 **`[应用设置]`** -> **`[聊天设置]`**，修改 :
<div align="center">
  <img src="/blog/images/daovoice/daovoice_style.png" width="75%">
</div>

接下来有提示，复制框1、3中的代码到head文件中，放在 `</head>` 标签之前。


### 7.2.在文件 `head.ejs` 中添加配置

打开文件 `themes\yilia-plus\layout\_partial\head.ejs`，添加：

```
<%# "在线聊天" %>
<% if (theme.daovoice) { %>
  <script>
    (function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/<%= theme.daovoice_app_id %>.js","daovoice")

    daovoice('init', {
      app_id: "<%= theme.daovoice_app_id %>"
    });
    daovoice('update');

  </script>
<% } %>
```

### 7.3.配置参数

在主题配置文件 `_config.yml` 中，添加：

```yaml
# Daovoice DaoCloud 在线沟通
daovoice: true 
daovoice_app_id: ""   # 填你的id
```


---