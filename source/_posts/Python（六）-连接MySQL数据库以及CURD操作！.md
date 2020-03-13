---
title: Python（六）- 连接MySQL数据库以及CURD操作！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 17f677f9
date: 2020-03-13 22:07:49
tags:
  - MySQL
  - CURD
categories:
  - [编程]
  - [Python]
  - [数据库]
---

> 本文介绍python中对MySQL数据库操作的几个模块

<!-- more -->

## 一、简介
MySQL是一个轻量级的关系型数据库管理系统，由于性能高、成本低、可靠性好，已经成为最流行的开源数据库，广泛应用于中小型网络

## 二、安装
具体安装步骤可以参考：[Windows安装MySQL](https://blog.csdn.net/zhouzezhou/article/details/52446608)

## 三、使用
> 这里主要举例，介绍几种python操作MySQL的模块：MySQLdb、pymysql、sqlalchemy、peewee。

**数据库配置：**
```python
# baseConfig.py

# 数据库配置
DATABASE = {
    'mysql': {
        'username': 'alfred',
        'password': '123456',
        'host': 'localhost',
        'port': 3306,
        'name': 'tests',
    },
    ...
}
```


### 1. MySQLdb
> 基于C库来写的mysql连接库，这个使用比较简单，对于增删改查操作，多用原生sql语句，可以根据需要而定制。
```python
from baseConfig import DATABASE

DB_CONF = DATABASE['mysql']

# ----------------- MySQLdb ----------------
import MySQLdb


class SQLTool_V1(object):
    """使用MySQLdb"""
    
    def __init__(self, **kwargs):
       
        self.db = MySQLdb.connect(
            host=kwargs["host"] or '127.0.0.1',  # 主机名
            port=kwargs["port"] or 3306,  # 端口号
            user=kwargs["username"] or 'alfred',  # 用户名
            passwd=kwargs["password"] or '123456',  # 密码
            db=kwargs["name"] or 'tests')  # 数据库名称
        # 查询前，必须先获取游标
        self.cur = self.db.cursor()
    
    def select(self, table):
        # 执行的都是原生SQL语句
        self.cur.execute(f"SELECT * FROM {table}")
        
        for row in self.cur.fetchall():
            print(row)
    
    def create(self):
        pass
    
    def update(self):
        pass
    
    def add(self):
        pass
    
    def delete(self):
        pass
    
    def close(self):
        self.cur.close()
        self.db.close()


sql_v1 = SQLTool_V1(**DB_CONF)

sql_v1.select('user') 

```

### 2. pymysql
> pymysql 是纯python写的主流连接库，使用也比较简单
```python

import pymysql


class SQLTool_V2(object):
    """使用pymysql"""
    
    def __init__(self, **kwargs):
        self.conn = pymysql.connect(
            host=kwargs["host"] or '127.0.0.1',  # 主机名
            port=kwargs["port"] or 3306,  # 端口号
            user=kwargs["username"] or 'alfred',  # 用户名
            passwd=kwargs["password"] or '123456',  # 密码
            db=kwargs["name"] or 'tests')  # 数据库名称
        self.cur = self.conn.cursor()
    
    def select(self, table):
        self.cur.execute(f"SELECT * FROM {table}")
        for r in self.cur:
            print(r)
    
    def close(self):
        self.cur.close()
        self.conn.close()


sql_v2 = SQLTool_V2(**DB_CONF)

sql_v2.select('user')
```

### 3. sqlalchemy
> 主要特点：既支持原生 SQL，又支持 ORM 

```python
import datetime

from baseConfig import DATABASE

DB_CONF = DATABASE['mysql']

# ----------------- sqlalchemy ----------------
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, ForeignKey, CHAR, BOOLEAN, VARCHAR, \
    DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 创建一个连接引擎, 显示每条执行的 SQL 语句(echo=True)
engine = create_engine("mysql+pymysql://{username}:{password}@{host}:{port}/{name}".format(**DB_CONF), echo=True)


# ******** 方式一: 元数据 ********
# 创建元数据
metadata = MetaData(engine)  # Base.metadata.bind = engine

# 添加表结构 - Table()方法用来创建表
# 第一个参数为表名，第二是存入元数据，使用Column()方法设置表字段
customer = Table('customer', metadata,
                 Column('id', Integer, primary_key=True),
                 Column('name', String(20)),
                 Column('fullname', String(40)),
                 )
address_table = Table('address', metadata,
                      Column('id', Integer, primary_key=True),
                      Column('customer_id', None, ForeignKey('customer.id')),
                      Column('email', String(128), nullable=False)
                      )


# 执行创建
def execute_create():
    metadata.create_all()


# ******** 方式二: Base 基类 ********
# 创建对象的基类
Base = declarative_base()
Base.metadata.bind = engine


class Person(Base):
    __tablename__ = 'person'
    id = Column(Integer, primary_key=True)
    name = Column('name', String(250))
    cname = Column('cname', CHAR(30), nullable=True)
    age = Column('age', Integer)
    position = Column('position', VARCHAR(20))
    address = Column('address', VARCHAR(50), nullable=True)
    creatime = Column('creatime', DateTime, default=datetime.datetime.now)
    flag = Column('flag', BOOLEAN, default=False)


# 创建数据库会话类
DBSession = sessionmaker(bind=engine)
# 使用session对数据库进行操作
session = DBSession()


def create_table():
    Base.metadata.create_all()


def session_select():
    query_1 = session.execute('select * from user')  # sql 查询
    res1 = query_1.fetchall()  # 获取所有的结果fetchone()取得结果的第一行
    print('sql查询 res1: ', res1)
    print('==============================================')
    
    # res2 = session.query(Person).all()
    # print('query 查询 res2: ',res2)
    # session.close()  # 关闭连接


def session_add(data, table=None):
    table = Person if table is None else table
    for dic in data:
        p_stu = table(**dic)
        session.add(p_stu)
        session.commit()


def session_update_v1(table: str, data: dict, where=''):
    flag = True
    try:
        data = data.items()
        func = lambda x: ' = '.join(x)
        field_info = ','.join(list(map(func, data)))
        where = ' WHERE ' + where if where else ''
        sql_update = '''UPDATE {0} SET {1} {2}'''.format(table, field_info, where)
        session.execute(sql_update)
        session.commit()
    except Exception as e:
        print(e)
        flag = False
    return flag


def session_update_v2():
    row = session.query(Person).filter_by(name='alfred001').update({Person.name: 'xxx',Person.cname: 'superman'})
    session.commit()


def session_delete():
    row = session.query(Person).filter_by(name='sum')[0]  # first
    print(row)
    session.delete(row)
    session.commit()


def session_drop():
    Base.metadata.drop_all()


def code_test():
    # 方式一：创建
    # execute_create()
    # 方式二：创建
    # create_table()
    # 查询
    # session_select()
    # 插入数据
    data = [
        {
            'name': 'alfred',
            'age': '28',
            'position': 'python',
        },
        {
            'name': 'xxx',
            'age': '28',
            'position': 'php',
        },
        {
            'name': 'sum',
            'age': '26',
            'position': 'ruby',
        }
    ]
    # session_add(data)
    # 更新数据(更新时，注意用转义字符)
    data2 = {
        'name': '\'alfred001\'',
        'age': '28',
        'position': '\'php+web\'',
    }
    # session_update_v1('person', data2, 'id=2')
    # session_update_v2()
    # 删除数据
    # session_delete()


if __name__ == '__main__':
    code_test()


```

### 4. peewee
> 比较流行的ORM框架，安装：pip install peewee

```python
import datetime

from baseConfig import DATABASE

DB_CONF = DATABASE['mysql']

# ----------------- peewee ----------------
import peewee


peewee_db = peewee.MySQLDatabase(database='tests', user='alfred', passwd='123456')


class Author(peewee.Model):
    LV_1 = 0
    LV_2 = 1
    LV_3 = 2
    LV_4 = 3
    EDUCATION_LEVEL = (
        (LV_1, '高中'),
        (LV_2, '大专'),
        (LV_3, '本科'),
        (LV_4, '研究生'),
    )
    pen_name = peewee.CharField(unique=True, null=False)
    age = peewee.IntegerField()
    education = peewee.CharField(choices=EDUCATION_LEVEL, default=LV_3)
    created_date = peewee.DateTimeField(default=datetime.datetime.now, null=True)
    is_active = peewee.BooleanField(default=True)
    
    class Meta:
        database = peewee_db


class Book(peewee.Model):
    author = peewee.ForeignKeyField(Author, related_name='books')
    title = peewee.CharField(50, unique=True)
    content = peewee.TextField()
    is_active = peewee.BooleanField(default=True)
    
    class Meta:
        database = peewee_db


def peewee_create_table():
    flag = True
    try:
        Author.create_table()
        Book.create_table()
    except Exception as e:
        print(e)
        flag = False
    
    return flag


def peewee_insert():
    # 1 - ok
    # author = Author.create(pen_name="alfred001", age=28)
    # Book.create(author=author, title='python is strong', content='xxxxoooo')
    # 2 - ok
    # p = Author(pen_name="飘散随风", age=25)
    # p.save()
    # 3 - ok
    Author.insert(pen_name='Mickey', age=27).execute()  # 返回主键
    data = [
        {'author_id': 2, 'title': '踏星', 'content': 'xxx'},
        {'author_id': 3, 'title': '三国', 'content': '***'}]
    query = Book.insert_many(data)  # 插入了多个
    query.execute()


def peewee_update():
    author=Author.get(Author.pen_name.startswith('alfred'))
    print(author)
    # query = (Book
    #          .update(title='python is powerful', content='Really powerful')
    #          # .where(Book.author==author)
    #          )
    # query.execute()  # 元子操作


def peewee_select():
    author = Author.get(id=1)  # get()方法只能查询一条，且是唯一的一条数据
    print(author)
    print(author.pen_name)
    print(author.education)
    for book in Book.filter(title="踏星"):
        print(book.author.pen_name)


def peewee_delete():
    author = Author.get(education=Author.LV_1)
    query = Book.delete().where(Book.author == author)
    query.execute()


def code_test():
    # 建表
    # peewee_create_table()  # ok
    # 增加数据（插入）
    # peewee_insert()  # ok
    # 更新
    # peewee_update()  # ok
    # 查询
    # peewee_select()  # ok
    # 删除数据
    peewee_delete()  # ok


if __name__ == '__main__':
    code_test()


```


---
结束

> 原文地址： CSDN博客 - [Python（六）- 连接MySQL数据库以及CURD操作！](https://blog.csdn.net/weixin_41599858/article/details/102945404)
