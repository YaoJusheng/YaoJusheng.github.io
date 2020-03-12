---
title: PHP（三）- 匿名函数、命名空间以及类与对象的学习！
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
abbrlink: 25de20b7
date: 2020-03-12 21:16:37
tags:
  - 类与对象
  - 匿名函数
  - 命名空间
categories:
  - [编程]
  - [PHP]
---

> 本篇博客来自博主在[php中文网](https://www.php.cn/blog/detail/15677.html)上写的一篇，移至CSDN作为记录。
<!-- more -->
# 1.匿名函数

## 1.1.解释：

- 匿名函数也叫闭包函数，即不指定函数名；
- 匿名函数不能直接调用，需要先将匿名函数赋值给一个变量，然后由变量来调用；
- 因为是赋值给一个变量，末尾要加“;”，这也是与普通函数的区别之一。

## 1.2.优点：

- 因为匿名，开发者不需要花费心思，去想一个见名知意又简单名字来表示；
- 只在调用时，临时创建，用完立即释放，不像其他函数那样即便未调用也占内存空间；

## 1.3.应用场景：

- 作为值，参与计算

- 作为函数回调

- 闭包

## 1.4.简单演示：
```php
<?php
// 场景1：作为值
$sum = function ($a, $b) {
  return $a + $b;
};

// 按值调用
echo $sum(66, 99);
echo "<hr>";

// 场景2：作为 回调用
$arr = [3, 2, 6, 1, 8, 9];
usort($arr, function ($a, $b) {
  return $b - $a;
});

echo '<pre>' . print_r($arr, true);
echo '<hr>';

// 场景3：闭包
function demo() {
  // 父作用域中的变量
  $email = 'alfred@outlook.com';
  // func: 匿名子函数
  return function () use ($email) {
    return $email;
  };
}

echo demo()();
echo '<hr>';
?>
```

# 2.命名空间

## 2.1.解释：
- 命名空间是一种封装事物的方法；
- 在程序语言中开辟一段代码空间，不同空间的对象名相互独立，互不冲突；
- 第一个命名空间前不能有任何代码，一般，命名空间定义为脚本第一行代码；
- 调用不同空间内类或方法需写明命名空间；

## 2.2.作用：
- 避免开发者在项目中定义的类名、函数名或变量出现重复冲突；
- 为很长的标识符名称 创建一个别名 ，提高源代码的可读性；

## 2.3.演示：
**语法：**
```php
<?php
// 写法一
namespace blue;

class Test
{
  // ...
}

// 写法二
namespace green{
  class Test
  {
    // ...
  }
}
?>
```

**简单使用**

在func.php文件中写入：
```php
<?php
namespace _demo_01;
// 匿名函数与闭包

// 命名函数
function sum($a, $b) {
	return $a + $b;
}

?>
```
在 transfer.php文件中写入：
```php
<?php
namespace _demo_02; // 命名空间必须是脚本的第一行代码

// 如果引入同名函数，程序会报错，
// 解决方法，使用 命名空间
include __DIR__ . './func.php';

// 对象
function sum($a, $b) {
	return $a + $b;
}

// \ 表示全局空间
echo namespace\sum(20, 66);
echo '<hr>';

// 访问另一个空间的函数
echo \_demo_01\sum(88, 99);
echo '<hr>';

?>
```

# 3.类与对象

## 3.1.解释：

1. 对象：一切事物皆对象，对象是用来描述客观事物的一个实体。

2. 类：类是把具有相似特性的对象归纳到一个抽象类中，即一组相同属性和行为的对象的集合。

3. 类和对象的关系如下：
类是相似对象的统一描述，类就是对象的一个模板；
先有类，再有对象；
类是对象的抽象；
对象是类的实例。

## 3.2.使用：

1. 在php中，通过关键字class来创建和声明一个类（其他语言基本类似），
```php
class Person{
    //成员属性和方法

    // 属性：变量

   // 方法：函数 

}

```

2. 使用new 关键字 实列化 类
```php
$obj = new People();
```

3. 演示：
```php
<?php
// 类的声明
class People {
	// ...成员属性和方法
	// 属性：变量
	public $name = 'alfred';
	// 方法：函数
	public function sleep() {
		echo "{$this->name} is going to sleep...<br/>";
	}
}

// 实列化 new
$obj = new People();

var_dump($obj);
echo '<br>';

echo 'name = ' . $obj->name . '<br>';
$obj->sleep();


?>
```

> CSDN博客 - [PHP（三）- 匿名函数、命名空间以及类与对象的学习！](https://blog.csdn.net/weixin_41599858/article/details/102539902)