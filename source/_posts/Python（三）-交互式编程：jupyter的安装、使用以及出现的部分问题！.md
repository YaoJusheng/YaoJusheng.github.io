---
title: Python（三）- 交互式编程：jupyter的安装、使用以及出现的部分问题！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 441b84e2
date: 2020-03-13 21:49:06
tags:
  - 交互式编程
  - jupyter
categories:
  - [编程]
  - [Python]
---

> 如题，本次主要聊聊关于交互式编程在Python中的应用。

<!-- more -->

对于交互式编程，很多人都很熟悉了,其实，很多脚本语言都有这样的功能。
可以把它看做程序员和计算机之间的对话，程序员通过解释器或者控制台输入一段命令或逻辑操作，计算机反馈回程序员想要得到的信息。
这么一来，就很清楚了，我们平时工作学习中，一直在使用着，如：
> JavaScript 在浏览器中使用通过控制台和页面交互；
> Ruby中的irb，通过它，我们可以和ruby解释器交互；
> Python中的解释器，交互式模块：ipython、jupyter等等；
> Lua中的lua命令；

接下来，重点介绍一下关于jupyter的一些使用：

# 1.简介
> Jupyter Notebook（此前被称为 IPython notebook）是一个交互式笔记本，支持运行 40 多种编程语言;
> Jupyter Notebook 的本质是一个 Web 应用程序，便于创建和共享文学化程序文档，支持实时代码，数学方程，可视化和 markdown。 用途包括：数据清理和转换，数值模拟，统计建模，机器学习等等。 -- 【[百度百科](https://baike.baidu.com/item/Jupyter/20423051)】
> 简单来说：jupyter为多种语言提供一种页面交互式的操作（编程、撰写技术文档），功能强大的它极大程度上方便了我们的工作和学习。
# 2.安装
## 2.1. Windows下：
DOS命令，打开命令提示符，输入：
```bash
pip install jupyter  # 前提是安装了python和pip并加入环境变量
```
> 中途可能会出现失败情况，一般，更新一下pip都能解决：
```bash
python -m pip install --upgrade pip
```
> DOS命令下的使用，这里就不说了，具体看下面 `使用` ，Linux和Windows命令行的开启方法都一样。


## 2.2. Linux下：
终端输入：
```bash
# 更新pip
python pip3 install --upgrade pip
# 安装
pip install jupyter
```
> 过程中可能出现：`EnvironmentError: [Errno 13] 权限不够` 这样的错误
```bash
pip install jupyter --user  # 根据提示，我们可以试下添加 `--user`
```

# 3.使用
##  3.1. 启动
命令行输入：
```bash
# [] 内为可选操作
ipython notebook [--no-browser --port 8080 --ip localhost]
# or
jupyter notebook [--no-browser --port 8080 --ip localhost]
```

> 过程中可能会出现：找不到jupyter命令的错误:
```bash
cd ~
find -name jupyter      # 查找
cd ./.local/bin/        # 路径
sudo vim /etc/profile   # 修改，添加下面一行
# 最后 添加： export PATH=$PATH:~/.local/bin
# 或者将上面一行加入到 ~/.bashrc
# 退出并执行加载
source  /etc/profile  # ~/.bashrc
```
> 通常推荐，使用虚拟环境，在虚拟环境中安装jupyter，并开启。

成功后，如图：
> 这是首页

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191001021433259.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
> 如Linux下的vim，它有编辑和命令模式，Esc可退出到命令模式，此时，我们可以使用快捷键操作；
> jupyter有两个单元，code和markdown，即代码单元和标记语言单元；

## 3.2. 编写
> 接下来，我们可以混用code和markdown，操作一下。
>
点击new，选择python3，如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191001132746176.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
输入代码语句和markdown语句，分别执行一遍，如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019100102183297.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
## 3.3. 保存与导出
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191001133928568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
推荐使用download as ，多种文本格式可供选择保存。



好了，以上就是关于jupyter的一点简单用法，当然有需要的话，我们也可以用它来快速地编写一份技术文档，so good！



> 原文地址： CSDN博客 - [Python（三）- 交互式编程：jupyter的安装、使用以及出现的部分问题！](https://blog.csdn.net/weixin_41599858/article/details/101806377)