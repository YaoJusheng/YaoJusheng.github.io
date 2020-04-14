---
title: web前端（五）：CSS布局之Grid网格布局
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: 2db465c1
date: 2020-04-07 18:56:01
tags:
  - css布局
  - grid布局
categories:
  - [编程]
  - [前端]
---

> 以下资料来源于网络。

<!-- more -->

## 1.简介
CSS网格布局（又名“网格”）是一个二维的基于网格的布局系统，其目的只在于完全改变我们设计基于网格的用户界面的方式。

* Grid是第一个专门为解决布局问题而生的CSS模块

* 雷切尔·安德鲁（Rachel Andrew）的书[为CSS Grid布局准备](http://abookapart.com/products/get-ready-for-css-grid-layout)。 这本书对网格布局做了彻底、清晰的介绍，也是是整篇文章的基础。
*  Chris Coyier的[Flexbox完全指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)。

## 2.常用术语
在深入了解网格的概念之前，理解术语是很重要的。 由于这里所涉及的术语在概念上都是相似的，如果不先记住它们在网格规范中定义的含义，则很容易将它们彼此混淆。

### 2.1. 网格容器`Grid Container`

设置了 `display: gird` 的元素。 这是所有 grid item 的直接父项。 在下面的例子中，`.container` 就是是 grid container。

```html
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
```



### 2.2. 网格项目`Grid Item`

Grid 容器的孩子（直接子元素）。下面的 `.item` 元素就是 grid item，但 `.sub-item`不是

```html
<div class="container">
  <div class="item"></div> 
  <div class="item">
    <p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```

### 2.3. 网格线`Grid Line`

这个分界线组成网格结构。 它们既可以是垂直的（“column grid lines”），也可以是水平的（“row grid lines”），并位于行或列的任一侧。 下面例中的黄线就是一个列网格线

![表格线](../2db465c1/grid_line.jpeg)

### 2.4. 网格轨道`Grid Track`

两个相邻网格线之间的空间。 你可以把它们想象成网格的列或行。 下面是第二行和第三行网格线之间的网格轨道

![网格轨道](../2db465c1/gird_track.jpeg)

### 2.5. 网格单元`Grid Cell`

两个相邻的行和两个相邻的列网格线之间的空间。它是网格的一个“单元”。 下面是行网格线1和2之间以及列网格线2和3的网格单元。

![网格单元](../2db465c1/grid_cell.jpeg)

### 2.6. 网格区域`Grid Area`

四个网格线包围的总空间。 网格区域可以由任意数量的网格单元组成。 下面是行网格线1和3以及列网格线1和3之间的网格区域

![网格区域](../2db465c1/grid-area.jpeg)

## 3.Grid容器属性

**Grid Container 的全部属性**

* <font color="blue">display</font>: 显示样式选择，如：grid | inline-grid | subgrid;
  * **`grid`**:  生成一个块级(block-level)网格
  * **`inline-grid`**:  生成一个行级(inline-level)网格
  * **`subgrid`**:  如果你的 grid container 本身就是一个 grid item（即,嵌套网格），你可以使用这个属性来表示你想从它的父节点获取它的行/列的大小，而不是指定它自己的大小。
* <font color="blue">grid-template-columns</font>：以空格分隔的多个值来定义网格的列。这些值表示轨道大小(track size)，它们之间的空格代表表格线(grid line)；
* <font color="blue">grid-template-rows</font>：以空格分隔的多个值来定义网格的行。这些值表示轨道大小(track size)，它们之间的空格代表表格线(grid line)；
* <font color="blue">grid-template-areas</font>：指定的网格区域的名称来定义网格模板（网格区域的名称）；
  * **`<grid-area-name>`** – 使用 grid-area 属性设置的网格区域的名称
  * **`.`** – 点号代表一个空网格单元
  * **none** – 没有定义网格区域
* <font color="blue">grid-template</font>：在单个声明中定义 grid-template-rows、grid-template-columns、grid-template-areas 的简写；
  * **none** – 将三个属性都设置为其初始值
  * **subgrid** – 把 grid-template-rows 和 grid-template-columns 设置为 subgrid, 并且 grid-template-areas 设置为初始值
  * **`grid-template-rows` / `<grid-template-columns`** – 把 grid-template-columns 和 grid-template-rows 设置为指定值, 与此同时, 设置 grid-template-areas 为 none
* <font color="blue">grid-column-gap</font>：网格线的大小，即设置列之间的间距的宽度；
* <font color="blue">grid-row-gap</font>：网格线的大小，即设置行之间的间距的宽度；
* <font color="blue">grid-gap</font>：grid-row-gap 和 grid-column-gap 的缩写；
* <font color="blue">justify-items</font>：沿着行轴对齐网格内的内容，该值适用于容器内的所有的 grid items，如：start | end | center | stretch；
  * **start**: 内容与网格区域的左端对齐
  * **end**: 内容与网格区域的右端对齐
  * **center**: 内容位于网格区域的中间位置
  * **stretch**: 内容宽度占据整个网格区域空间(这是默认值)
* <font color="blue">align-items</font>：沿着列轴对齐网格内的内容，该值适用于容器内的所有的 grid items；
  * **start**: 内容与网格区域的顶端对齐
  * **end**: 内容与网格区域的底部对齐
  * **center**: 内容位于网格区域的垂直中心位置
  * **stretch**: 内容高度占据整个网格区域空间(这是默认值)
* <font color="blue">justify-content</font>：沿着行轴对齐网格，设置网格容器内的网格的对齐方式；
  * **start** – 网格与网格容器的左边对齐
  * **end** – 网格与网格容器的右边对齐
  * **center** – 网格与网格容器的中间对齐
  * **stretch** – 调整g rid item 的大小，让宽度填充整个网格容器
  * **space-around** – 在 grid item 之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半
  * **space-between** – 在 grid item 之间设置均等宽度空白间隙，其外边缘无间隙
  * **space-evenly** – 在每个 grid item 之间设置均等宽度的空白间隙，包括外边缘
* <font color="blue">align-content</font>：沿着列轴对齐网格，设置网格容器内的网格的对齐方式；
  * **start** – 网格与网格容器的顶部对齐
  * **end** – 网格与网格容器的底部对齐
  * **center** – 网格与网格容器的中间对齐
  * **stretch** – 调整 grid item 的大小，让高度填充整个网格容器
  * **space-around** – 在 grid item 之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半
  * **space-between** – 在 grid item 之间设置均等宽度空白间隙，其外边缘无间隙
  * **space-evenly** – 在每个 grid item 之间设置均等宽度的空白间隙，包括外边缘
* <font color="blue">grid-auto-columns</font>：指定自动生成的网格轨道（又名隐式网格轨道）的大小，隐式网格轨道在你显式的定位超出指定网格范围的行或列（使用 grid-template-rows/grid-template-columns）时被创建；
* <font color="blue">grid-auto-rows</font>：指定自动生成的网格轨道（又名隐式网格轨道）的大小，隐式网格轨道在你显式的定位超出指定网格范围的行或列（使用 grid-template-rows/grid-template-columns）时被创建；
* <font color="blue">grid-auto-flow</font>：如果你存在没有显示指明放置在网格上的 grid item，则自动放置算法会自动放置这些项目；
  * **row** – 告诉自动布局算法依次填充每行，根据需要添加新行
  * **column** – 告诉自动布局算法依次填充每列，根据需要添加新列
  * **dense** – 告诉自动布局算法，如果后面出现较小的 grid item，则尝试在网格中填充空洞
* <font color="blue">grid</font>：设置所有以下属性的简写：grid-template-rows，grid-template-columns，grid-template-areas，grid-auto-rows，grid-auto-columns和grid-auto-flow。 它同时也将 sets grid-column-gap 和 grid-row-gap 设置为它们的初始值；

## 4.Grid项目属性

**Grid Items 的全部属性**

* <font color="blue">grid-column-start</font>：表示 `grid item` 的网格线的列起始位置；
* <font color="blue">grid-column-end</font>：表示 `grid item` 的网格线的列终止位置；
* <font color="blue">grid-row-start</font>：表示 `grid item` 的网格线的行起始位置；
* <font color="blue">grid-row-end</font>：表示 `grid item` 的网格线的行终止位置；
  * **`<line>`**: 可以是一个数字来指代相应编号的网格线，也可使用名称指代相应命名的网格线
  * **`span <number>`**: 网格项将跨越指定数量的网格轨道
  * **`span <name>`**: 网格项将跨越一些轨道，直到碰到指定命名的网格线
  * **auto**: 自动布局， 或者自动跨越， 或者跨越一个默认的轨道

```css
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}
```
* <font color="blue">grid-column</font>：`grid-column-start` + `grid-column-end` 的简写形式；
* <font color="blue">grid-row</font>：`grid-row-start` + `grid-row-end` 的简写形式；
  * **`<start-line>` / `<end-line>`** – 每个值的用法都和属性分开写时的用法一样

```css
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
```
* <font color="blue">grid-area</font>：给 `grid item` 进行命名以便于使用 `grid-template-areas` 属性创建模板时来进行引用，也可以做为 `grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end` 的简写形式；
  * **`<name>`** – 你的命名
  * **`<row-start>` / `<column-start>` / `<row-end>` / `<column-end>`** – 可以是数字，也可以是网格线的名字

```css
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```
* <font color="blue">justify-self</font>：沿着行轴对齐 `grid item` 里的内容，此属性对单个网格项内的内容生效；
  * **start** – 将内容对齐到网格区域的左端
  * **end** – 将内容对齐到网格区域的右端
  * **center** – 将内容对齐到网格区域的中间
  * **stretch** – 填充网格区域的宽度 (这是默认值)
* <font color="blue">align-self</font>：沿列轴对齐 `grid item` 里的内容，此属性对单个网格项内的内容生效；
  * **start** – 将内容对齐到网格区域的左端
  * **end** – 将内容对齐到网格区域的右端
  * **center** – 将内容对齐到网格区域的中间
  * **stretch** – 填充网格区域的宽度 (这是默认值)

## 5.三列布局案例

![最终效果图](../2db465c1/layout1.jpg)

### 5.1. HTML结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
  	<link rel="stylesheet" href="style.css">
    <title>简单的三列布局</title>
</head>
<body>
<header class="header">头部</header>
<aside class="left">左边栏</aside>
<main class="content">主体内容区</main>
<aside class="right">右边栏</aside>
<footer class="footer">底部</footer>
</body>
</html>
```

### 5.2. CSS代码

```css
/* style.css */
body {
  /*设置body元素采用网格布局*/
  display: grid;

  /*行模板: 第一行60px,第二行750px, 第三行60px*/
  grid-template-rows: 60px 750px 60px;

  /*列模板: 第一列200px,第2列自动扩展, 第3列200px*/
  grid-template-columns: 200px auto 200px;

  /*设置行间距:10px*/
  grid-row-gap: 10px;

  /*设置列间距: 10px*/
  grid-column-gap: 10px;
}

.header {
  /*网格区域命名*/
  grid-area: my-header;

  /*参考背景色*/
  background-color: lightgreen;
}
.footer {
  /*网格区域命名*/
  grid-area: my-footer;

  /*参考背景色*/
  background-color: lightgreen;
}

.left {
  /*网格区域命名*/
  grid-area: my-left;

  /*参考背景色*/
  background-color: lightblue;
}

.right {
  /*网格区域命名*/
  grid-area: my-right;

  /*参考背景色*/
  background-color: lightblue;
}

.content {
  /*网格区域命名*/
  grid-area: my-content;

  /*参考背景色*/
  background-color: coral;
}


/*设置网格区域: 非常直观*/
body {
  /*网格区域名称相同, 意味着合并*/
  grid-template-areas:
    "my-header  my-header   my-header"
    "my-left    my-content    my-right"
    "my-footer  my-footer   my-footer"
}
```

  ---