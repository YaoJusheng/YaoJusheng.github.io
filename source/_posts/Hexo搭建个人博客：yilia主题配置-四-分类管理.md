---
title: Hexo搭建个人博客：yilia主题配置(四) - 分类管理
date: 2020-02-20 19:23:43
toc: true
top: true
order_by:
  - top: 1
  - date: -1
tags:
  - yilia
  - 标签分类
categories:
  - [网站]
  - [Hexo]
abbrlink: 46241
---

本文主要讲述 `Hexo-yilia` 主题对于文章的分类和标签方面的配置。
<!-- more -->

## 1.插件安装

> 安装云标签：

```bash
npm install hexo-tag-cloud@^2.0.* --save 
```

## 2.基本配置
在主题配置文件 `_config.yml` 中，添加：

```yaml
menu:
  主页: /
  标签: /tags
  分类: /categories
```

## 3. 构建

### 3.1.分类

- 打开 `DOS` 窗口或 `git bash`，输入以下命令：

```bash
hexo new page 'categories'
```
- 打开 `source\categories\index.md` 文件，修改如下：

```mark
---
title: 分类
date: 2020-02-14 22:18:16
type: categories
layout: "categories"
toc: false
comments: false
---
```

### 3.2.标签 

- 同样，输入：

```bash
hexo new page 'tags'
```
- 打开 `source\tags\index.md` 文件，修改如下：

```mark
---
title: 标签
date: 2020-02-14 22:20:43
type: tags
layout: "tags"
comments: false
---
```

## 4.页面配置

- 打开 `scaffolds/` 目录下的 `post.md` 文件，添加：

```mark
toc: true   
tags: {{ tags }}
categories:
```

### 方式一：组合配置

- **方法1：修改文件 `article.ejs`**

在文件 `themes\yilia-plus\layout\_partial\article.ejs` 中，找到 `class="article-entry"`，添加：

```html
<% if (page.path === "tags/index.html"){ %>  
  <!-- 这里也可用type去判断，放在tags标签页或者categories分类页都可以 -->
    <hr>
    <br>
    <%- list_categories({
        depth: 1,
    }) %>
    <div class="tags">
        <%- tagcloud({
            min_font: 16, 
            max_font: 35, 
            amount: 999, 
            color: true, 
            start_color: 'blue', 
            end_color: 'gray',
        }) %>
    </div>
    
    <!-- 这里也可以放进css文件中，这样阅读性好些 -->
    <style>
        .category-list li{
            display: inline-block;
            margin: 0 1em .5em 0;
            padding: 4px;
            border: 1px solid green;
            font-size: 1.2em;
        }
        .category-list a {
            color: #ffffff;
        }
        .category-list-item {
          background-color: #55daff;
          border-radius: 15%;
          opacity:0.5; 
        }

        .category-list-item:hover a {
            color: #c16431;
            text-decoration: none;
            font-weight: bold;
        }
        .category-list-count {
            margin-left: 2px;
            font-size: .9em;
        }
        .article-entry ul li:before{
            display: none;
        }
        
        .tags {
            max-width: 40em;
            margin: 2em auto;
            margin-top: 0em;
        }
        .tags a {
            margin-right: 1em;
            border-bottom: 1px solid blue;
            line-height: 65px;
            white-space: nowrap;
        }
        .tags a:hover {
            border-bottom: 2px solid green;
            font-style: italic;
            color: #22323a;
            text-decoration: none;
        }
    </style>
<% } %>
```

- **方法2：新建文件 `tags.ejs` 或者 `categories.ejs`**

如果不想在 `article.ejs` 或分类、标签模板页面中显示，可以在 `themes\yilia-plus\layout` 目录下，新建文件 `tags.ejs` 或者 `categories.ejs`。

在其中添加如下代码：

```html
<article class="article article-type-post show">
  <header class="article-header" style="border-bottom: 1px solid #ccc">
    <h1 class="article-title" itemprop="name">分类归档</h1>

  </header>
  
  <div align=center>
    <nav>
      <font size="4" color="rgba(34, 177, 48)">
        文章 [<%=site.posts.length%>] &emsp;&emsp;
        分类 [<%=site.categories.length%>] &emsp;&emsp;
        标签 [<%=site.tags.length%>]
      </font>
    </nav>
  </div>

  <br>
  <center><strong><font size="5" color="#228B66"><%= page.title %></font> </strong></center>

  <% if (site.categories.length){ %>
    <ul class="category-list">
      <p style='color:lightyellow'>共计&nbsp;<%= site.categories.length %>&nbsp;个分类</p>
      <br>
      <% site.categories.sort('name').each(function(item){ %>
        <% if(item.posts.length){ %>
          <li class="category-list-item">
            <a href="<%- config.root %><%- item.path %>" class="category-list-link" title="<%= item.name %>">
              <%= item.name %>
              <span class="category-list-count"><sup>[<%= item.posts.length %>]</sup></span>
            </a>
          </li>
        <% } %>
      <% }) %>
    </ul>
  <% } %>
  
  <center><strong><font size="5" color="#228B22">标签云 </font> </strong></center>

  <div align=center>
    <% if (site.tags.length) { %>
      <br>
      <p style='color:lightyellow'>共计&nbsp;<%= site.tags.length %>&nbsp;个标签</p>

      <div class="tag-cloud">
        <%- tagcloud({
          min_font: 15, 
          max_font: 25, 
          amount: 999,
          start_color: 'blue', 
          end_color: 'gray',
        }) %>
      </div>

    <% } %>
  </div>

</article>
```

