---
title: 【工具】（六）：衔接上一篇：Windows 10 下对docker镜像的简单使用及创建！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: ffda6757
date: 2020-02-24 14:44:09
tags:
  - Docker
categories:
  - [工具]
  - [Docker]
---

> 如题，上一篇已经安装好了docker环境，下面聊聊它的基本使用。

<!-- more -->
# 一、简单使用
类似git仓库管理工具的操作
## 1.查看信息
```bash
# 查看版本
docker version
# 系统信息
docker info
# 查看容器信息
docker ps [-a/-l]
```

<div align="left">
    <img src="https://img-blog.csdnimg.cn/20191003123613541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>

<div align="left">
    <img src="https://img-blog.csdnimg.cn/20191003124113824.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>

## 2.镜像操作
> 所有命令，可以通过 `docker 操作指令 --help` 来查看完整的命令选项.

```bash
# 搜索image  
docker search image_name  
  
# 下载image  
docker image pull <repository>:<tag> 
  
# 镜像列表
docker images  

# 启动/停止镜像
docker create # 创建一个容器但是不启动它
docker run # 创建并启动一个容器
docker stop # 停止容器运行，发送信号SIGTERM
docker start # 启动一个停止状态的容器
docker restart # 重启一个容器

# 删除一个或者多个镜像; 
docker rmi [-f] image_name  

# 显示一个镜像的历史
docker history image_name
```
更多，可参考：[docker入门基本操作](https://blog.51cto.com/13581826/2121938)、[Docker操作命令详解](https://blog.csdn.net/omnispace/article/details/79778544)

# 二、创建镜像
- 从已经创建的容器中更新镜像，并且提交这个镜像；
- 使用 Dockerfile 指令来创建一个新的镜像；

## 1.镜像加速
> 无论是下载还是创建上传镜像，默认下，官方源速度是比较慢的，不妨使用阿里镜像加速，首先，去 [注册](https://account.aliyun.com/register/register.htm?spm=a2c45.11132027.495866.10.66b754552L4ioF)。

<div>
    <img src="https://img-blog.csdnimg.cn/20191003130806313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_12,color_FFFFFF,t_70">
</div>

<div>
    <img src="https://img-blog.csdnimg.cn/20191003131025784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_12,color_FFFFFF,t_70">
</div>

> 如果是在Windows下，将地址复制到 settings下的Daemon中，如下（阿里操作文档有详细说明）：

<div>
    <img src="https://img-blog.csdnimg.cn/20191003131308809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_12,color_FFFFFF,t_70">
</div>

## 2.开始创建image
> 第一种方式比较简单，相当于拉取一个基础镜像，再进行修改，这里主要说一下第二种方式：Dockerfile创建

这里以python为例，在一个空白目录中，建立一个文本文件，并命名为 `Dockerfile`：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191003132432479.png)
Dockerfile 的内容为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191003132956811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
以上是我的配置，这里可以根据需要，进行修改，保存。

该目录下打开DOS窗口，输入：
```bash
# 根据实际情况，修改image_name 和 tag
docker build -t `image_name`:`tag` .
```

<div>
    <img src="https://img-blog.csdnimg.cn/20191003133838445.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70">
</div>

完成后，可以试着输入以下命令：
```bash
# 查看
docker version
# 运行
docker run -ti [imageID] [command]  # 通常 command 为 /bin/bash 
```

## 3.推送到镜像仓库
```bash
# 登录阿里云
docker login --username=阿里云帐号名 registry.cn-hangzhou.aliyuncs.com
# 对本地的image镜像进行重命名
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/[命名空间]/[仓库名称]:[镜像版本号]
# 推送到Registry
docker push registry.cn-hangzhou.aliyuncs.com/[命名空间]/[仓库名称]:[镜像版本号]
```

---
好了，到此也就完成了，最后可以去自己的阿里云仓库查看。


> 原文地址： CSDN博客 - [Windows 10 下对docker镜像的简单使用及创建！](https://blog.csdn.net/weixin_41599858/article/details/101986072)