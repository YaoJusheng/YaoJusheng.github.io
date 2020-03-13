---
title: Python（一）- 安装与升级！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 3b7f3111
date: 2020-03-13 21:32:51
tags:
  - 环境搭建
categories:
  - [编程]
  - [Python]
---

>由于重装了系统，一些工具都要重新安装，正好，准备做一点记录。

**这里是Python的开始...**

<!-- more -->

# 1.Windows下：
> 去官网：https://www.python.org/ 下载

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190930220722488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
接下来，属于傻瓜操作了，就不多说了，
安装完成后，将python.exe和pip程序路径加入环境变量，

DOS命令，大家应该都熟悉了，`Win+R` 输入cmd，打开命令行，
更新pip的话，输入：

```bash
python -m pip install --upgrade pip
```
# 2.Linux下：
一般都默认安装了2.7和3.5版本的Python
## 2.1. 安装
```bash
# 打开终端，新建下载目录
mkdir /usr/local/python37
# 进入安装目录： 
cd /usr/local/python37  # 也可以进入任意自己想要存放安装包的目录
# 安装
wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
# 解压缩
tar -xzvf Python-3.7.4.tgz
# 进入目录，执行./configure配置构建文件
cd Python-3.7.4
./configure --enable-optimizations
# 编译并安装
make && sudo make install
# 添加python3的软链接
sudo ln -s /usr/local/bin/python3.7 /usr/bin/python3.7
# 添加 pip3 的软链接
sudo ln -s /usr/local/bin/pip3.7 /usr/bin/pip3.7
```
> 如果是要升级Python版本的话，最好卸载之前的版本

```bash
# 1、卸载python3.5
sudo apt-get remove python3.5
# 2、卸载python3.5及其依赖
sudo apt-get remove --auto-remove python3.5
# 3、清除python3.5
sudo apt-get purge python3.5
# or
sudo apt-get purge --auto-remove python3.5
```

## 2.2.升级pip
```bash
sudo pip3 install --upgrade pip
```
可能有人会出现retrying且ssl error的错误：
```bash
# 去python解压缩目录，重新执行：
cd Python-3.7.4
./configure --with-ssl
make && sudo make install
```
> 或者更换镜像源。
> 阿里云： http://mirrors.aliyun.com/pypi/simple/
   中国科技大学： https://pypi.mirrors.ustc.edu.cn/simple/
   豆瓣 ：http://pypi.douban.com/simple

以上OK后，就可以使用pip 安装想要的模块和插件了！


> 原文地址： CSDN博客 - [Python（一）- 安装与升级！](https://blog.csdn.net/weixin_41599858/article/details/101795427)