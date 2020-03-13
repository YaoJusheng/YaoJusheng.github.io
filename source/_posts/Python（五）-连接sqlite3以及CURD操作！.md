---
title: Python（五）- 连接sqlite3以及CURD操作！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 5e26e967
date: 2020-03-13 22:02:59
tags:
  - SQLite
  - CURD
categories:
  - [编程]
  - [Python]
  - [数据库]
---


> 本文主要描述使用python连接sqlite数据库，并进行简单的CURD操作

<!-- more -->

## 一、简介
**SQLite**是一种C语言的嵌入式的数据库，它实现了一个 小型， 快速， 自包含， 高可靠性， 功能齐全的 SQL数据库引擎，它是一个零配置的数据库，我们不需要在系统中配置。SQLite 直接访问其存储文件。

## 二、安装
安装比较简单，
具体的安装步骤，可以参考这篇博客：[Windows 上如何安装Sqlite](https://www.cnblogs.com/xcsn/p/6050878.html)

## 三、使用
> 这里主要展示利用python中的api去连接和操作sqlite

首先，操作关系数据库，需要连接到数据库，一个数据库连接称为Connection；
之后，打开游标，称之为Cursor，通过Cursor执行SQL语句；
最后，获得执行结果。

### 1. 简单使用
```python
# 导入api模块
import sqlite3

# 创建连接
conn = sqlite3.connect('test.db')

# 创建一个Cursor游标
cursor = conn.cursor()

# 执行sql语句
cursor.execute('CREATE TABLE USER (ID INT PRIMARY KEY, NAME VARCHAR(50) NOT NULL, AGE INT NOT NULL)')

# 提交事务
conn.commit() 

# 关闭Connection
conn.close()
```


### 2. 自定义操作类

```python
import sqlite3
import collections


class SQLiteAPI(object):
    def __init__(self, dbname=None):
        self.dbname = dbname if dbname is not None else 'test.db'
        self.conn = sqlite3.connect(self.dbname)  # 如果文件不存在，会自动在当前目录创建:
        # 创建一个Cursor
        self.cursor = self.conn.cursor()
        
    def create(self, table: str, fields: dict):
        '''
        建表（待完善）
        :param table: 表名
        :param fields: 字段及类型
        :return: 执行结果
        '''
        pass
        
    def insert(self, table: str, data: dict):
        '''
        插入语句
        :param table: 表名
        :param data: 字典（包含插入列，值）
        :return: 执行结果
        '''
        pass
    
    def select(self, table: str, cols='*', where=''):
        '''
        查询
        :param table: 表名
        :param cols: 查询列
        :param where: 查询条件
        :return: 查询结果
        '''
        pass
   	
    def update(self, table: str, data: dict, where=''):
        '''
        更新表
        :param table: 表名
        :param data:更新数据
        :param where:条件
        :return: 执行结果
        '''
        pass
        
    def delete(self, table: str, where=''):
        '''
        删除数据
        :param table: 表名
        :param where: 条件
        :return: 执行结果
        '''
        pass
       
    def drop(self, table: str):
        '''
        删除表
        :param table:
        :return:
        '''
        pass
    
	def close(self):
        self.cursor.close()  # 关闭Cursor
        self.conn.close()  # 关闭Connection
```


#### 2.1. 创建表
```python

    def create(self, table: str, fields: dict):
        '''
        建表（待完善）
        :param table: 表名
        :param fields: 字段及类型
        :return: 执行结果
        '''
        flag = True
        try:
            data = fields.items()
            func = lambda x: ' '.join(x)
            field_info = ','.join(list(map(func, data)))
            # create table fields
            sql_create = f"CREATE TABLE {table} ({field_info})"
            print(sql_create)
            self.cursor.execute(sql_create)
            self.conn.commit()  # 提交事务
        except Exception as e:
            print(e)
            flag = False
        return flag
```

#### 2.2. 插入语句（增加记录）
```python
    def insert(self, table: str, data: dict):
        '''
        插入语句
        :param table: 表名
        :param data: 字典（包含插入列，值）
        :return: 执行结果
        '''
        flag = True
        count = 0
        try:
            data = collections.OrderedDict(data)
            keys = tuple(data.keys())
            vals = tuple(data.values())
            sql_insert = '''INSERT INTO %s %s VALUES %s''' % (table, keys, vals)
            print(sql_insert)
            self.cursor.execute(sql_insert)
            count = self.cursor.rowcount
            self.conn.commit()
        except Exception as e:
            print(e)
            flag = False
        return flag, count

```

#### 2.3. 查询操作
```python
    def select(self, table: str, cols='*', where=''):
        '''
        查询
        :param table: 表名
        :param cols: 查询列
        :param where: 查询条件
        :return: 查询结果
        '''
        values = None
        try:
            where = 'WHERE ' + where if where else ''
            sql_select = '''SELECT {1} FROM {0} {2}'''.format(table, cols, where)
            print(sql_select)
            self.cursor.execute(sql_select)
            values = self.cursor.fetchall()
        except Exception as e:
            print(e)
        
        return values

```

#### 2.4. 更新操作
```python
    def update(self, table: str, data: dict, where=''):
        '''
        更新表
        :param table: 表名
        :param data:更新数据
        :param where:条件
        :return: 执行结果
        '''
        flag = True
        count = 0
        try:
            data = data.items()
            func = lambda x: ' = '.join(x)
            field_info = ','.join(list(map(func, data)))
            where = ' WHERE ' + where if where else ''
            sql_update = '''UPDATE {0} SET {1} {2}'''.format(table, field_info, where)
            # sql_update = '''UPDATE USER SET NAME = 'sun' WHERE ID = 3 '''   # test
            print(sql_update)
            self.cursor.execute(sql_update)
            count = self.cursor.rowcount
            self.conn.commit()
        except Exception as e:
            print(e)
            flag = False
        return flag, count

```

#### 2.5. 删除操作
```python
    def delete(self, table: str, where=''):
        '''
        删除数据
        :param table: 表名
        :param where: 条件
        :return: 执行结果
        '''
        flag = True
        count = 0
        if not where:
            print('条件不能为空，请重新尝试！')
            return False, count
        try:
            sql_delete = '''DELETE FROM {0} WHERE {1}'''.format(table, where)
            
            self.cursor.execute(sql_delete)
            count = self.cursor.rowcount
            self.conn.commit()
        except Exception as e:
            print(e)
            flag = False
        return flag, count

```

#### 2.6. 删除表
```python
    def drop(self, table: str):
        '''
        删除表
        :param table:
        :return:
        '''
        flag = True
        try:
            sql_drop = f'''DROP TABLE {table}'''
            self.cursor.execute(sql_drop)
            self.conn.commit()
        except Exception as e:
            print(e)
            flag = False
        return flag
        
```


### 3. 测试
```python

def code_test():
    # 新建表
    fields = {
        'id ': 'INT PRIMARY KEY',
        'name': 'VARCHAR(50) NOT NULL',
        'phone': 'VARCHAR(20)',
        'address': 'VARCHAR(50)',
        'age': 'INT NOT NULL',
        'position': 'VARCHAR(20)',
        'salary': 'REAL',
    }
    # res = myApi.create('user',fields)
    # print('create result is :', res)
    
    # 插入数据
    insert_data = {
        'id': '1',
        'name': 'alfred',
        'phone': '111111',
        'age': '20',
        'salary': '15000',
    }
    # res2 = myApi.insert('user', insert_data)
    # print('insert result is :', res2)
    
    # 查询数据
    # res3 = myApi.select('user', cols='id,name', where='id=2')
    # res3 = myApi.select('user')
    # print('select result is :', res3)
    
    # 更新数据(提示：no such column: 加''号，可以用转义字符)
    update_data = {
        'name': '\'Lucy\''
    }
    res4 = myApi.update('user', data=update_data, where='id=3')
    print('update result is :', res4)
    
    # 删除数据
    # res5 = myApi.delete('user', where='id=3')
    # print('delete result is :', res5)
    
    # 删除表
    # res6 = myApi.drop('user')
    # print('drop result is :', res6)


myApi = SQLiteAPI()


if __name__ == '__main__':
    code_test()


```


---

结束，以上是对sqlite数据库的一些简单操作！

> 原文地址： CSDN博客 - [Python（五）- 连接sqlite3以及CURD操作！](https://blog.csdn.net/weixin_41599858/article/details/102888828)