---
title: PHP（六）- 抽象类的继承与MySQL接口CURD操作的实现！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: f1afa15c
date: 2020-03-13 21:25:42
tags:
  - 类继承
  - MySQL
  - CURD
categories:
  - [编程]
  - [PHP]
  - [数据库]
---

> 本篇博客移值自博主在PHP中文网上写的原文，这里做个记录

<!-- more -->

# 1.抽象类继承
## 1.1. 抽象类特点
1. 抽象类不能实例化;
2. 抽象类中定义的抽象方法必须在子类中实现;
3. 如果子类定义了构造函数，父类的构造函数不会被调用，如果需要，构造函数中要写 `parent::__construct()`。

## 1.2. 演示
```php
<?php
/**
 *
 * @authors Alfred (jusheng_yao@outlook.com)
 * @date    2019-10-13 19:01:49
 * @version 1.0
 */

// 抽象类
abstract class People {
	// 抽象属性
	protected $name;

	public function __construct($name = 'Alfred') {
		$this->name = $name;
	}

	public function getName() {
		return $this->name;
	}

	// 签名, 抽象方法
	abstract public function setName($value);
}

class Person extends People {
	//构造方法不会继承
	public function __construct($name) {
		parent::__construct($name);
	}

	//抽象类中定义的抽象方法必须在子类中实现
	public function setName($value) {
		$this->name = $value;
	}
}

$person = new Person('轻狂书生');

echo '网游中的一个重要角色是： ' . $person->getName() . '<br>';

$person->setName("残雪飞戈");

echo 'Alfred 的QQ网名是： ' . $person->getName() . '<br>';

?>
```

# 2.数据库接口

- 接口放置空方法;
- DB类实现具体逻辑，如:
  - 增删改查、
  - 条件、
  - 限制、
  - 字段域、
  - 默认数据库参数属性等等

**实例演示：**

