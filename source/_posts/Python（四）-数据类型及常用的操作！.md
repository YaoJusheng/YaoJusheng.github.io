---
title: Python（四）- 数据类型及常用的操作！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 2fc509ab
date: 2020-03-13 21:53:24
tags:
  - 数据类型
  - 基本操作
categories:
  - [编程]
  - [Python]
---


> 所有语言的开端都绕不开数据类型，作为面向对象语言，Python之所以深受欢迎，同样离不开其丰富的数据类型

<!-- more -->

## 一、类型分类
1. **数字 Number**
2. **字符串 String**
3. **列表 List**
4. **元组 Tuple**
5. **字典 Dict/有序字典 OrderedDict**
6. **集合 Set/固定集合 FrozenSet**

## 二、相关操作
### 1. 数字 Number
- int：整型
- float：浮点型
- bool：布尔型
- complex：复数
> 数值运算： 加、减、乘、除、取模、求余、幂运算


### 2. 字符串 String
> Python中的字符串用单引号 ' 或双引号 " 括起来，使用反斜杠 \ 转义特殊字符。支持索引、切片，但不能改变

**常用字符串方法:**

| 方法   | 说明 |
|--|--|
| S.isdigit()  | 判断字符串中的字符是否全为数字 |
| S.isalpha()  | 判断字符串是否全为英文字母 |
| S.islower() | 判断字符串所有字符是否全为小写英文字母 |
| S.isupper() | 判断字符串所有字符是否全为大写英文字母 |
| S.isspace()  | 判断字符串是否全为空白字符 |
| S.center(width[,fill]) | 将原字符串居中，左右默认填充空格 |
| S.count(sub[, start[,end]])  | 获取一个字符串中子串的个数 |
| S.find(sub[, start[,end]]) | 获取字符串中子串sub的索引,失败返回-1 |
| S.strip() | 返回去掉左右空白字符的字符串 |
| S.lstrip() | 返回去掉左侧空白字符的字符串 |
| S.rstrip() | 返回去掉右侧空白字符的字符串 |
| S.upper()  | 生成将英文转换为大写的字符串 |
| S.lower()  | 生成将英文转换为小写的字符串 |
| S.replace(old, new[, count])  | 将原字符串的old用new代替，生成一个新的字符串 |
| S.startswith(prefix[, start[, end]]) | 返回S是否是以prefix开头，如果以prefix开头返回True,否则返回False, |
| S.endswith(suffix[, start[, end]]) | 返回S是否是以suffix结尾，如果以suffix结尾返回True,否则返回False |
| S.title()  | 生成每个英文单词的首字母大写字符串 |
| S.isnumeric()  | 判断字符串是否全为数字字符 |
| ... | ... |



### 3. 列表 List
> Python 中使用最频繁的数据类型，支持索引、切片、赋值，为可变类型。详细可见：help(list)

**常用列表方法：**

| 方法  | 说明|
|--|--|
| L.index(v [, begin[, end]])  | 返回对应元素的索引下标, begin为开始索引，end为结束索引,当 value不存在时触发ValueError错误 |
| L.insert(index, obj) | 将某个元素插放到列表中指定的位置 |
| L.count(x) | 返回列表中元素的个数 |
| L.remove(x) | 从列表中删除第一次出现在列表中的值 |
| L.copy()  | 复制此列表（只复制一层，不会复制深层对象) |
| L.append(x)  | 向列表中追加单个元素 |
| L.extend(lst)  | 向列表追加另一个列表 |
| L.clear()   | 清空列表,等同于 L[:] = [] |
| L.sort(reverse=False) | 将列表中的元素进行排序，默认顺序按值的小到大的顺序排列 |
| L.reverse()   | 列表的反转，用来改变原列表的先后顺序 |
| L.pop([index])  |删除索引对应的元素，如果不加索引，默认删除最后元素，同时返回删除元素的引用关系 |
| ... | ... |

> 常用还有列表推倒式，如：[i for i in range(10) if i % 2 == 0]



### 4. 元组 Tuple
> 元组是一个不可变类型，支持索引、切片，当元组内嵌有其他可变类型时，可以改变可变类型的值。

**元组支持的方法：**

| 方法 | 说明 |
|--|--|
| len(tuple) | 计算元组元素个数 |
| max(tuple) | 返回元组中元素最大值 |
| min(tuple) | 返回元组中元素最小值 |
| tuple(seq) | 将列表转换为元组 |
| ~~cmp(tup1,tup2~~ )  | 比较两个元组元素 |
| tuple.count(val) | 计算元素val在元组中的出现次数 |
| tuple.index(val) | 返回元素val在元组中的位置 |
| ... | ... |

