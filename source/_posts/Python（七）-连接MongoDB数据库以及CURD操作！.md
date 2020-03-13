---
title: Python（七）- 连接MongoDB数据库以及CURD操作！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: db519792
date: 2020-03-13 22:11:29
tags:
  - MongoDB
  - CURD
categories:
  - [编程]
  - [Python]
  - [数据库]
---

> 本文介绍python中对MongoDB数据库操作的两个模块：`pymongo`	和 `mongoengine`

<!-- more -->

# 一、简介
> 以下内容参考：[菜鸟教程](https://www.runoob.com/mongodb/mongodb-intro.html)

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统，是当前noSql数据库产品中最热门的一种，在高负载的情况下，添加更多的节点，可以保证服务器性能。
MongoDB为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

# 二、安装
安装比较简单，可以参考：[MongoDB安装教程](https://www.jianshu.com/p/9e5bc16c48c3)
# 三、使用
> 这里以两个小样例的形式，介绍pymongo和mongoengine的使用

**数据库配置：**
```python
# baseConfig.py

# 数据库配置
DATABASE = {
    'mongodb': {
        'username': 'admin',
        'password': '123456',
        'host': 'localhost',
        'port': 27017,
        'db': 'test',
        'authentication_source': 'admin',
    },
    ...
}
```

## 1. pymongo
> python中常见的操作mongodb的模块

```python
# 以下为mongodb的简单操作类
from pymongo import MongoClient

from baseConfig import DATABASE

DB_CONF = DATABASE['mongodb']


def singleton(cls):
    """单例模式"""
    _instance = {}
    
    def _slt(*args, **kwargs):
        if cls not in _instance:
            _instance[cls] = cls(*args, **kwargs)
        return _instance[cls]
    
    return _slt


@singleton
class MongoHandler(object):
    """创建MongoDB处理类"""
    
    def __init__(self, **kwargs):
        print(kwargs)
        self.db_name = kwargs['name'] or 'test_db'
        client = MongoClient()
        self.db = client[self.db_name]  # 或者这样指定： db = client.test
    
    def drop(self):
        try:
            self.db.command("dropDatabase")
        except Exception as e:
            print("Delete DATABASE {0} failed! due to the reason of '{1}'".format(self.db_name, e))
    
    def collection(self, cl):
        return self.db[cl]  # 或者这样指定：cols = db.cl
    
    def insert_one_record(self, col, record: dict):
    	"""
    	可以直接用得到的结合调用库方法，
    	这里限定类型，做演示用，
    	以下方法类似，根据业务需要改写
    	"""
        result = col.insert_one(record)
        print(result)
    
    def insert_many_records(self, col, records: list):
        result = col.insert_many(records)
        print(result)
    
    def find_one_record(self, col, condition: dict):
        result = col.find_one(condition)
        
        return result
    
    def find_records(self, col, condition: dict):
        results = col.find(condition)
        return results
    
    def update_one_record(self, col, condition: dict, data: dict):
        result = col.update_one(condition, data)
        print('影响修改条数：', result.matched_count, result.modified_count)
        return result
    
    def update_records(self, col, condition: dict, data: dict):
        result = col.update_many(condition, data)
        print('影响修改条数：', result.matched_count, result.modified_count)
        return result
    
    def delete_one_record(self, col, condition: dict):
        result = col.delete_one({'name': 'Kevin'})
        # print(result)
        return result.deleted_count
    
    def delete_records(self, col, condition: dict):
        # result = col.remove({'name': 'Kevin'})   # 删除所有符合条件的记录，官方推荐delete_one和delete_many
        result = col.delete_many(condition)
        # print(result.deleted_count)
        return result.deleted_count

```

```python
# 测试

DBHandler = MongoHandler(**DB_CONF)


def code_test():
    db = DBHandler
    # 获取集合
    col = db.collection('test_col')
    # 插入数据
    stu = {
        'id': '20190101',
        'name': 'Amy',
        'age': 20,
        'gender': 'female'
    }
    print("------- 开始插入数据 --------")
    db.insert_one_record(col, stu)  # 单条插入
    stu_list = [
        {
            'id': '20190102',
            'name': 'Jordan',
            'age': 20,
            'gender': 'male'
        },
        {
            'id': '20190203',
            'name': 'Mike',
            'age': 21,
            'gender': 'male'
        }
    ]
    db.insert_many_records(col, stu_list)  # 多条插入
    print("------------ end ------------")
    
    # 查询
    condition1 = {'name': 'Mike'}
    condition2 = {'name': {'$regex': '^M.*'}}
    condition2 = {}
    print("------- 开始查询数据 --------")
    res1 = db.find_one_record(col, condition1)
    print('select res1: ', type(res1), res1)
    res2 = db.find_records(col, condition2)
    for r in res2:
        print('select res2: ', type(r), r)
    print("------------ end ------------")
    
    # 更新
    # condition3 = {'gender': 'male'}
    # condition4 = {'age': {'$gt': 20}}
    # data1 = {'$set': {'age': 21}}
    # data2 = {'$inc': {'age': 1}}
    print("------- 开始更新数据 --------")
    # res3 = db.update_one_record(col, condition3, data1)
    # print('update res3: ', res3)
    # res4 = db.update_records(col, condition4, data2)
    # print('update res4: ', res4)
    print("------------ end ------------")
    
    # 删除
    # condition5 = {'name': 'Kevin'}
    # condition6 = {'age': {'$lt': 25}}
    print("------- 开始删除数据 --------")
    # res5 = db.delete_one_record(col, condition5)
    # print("删除条数：", res5)
    # res6 = db.delete_records(col, condition6)
    # print("删除条数：", res6)
    print("------------ end ------------")
```

**查询数据库，可见：**
![](https://img-blog.csdnimg.cn/20191109155037753.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

## 2. mongoengine
> python中的操作MongoDB的对象文档映射器（ODM），类似MySQL的对象关系映射器（ORM）

```python
# 简单使用
import mongoengine
from datetime import datetime

from baseConfig import DATABASE

DB_CONF = DATABASE['mongodb']
# 连接数据库
MONGO_CONNECT_ENGINE = mongoengine.connect(**DB_CONF)


# 定义分类文档:
class User(mongoengine.Document):
    """继承Document类, 为普通文档"""
    name = mongoengine.StringField(max_length=30, required=True)
    age = mongoengine.IntField(default=0, required=True)
    date = mongoengine.DateTimeField(default=datetime.now(), required=True)


def insert_doc():
    cate = User(name="Linux", age=20)  # 如果required为True则必须赋予初始值,如果有default,赋予初始值则使用默认值
    cate.save()  # 保存到数据库
    
    User(name="Python", age=3).save()
    User(name="HTML", age=3).save()
    User(name="Javascript", age=3).save()
    User(name="CSS", age=3).save()
    User(name="Ruby", age=2).save()
    User(name="PHP", age=1).save()
    User(name="test", age=3).save()


def select_doc():
    # 返回集合里的所有文档对象的列表
    users = User.objects.all()
    for u in users:
        print("name:", u.name, ",age:", u.age)
    
    # 返回所有符合查询条件的结果的文档对象列表
    user = User.objects(name="Python")
    print(user)
    
    user_search = User.objects(age__gte=10, age__lt=33).order_by('name')
    for u in user_search:
        print("name:", u.name, ",age:", u.age)


def update_doc():
    User.objects(name="Ruby").update(inc__age=1)
    tmp = User.objects(name="Ruby")
    for u in tmp:
        print("name:", u.name, ",age:", u.age)


def delete_doc():
    user_list = User.objects(name='test')
    for user in user_list:
        user.delete()


def code_test():
    # 添加记录
    insert_doc()
    # 查询
    # select_doc()
    # 更新
    # update_doc()
    # 删除
    # delete_doc()


if __name__ == '__main__':
    code_test()
```

**查询数据库，可见：**
![](https://img-blog.csdnimg.cn/20191109155217419.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTU5OTg1OA==,size_16,color_FFFFFF,t_70)

---
结束！

> 原文地址： CSDN博客 - [Python（七）- 连接MongoDB数据库以及CURD操作！](https://blog.csdn.net/weixin_41599858/article/details/102987366)