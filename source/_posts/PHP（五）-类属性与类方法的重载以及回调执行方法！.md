---
title: PHP（五）- 类属性与类方法的重载以及回调执行方法！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: 7d71ab32
date: 2020-03-13 21:20:45
tags:
  - 类属性
  - 方法重载
categories:
  - [编程]
  - [PHP]
---


> 本篇博客移值自博主在PHP中文网上写的原文，这里做个记录

<!-- more -->

# 1.属性重载

**主要使用以下四种魔术方法实现属性重载：**

- __get()：读操作,

-  __set()：写操作,

-  __isset()：判断是否有值, 

- __unset()：释放变量

**演示：**
```php
<?php
/**
 *
 * @authors Alfred (jusheng_yao@outlook.com)
 * @date    2019-10-09 22:08:35
 * @version 1.0
 */

// 属性重载：__get(), __set(), __isset(), __unset()
class UserInfo {
	public $name;
	private $salary = 9999;
	protected $password;

	public function __construct($name, $password) {
		// 对象的引用
		$this->name = $name;
		$this->password = $password;
	}

	// 属性重载方法：由系统调用
	// 1. __get(): 重载了用户对属性的访问，即读操作
	public function __get($name) {
		return ($this->name === 'admin') ? $this->$name : '权限不够！';
	}

	// 2. __set($name, $value): 写操作
	public function __set($name, $value) {
		if ($name === 'salary') {
      if ($this->name === 'admin'){
        $this->$name = $value;
        echo "工资更新成功！<br>";
      }else{
        echo '工资更新需要权限！<br>';
      }

			// return ($this->name === 'admin') ? ($this->$name = $value) : '工资更新需要权限！';
		}
		return $this->$name = $value;
	}

	// 3. __isset($name)：判断是否有值
	public function __isset($name) {
		return isset($this->$name);
	}

	//4. __unset($name)：释放资源
	public function __unset($name) {
		unset($this->$name);
	}

}

$obj = new UserInfo('大师兄', '123456');
$obj1 = new UserInfo('admin', '123456');

// 1.读操作
echo $obj->salary . '<hr>';

// 2.写操作
echo ($obj->salary = 15000);
echo '<hr>';

// 3.判断是否有值
echo isset($obj->name);
echo '<hr>';

// 4.释放变量
unset($obj->password);
echo '<hr>';

?>
```

# 2.方法重载

**以魔术方法__call()、__callStatic()分别实现对普通方法和静态方法的重载**

**演示：**
```php
<?php
/**
 *
 * @authors Alfred (jusheng_yao@outlook.com)
 * @date    2019-10-09 22:08:40
 * @version 1.0
 */

// 方法重载: __call()、__callStatic()
class TestDemo {
	// __call(): 访问一个不存在或无权限访问的方法的时候会自动调用
	public function __call($name, $args) {
		return '方法是: ' . $name . '<br>参数列表: <pre>' . print_r($args, true);
	}

	// __callStatic(): 访问一个不存在或无权限访问的静态方法的时候会自动调用
	public static function __callStatic($name, $args) {
		return '方法是: ' . $name . '<br>参数列表: <pre>' . print_r($args, true);
	}
}

$obj = new TestDemo();
echo $obj->getInfo1(1, 2, 3);

echo '<hr>';

echo TestDemo::getInfo2('html', 'css', 'js', 'ES6', 'vue');


?>
```

# 3.回调执行
**实现方法**
- `call_user_func()`
- `call_user_func_array()`

**作用：**
- 实现对函数和类方法（包括普通和静态方法）的回调

**演示：**

```php
<?php
/**
 *
 * @authors Alfred (jusheng_yao@outlook.com)
 * @date    2019-10-13 12:08:35
 * @version 1.0
 */

namespace _1008;

// 函数
function sum($a, $b) {
	return "{$a} + {$b} = " . ($a + $b);
}

// 类
class Test {
	public function reduce($a, $b) {
		return "{$a} - {$b} = " . ($a - $b);
	}

	public static function multiply($a, $b) {
		return "{$a} x {$b} = " . ($a * $b);
	}
}

// 执行回调方法
echo call_user_func(__NAMESPACE__ . '\sum', 11, 22);
echo "<hr>";

// 执行回调方法 - 数组
echo call_user_func_array(__NAMESPACE__ . '\sum', [1, 2]);
echo "<hr>";

// 执行回调对象中的公共方法
echo call_user_func_array([new Test(), 'reduce'], [22, 11]);
echo "<hr>";

// 执行回调对象中的静态方法
echo call_user_func_array(__NAMESPACE__ . '\Test::multiply', [11, 11]);
echo "<br>";
// 或者 使用 ::class
echo call_user_func_array([Test::class, 'multiply'], [11, 12]);
echo "<hr>";
?>
```