> python3中将cmp()比较方法弃用了，可以手写一个：
> `cmp = lambda x,y: (x>y) - (x<y)`



### 5. 字典 Dict
> python中的字典属于可变无序类型，类似于其他语言中的哈希，如果需要有序，可用有序字典：OrderedDict

**字典的方法:**

| 方法 | 说明 |
|--|--|
| D.clear()  | 清空字典 |
| D.pop(key) | 移除键，同时返回此键所对应的值 |
| D.copy() | 返回字典D的副本,只复制一层(浅拷贝) |
| D.update(D2) | 将字典 D2 合并到D中，如果键相同，则此键的值取D2的值作为新值 |
| D.get(key, default) | 返回键key所对应的值,如果没有此键，则返回default |
| D.keys()  | 返回可迭代的 dict_keys 集合对象 |
| D.values() | 返回可迭代的 dict_values 值对象 |
| D.items() | 返回可迭代的 dict_items 对象 |
| ... | ... |

> 常用还有字典推倒式，如：    {k: v for k, v in zip(lst1, lst2)}

> 创建有序字典：
> `import collections`
> `od = collections.OrderedDict()`

**有序字典的方法：**

| 方法 | 说明 |
|--|--|
| od.clear() | 清空字典 |
| od.copy() | 拷贝 |
| od.fromkeys(lst1,val) | fromkeys(指定一个列表，把列表中的值作为字典的key,生成一个字典) |
| od.get(key, default) | 返回键key所对应的值,如果没有此键，则返回default |
| od.update(od2) | 将字典 od2 合并到od中，如果键相同，则此键的值取od2的值作为新值	|
| od.pop(k) | 获取指定key的value，并在字典中删除 |
| od.popitem() | 按照后进先出原则，删除最后加入的元素，返回key-value |
| od.move_to_end(k) | 指定一个key，把对应的key-value移到最后 |
| od.keys() |  获取字典所有的key|
| od.values() |获取字典所有的value |
| od.items() | 返回由键值对组成的列表 |
| od.setdefault(k) | 获取指定key的value，如果key不存在，则创建 |



### 6. 集合 Set
> 集合：基本功能是进行成员关系测试和删除重复元素，也是无序可变的，固定集合是不可变的。

**1. 集合的运算：**
- 交集 &
- 并集 |
- 补集（差集） -
- 对称补集 ^
- 子集 <
- 超集（父集） >

**2. 集合的常用方法：**

| 方法 | 说明 |
|--|--|
| S.add(e) |  在集合中添加一个新的元素e；如果元素已经存在，则不添加 |
| S.remove(e) | 从集合中删除一个元素，如果元素不存在于集合中，则会产生一个KeyError错误 |
| S.discard(e) | 从集合S中移除一个元素e; |
| S.clear() | 清空集合内的所有元素 |
| S.copy() | 将集合进行一次浅拷贝 |
| S.pop() | 从集合S中删除一个随机元素;如果此集合为空，则引发KeyError异常 |
| S.update(s2) | 用 S与s2得到的全集更新变量S |
| S.difference(s2) | 用S - s2 运算，返回存在于在S中，但不在s2中的所有元素的集合 |
| S.difference_update(s2) | 等同于 S = S - s2 |
| S.intersection(s2) | 等同于S & s2 |
| S.intersection_update(s2) |  等同于S = S & s2 |
| S.isdisjoint(s2) | 如果S与s2交集为空返回True,非空则返回False |
| S.issubset(s2) |  如果S与s2交集为非空返回True,空则返回False |
| S.issuperset(...)  | 如果S为s2的子集返回True,否则返回False |
| S.symmetric_difference(s2) | 返回对称补集,等同于 S ^ s2 |
| S.symmetric_difference_update(s2) | 用S 与 s2的对称补集更新 S |
| S.union(s2) | 生成 S 与 s2的全集 |
| ... | ... |

> 常用还有集合推倒式，如：{x**2 for x in range(6)}


---

另外的关于时间的类型，可以参考time、datetime、pytz等模块，对时间格式化处理比较多样灵活。

结束！


> 原文地址： CSDN博客 - [Python（四）- 数据类型及常用的操作！](https://blog.csdn.net/weixin_41599858/article/details/102883940)