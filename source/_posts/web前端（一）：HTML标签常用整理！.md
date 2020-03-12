---
title: web前端（一）：HTML标签常用整理！
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
tags:
  - HTML
categories:
  - - 编程
  - - 前端
abbrlink: 895d0918
date: 2020-03-11 22:14:51
---

> 如题，本文主要描述博主对之前前端学习中HTML5标签的一些整理。
<!-- more -->

# 一、基本分类
HTML4中，元素被分成两大类: inline(内联元素)与block(块级元素)。

**1. 块级元素**

- 每个块级元素独占一行，
- 可以直接控制宽度、高度以及盒子模型的相关css属性，
- 默认情况下，其宽度为父级元素内容的宽度，
- 默认情况下，其高度为本身内容的高度。
- 常用的块级元素有：

|标签| 描述 |
|--|--|
| `<div>` | 常用块级元素，多用于布局 |
| `<h1>...<h6>` | 一到六级标题 |
| `<ol>、<ul>、<li>` | 有序列表、无序列表、列表项 |
| `<dl>、<dt>、<dd>` | 自定义列表、定义术语（列表项）、定义项目描述 |
| `<table>` | 表格 |
| `<p>` | 段落，也称行内元素 |
| `<address>` | 定义文档作者或拥有者的联系信息 |
| `<form>` | HTML 表单 |
| `<hr>` | 水平分隔线 |
| `<nav>` | 导航 |
| `<aside>` | 侧边栏 |
| `<menu>` | 菜单列表|
| `<article>` | 文章 |
| `<dialog>` | 对话窗口|
| `<header>、<footer>` | 页眉、页脚 |
| ... | ... |

**2. 内联元素**

- 本身属性为`display:inline`的元素，即和相邻的内联元素在同一行，
- 宽高、内外边距（垂直属性）不可改变，
- 宽高是由内容本身的大小决定的（文字、图片等）
- 常用的内联元素有：

| 标签 | 描述 |
|--|--|
| `<a>、<b>` | 锚点、加粗 |
| `<span>` | 常用的内联容器，定义文本内区块 |
| `<br>` | 换行 |
| `<i>` | 定义斜体字 |
| `<em>` | 定义强调文本 |
| `<strong>` | 加粗强调 |
| `<label>` | 定义 input 元素的标注 |
| `<cite>` | 定义引用 |
| `<code>` | 定义计算机代码文本，可以和`<pre>`连用 |
| `<img>` | 图片 |
| `<input>` | 输入框 |
| `<select>` | 下拉列表 |
| `<sub>、<sup>` | 定义下标文本、上标文本 |
| `<textarea>` | 文本域 |
| ... | ... |

