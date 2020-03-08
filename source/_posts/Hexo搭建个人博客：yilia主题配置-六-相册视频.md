---
title: Hexo搭建个人博客：yilia主题配置(六) - 添加相册
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 89f1ac35
date: 2020-02-24 14:29:27
tags:
  - yilia
  - 相册视频
categories:
  - [网站]
  - [Hexo]
---

创建相册等页面的的大体思路：1.本地存储图片，直接引用；2.使用GitHub存储相册；3.使用七牛云存储相册 ...

<!-- more -->

> 本文主要讲述关于GitHub存储相册的大概思路

网上大体思路都差不多，之前找了一个别人的相册代码仓，修改了一下其中的脚本，可以参考：[相册脚本](https://github.com/YaoJusheng/blog_photos)，也可以到网上去搜其他的，下载到本地。

## 1.创建相册仓库
到GitHub上或者码云，新建仓库，取名随意。

## 2.本地关联
初始化仓库，关联刚创的远程仓库，将之前下载的demo复制过来，几个重要的文件：*.py，js、css文件，empty.png，以及json文件。
创建两个空目录，`min_photos`、`photos`，用来存放照片，本地操作时，将照片按照时间日期的方式命名（e.g.: 2018-06-08_描述.png），
然后放到 `photos` 目录中。

## 3.生成图片信息
修改 `ins.js` ，找到 `var minSrc` 和 ` var src` 这两个变量，修改成自己的GitHub地址：

```javascript
var minSrc = 'https://raw.githubusercontent.com/{Github ID}/{repo}/{branch}/min_photos/' + data.link[i];
var src = 'https://raw.githubusercontent.com/{Github ID}/{repo}/{branch}/photos/' + data.link[i];
```

运行脚本 `tool.py`:
```bash
python tool.py
```
生成 `data.json` 文件，这就是图片信息文件。

## 4.创建页面
### 4.1.生成相册页面

cmd或bash窗口，输入命令：
```
hexo new page 'photos'
```

### 4.2.主题文件修改

在menu菜单，添加：
```yaml
相册: /photos
```

### 4.3.放置页面配置文件

- 将js、css以及json文件放到 `source/photos` 目录下；
- 在 `source` 目录下，依次创建 `assets/img` 目录，将 `empty.png` 放置到该目录下；
> Tips: 注意根目录的root配置，如果root不是根路径 `/`，则ins.js要相应更改，避免 `empty.png` 文件找不到。