```php
<?php
/**
 *
 * @authors Alfred (jusheng_yao@outlook.com)
 * @date    2019-10-13 20:53:31
 * @version 1.0
 */

// 接口，类的模板
interface MySQL {
	// 增加数据
	public function create($data);

	// 读取数据
	public function read();

	// 更新数据
	public function update($data, $where);

	// 删除数据
	public function delete($where);
}

// 类，接口的实现
/**
 * mysql CURD操作
 */
class SQLAction implements MySQL {
	// 数据库连接参数
	protected $settings = [
		'type' => 'mysql',
		'host' => 'localhost',
		'dbname' => 'tests',
		'username' => 'root',
		'password' => '123456',
	];

	// 数据库的连接对象
	protected $pdo = null;

	// 数据表
	protected $table;

	// 字段
	public $field = '*';

	// 条件
	public $where;

	// 数量
	public $limit;

	// 构造方法: 连接数据库,并设置默认的数据表名称
	function __construct($dsn, $user, $password, $table = 'staff') {
		$default_dsn = "{$this->settings['type']}:host={$this->settings['host']};dbname={$this->settings['dbname']}";
		$dsn = empty($dsn) ? $default_dsn : $dsn;
		$user = empty($user) ? $this->settings['username'] : $user;
		$password = empty($password) ? $this->settings['password'] : $password;

		$this->pdo = new PDO($dsn, $user, $password);
		$this->table = $table;
	}

	// 增加数据
	public function create($data) {
		// 字段列表
		$fields = ' (name, age, sex,position, mobile, hiredate) ';
		// 值列表
		$values = ' (:name, :age, :sex, :position, :mobile, :hiredate) ';

		// 创建SQL - INSERT INTO TABLE FIELDS VALUES (...)
		$sql = 'INSERT INTO ' . $this->table . $fields . ' VALUES ' . $values;
		echo $sql . '<br>';

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute($data);

		return [
			'count' => $stmt->rowCount(),
			'id' => $this->pdo->lastInsertId(),
		];
	}

	// 读取数据
	public function read($fields = '*', $where = '', $limit = '0, 5') {
		// 设置字段
		$this->field = empty($fields) ? (empty($this->field) ? '*' : $this->field) : $fields;
		//设置条件
		$this->where = empty($where) ? (empty($this->where) ? '' : $this->where) : ' WHERE ' . $where;

		// 设置显示数量
		$this->limit = $limit === '0, 5' ? (empty($this->limit) ? ' LIMIT ' . $limit : $this->limit) : $limit;

		// 创建SQL - SELECT FIELDS FROM TABLE WHERE (...) LIMIT ...
		$sql = 'SELECT ' . $this->field . ' FROM ' . $this->table . $this->where . $this->limit;
		echo $sql . '<br>';

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_ASSOC);
	}

	// 更新数据
	public function update($data, $where) {
		$keyArr = array_keys($data);
		$set = '';
		foreach ($keyArr as $value) {
			$set .= $value . ' = :' . $value . ', ';
		}

		$set = rtrim($set, ', ');

		// 设置条件
		$this->where = empty($where) ? (empty($this->where) ? '' : $this->where) : ' WHERE ' . $where;

		// 创建SQL - UPDATE TABLE SET ... WHERE (...)
		$sql = 'UPDATE ' . $this->table . ' SET ' . $set . $this->where;
		echo $sql . '<br>';

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute($data);

		return $stmt->rowCount();
	}

	// 删除数据
	public function delete($where) {
		// 设置条件
		$this->where = empty($where) ? (empty($this->where) ? '' : $this->where) : ' WHERE ' . $where;
		// 创建SQL - DELETE FROM TABLE WHERE (...)
		$sql = 'DELETE FROM ' . $this->table . $this->where;
		echo $sql . '<br>';

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();

		return $stmt->rowCount();
	}

	// fields字段域
	public function field($fields = '*') {
		$this->field = empty($fields) ? '*' : $fields;
		echo $this->field . '<br>';
		return $this;
	}

	// where条件
	public function where($where = '') {
		$this->where = empty($where) ? $where : ' WHERE ' . $where;
		echo $this->where . '<br>';
		return $this;
	}

	// limit 数量限制
	public function limit($limit) {
		$this->limit = empty($limit) ? $limit : ' LIMIT ' . $limit;
		echo $this->limit . '<br>';
		return $this;
	}

}

// 客户端的代码
$dsn = 'mysql:host=127.0.0.1;dbname=tests';
$user = 'root';
$password = '123456';
$db = new SQLAction($dsn, $user, $password);

// 遍历1
foreach ($db->read() as $item) {
	print_r($item);
	echo '<br>';
}
echo 'field: ' . $db->field . '<br>';
echo 'where: ' . $db->where . '<br>';
echo 'limit: ' . $db->limit . '<br>';
echo '<hr>';

// 遍历2
$db->field('staff_id,name,position,mobile')
	->where('staff_id > 2')
	->limit(8);

foreach ($db->read() as $item) {
	print_r($item);
	echo '<br>';
}
echo 'field: ' . $db->field . '<br>';
echo 'where: ' . $db->where . '<br>';
echo 'limit: ' . $db->limit . '<br>';
echo '<hr>';

// 新增
$data = [
	'name' => '郭靖',
	'age' => 29,
	'sex' => 1,
	'position' => '金刀驸马',
	'mobile' => '1389998899',
	'hiredate' => time(),
];

$res = $db->create($data);
echo '成功的新增了: ' . $res['count'] . ' 条记录,新增的记录的主键ID是: ' . $res['id'] . '<br>';
echo 'field: ' . $db->field . '<br>';
echo 'where: ' . $db->where . '<br>';
echo 'limit: ' . $db->limit . '<br>';
echo '<hr>';

// 更新
// $data = [
//    'age' => 40,
//    'position' => '抗金英雄'
// ];

// $where = 'staff_id = 11';
// echo '成功的更新了: ' . $db->update($data, $where) . ' 条记录' . '<br>';
// echo 'field: ' . $db->field . '<br>';
// echo 'where: ' . $db->where . '<br>';
// echo 'limit: ' . $db->limit . '<br>';
// echo '<hr>';

// 删除
// $where = 'staff_id = 11';
// echo '成功的删除了: ' . $db->delete($where) . ' 条记录' . '<br>';
// echo 'field: ' . $db->field . '<br>';
// echo 'where: ' . $db->where . '<br>';
// echo 'limit: ' . $db->limit . '<br>';
// echo '<hr>';
```