> HTML5中，元素主要分为7类：Metadata（元数据元素）、Flow（流式元素）、Sectioning（章节元素）、Heading（标题元素）、Phrasing（段落元素）、Embedded（嵌入元素）、Interactive（交互元素）。
> **具体描述，可见：[HTML5元素分类与内容模型](http://chenhaizhou.github.io/2016/01/19/html-element-class.html)**。

# 二、HTML5新增特性
> 相对于HTML4，新增了语义化更好的标签元素和API。

**1. 这里列举其中几个常用的标签：**

| 标签 | 描述 |
|--|--|
| `<article>` | 文章 |
| `<aside>` | 侧边栏 |
| `<nav>` | 导航组 |
| `<video>` | 定义视频 |
| `<audio>` | 定义音频 |
| `<canvas>` | 定义图形，比如图表和其他图像，该标签是基于js的绘图api |
| `<svg>` | 定义使用 SVG 的图像绘制， XML 格式定义图形 |
| `<progress>` | 状态标签（任务过程：安装、加载） |
| `<menu>` | 菜单列表 |
| `<time>` | 定义日期/时间 |
| `<ruby>` | ruby注释 |
| `<dialog>` | 定义对话框或窗口 |
| `<details>` | 定义用户可查看或隐藏的额外细节 |
| `<datalist>` | 定义输入控件的预定义选项 |
| `<keygen>` | 定义表单里一个生产的键值，加密信息传送 |
| `<output>` | 定义计算结果 |
| ... | ... |

**2. 新增的API有：**

- 上面提的`<canvas>` 和 `<svg>`，一个是基于js的绘图api，一个是使用 XML 格式定义矢量图形api，各有千秋。
- Geolocation（地理定位）：用于获得用户的地理位置的api，`getCurrentPosition()`方法用于检测是否支持定位，`showPosition()` 函数获得并显示经度和纬度。
- Drag/Drop（拖放）： 把 `draggable` 属性设置为 'true'，表示设置元素拖放，具体操作参考api中的方法。
- web存储：`localStorage`、`sessionStorage` 。
- 应用程序缓存：通过给`<html>` 标签中添加 `manifest `属性，启用应用程序缓存，`manifest` 文件的建议文件扩展名为`".appcache"`。
- WebSockets：要连接远程主机，只需新建一个WebSocket实例，提供希望连接的对端URL。

> 更多，可见：[W3school -  HTML5 新元素](https://www.w3school.com.cn/html/html5_new_elements.asp)

# 三、部分标签使用

**1. 列表**

```html
  <!-- 1.无序列表 -->
  <h3>购物车</h3>
  <ul>
    <li>1.苹果</li>
    <li>2.香蕉</li>
    <li>3.蓝莓</li>
  </ul>
  <!-- 2.有序列表 -->
  <h3>饮料</h3>
  <ol>
    <li>1.牛奶</li>
    <li>2.橙汁</li>
    <li>3.奶茶</li>
  </ol>
  <!-- 3.定义列表 -->
  <dl>
    <dt>php</dt>
    <dd>全球通用服务器端编程语言</dd>

    <dt>mysql</dt>
    <dd>全球最广泛的开源关系型数据库系统</dd>

    <dt>Laravel</dt>
    <dd>全球最广泛的开源PHP开发框架</dd>
  </dl>
```
显示：
![](https://img-blog.csdnimg.cn/20191006172539531.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

**2. 表格**

```html
  <h3>表格</h3>
  <table border="1" width="500" cellspacing="0" cellpadding="5">
    <!-- 1标题 -->
    <caption><h2>购物车</h2></caption>
    <!-- 2表头 -->
    <thead>
      <tr bgcolor="bluegreen">
        <th>编号</th>
        <th>名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>付款人</th>
      </tr>
    </thead>
    <!-- 3.主体 -->
    <tbody>
      <tr>
        <td>1</td>
        <td>电脑</td>
        <td>10000</td>
        <td>1</td>
        <td>10000</td>
        <td rowspan="4" align="center">Alfred</td>
      </tr>
      <tr>
          <td>2</td>
          <td>手机</td>
          <td>2000</td>
          <td>2</td>
          <td>4000</td>
      </tr>
      <tr>
        <td>3</td>
        <td>鼠标</td>
        <td>300</td>
        <td>3</td>
        <td>900</td>
      </tr>
      <!-- 4.底部 -->
      <tr>
        <td colspan="3" align="center">合计</td>
        <td>6</td>
        <td>14900</td>
      </tr>
    </tbody>
  </table>
```

显示：
![](https://img-blog.csdnimg.cn/20191006173042725.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

**3. 表单控件**

```html
<h3>表单和表单控件</h3>
  <h3>用户注册</h3>
  <form action="login.php" method="POST">
    <!-- 1表单分组 -->
    <fieldset style="border: none;background-color: rgba(22, 73, 167, 0.671);">
      <!-- 2分组名称 -->
      <legend>基本信息</legend>
    
      <p>
        <label for="username">账号：</label>
        <input type="text" name="username" id="username" placeholder="不能超过8个字符">
      </p>
      <p>
        <label for="password">密码：</label>
        <input type="password" name="password" id="password" placeholder="必须在6-12位之间">
      </p>
      <p>
        <label for="email">邮箱：</label>
        <input type="email" name="email" id="email" placeholder="example@email.com">
      </p>
      <p>
        <label for="age">年龄：</label>
        <input type="number" name="age" id="age" min="16" max="80" width="500" placeholder="范围：16-80">
      </p>
    </fieldset>
    <fieldset>
      <legend>兴趣爱好</legend>
    
      <p>
        <label for="">课程：</label>
        <!-- 下拉列表 -->
        <select name="" id="">
          <!-- 分组 -->
          <option value="">请选择</option>

          <optgroup label="前端">
            <option value="">HTML5</option>
            <option value="">CSS3</option>
            <option value="" selected>JavaScript</option>
          </optgroup>
          
          <optgroup label="后端">
            <option value="">PHP</option>
            <option value="">mysql</option>
            <option value="">Laravel</option>
          </optgroup>
          
        </select>
      </p>
      <p>
        <label for="">爱好：</label>
        <!-- 复选框 -->
        <input type="checkbox" name="hobby[]" value="game" id="game"><label for="game">玩游戏</label>
        <input type="checkbox" name="hobby[]" value="programme" id="programme" checked><label for="programme">编程</label>
        <input type="checkbox" name="hobby[]" value="moves" id="moves"><label for="moves">影视</label>
      </p>
      <p>
        <label for="">性别：</label>
        <!-- 单选框 -->
        <input type="radio" name="gender" id="male"><label for="male">男生</label>
        <input type="radio" name="gender" id="female"><label for="female">女生</label>
        <input type="radio" name="gender" id="secret"><label for="secret">保密</label>
      </p>
    </fieldset>
    <fieldset>
      <legend>按钮操作</legend>
    
      <p>
        <!-- 常用按钮 -->
        <input type="submit" name="submit" value="提交">
        <input type="reset" name="reset" value="重置">
        <input type="button " name="button" value="按钮">
        <button type="">注册</button>
      </p>
      <p>
        <!-- 上传提交  -->
        <input type="file" name="" id="" multiple>
        <input type="image" src="submit.gif" alt="提交" height="50" width="auto">
        <input type="hidden" name="" value="china">
      </p>
      <p>
        <!-- 文本域 -->
        <textarea name="" id="" cols="100" rows="10" style="resize: both">
          <!-- 新增表单属性 -->
          1.placeholder：设置提示信息或默认值；
          2.autofocus：自动获取输入焦点；
            e.g.  <input type="text" name="username" id="username" autofocus>
          3.required：设置字段为必填项；
            e.g.  <input type="text" name="username" id="username" required>
          4.pattern：正则表达式验证，更加精准的控制用户的输入；
            e.g.  <input type="text" name="username" id="username" pattern="[A-Z]{6}">
          5.list：list属性值必须与input的id值一致，实现dataliist列表与控件绑定；
          6.width和height：（宽高）只要设置其中一个即可，另一个等比缩放；
            e.g.  <input type="image" scr="img.jpg" width="50" alt="提交">
          7.min、max和step：区间和步长设置；
            e.g.  <input type="number" name="salary" min="10000" max="50000" step="500">
          8.novalidate：提交时放弃数据验证（交给服务器验证）；
            e.g.  <form action="" method="post" novalidate></form>
          <!-- 新增表单类型 -->
          1.number：仅限数值型数据；
            e.g.  <input type="number" name="" id="">
          2.date：仅限日期类型数据；
            e.g.  <input type="date" min="2017-02-18" max="2019-09-01" value="2018-10-01">
          3.time：仅限时间型数据，只允许设置小时区间，分钟供参考；
            e.g.  <input type="time" min="10:10" max="22:00" value="21:00">
          以上都是输入时验证；
          4.email：仅限于电邮地址类型；
            e.g.  <input type="email" name="" id="">
          5.search：有内容时，会显示一个取消图标；
          6.url：仅限以http:// 或 https:// 开头的url地址；
          以上类型，提交时验证；
          7.color：通过系统调色板来获取颜色，返回16进制颜色值；
            e.g.  <input type="color" name="color" id="color">
                  <button id="btn">获取颜色值</button>
                  <input type="text" id="color-value">
                  <script>
                    document.getElementById("btn").onclick=function(){
                      document.getElementById("color-value").value = document.getElementById("color").value;
                    }
                  </script>
          
        </textarea>
      </p>
      <p>
        <!-- 搜索框 + datalist -->
        <label for="search">搜索：</label>
        <input type="text" name="search" id="search" list="keyword">
        <datalist id="keyword">
          <option value="html">html</option>
          <option value="css3">css3</option>
          <option value="javascript">javascript</option>
          <option value="vue">vue</option>
          <option value="bootstrap">bootstrap</option>
          <option value="php">php</option>
          <option value="python">python</option>
          <option value="ruby">ruby</option>
        </datalist>
      </p>
    </fieldset>
    <fieldset>
        <!-- 音视频标签 -->
      <legend>音视频标签</legend>
      <!-- 1.视频 -->
      <!-- 相关属性：
        controls：设置可控；
        autoplay：自动播放（与preload预加载属性相互排斥）；
        muted：静音；
        poster：自定义海报； -->
      <video src="http://upos-hz-mirrorcosu.acgvideo.com/upgcxcode/54/67/119866754/119866754-1-6.mp4?e=ig8euxZM2rNcNbRM7WdVhoM17wUVhwdEto8g5X10ugNcXBB_&deadline=1570364892&gen=playurl&nbs=1&oi=2045622435&os=cosu&platform=html5&trid=8c09fdc066c2410a8b74f4bd9451d90a&uipk=5&upsig=8cf6c9ef4fe4bfaf6b61ba5354096f34&uparams=e,deadline,gen,nbs,oi,os,platform,trid,uipk&mid=0" width="360" controls poster="http://www.laststand.cn/uploads/allimg/180911/4-1P911144R4551.jpg">街舞</video>
      
      <!-- 2.音频 -->
      <!-- 相关属性：
        controls：设置可控制；
        autoplay：自动播放（与preload预加载属性相互排斥）；
        muted：静音；
        loop：循环播放 -->
      <audio src="http://music.163.com/song/media/outer/url?id=29004400.mp3" controls></audio>
    </fieldset>
  </form>
```

显示：
![](https://img-blog.csdnimg.cn/20191006183242952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/2019100618330129.png)
![](https://img-blog.csdnimg.cn/2019100618332546.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20191006183344691.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

---
结束！

> 原文地址： CSDN博客 - [Web前端（一） - HTML标签常用整理！](https://blog.csdn.net/weixin_41599858/article/details/102230925)