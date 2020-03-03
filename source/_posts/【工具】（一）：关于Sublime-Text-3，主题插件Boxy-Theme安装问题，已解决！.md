---
title: 【工具】（一）：关于Sublime Text 3，主题插件Boxy Theme安装问题，已解决！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: f81089b2
date: 2020-02-24 14:42:09
tags:
  - Boxy
  - 插件
categories:
  - [工具]
  - [Sublime]
---

由于sublime更新后，新版下架了Boxy主题（ps：这应该是最舒服的一款主题样式了），

~~原链接失效：https://github.com/ihodev/sublime-boxy~~

**这真是不幸的消息！网上找了好久，终于解决了。。。**

<!-- more -->

参考博文：https://blog.csdn.net/qq_40258748/article/details/89362692



***下面是解决方法：（仅供参考）***


## 1.步骤一：修改插件安装位置
        （原目录：C:\Users\用户名\AppData\Roaming\Sublime Text 3\）

          关闭sublime程序，删掉原目录，

          在自定义sublime的安装目录下，新建Data文件夹，重启sublime，

          此时会发现，Data目录下：

![](https://img-blog.csdnimg.cn/2019091722383619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

           

## 2.步骤二：重新安装Package Control

过程中如果出现error，可以尝试修改配置（解决方案，网上都能搜到。。。）

> 打开 preferences ->Package settings->Package Control ->Settings - User，添加以下配置：

```
"channels":
    [
        "http://cst.stu.126.net/u/json/cms/channel_v3.json",
        "https://packagecontrol.io/channel_v3.json",
        "https://erhan.in/channel_v3.json"
    ],
```
或者自己下载channel_v3.json，配置信息中改成该文件路径；

## 3.步骤三：安装[A file icon](https://packagecontrol.io/packages/A%20File%20Icon)插件，可以配合Boxy主题，看起来超爽！
> `Ctrl + shift + p`，找到`package control：install...`，回车，输入 `A file icon`插件名，安装，

另外推荐几款常用的高效插件：
  - [Emmet](https://packagecontrol.io/packages/Emmet): 前端神器；
  - [DocBlockr](https://packagecontrol.io/packages/DocBlockr): 包含Javascript, PHP, CoffeeScript, Actionscript, C & C++等插件；
  - [Git](https://packagecontrol.io/packages/Git): 代码跟踪；
  - [Terminal](https://packagecontrol.io/packages/Terminal): 终端工具；
  - [View in Browser](https://packagecontrol.io/packages/View%20In%20Browser): 浏览器显示；
  。。。

## 4.步骤四：配置Boxy Theme主题插件（重点）

### 1）GitHub下载：[sublime-boxy-theme](https://github.com/bofm/sublime-boxy-theme) ，可以自己到开源库搜；

### 2）下载压缩包
  网盘链接：[压缩包](https://pan.baidu.com/s/1SWNKD75Gm0IVzMI8_8589w)
  提取码：knxx
 <font color="rgb(30, 144, 255)">将下载的压缩包（boxy-theme-backup-master.zip）解压</font>，得到：

![](https://img-blog.csdnimg.cn/20190917232402189.png)

将红框中解压得到的文件夹和文件一起复制到 sublime安装目录下的 F:\Sublime Text 3\Packages（<font color="rgb(250, 235, 215)">这里换成自己的安装目录</font>）文件夹下（__注意__：<font color="rgb(100, 149, 237)">这里不是Data目录下的Packages，Data目录与该Packages目录同级</font>）
重启sublime，等一会儿，OK！

效果图：

![](https://img-blog.csdnimg.cn/20190917233107358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

同类型的主题插件还有不少：其中移植自Atom的 [Seti_UI](https://packagecontrol.io/packages/Seti_UI) 插件也不错，感兴趣的也可以去试试。

<div align="left" style="height: auto;margin: auto;">
    <pre style="white-space: all;background-color: rgb(255, 255, 255);opacity: 0.5;color: black;font-weight: bold;">
         .----.
      _.'__    `. 
  .--(#)(##)---/#\
.' @          /###\
:         ,   #####
 `-..__.-' _.-\###/  
       `;_:    `"'
     .'"""""`. 
    /,  Boxy  ,\
   //  COOL!   \\
   `-._______.-'
   ___`. | .'___ 
  (______|______)         
    </pre>
   
</div>


> 原文地址： CSDN博客 - [主题插件Boxy Theme安装](https://blog.csdn.net/weixin_41599858/article/details/100942288)


