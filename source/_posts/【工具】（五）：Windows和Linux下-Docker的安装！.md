---
title: 【工具】（五）：Windows和Linux下 Docker的安装！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: ef94d4d4
date: 2020-02-24 14:43:42
tags:
  - Docker
categories:
  - [工具]
  - [Docker]
---

> 本文介绍关于docker在Windows和Linux下的安装。

<!-- more -->

# 1. 简介
> 国际惯例，我们先了解一下，什么是docker：

 - Docker 英译为码头工人，是一个开源的应用容器引擎，可以让开发者将他们的应用程序以及依赖包打包到一个轻量级、可移植的容器中，然后发布到    Linux 机器上，也可以实现虚拟化。
 - 也有人说，它等同一个微型虚拟机，可以利用虚拟镜像，替代传统虚拟机，按照开发者需求搭建任意开发环境，管理方便、启动快捷、资源占用率低。

## 1.1. 虚拟机
> 虚拟机（virtual machine），其实就是通过虚拟化管理软件（如：VMware、Hyper-V等）和ISO系统镜像，在一个操作系统中安装另一个系统，满足某些对环境有特殊需求的情况。

尽管它很强大，能够完全模拟出另一个操作系统，并且对底层主系统几乎没有什么影响，但不可否认，一定程度上加大了硬件系统的负担，导致资源占用率过高。

## 1.2. Linux容器
> 基于上述虚拟机的缺陷，于是有了LXC（Linux Container）这样一个解决方案，它是与系统其他部分隔离开的一系列进程，运行这些进程所需的所有文件都由另一个镜像提供，这意味着从开发到测试再到生产的整个过程中，Linux 容器都具有可移植性和一致性。

详细资料，可见：[Linux容器简述](https://www.jianshu.com/p/63fea471bc43)、[什么是Linux容器](https://www.redhat.com/zh/topics/containers/whats-a-linux-container)

## 1.3. Docker
> Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。
- Docker提供了一种可移植的配置标准化机制，允许你一致性地在不同的机器上运行同一个Container。
- Docker的主要目标是“Build, Ship and Run Any App, Anywhere”，即通过对应用组件的封装（Packaging）、分发（Distribution）、部署（Deployment）、运行（Runtime）等生命周期的管理，达到应用组件级别的“一次封装，到处运行”。

详细资料，可见：[Docker入门实践](https://hujb2000.gitbooks.io/docker-flow-evolution/content/cn/basis/comp_concept.html)

# 2. 安装

> Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。
> 参考：[Docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

下面，我们主要讨论社区版的安装：
## 2.1. Linux
> 以 deepin 为例，其他Linux大致类似，参考：[deepin下的docker安装](https://wiki.deepin.org/wiki/Docker)

1.更新本地软件包索引：
```bash
sudo apt-get update
```

2.安装docker-ce相关的秘钥管理和下载工具：
```bash
sudo apt-get install apt-transport-https ca-certificates curl python-software-properties software-properties-common
```

3.下载并安装密钥：
```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

4.添加官方仓库：
```bash
sudo add-apt-repository  "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
```

5.安装docker-ce：
```bash
sudo apt-get update
sudo apt-get install docker-ce
```

6.完成后，启动并查看：
```bash
# 启动 docker
systemctl start docker
# 查看安装的版本信息
docker version
```

## 2.2. Windows
> 以 win10 为例，参考：[Docker官方安装](https://docs.docker.com/docker-for-windows/install/)

1.首先，我们需要先有一个依赖环境：
- Windows 10 64位：专业版，企业版或教育版
- 必须启用Hyper-V和Containers Windows功能
- 运行Hyper-V

2.开启虚拟技术支持
> BIOS设置中启用BIOS级硬件虚拟化支持：
> - 开机按 `F2` 或 `F12` ，进入BIOS设置
> - Intel Virtual Technology 选项 设为 enable

3.开启并运行Hyper-V工具

 1. 打开Windows功能
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002194426300.png)
 2. 勾选Hyper-V，点击确定
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002194713777.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
 3. 等待一会儿，提示重启，点击重启
 4. 重启完成后，到Windows管理工具，找到Hyper-V管理器，运行。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002195238496.png)
    看到如下界面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002195747654.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
> 因为我的电脑已经安装了docker，所以有 DockerDesktopVM 显示，下面开始真正的安装。

4.安装Docker for Windows
> 官网下载：[Docker Desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002200604156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/201910022007050.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002200304371.png)

5.点击运行 `Docker for Windows Installer.exe`
> 该过程中可能需要你关闭电脑的杀毒软件，以完成安装。
> 安装结束会有重启提示，点击确定就行。
> 因为博主已经安装过了，就不在这里演示了。

6.完成后，开启服务，查看版本信息
> `Win + R` 输入 cmd，打开dos窗口，输入：
```bash
docker version  # 查看版本
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191002204927448.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
到此，docker的安装也就完成了。下面开始玩转我们的docker吧！


---
使用参考：[Docker使用](https://doc.yonyoucloud.com/doc/chinese_docker/userguide/dockerrepos.html)、[Docker基本命令-简书](https://www.jianshu.com/p/a23539a519b7)、[构建Docker镜像](https://yeasy.gitbooks.io/docker_practice/image/build.html)

> 原文地址： CSDN博客 - [Windows和Linux下 Docker的安装！](https://blog.csdn.net/weixin_41599858/article/details/101929473)