接下来，和之前一样，加入css代码就行，无论放在新建文件中还是css文件都可以(可用过路径 `themes\yilia-plus\layout\_partial\css.ejs` 查看)。

### 方式二：分开布局

- **方法1：修改文件 `article.ejs`**

在文件 `themes\yilia-plus\layout\_partial\article.ejs` 中，找到 `class="article-entry"`，添加：

```
<% if (page.type === "tags") { %>
  <div class="tag-cloud">
    <div class="tag-cloud-title">
    <%- "TOTAl : " + site.tags.length %>
    </div>
 
    <div class="tag-cloud-tags">
    <%- tagcloud({
      min_font: 12,
      max_font: 30,
      amount: 200,
      color: true,
      start_color: '#555',
      end_color: '#111'
      }) %>
    </div>
  </div>
 
  <% } else if (page.type === 'categories') { %>
 
  <div class="category-all-page">
    <div class="category-all-title">
    <%- "TOTAL : " + site.categories.length %>
    </div>
 
    <div class="category-all">
    <%- list_categories() %>
    </div>
 
  </div>
<% } %>
```

在样式文件 `themes\yilia-plus\source\main.b8fa34.css` 中，添加：

```css
.category-all-page {
  a:link {
    font-size: 14px;
    color: #333;
    text-decoration: none;
  }
  a:hover {
    font-size: 14px;
    color: #d8d;
    text-decoration: none;
    font-weight: bold;
  }
  .category-all-title { text-align: left; }
 
  .category-all { 
    margin-top: 20px; 
  }
 
  .category-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
 
  .category-list-item { 
    text-align: center;
    display: inline-block;
    margin: 8px; 
    padding: 8px;
    width: 150px;
    position: relative;
    background-color: rgba(237, 237, 237, 0.53);
    border-radius: 1px;
    box-shadow:0px 0px  0px 1px #ccc;
  }
 
  .category-list-link {
    color: #333;
  }
 
  .category-list-count {
    color: #333;
    &:before {
      display: inline;
      content: " ("
    }
    &:after {
      display: inline;
      content: ") "
    }
  }
 
  .category-list-child { padding-left: 10px; color: #333;}
}
```

- **方法2：新建文件 `tags.ejs` 与 `categories.ejs`**

如果不想在 `article.ejs` 或分类、标签模板页面中显示，可以在 `themes\yilia-plus\layout` 目录下，新建文件 `tags.ejs` 与 `categories.ejs`。

在 `tags.ejs` 添加如下代码：

```html
<article class="article article-type-post show">
  <header class="article-header" style="border-bottom: 1px solid #ccc">
    <h1 class="article-title" itemprop="name">标签</h1>

  </header>

  <% if (site.tags.length) { %>
    <div class="tag-cloud">
      <div class="tag-cloud-title">
        <%- "TOTAl : " + site.tags.length %>
        <br>
        <br>
      </div>

      <div class="tag-cloud-tags"> 
        <%- tagcloud({
          min_font: 12,
          max_font: 30,
          amount: 200,
          color: true,
          start_color: '#555',
          end_color: '#111'
          }) %>
      </div>
    </div>
  <% } %>
  
</article>
```

在 `categories.ejs` 添加如下代码：

```html
<article class="article article-type-post show">
  <header class="article-header" style="border-bottom: 1px solid #ccc">
    <h1 class="article-title" itemprop="name">分类</h1>

  </header>

  <% if (site.categories.length){ %>
    <div class="category-all-page">
    <div class="category-all-title">
    <%- "TOTAL : " + site.categories.length %>
    </div>
 
    <div class="category-all">
    <%- list_categories() %>
    </div>
 
  </div>
  <% } %>
  
</article>
```

接下来，和之前一样，加入css代码就行(可用过路径 `themes\yilia-plus\layout\_partial\css.ejs` 查看)。


---