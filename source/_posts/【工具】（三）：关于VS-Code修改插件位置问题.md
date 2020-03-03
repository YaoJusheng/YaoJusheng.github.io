---
title: 【工具】（三）：关于VS Code修改插件位置问题
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: eabdca65
date: 2020-02-24 14:42:59
tags:
  - 插件
categories:
  - [工具]
  - [VSCode]
---
由于VSCode插件默认存放位置在C盘下，个人不是很喜欢，因为太过吃C盘内存，位置不易记住，不方便管理，

（ps：这些都是借口，博主控制欲极强！）
<div>
    <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9xcS55aDMxLmNvbS90cC9xdy8yMDEzMDYwNTEyMjUwMzI0NTQuZ2lm">
</div>

<!-- more -->

网上也查了一些资料，最后总结如下：
## 1.安装 vscode：

存到目标目录
> 如： F:\Vscode\Microsoft VS Code；

## 2.cmd修改插件安装位置：

在安装目录打开dos命令窗口，输入：
```bash
code --extensions-dir 目标文件夹
```
回车，此时修改插件位置完成；
但若快捷键打开vscode，会发现，并未生效。

## 3.继续：修改快捷键目标参数：

打开快捷键属性，目标输入框修改为：
```
"F:\Vscode\Microsoft VS Code\Code.exe" --extensions-dir  "F:\Vscode\Microsoft VS Code\plugins"
```
（注意：这里填写自己的vscode安装目录和插件目录，前者是博主的vscode目录，后者是插件目录）

<div align="center">
    <img src="https://img-blog.csdnimg.cn/20190921141916377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>   
                
这里快捷键参数修改完成，快捷键打开方式下，已生效；
但是，如果你用鼠标右键菜单打开，会发现，这种方式打开vscode，配置并没有生效；

## 4.继续：配置鼠标右键菜单：

### 4.1.原来就有右键选项

修改command下的参数：

#### 4.1.1.`win+R`打开运行窗口

输入：`regedit`，回车，打开注册表；

#### 4.1.2.搜索VSCode

编辑 -> 查找，搜索VSCode，
或者直接搜索：`计算机\HKEY_CLASSES_ROOT\*\shell\VSCode\command`，

<div align="center">
    <img src="https://img-blog.csdnimg.cn/20190921143338111.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>

#### 4.1.3.修改数据

将值修改为：
```
"F:\Vscode\Microsoft VS Code\Code.exe" --extensions-dir  "F:\Vscode\Microsoft VS Code\plugins" "%1"
```

（同样，以你自己电脑目录为准）
<div align="center">
    <img src="https://img-blog.csdnimg.cn/20190921143632281.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>
                           
此时，右键菜单配置完成，已生效；

### 4.2.之前没有右键菜单选项

添加选项

#### 4.2.1.找到shell

依次点开HKEY_CLASSES_ROOT ---> * ---> shell，

#### 4.2.2.新建command项

右键shell，新建 --->项，会出现一个让你命名的文件夹，写上你要添加的文件名，
再右键命名好的文件夹，新建 ---> 项。命名为command。

<div align="center">
    <img src="https://img-blog.csdnimg.cn/20190921144035827.png">
</div>                           

#### 4.2.3.填写参数

具体参数可模仿已有项，与上面一样：

```
"F:\Vscode\Microsoft VS Code\Code.exe" --extensions-dir  "F:\Vscode\Microsoft VS Code\plugins" "%1"
```
（以你自己电脑目录为准）

OK，大功告成！现在可以玩转你自己的vscode啦！！！

> 原文地址： CSDN博客 - [vscode插件位置修改](https://blog.csdn.net/weixin_41599858/article/details/101106083)