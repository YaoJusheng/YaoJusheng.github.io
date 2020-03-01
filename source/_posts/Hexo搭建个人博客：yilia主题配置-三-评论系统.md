---
title: Hexo搭建个人博客：yilia主题配置(三) - 评论系统
date: 2020-02-18 17:37:08
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
tags:
  - yilia
  - 评论系统
categories:
  - [网站]
  - [Hexo]
abbrlink: 37394
---
本文主要是关于 `评论系统` 在 `hexo-yilia` 主题中的添加和配置。使用主题： [hexo-theme-yilia-plus](https://github.com/JoeyBling/hexo-theme-yilia-plus)
<!-- more -->

## 常用系统
目前hexo可用的评论系统比较多，如：畅言、来必力、Disqus、Gitment、gitalk、utterances、Giteement、valine等等。不过有些已关停服务。

这里列举五个hexo常用的评论系统：
- **1、<a href="#1-Gitment配置" target="_self">gitment</a>** ：基于GitHub issue的评论系统，可参考：[简书](https://www.jianshu.com/p/ac7658cc912f)；
- **2、<a href="#2-Gitalk配置" target="_self">gitalk</a>** : 基于GitHub issue的评论系统，可参考：[gitalk](https://github.com/gitalk/gitalk)；
- **3、<a href="#3-Utterance配置" target="_self">utterance</a>** : 基于GitHub issue的评论系统，可参考：[详情](https://utteranc.es)
- **4、<a href="#4-Giteement配置" target="_self">giteement</a>** : 码云评论系统，国内用户建议使用这个，相对比较快，[详情](https://gitee.com/zhousiwei/giteement)；
- **5、<a href="#5-Valine配置" target="_self">valine</a>** : valine 评论系统，到 [leancloud](https://leancloud.cn/dashboard/login.html#/signup) 进行注册。


## 1.Gitment配置

> 首先要注册 [OAuth Application](https://github.com/settings/applications/new) 当别人评论你的文章时，会需要它是授权。

<br>
<!-- ![OAuth](/blog/images/gitissue/oauth.png) -->
<div align='center'>
  <img src="/blog/images/gitissue/oauth.png" width="400px" />
</div>

注册成功后，会获取到 `Client ID/scerct` ，需要填入配置文件中。

打开文件 `themes\yilia-plus\_config.yml` , 修改配置：

```yaml
gitment_owner: ''      # 你的 GitHub ID (github 账户名)
# 是否使用官方js(false可以提升访问速度，本地修改过一部分的js，官方js可能会出现服务器不稳定，不太建议使用)
gitment_repo: '如：xxx.github.io'  #存储评论的 repo name(需要在Github创建)
gitment_oauth:
  client_id: ''           #client ID
  client_secret: ''       #client secret
```

在 `themes\yilia-plus\layout\_partial\post` 目录下，会默认有一个 `gitment.ejs` 文件，可以自定义样式
对应的 `themes\yilia-plus\layout\_partial\article.ejs` 文件，会有 `gitment` 相关的配置。

## 2.Gitalk配置

### 2.1.新建 `gitalk.ejs` 文件
与 `gitment` 类似配置，首先在 `themes\yilia-plus\layout\_partial\post` 目录下，新建 `gitalk.ejs` 文件，
添加如下内容：

```
<div id="gitalk-container" style="padding: 0px 30px 0px 30px;"></div> 

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>

<script type="text/javascript">

if(<%=theme.gitalk.enable%>){
    var gitalk = new Gitalk({
    clientID: '<%=theme.gitalk.ClientID%>',
    clientSecret: '<%=theme.gitalk.ClientSecret%>',
    repo: '<%=theme.gitalk.repo%>',
    owner: '<%=theme.gitalk.githubID%>',
    admin: ['<%=theme.gitalk.adminUser%>'],
    id: '<%= page.date %>',
    distractionFreeMode: '<%=theme.gitalk.distractionFreeMode%>'
})
gitalk.render('gitalk-container') 
}
</script>
```

### 2.2.修改文件 `comment.scss` 
在文件 `themes\yilia\source-src\css\comment.scss` 中，做如下修改：

```css
#disqus_thread, .duoshuo, .cloud-tie-wrapper, #SOHUCS, #gitment-ctn, #gitalk-container {
    padding: 0 30px !important;
    min-height: 20px;
}

#SOHUCS {
    #SOHU_MAIN .module-cmt-list .block-cont-gw {
        border-bottom: 1px dashed #c8c8c8 !important;
    }
}

```

### 2.3.修改主题配置文件 `_config.yml`

打开文件 `themes\yilia-plus\_config.yml` , 修改配置：
```yaml
gitalk:
  enable:  true
  githubID:  ''      # 写自己github的ID
  repo:  ''          # 新建存放评论的仓库名
  ClientID:  ''      # 与 `gitment` 一样
  ClientSecret:  ''  # 同上
  adminUser:  ''     # 也填GitHub的ID
  distractionFreeMode: true
```

### 2.4.在文件 `article.ejs` 中添加配置
打开 `themes\yilia-plus\layout\_partial\article.ejs` 文件，添加：

```javascript
<% if(theme.gitalk.enable){ %>
  <%- partial('post/gitalk', {
      key: post.slug,
      title: post.title,
      url: config.url+url_for(post.path)
    }) %>
  <% } %>
```

## 3.Utterance配置

### 3.1.授权Utterance应用能访问仓库的issues

即安装 `Utterance` 应用，点击 [install utterances](https://github.com/apps/utterances)，选择需要安装的仓库。

### 3.2.fork项目
去 `GitHub` 上 fork [Utterance](https://github.com/utterance/utterances)项目，按照它的教程在 **`SITES.md`** 文件中注册你的博客网址，否则可能会配置失败。

### 3.3.修改主题配置文件 `_config.yml`

打开文件 `themes\yilia-plus\_config.yml` , 修改配置：
```yaml
# utteranc评论： https://utteranc.es (参数配置详见主页) 替换 gitment、gitalk
utterance:
  enable: true
  repo: ''     #仓库名字,格式：你的用户ID/仓库名称，如：blog/utterance_repo
  issue_term: 'title'            #映射配置
  theme: 'github-light'          #主题
```

### 3.4.在文件 `article.ejs` 中添加配置
打开 `themes\yilia-plus\layout\_partial\article.ejs` 文件，添加：

```
<% if (theme.utterance && theme.utterance.enable){ %>
    <section id="comments" class="comments">
      <style>
        .utterances{max-width: 100%;}
      </style>
        <script src="https://utteranc.es/client.js"
          repo="<%= theme.utterance.repo %>"
          issue-term="<%= theme.utterance.issue_term %>"
          theme="<%= theme.utterance.theme %>"
          crossorigin="anonymous"
          async>
        </script>
    </section>
  <% } %>
```

## 4.Giteement配置
> 基于码云的评论系统，类似GitHub的配置

### 4.1.新建 `giteement.ejs` 文件

在 `themes\yilia-plus\layout\_partial\post` 目录下，新建 `giteement.ejs` 文件，添加如下内容：

```
<% if (!index && post.comments && theme.giteement && theme.giteement.enable){ %>
  <div id="giteement-ctn"></div>
  <% if (theme.giteement && theme.giteement.remote){ %>
    <!-- <link rel="stylesheet" href="https://giteement.oss-cn-beijing.aliyuncs.com/wd-discuss.css"> -->
    <!-- <script src="https://giteement.oss-cn-beijing.aliyuncs.com/discuss_hexo.js"></script> -->
    <link rel="stylesheet" href="https://giteement.oss-cn-beijing.aliyuncs.com/default.css">
    <script src="https://giteement.oss-cn-beijing.aliyuncs.com/giteement.browser.js"></script>
  <% } else { %>
    <link rel="stylesheet" href="<%- url_for('lib/default.css') %>">
    <script src="<%- url_for('lib/giteement.browser.js') %>"></script>
  <% } %>
  <script>
  <!-- id: "<%= page.title %>" -->
  var giteement = new Giteement({
    id: '<%=page.date.format('YYYYMMDDHHmmss')%>',
    owner: '<%=theme.giteement.giteeID%>',
    repo: '<%=theme.giteement.repo%>',
    backcall_uri: '<%=theme.giteement.redirect_uri%>',
    oauth_uri: '<%=theme.giteement.oauth_uri%>',
    oauth: {
      client_id: '<%=theme.giteement.gitment_oauth.client_id%>',
      client_secret: '<%=theme.giteement.gitment_oauth.client_secret%>'
    },
  })
  giteement.render('giteement-ctn')
  </script>
<% } %>

```

### 4.2.修改主题配置文件 `_config.yml`

打开文件 `themes\yilia-plus\_config.yml` , 修改配置：
```yaml
giteement:
  enable: true  # 是否启用码云评论系统
  # 是否使用官方js(false可以提升访问速度)
  remote: false
  redirect_uri: ''   # 应用回调地址(请和配置的第三方应用保持一致)
  # 不能更改(网上开源项目https://github.com/Rob--W/cors-anywhere作者提供的专门用来跨域服务器的配置)
  oauth_uri: https://cors-anywhere.herokuapp.com/https://gitee.com/oauth/token
  giteeID: ''  # 你的码云账号英文名
  # 存储评论的 repo
  repo: yilia-plus-demo
  gitment_oauth:
    client_id: '*********'           #client ID
    client_secret: '*********'       #client secret
```

### 4.3.在文件 `article.ejs` 中添加配置
打开 `themes\yilia-plus\layout\_partial\article.ejs` 文件，添加：

```javascript
<% if (theme.giteement && theme.giteement.enable){ %>
<%- partial('post/giteement', {
      key: post.slug,
      title: post.title,
      url: config.url+url_for(post.path)
    }) %>
<% } %>
```

## 5.Valine配置

### 5.1.注册 `LeanCloud`
先到 [leancloud](https://leancloud.cn/dashboard/login.html#/signup)进行注册、创建应用等等，页面有帮助教程。

到【设置】-【应用keys】，找到 `AppID` 和 `AppKey` ，配置需要。

### 5.2.部署云引擎

1. 在Leancloud 【云引擎】-【设置】界面，创建代码仓库，并保存：`https://github.com/DesertsP/Valine-Admin.git`
2. 设置环境变量
3. 部署（分支选master）

可参考：[Valine配置手册](https://deserts.io/valine-admin-document/)

### 5.3.新建 `valine.ejs` 文件

在 `themes\yilia-plus\layout\_partial\post` 目录下，新建 `valine.ejs` 文件，添加如下内容：

```
<div class="valine_comment"></div>
<!--载入js，在</body>之前插入即可-->
<!--Leancloud 操作库:-->
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<!--Valine 的核心代码库-->
<script src="//unpkg.com/valine/dist/Valine.min.js"></script>
<script>
  var notify = '<%= theme.valine.notify %>' == true ? true : false;
  var verify = '<%= theme.valine.verify %>' == true ? true : false;
  new Valine({
      av: AV,
      el: '.valine_comment',
      emoticon_url: 'https://cloud.panjunwen.com/alu',
      emoticon_list: ["狂汗.png","不说话.png","汗.png","坐等.png","献花.png","不高兴.png","中刀.png","害羞.png","皱眉.png","小眼睛.png","暗地观察.png"],
      app_id: '<%= theme.valine.appid %>',
      app_key: '<%= theme.valine.appkey %>',
      placeholder: '<%= theme.valine.placeholder %>'
    });
</script>

```

### 5.4.修改主题配置文件 `_config.yml`

打开文件 `themes\yilia-plus\_config.yml` , 修改配置：

```yaml
# valine 评论系统，到leancloud进行注册
# https://leancloud.cn/dashboard/login.html#/signup
valine:
 appid: ''  # Leancloud应用的appId
 appkey: ''          # Leancloud应用的appKey
 verify: false      # 验证码
 notify: true       # 评论回复提醒
 avatar: mm        # 评论列表头像样式（https://valine.js.org/avatar）
 placeholder: 欢迎您的评论~ # 评论框占位符
```

### 5.5.在文件 `article.ejs` 中添加配置
打开 `themes\yilia-plus\layout\_partial\article.ejs` 文件，添加：

```
<% if (theme.valine && theme.valine.appid && theme.valine.appkey){ %>
    <section id="comments" style="margin:10px;padding:10px;background:#fff;">
      <%- partial('post/valine', {
        key: post.slug,
        title: post.title,
        url: config.url+url_for(post.path)
        }) %>
    </section>
  <% } %>
```


---