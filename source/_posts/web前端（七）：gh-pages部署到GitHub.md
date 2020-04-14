---
title: web前端（七）：gh-pages部署到GitHub
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
tags:
  - gh-pages
categories:
  - - 编程
  - - 前端
abbrlink: ff075d55
date: 2020-04-09 21:49:29
---

有时需要将一些前端静态资源部署到GitHub上，如博客、在线简历这类的情况。
这只涉及一些简单的页面和静态文件，为了减少一些脚本的使用，前端有gh-pages这样一个模块，可以帮助部署到GitHub上。

<!-- more -->

## 1.注册 `GitHub` 账号
确保有一个GitHub账号，新建仓库，并设置与本地关联，具体步骤参考网上的资料。

## 2.创建 `gh-pages` 分支

为了不影响项目的开发，在 `GitHub` 上创建一个 gh-pages 分支。

```bash
git checkout --orphan gh-pages 
git remote add origin {远程仓}   # 添加关联
git push origin gh-pages        # 推送远程
```

## 3.安装 `node.js`
确保有 `node` 环境，安装 `npm`，一般安装nodejs的安装包都集成了。
将 `node` 和 `npm` 添加到环境变量，具体流程可去网上搜索。
这里推荐一款修改Windows环境变量的软件：[rapidee](https://www.rapidee.com/en/download)

## 4.安装插件 `gh-pages`

```bash
cd project_path  # 进入项目目录
npm install gh-pages --save
```

## 5.修改 `package.json`

```json
{
  //配置homepage
  "homepage":"https://yaojusheng.github.io/dynamic-resume",
  //配置scripts
  "scripts":{
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "predeploy":"npm run build",
    "deploy":"gh-pages -d public"
  },
}
```

## 6.修改 `config/index.js`

```js
build: {
  ...,
  assetsPublicPath: ''  // 置空
},
```

## 6.推送到 `gh-pages` 分支

```bash
npm run deploy
```

## 7.设置 `GitHub Pages` 的 `source`

点击项目的 `Settings` 按钮，找到 `GitHub Pages` 选项，然后选择之前创建的 `gh-pages` 分支作为 `source`，等待部署完成。


---