---
title: PHP（二）- 前后端交互！
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
abbrlink: 29af8599
date: 2020-03-12 21:09:54
tags:
  - 前后端交互
categories:
  - [编程]
  - [PHP]
---


> **html与php混编:**
<!-- more -->
- 如果想让web服务器能自动转发这些请求, 文档的扩展名就不能是.html, 必须是.php
- 遇到一个<?php ?>就转发一个cgi请求, 不管这些标签出现在当前文档的什么地方
- 用户最终看到的,仍然是一个html文档, php代码中的内容不会被泄漏的


# http请求类型
> 最常用的就是GET和POST二种请求类型

## 1、GET 请求

 - 请求参数以键值对的方式,附加到url地址上,称为查询字符串,用?号与当前脚本分隔 ;
 - url格式:index.php?name=peter&age=30 ;
 - 受url长度限制, GET方式传递的数据也是有限制的;
 - 服务器端脚本使用预定义变量数组 $_GET 进行接收.

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>get</title>
	</head>
	<body>
		<form action="" method="get">
			<label for="email">邮箱:</label>
			<input type="email" id="email" name="email" value="">
			<label for="password">密码:</label>
			<input type="password" id="password" name="password" value="">
			<br/>

			<!--将用户输入的内容动态添加到value字段中, 创建具有粘性的表单-->
			<label for="email">邮箱:</label>
			<input type="email" id="email" name="email" value="<?php echo isset($_GET['email']) ? $_GET['email'] : ''; ?>">
			<label for="password">密码:</label>
			<input type="password" id="password" name="password" value="<?php echo isset($_GET['password']) ? $_GET['password'] : '';?>">
			<br/>

			<!--简易写法-->
			<label for="email">邮箱:</label>
			<input type="email" id="email" name="email" value="<?php echo $_GET['email'] ?? ''; ?>">
			<label for="password">密码:</label>
			<input type="password" id="password" name="password" value="<?php echo $_GET['password'] ?? ''; ?>">

			<button>登录</button>
		</form>
	</body>
</html>

<?php
	// 获取通过url发送的变量参数, php通过超全局变量$_GET获取
	// $_GET是一个数组,键名就是get参数名
	// 键名=>变量名, 值=>变量值

	// print_r()格式化打印输出一个数组
	print_r($_GET);
	echo $_GET['email'];

	// 获取变量之前要进行判断,用isset()
	if (isset($_GET['email'])) {
		echo $_GET['email'];
	} else {
		// 给个默认值
		$_GET['email'] = '';
	}
	// 与js类似,可以用三元运算符进行简化
	echo isset($_GET['email']) ? $_GET['email'] : '';

	// 使用<pre>标签,在网页中可以实现格式化输出
	echo '<pre>';
	print_r($_GET);
?>
```

## 2、POST 请求
- 请求参数放在header请求头中发送, url地址看不到请求参数,适合敏感信息;
- 通常是通过表单提交并, 用来更新服务器上的信息;
- 适合发送大量的数据到服务器端, 长度受到配置文件限制,但比GET要大得多;
- 服务器端脚本使用预定义变量数组 $_POST 进行接收.

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>post</title>
	</head>
	<body>
		<form action="" method="post">
			<label for="email">邮箱:</label>
			<!--将用户输入的内容动态添加到value字段中, 创建具有粘性的表单-->
			<input type="email" id="email" name="email" value="<?php echo isset($_POST['email']) ? $_POST['email'] : ''; ?>">
			<label for="password">密码:</label>
			<input type="password" id="password" name="password" value="<?php echo isset($_POST['email']) ? $_POST['email'] : '';?>">

			<button>登录</button>
		</form>
	</body>
</html>

<?php
	// POST请求, 参数不是通过URL传递, 而是通过请求头
	// 获取通过url发送的变量参数, php通过超全局变量$_POST获取
	// $_POST是一个数组,键名就是POST参数名
	// 键名=>变量名, 值=>变量值

	// print_r()格式化打印输出一个数组
	print_r($_POST);
	echo $_POST['email'];
	// 获取变量之前要进行判断,用isset()
	if (isset($_POST['email'])) {
		echo $_POST['email'];
	} else {  // 给个默认值
		$_POST['email'] = '';
	}
	// 与js类似,可以用三元运算符进行简化
	echo isset($_POST['email']) ? $_POST['email'] : '';

	// 使用<pre>标签,在网页中可以实现格式化输出
	echo '<pre>';
	print_r($_POST);
?>
```


> 详细资料，可参考：[php中文网](https://www.php.cn/)




> CSDN博客 - [PHP（二）- 前后端交互！](https://blog.csdn.net/weixin_41599858/article/details/102539707)