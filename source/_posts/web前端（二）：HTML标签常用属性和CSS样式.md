---
title: web前端（二）：HTML标签常用属性和CSS样式
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
abbrlink: 9d4c0047
date: 2020-04-06 21:26:48
tags:
  - HTML
  - 属性样式
categories:
  - [编程]
  - [前端]
---

> 本文主要记录一下HTML标签的常用属性和CSS样式。

<!-- more -->

## 1.一些特殊标签

|标签| 描述 |
|--|--|
| `<b>` | 粗体字 |
| `<strong>` | 粗体字，强调 |
| `<i>` | 斜体字 |
| `<em>` | 斜体字，强调 |
| `<dfn>` | 斜体定义 |
| `<u>` | 底线 |
| `<ins>` | 底线，插入文字 |
| `<strike>` | 横线 |
| `<s>`、`<del>` | 删除线 |
| `<kbd>` | 键盘文字 |
| `<tt>` | 打字体，H5不支持 |
| `<xmp>` | 固定宽度的字体，在文件中空白，换行 |
| `<pre>` | 预格式化 |
| `<code>` | 源代码 |
| ... | ... |

## 2.常用属性及样式

### 2.1. 背景、颜色

- background：背景
- color：颜色，可用颜色名称、16进制、rgb元组表示
- opacity：透明度，也可用rgba()的第四参数指定，filter可添加可视效果

### 2.2. 形状边界

- width/height：宽/高，同时有最大/小值、比例等设置
- border-radius：圆角
- border-shadow：添加阴影
- border-image：边界图片，不支持IE
- resize：调整尺寸，由用户调整，IE不兼容，e.g.：resize:both;...
- box-sizing：方框大小调整，以确切方式定义适应某区域具体内容
- outline-offset：对轮廓进行偏移，并在超出边缘的位置绘制轮廓

### 2.3. 位置排布

- top/right/bottom/left：上/右/下/左
- position：位置布局，relative - 相对、absolute - 绝对
- float：浮动
- display：显示样式，如：none、block、inline、inherit、flex ...
- align/text-align/vertical-align：位置显示设置
- margin/padding：外/内 边距
- transform：元素空间位置变换

### 2.4. 文本效果

- @font-face规则：可通过font-family指定字体类型，src指定字体url，font-weight指定字体粗细等等
- text-shadow：文本阴影
- box-shadow：盒子阴影
- text-overflow：定义如何显示溢出内容
- word-wrap：允许文本换行
- word-break：单词拆分换行属性，指定换行规则

### 2.5. 2/3D转换

+ 2D：
  - translate()方法：根据左（X）轴和顶（Y）轴位置参数，从当前位置移动
  - rotate()方法：对于给定参数的元素，顺/逆时针旋转
  - scale()方法：对给定参数（x,y）的元素增加或减少大小
  - skew()方法：（x,y）对应两轴的倾斜角
  - ...
+ 3D:
  - matrix()方法：有六个参数，为合并方法，包含上述功能
  - rotateX()方法：围绕一个给定度数的X轴旋转元素
  - rotateY()方法：围绕一个给定度数的Y轴旋转元素
  - ...

  ---
