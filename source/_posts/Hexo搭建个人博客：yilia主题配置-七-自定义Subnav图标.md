---
title: Hexo搭建个人博客：yilia主题配置(七) - 自定义Subnav图标
toc: true
top: true
order_by:
  - top: 1
  - date: -1
tags:
  - yilia
  - Subnav图标
categories:
  - [网站]
  - [Hexo]
abbrlink: ccdc2da1
date: 2020-02-24 14:52:35
---

yilia是一款非常不错的博客主题，它满足几乎大多数博主对个人博客网站的要求，主题作者推崇简约模式，设计的界面非常nice！

<!-- more -->
入门要求比较低，适合所有人群，并且可以自己定制喜欢的分风格，比如添加特效、插件等等。

子导航几乎集成了大多社交网站的图标，不过还有些并未补充，这里主要介绍一下如何在子导航社交界面添加自定义的图标。

# 制作图片文字

## 1.下载社交网站图标

去网上搜索想要编辑的社交网站图标，有的网站图标，在浏览器中按 `F12` 找到图标位置，是有可能找到图标网址的，这时直接下载（如码云），如果没有可以到一些知名搜索引擎查找，或者到 [EasyIcon](https://www.easyicon.net/
) 网站搜索。

{% asset_img easyicon.png This is easyicon site image %}


## 2.编辑图标

### 2.1.复制 `iconfont.svg` 到下载目录

打开文件目录 `themes\yilia\source-src\css\fonts`，找到 `iconfont.svg` 并复制到下载目录。

### 2.2.打开[百度字体编辑器](http://fontstore.baidu.com/static/editor/index.html)

编辑刚刚下载的图标，点 `[新建]`，创建一个新项目。然后，点中间的 `[导入]`，选择 `[导入svg]`，把刚才拷贝过来的 `iconfont.svg` 导入进，导入完毕后，就出现了yilia自带的图标文字：

{% asset_img yilia.png This is yilia image %}

导入下载好的社交网站图片(需要加入的图片，可以是SVG格式的图片)，调整大小位置，保存并退出，我导入的是码云网站的图片，如图：

{% asset_img subnav-gitee.png This is yilia image %}

接着，选中刚编辑完的图片，在左上角点击 `[字形信息]` ，输入`[Unicode]`和`[图标名]`，记下来，会在css文件中用到，最后，点击 `[保存项目]`，下载 `[ZIP]` 压缩包。

{% asset_img gitee-font.png This is font image %}

## 3.配置hexo主题

### 3.1.解压刚刚下载的 `[ZIP]` 压缩包

保留 `eot`，`svg`，`ttf`，`woff` 这四个文件。

### 3.2.修改css文件

- 到 `/themes/yilia/source-src/css` 中，修改 `font.scss` 和 `main.0cf68a.css`，添加：

```html
.icon-gitee:before {
  content: "\E87A"
}

.icon-statistics:before {
  content: "\E87B";
}
```
即 `.icon-yourApp:before{ content: “刚才的unicode”}`。

- 修改 `/themes/yilia/source-src/css/social.scss` 文件，添加：

```html
a.gitee {
  background: #086ef6;
  border:1px solid #086ef6;
  &:hover {
      border:1px solid #086ef6;
  }
}
a.statistics {
  background: #333435;
  border:1px solid #086ef6;
  &:hover {
      border:1px solid #086ef6;
  }
}
```
即 `a.yourApp:before{颜色配置}`。

### 3.3.更新子导航配置

修改 `yilia` 主题配置文件 `_config.yml`，在subnav下添加图标名和链接：

```html
# subNav-子导航
subNav:
  gitee: ''  # 码云
```

### 3.4.更新图标配置

将上面的4个文件重命名后，替换 `/themes/yilia/source-src/css/fonts` 目录下的原文件。

然后，控制台切换目录到 `themes/yilia` 下，

- 安装依赖：
```bash
nom install
```

- 运行打包命令：
```bash
npm run dev
```

- 如果打包成功，执行：
```bash
npm run dist
```

回到Hexo根目录，重新生成部署 `hexo s -g` 就行了

***错误Error：***

**1.`npm install` 时，`node-sass` 错误**

如果出现 `node-sass@4.13.1 postinstall: node scripts/build.js, Failed at the node-sass@4.13.1` 这样的提示，可能是安装源的问题，修改源后再安装：

```bash
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass

npm install
```
如果还有问题，出现 `./source is not an absolute path` 错误，修改 `webpack.config.js` 文件，在 `module.exports`中，改成：

```
output: {
    path: __dirname + "./source",
    publicPath: "./",
    filename: "[name].[chunkhash:6].js"
  }
```

**2.`npm run dev` 时，`node-sass` 错误**

先卸载，再重装，或者重建。
```bash
npm uninstall node-sass
npm install node-sass
npm rebuild node-sass
```
如果错误信息是 `permission denied` ，执行：
```bash
npm install node-sass --unsafe-perm --save-dev
```

**3.`npm run dist` 报错**

检查node版本。


---

> 参考：
> [yilia 添加社交图标](https://ainimini.github.io/2019/07/07/Hexo-yilia%E4%B8%BB%E9%A2%98-%E6%B7%BB%E5%8A%A0-Subnav-%E7%A4%BE%E4%BA%A4%E5%9B%BE%E6%A0%87/)
> [npm 安装报错](https://blog.csdn.net/shine_a/article/details/103133384)
> [`output.path` Error](https://stackoverflow.com/questions/42166492/getting-error-output-path-needs-to-be-an-absolute-path-or)