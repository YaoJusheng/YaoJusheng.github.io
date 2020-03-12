---
title: PHP（一）- 关于数组的创建和遍历！
toc: true
top: 1
order_by:
  - top: 1
  - date: -1
abbrlink: c5d93983
date: 2020-03-12 20:57:01
tags:
  - 数组
categories:
  - [编程]
  - [PHP]
---

> 本篇博客源自博主在[PHP中文网](https://www.php.cn/blog/detail/15494.html)上写的原文

<!-- more -->

# PHP数组基本知识
## 1.创建
### 1.1.索引数组
```php
<?php
// 创建索引数组
$movies = ['少年派', '带着爸爸去留学', '亲爱的, 热爱的'];
print_r($movies);
?>
```

### 1.2.关联数组
```php
<?php
  $arr = array(
        'name1' => '欧阳克',
        'age1'  => 18,
        'name2' => '黄蓉',
        'age2'  => 16,
        'name3' => '郭靖',
        'age3'  => 22,
  );
  var_dump($arr);
  print_r($arr);

?>
```

### 1.3.二维数组
```php
<?php
  // 二维数组：索引数组
  $arr1 = [
	[
	  '红楼梦',
	  '水浒传',
	],
	[
	  '三国演义',
	  '西游记',
	],
  ];
  print_r($arr1);

  // 二维数组：第一层索引数组，第二层关联数组
  $arr2 = [
      [
	 'red' => '红楼梦',
	 'water' => '水浒传',
	],
      [
	 'three' => '三国演义',
	 'western' => '西游记',
	],
  ];
  print_r($arr2);

  // 二维数组：关联数组
  $arr3 = [
	'one' => [
		'red' => '红楼梦',
		'water' => '水浒传',
	],
	'two' => [
		'three' => '三国演义',
		'western' => '西游记',
	],
  ];
  print_r($arr3);
  
  // 混写数组：一维数组 和 二维数组 混写
  // 二维数组 为其中 一维数组 的 值
  $arr4 = [
	'red' => '红楼梦',
	'water' => '水浒传',
	'two' => [
		'three' => '三国演义',
		'western' => '西游记',
	],
  ];
  print_r($arr4);

?>
```

## 2.数组的循环遍历

### 2.1.一维数组
```php
<?php
// 1.数组 循环 混写
// var_dump() 函数可以输出结构（类型和值）

// 一维数组：数值数组（索引数组）
$arr = ['欧阳', '司马', '诸葛', '西门'];

foreach ($arr as $key => $value) {
  # . 为连接符，表示一个字符串
  # , 逗号，表示多个字符串
  echo "$key" . ":" . "$value" . "<br>";
}
echo "<hr>";

// 一维数组：关联数组（索引自定义）
$arr2 = [
  'o' => '欧阳',
  's' => '司马',
  'z' => '诸葛',
  'x' => '西门',
];

foreach ($arr2 as $key => $value) {
  echo "$key" . ":" . "$value" . "<br>";
}
echo "<hr>";

?>
```

### 2.2.二维数组

```php
<?php
// 二维数组：索引数组
$arr3 = [
	[
	  '红楼梦',
	  '水浒传',
	],
	[
	  '三国演义',
	  '西游记',
	],
];
// 第一层
foreach ($arr3 as $key1 => $value1) {
  echo "index1: $key1<br>value1: ";
  var_dump($value1);
  echo "<br>";

  // 第二层
  foreach ($value1 as $key2 => $value2) {
    echo "index2: $key2" . ":" . "value2: $value2" . "<br>";
  }
}
echo "<hr>";

// 二维数组：第一层索引数组，第二层关联数组
$arr4 = [
	[
	  'red' => '红楼梦',
	  'water' => '水浒传',
	],
	[
	  'three' => '三国演义',
	  'western' => '西游记',
	],
];
// 第一层
foreach ($arr4 as $key1 => $value1) {
  echo "index1: $key1<br>value1: ";
  var_dump($value1);
   echo "<br>";

    // 第二层
    foreach ($value1 as $key2 => $value2) {
	 echo "index2: $key2" . ":" . "value2: $value2" . "<br>";
    }
}
echo "<hr>";

// 二维数组：关联数组
$arr5 = [
	'one' => [
	  'red' => '红楼梦',
	  'water' => '水浒传',
	],
	'two' => [
	  'three' => '三国演义',
	  'western' => '西游记',
	],
];

// 第一层
foreach ($arr5 as $key1 => $value1) {
  echo "index1: $key1<br>value1: ";
  var_dump($value1);
  echo "<br>";

  // 第二层
  foreach ($value1 as $key2 => $value2) {
    echo "index2: $key2" . ":" . "value2: $value2" . "<br>";
  }
}
echo "<hr>";

// 混写数组：一维数组 和 二维数组 混写
// 二维数组 为其中 一维数组 的 值
$arr6 = [
	'red' => '红楼梦',
	'water' => '水浒传',
	'two' => [
	  'three' => '三国演义',
	  'western' => '西游记',
	],
];

foreach ($arr6 as $key1 => $value1) {
  # 添加判断
  if (is_array($value1)) {
    foreach ($value1 as $key2 => $value2) {
      # code...
      echo "index2: $key2" . ":" . "value2: $value2" . "<br>";
    }
  }else{
    echo "index1: $key1" . ":" . "value1: $value1" . "<br>";
  }
}

echo "<hr>";

?>
```

### 2.3.三维数组

```php
<?php
// 三维数组的遍历
$arr7 = [
	'影视' => [
		'动漫' => [
			'热血' => '火影忍者',
			'暴力' => '龙珠Z',
			'科幻' => '绝命响应',
			'玄幻' => '斗罗大陆',
			'修仙' => '西行纪',
			'校园' => '网球王子',
		],
		'电影' => [
			'动作' => '战狼',
			'喜剧' => '港囧',
			'科幻' => '流浪地球',
			'战争' => '空天猎',
			'惊悚' => '午夜整容室',
			'冒险' => '机器之血',
		],
		'剧集' => [
			'玄幻' => '将夜',
			'喜剧' => '医馆笑传',
			'科幻' => '闪电侠',
			'诡战' => '和平饭店',
			'都市' => '人间至味是清欢',
			'校园' => '小欢喜',
		],
	],
	'书籍' => [
		'小说' => [
			'都市' => '贴身保镖',
			'末世' => '末世之无上王座',
			'网游' => '灵恸',
			'玄幻' => '斗破苍穹',
			'修仙' => '凡人修仙传',
			'同人' => '火影之最强卡卡西',
		],
		'名著' => [
			'中国' => '三国演义',
			'法国' => '悲惨世界',
			'俄国' => '战争与和平',
			'澳大利亚' => '荆棘鸟',
		],
	],

];

foreach ($arr7 as $key1 => $value1) {
	# 添加判断
	if (is_array($value1)) {
		foreach ($value1 as $key2 => $value2) {
			if (isset($value2)) {
				foreach ($value2 as $key3 => $value3) {
					echo "index3: $key3" . ":" . "value3: $value3" . "<br>";
				}
				echo "<hr>";
			} else {
				echo "index2: $key2" . ":" . "value2: $value2" . "<br>";
			}
		}
	} else {
		echo "index1: $key1" . ":" . "value1: $value1" . "<br>";
	}
}

echo "<hr>";

?>
```




> CSDN博客 - [PHP（一）- 关于数组的创建和遍历！](https://blog.csdn.net/weixin_41599858/article/details/102539549)