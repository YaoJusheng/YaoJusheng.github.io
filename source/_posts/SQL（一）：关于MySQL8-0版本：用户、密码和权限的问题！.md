---
title: SQL（一）：关于MySQL8.0版本：用户、密码和权限的问题！
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
tags:
  - MySQL
  - 用户密码
categories:
  - [数据库]
abbrlink: 5ad10cde
date: 2020-03-10 23:11:37
---

> 由于前段时间重装了系统，最近放假，正好有时间重新搭建一下开发环境，当然很多工具都装了最新版，MySQL也不例外。

以前的MySQL装的是5.6或5.7的，用起来倒是没什么需要特殊说明的地方。
现在换了8.0，虽然功能强大了一些，但有些地方还是需要注意。

<!-- more -->

安装的话，可以参考一下这篇博客：[MySQL8的安装](https://blog.csdn.net/qq_33236248/article/details/80046448)

> 以下是记录的一些问题和解决方法

## 一、服务启动失败
### 1.1. 输入：`net start mysql`，提示服务名无效
- 可到 `C:\Program Files\MySQL\MySQL Server 8.0\bin` 目录下；
- 打开DOS窗口，输入：`mysqld --install`  ；
- 再次输入：`net start mysql`。

### 1.2. 输入：`net start mysql` 后，提示：MSQL服务无法启动。服务没有报告任何错误
- 输入： `mysqld --console`，看看错误信息，通过错误信息，去查找解决方法；
- 如果错误信息是`Table 'mysql.plugin' doesn't exist`, 如果没有解决办法，可以试着重新安装服务或初始化MySQL。
**建议先看看my.ini文件中的配置**：
![my.ini](https://img-blog.csdnimg.cn/20191005145124662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
> 这会对你有所帮助

## 二、忘记用户名密码
> 如果隔段时间不用的话，可能就会出现这样的问题，因为博主的用户名密码都比较长，更容易忘，痛定思痛，决定改成最常用的123...

**正常情况下，可以这样做：**

- 跳过权限表
```bash
mysqld –skip-grant-tables
```

- 密码置空
```bash
UPDATE user SET authentication_string='' WHERE user='root';
```
> 8.0 无法这样用

### 处理
#### 方式一：利用 --init-file参数
1. 停止MySQL服务
```bash
# dos窗口，输入命令：
net stop mysql   # 或者 Ctrl+Alt+delete，打开任务管理器，找到服务中的MySQL80项，右键选择停止
```
2. 在MySQL目录下，新建一个文件，如reset_password.txt:
```bash
# 目录：C:\ProgramData\MySQL\MySQL Server 8.0
# 文件内容输入：
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';  # 根据个人需要修改
```
3. 打开dos窗口
```bash
# 执行以下命令，关闭dos窗口
mysqld --init-file=C:\ProgramData\MySQL\MySQL Server 8.0\reset_password.txt --console   # 可以自己修改
```
4. 启动服务
```bash
net start mysql  # 或者去任务管理器中开启
```
5. 最后输入修改的用户密码登录
```bash
mysql -uroot -p123456  # 以实际为准
```

#### 方式二：越过权限表
1. 停止服务：
```bash
net stop mysql
```
2. 管理员方式打开DOS窗口：
```bash
mysql --shared-memory --skip-grant-tables datadir="C:/ProgramData/MySQL/MySQL Server 8.0/Data"
```
3. 再开一个命令行窗口，直接登陆mysql:
```bash
mysql [-uroot -p]
# 清空密码
use mysql;
update user set authentication_string='' where user='root';
```
4. 关闭之前的窗口，重启服务：
```bash
net start mysql
```
5. 无密码登录，修改密码：
```bash
mysql -uroot -p
# 修改
use mysql;
alter user root@localhost identified by '123456';
```
6. 密码登录，查看：
```bash
mysql -uroot -p123456
```

## 三、API接口无法连接数据库
> 昨天测试了一下，php连接数据库，发现连接失败。而本地打开数据库是可以的。
### 3.1. SQLSTATE[HY000] [2054] The server requested authentication method unknown to the client。
这应该是身份验证插件的问题，
于是通过phpinfo() 查看了一下php版本信息：
![php版本信息](https://img-blog.csdnimg.cn/20191005150746851.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)
对比MySQL8.0信息：
![MySQL8.0信息](https://img-blog.csdnimg.cn/20191005150858615.png)
> 显然身份验证插件不匹配，php7.3.4居然还没支持sha2的，没办法，只能在数据库中改为php支持的了，如：mysql_native_password 。

修改之：
```bash
CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
或者更新一下：
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
> 当然也可以去my.ini 文件中，将 `default_authentication_plugin=caching_sha2_password` 中的sha2插件改掉。

## 四、权限修改
**在连接数据库时，出现以下错误**：
> SQLSTATE[HY000] [1044] Access denied for user 'XXX'@'localhost' to database 'tests'.

大概能猜到，应该是权限的问题，接下来，修改权限：
### 4.1. 添加用户
```bash
CREATE USER 'username'@'localhost' IDENTIFIED [WITH mysql_native_password] BY 'password';
```

### 4.2. 更新密码
```bash
ALTER USER 'username'@'localhost' IDENTIFIED [WITH mysql_native_password] BY 'new_password';
```

### 4.3. 授予/更改权限
```bash
GRANT ALL ON *.* TO username@localhost WITH GRANT OPTION;
```

### 4.4. 查看用户信息
```bash
# 表结构
desc user;
# 用户信息
select User,Host,authentication_string from user;
# 查看权限
show grants for username@localhost;
```

解决！


---

以后遇到再补充！

> 原文地址： CSDN博客 - [关于MySQL8.0版本：用户、密码和权限的问题！](https://blog.csdn.net/weixin_41599858/article/details/102138938)