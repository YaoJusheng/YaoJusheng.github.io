---
title: web前端（三）：CSS布局之双飞翼、圣杯布局
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: d533509a
date: 2020-04-07 14:53:59
tags:
  - CSS布局
  - 圣杯布局
  - 双飞翼布局
categories:
  - [编程]
  - [前端]
---

> 本文简单整理一下前端样式中的经典布局方式。

<!-- more -->

## 1.三栏布局
所谓的 '三栏布局'， 即：左右两栏固定宽度，中间部分自适应的布局方式。

### 1.1.相同点
双飞翼与圣杯布局的相同点：
- 都是浮动布局，在实现三栏布局；
- 左右两边加上负的margin值，使之与中间并排；
- 中间盒子优先渲染，两边的盒子框子固定不变，即使页面宽度变小，也不影响浏览。

### 1.2.不同点

- 圣杯布局：通过父容器的内边距（padding）来实现各列的间隙；
- 双飞翼布局：通过新建的div的外边距（margin）隔离各列。


## 2.圣杯布局
**实现方式**：
- 三者都设置向左浮动，脱离文档流，且设置 `position: relative;`
- 设置 `main` 宽度为100%；
- 设置 负边距，`left` 设置负左边距为自身宽度，`right` 设置负右边距为自身宽度；
- `container` 设置 `padding: 0, rightWidth, 0, leftWidth;`，给左右两个子面板留出空间，同时 设置`overflow: hidden;`

```html
<div id="container">
  <div class="main">middle</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

## 3.双飞翼布局
**实现方式**：
- 三者都设置向左浮动，脱离文档流；
- 设置 `main-wraper` 宽度为100%；
- 设置 负边距，`left` 设置 `margin-left: -100%`，`right` 设置 `margin-left:` 为负的自身宽度；
- `container` 设置 `margin: 0, rightWidth, 0, leftWidth;`，给左右两个子面板留出空间，同时 设置`overflow: hidden;`

```html
<div id="container">
  <div class="main-wraper">
    <div class="main">middle</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```


> 参考：[知乎](https://www.zhihu.com/question/21504052)、[掘金](https://juejin.im/post/5caf4043f265da039f0eff94)

---