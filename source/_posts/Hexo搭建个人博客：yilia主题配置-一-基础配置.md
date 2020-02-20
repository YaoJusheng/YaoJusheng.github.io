---
title: Hexo搭建个人博客：yilia主题配置(一) - 基础配置
date: 2020-02-17 17:40:05
toc: true
tags: 
  - Hexo
  - yilia
  - 基本配置
categories:
  - 网站
---

前两天搭建了一下个人博客，使用Hexo工具+GitHub/Gitee部署博客网站，这里简单记录一下搭建过程：

<!-- more -->

## 1.安装Hexo

> 首先，确保已有node环境。

```bash
npm install hexo-cli -g
npm install hexo-deployer-git --save  # 最后如果需要部署到git，就要安装这个包
```

## 2.安装yilia主题

> 首先，确保已安装git工具。

### 2.1.安装
```bash
git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia   # 将hexo-theme-yilia安装到themes目录下
```
> 这里推荐 [hexo-theme-yilia-plus](https://github.com/JoeyBling/hexo-theme-yilia-plus) 项目，该项目对yilia主题做了一些优化和补充，感谢作者 JoeyBling 的贡献。以下皆以该主题做部署配置。

### 2.2.使用yilia主题
此处以 [hexo-theme-yilia-plus](https://github.com/JoeyBling/hexo-theme-yilia-plus)为例，打开根目录下的_config.yml文件，找到 `theme` 处, 修改配置：
```yaml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
# theme: landscape  # 默认主题
theme: yilia-plus  # yilia
```
其他配置：
```yaml
# Site 网站
title: ''             # 网站标题
subtitle: ''          # 网站副标题
description: ''       # 网站描述
keywords: ''
author: ''            # 博主的名字
language: zh-CN       # 网站使用的语言
timezone: ''          # 网站时区。Hexo 默认使用您电脑的时区
```

## 3.配置“所有文章”

> “所有文章”按钮，需要插件生效。

```bash
npm i hexo-generator-json-content --save
```
同时在根目录文件`_config.yml`下, 配置：
```yaml
# 新增内容
jsonContent:
  meta: false
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: false
    raw: false
    content: false
    slug: false
    updated: false
    comments: false
    link: false
    permalink: false
    excerpt: false
    categories: false
    tags: true
```

## 4.代码高亮

> 在根目录和主题目录下，打开 `_config.yml` 文件，添加配置：

```yaml
# 代码高亮
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace: ''
  wrap: true
  hljs: false
```

## 5.添加图片资源

> 在根目录 `source` 目录下或主题目录 `source` 目录下新建 `img` 目录，将所需图片资源存入，打开文件 `themes\yilia-plus\_config.yml`, 修改配置：

```yaml
# 网站图标
favicon: /img/favicon.ico

# 你的头像url
avatar: /img/avatar.jpg  

# 支付宝二维码图片地址，跟设置头像的方式一样。
alipay: /img/alipay.jpg
# 微信二维码图片地址
weixin: /img/weixin.png
```

## 6.左侧显示总文章数

> 打开 `themes\yilia\layout\_partial\left-col.ejs` 文件

找到下面这一段：
```
<nav class="header-menu">
    <ul>
    <% for (var i in theme.menu){ %>
        <li><a href="<%- url_for(theme.menu[i]) %>"><%= i %></a></li>
    <%}%>
    </ul>
</nav>
```

在之后添加：

```
<nav>
    总文章数 <%=site.posts.length%>
</nav>
```


## 7.新建标签和分类

> 在 `git bash` 或者 `cmd` 命令行，输入以下命令:

```bash
hexo new page tags         # 新建标签
hexo new page categories   # 新建分类
```
在文件 `scaffolds\post.md` 中添加：

```markdown
tags: 
categories: 
```

下次新建文章时，可以设置标签和分类。

## 8.添加字数统计

> 安装 hexo-wordcount, npm install hexo-wordcount --save

在文件 `themes\yilia\layout\_partial\left-col.ejs` 中添加：

```
<nav>
    总字数 <span class="post-count"><%= totalcount(site, '0,0.0a') %></span>
</nav>
```

编辑文件 `themes\yilia\layout\_partial\article.ejs`，在header下，添加：

```
<div align="center" class="post-count">
    字数：<%= wordcount(post.content) %>字 | 预计阅读时长：<%= min2read(post.content) %>分钟
</div>
```


## 9.不蒜子统计-统计访问量

> 如果主题中没有配置，则：安装不蒜子

在文件 `themes\yilia\layout\_partial\after-footer.ejs` 末尾添加：

```
<script  async  src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

### 9.1.统计网站访问量

> 如果主题中没有配置，则：

修改文件 `themes\yilia\layout\_partial\footer.ejs`，添加访客数和站点访问总量：

```
# 总访问量
<span id="busuanzi_container_site_pv">    
    本站总访问量
    <span id="busuanzi_value_site_pv"></span>次</span> |

# 访客记录
<span id="busuanzi_container_site_uv">  
    本站访客数
    <span id="busuanzi_value_site_uv"></span>人次</span>
```

### 9.2.单篇文章点击量

打开文件 `\themes\yilia-plus\layout\_partial\post\date.ejs`，添加： 

```
<span id="busuanzi_container_page_pv">  本文总阅读量<span id="busuanzi_value_page_pv"></span>次</span>
```

## 10.部署（GitHub/Gitee）

> 这里以 `GitHub/Gitee pages` 为例，作为个人博客的静态部署

打开根目录中的 `_config.yml` 文件，找到 `deploy` 项，修改如下配置：

```yaml
# Deployment  配置部署信息
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  # repository: https://gitee.com/你的账户名/blog.git
  repository: git@gitee.com:你的账户名/blog.git
  branch: master
```

> 确保 `GitHub/Gitee` 上已开启 `GitHub/Gitee pages` 服务，部署分支选择 `master`

在 `Git bash` 或 `DOS窗口` 中，输入以下命令：

```bash
hexo deploy  # 部署到GitHub/Gitee 上，需要先安装 `npm install hexo-deployer-git --save`
```

## 11.Hexo命令

### 11.1.常用命令

```bash
hexo new "postName"       #新建文章
hexo new page "pageName"  #新建页面
hexo generate             #生成静态页面至public目录
hexo server --port==8000  #开启访问（默认端口4000，`ctrl + c` 关闭），查看帮助（hexo server -help）
hexo deploy               #将 `.deploy_git` 目录部署到 GitHub/Gitee
```

### 11.2常用复合命令：

```bash
hexo deploy -g
hexo server -g
```

### 11.3.简写：

```bash
hexo n         ==   hexo new
hexo g         ==   hexo generate
hexo s -p 8000 ==   hexo server --port=8000
hexo d         ==   hexo deploy
```


---