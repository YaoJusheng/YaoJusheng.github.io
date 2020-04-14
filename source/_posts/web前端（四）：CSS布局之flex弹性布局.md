---
title: web前端（四）：CSS布局之flex弹性布局
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: 1155e3cf
date: 2020-04-07 16:55:27
tags:
  - css布局
  - flex布局
categories:
  - [编程]
  - [前端]
---

* 布局的传统解决方案，基于[盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model)，依赖 [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) 属性 + [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性 + [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性。
* 它对于那些特殊布局非常不方便，比如，[垂直居中](https://css-tricks.com/centering-css-complete-guide/)就不容易实现。

<!-- more -->

> 2009年, W3C提出一个新方案: Flex布局

## 1.Flex 简介
Flex 是 **Flexible Box**的缩写, 意思是"**弹性布局**", 用来为盒状模型提供最大的布局灵活性，任何一个容器都可以设置为`Flex`布局模式。

```css
/* 块元素可以设置为Flex容器 */
.container {
  display: flex;
}

/*内联元素也可以设置为Flex*/
span {
  display: inline-flex;
}

/* WebKit内核浏览器,如Safari, 需要加前缀*/
div {
  display: -webkit-flex;	/*Safari*/
  display: lfex;
}
```

<font face="微软雅黑" color=Blue>**Tips**:</font>
* 一旦设置为Flex容器, 则容器内子元素的`float`, `clear`, `vertical-align`属性则全部失去效果
* 布局演变史: 表格布局`table` -> 定位布局`positon` -> 浮动布局`float` -> 弹性布局`flex` -> 网格布局`grid`

## 2.基本术语

### 2.1.Flex容器(flex container)
采用`flex`布局的元素, 称为`flex容器`, 简称**容器**

### 2.2.Flex项目(flex item)
Flex容器中的所有成员(子元素)会自动成为该容器的成员，称为`flex项目`，简称**项目**。
flex项目都支持宽高设置, 哪怕它之前是内联元素，类似于浮动元素。

```html
<style>
  /*flex容器*/
  .contaier {
    display: flex;
  }
  /*flex项目*/
  .item {
    ...
  }
</style>
...
<div class="container">
  <span class="item">item1</span>
  <span class="item">item2</span>
  <span class="item">item3</span>
</div>
```

### 2.3.主轴(main axis)
主轴也叫水平轴, 横轴,x轴
* `main start`: 起始位置
* `main end`: 结束位置
* `main size`: 单个项目占据的主轴空间

### 2.4.交叉轴(cross axis)
交叉轴也叫垂直轴,坚轴,y轴
* `cross start`: 起始位置
* `cross end`: 结束位置
* `cross size`: 单个项目占据的交叉轴空间

{% asset_img bg2015071004.png 图例 %}

## 3.Flex容器属性

**容器属性汇总:**

| 序号 | 属性            | 描述                    |
| :--: | :-------------- | :----------------------------------------------- |
|  1   | flex-direction  | 主轴方向(即项目排列方向)                         |
|  2   | flex-wrap       | 当多个项目在一行排列不下时,如何换行              |
|  3   | flex-flow       | flex-direction,flex-wrap的简写,默认:`row nowrap` |
|  4   | justify-content | 项目在主轴上对齐方式                             |
|  5   | align-items     | 项目在交叉轴上的对齐方式                         |
|  6   | align-content   | 项目在多根轴线上的对齐方式,只有一根轴线无效      |

---

### 3.1.flex-direction
* **功能**: 决定项目在主轴上的排列方向
* 它有四个可能的值:

| 序号 | 属性值         | 描述                             |
| ---- | -------------- | -------------------------------- |
| 1    | row 默认值     | 主轴为水平方向,起点在左边        |
| 2    | row-reverse    | 主轴为水平方向, 起点在右边(反转) |
| 3    | column         | 主轴为垂直方向, 起点在上边       |
| 4    | column-reverse | 主轴为垂直方向, 起点在下边       |

* CSS语法:

```css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
}
```
* 示意图:

![flex-direction](../1155e3cf/bg2015071005.png)

### 3.2.flex-wrap
* **功能**: 多个项目默认排列在一根轴线上,该属性定义了当一根轴线排列不下时,多作的项目的换行方式

| 序号 | 属性值        | 描述                         |
| ---- | ------------- | ----------------------- |
| 1    | nowrap 默认值 | 不换行                                     |
| 2    | wrap          | 自动换行, 第一行排列不下, 自动转到下一行   |
| 3    | wrap-reverse  | 自动反向换行, 第一行显示在下方, 与wrap相反 |

![flex-wrap](../1155e3cf/bg2015071006.png)

* CSS语法

```css
.container {
  display: flex;
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* 属性值说明:

  * `nowrap`: (默认值)不换行

  ![nowrap](../1155e3cf/bg2015071007.png)

  * `wrap`: 自动换行

  ![wrap](../1155e3cf/bg2015071008.jpg)

  * `wrap-reverse`: 自动反向换行

  ![wrap-reverse](../1155e3cf/bg2015071009.jpg)

### 3.3.flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为`row nowrap`

```css
.container {
  display: flex;
  flex-flow: [flex-direction] || [flex-wrap];
  /*默认*/
  flex-flow: row nowrap;
}
```

### 3.4. justity-content

* **功能**: 设置项目在主轴上的对齐方式
* CSS语法:

```css
.container {
  display: flex;
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

* 属性值说明

| 序号 | 属性值            | 描述              |
| ---- | ----------------- | ------------------ |
| 1    | flex-start 默认值 | 左对齐                                            |
| 2    | flex-end          | 右对齐                                            |
| 3    | center            | 居中对齐                                          |
| 4    | space-between     | 两端对齐: 项目之间间隔相等                        |
| 5    | space-around      | 项目两侧间隔相等,即项目之间间隔是项目到两端的二倍 |
| 6    | space-evenly      | 平均分配主轴上的剩余空间                          |

* 示意图:

![justify-content](../1155e3cf/bg2015071010.png)

### 3.5. align-items

* **功能:** 该属性设置项目在交叉轴上的对齐方式
* CSS语法:

```css
.container {
  display: flex;
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

* 属性值说明:

| 序号 | 属性值         | 描述         |
| ---- | -------------- | ------------------- |
| 1    | flex-start     | 与交叉轴起点对齐, 即: 顶对齐 / 上对齐                      |
| 2    | flex-end       | 与交叉轴终点对齐, 即: 底对齐 / 下对齐                      |
| 3    | center         | 与交叉轴中间线对齐, 即: 居中对齐                           |
| 4    | baseline       | 与项目中第一行文本的基线对齐, 即文本的下边线               |
| 5    | stretch 默认值 | 自动伸展到容器的高度(项目未设置高度或将高度设置为auto有效) |

* 示意图:

![align-items](../1155e3cf/bg2015071011.png)

### 3.6. align-content

* `align-items`和`align-content`有相同的功能，不过不同点是它是用来让每一个单行的容器居中而不是让整个容器居中
* `align-content`属性只适用于**多行**的flex容器，并且当交叉轴上有多余空间使flex容器内的flex线对齐
* `align-items`属性适用于所有的flex容器，它是用来设置每个flex元素在交叉轴上的默认对齐方式
* 该属性的重点,在于**多行项目**, 这是与`align-items`最重要的区别
* CSS语法:

```css
.container {
  display: flex;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

* 属性值说明:

| 序号 | 属性值         | 描述             |
| ---- | -------------- | -------------------- |
| 1    | flex-start     | 与交叉轴起点对齐                            |
| 2    | flex-end       | 与交叉轴终点对齐                            |
| 3    | center         | 与交叉轴中间点对齐                          |
| 4    | space-between  | 与交叉轴两端对齐, 轴线之间间隔相等          |
| 5    | sapce-around   | 每根轴线间隔相等,轴线间隔比轴线到边框大一倍 |
| 6    | stretch 默认值 | 轴线占满整个交叉轴                          |

* 示意图:

![align-content](../1155e3cf/bg2015071012.png)


## 4.Flex项目属性

在Flex项目也有6个可用的属性，分别是:

| 序号 | 属性        | 描述                    |
| ---- | ----------- | ------------------------ |
| 1    | order       | 定义项目排列顺序,索引越小超靠前,默认为0                      |
| 2    | flex-grow   | 定义项目的放大比例,默认为0表示不放大, 即就算存在剩余空间也不放大 |
| 3    | flex-shrink | 定义了项目的缩小比例,默认为1,即如何空间不足,则自动缩小项目来填充 |
| 4    | flex-basis  | 定义了项目占据的主轴空间,默认值为auto, 即项目原始大小        |
| 5    | flex        | 是flex-grow,flex-shrink,flex-basis简写,默认值: 0 1 auto, 后二个属性可选 |
| 6    | align-self  | 个性化定定制某单个项目的对齐方式,可覆盖容器`align-items`属性,默认auto |

---

### 4.1.order

* 定义项目的排列顺序。数值越小，排列越靠前，默认为0
* CSS语法:

```css
.item {
  order: integer;
}
```

* 示意图:

![order](../1155e3cf/bg2015071013.png)

### 4.2.flex-grow

* 设置项目的放大比例, 默认为0: 不放大,哪怕轴上有剩余空间
* CSS语法:

```css
.item {
  flex-grow: number; /* default: 0 */
}
```

* 空间分配方案小案例:
  * `flex-grow: 1`: 每个项目等分, 都占全部的空间的N分之一(N: 项目数量)
  * `flex-grow: 2`如果某个项目为2, 其它项目为1, 则它占据空间比其它项目多一倍

![flex-grow](../1155e3cf/bg2015071014.png)

### 4.3.flex-shrink

* 设置了项目的缩小比例,默认为1, 即空间不足时, 自动缩小填充
* CSS语法:

```css
.item {
  flex-shrink: number; /*defautl: 1*/
}
```

* 缩放规则
  * `flex-shrink: 1`: 所有项目都为1, 空间不足时, 自动等比例缩小填充主轴剩余空间
  * `flex-shrink`: 如果有一个项目为0, 其它项目为1, 则空间不足时, 它并不随其它项目缩小
  * 注意: 该属性不支持负值, 即`flex-shrink: -1` 无效

![flex-shrink](../1155e3cf/bg2015071015.jpg)

### 4.4.flex-basis

* 定义了在计算分配主轴上剩余空间之前, 项目占据的主轴空间(main size)
  * 浏览器根据该属性,可以计算出主轴上是否还有剩余空间, 决定是否换行
  * 默认值为`auto`, 即项目原来占据的空间大小
* CSS语法:

```css
.item {
  flex-basis: length | auto; /* default auto */
}
```

你可以设置与`height`或者`width`属性一样的绝对值,例如`500px`,则该项目占据固定的空间大小

```css
.item {
  flex-basis: 500px;
}
```

### 4.5.flex

* flex属性是前面`flex-grow`,`flex-shrink`和`flex-basis`属性的简写
* 默认值: `0  1 auto`, 除第一个外, 其它二个可选
* CSS语法:

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

* 由于该属性极其常用, 为了简化, Flex布局还为该属性设置了快捷值
  * `flex: auto`:  等价于`flex: 1 1 auto`
  * `flex: none`: 等价于`flex: 0 0 auto`
* 推荐优先使用flex属性, 由浏览器自动计算出其它属性的值

### 4.6.align-self

* 该属性允许单个项目有与其它项目不一样的对齐方式, 可覆盖掉容器的`flex-items`属性
* 默认值: `auto`,表示继承父元素的`align-items`,如果没有父元素,则等价于`stretch`
* CSS语法:

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

* 示意图:

![align-self](../1155e3cf/bg2015071016.png)

> 资源来源于网络