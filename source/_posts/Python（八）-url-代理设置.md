---
title: Python（八）- url 代理设置!
toc: true
top: 1
thumbnail: images/cover/welcome-cover.jpg
order_by:
  - top: 1
  - date: -1
tags:
  - 代理配置
categories:
  - [编程]
  - [Python]
abbrlink: 17e4c729
date: 2020-03-16 22:15:24
---

之前有同事问到关于 Python 中URL走代理的问题，这里做个简单的记录。
<!-- more -->

## 一、部分思路

主要方法有：方法封装、类继承、装饰器、全局代理等。


## 二、具体实现

> 这里简述一下装饰器和全局代理的实现

### 2.1.装饰器

#### 2.1.1.简介
在不修改被装饰对象的源代码以及调用方式的前提下为被装饰对象添加新功能

+ 原则：
 - 1.不修改被装饰对象的源代码
 - 2.不修改被装饰对象的调用方式

+ 目标：
 - 为被装饰对象添加新功能

#### 2.1.2.实现
> 此处以 requests 为例

```python
import os
import requests

PROXY_DCT = dict()
PROXY_DCT['http'] = 'http://username:password@host:port'
PROXY_DCT['https'] = 'https://username:password@host:port'

def add_proxy(fn):
    # 增加requests代理
    proxies = PROXY_DCT
    def inner(*args, **kwargs):
        from requests import Session
        from functools import partial
        s = Session()
        s.proxies = proxies
        return partial(fn, *args, **kwargs)(s)
    return inner

@add_proxy
def test(param, s):
    url = 'http://www.baidu.com'
    r = s.get(url)
    print(r.text)
    print(param)


if __name__ == '__main__':
    test('hello')
```

### 2.2.全局代理

#### （1）设置Python环境变量

```python
import os
import requests

os.environ['http'] = 'http://user:pwd@host:port'
os.environ['https'] = 'https://user:pwd@host:port'


def test():
    url = 'http://www.163.com/'
    res = requests.get(url)
    print(res.text)


if __name__ == '__main__':
    test()
```

#### （2）urllib注册

```python
import urllib.request


handler = urllib.request.ProxyHandler({'http': 'http://user:pwd@host:port'})
opener = urllib.request.build_opener(handler)

# 方式一：Opener 已经设置好代理了，调用它的 open() 方法即可使用此代理访问链接
response = opener.open('http://www.163.com/')

# 方式二：安装opener设置全局代理
urllib.request.install_opener(opener)
```

#### （3）socks、socket注册

```python
import urllib.request
import socks, socket


socks.set_default_proxy(socks.PROXY_TYPE_SOCKS5, host, port)
socket.socket=socks.socksocket

def test():
    url = "https://blog.csdn.net/"  
    page = urllib.request.urlopen(url)  
    data = page.read()    #读取全部
    dataline = page.readline()    #读取一行内容
    print(data)


if __name__ == '__main__':
    test()
```
