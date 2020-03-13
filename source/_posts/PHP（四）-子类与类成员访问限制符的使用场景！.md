---
title: PHP（四）- 子类与类成员访问限制符的使用场景！
toc: true
top: true
order_by:
  - top: 1
  - date: -1
abbrlink: a06e8925
date: 2020-03-13 21:14:15
tags:
  - 访问限制符
categories:
  - [编程]
  - [PHP]
---

> 本篇博客源自博主在PHP中文网上写的原文，这里做个记录
<!-- more -->

# 1.子类
## 1.1. 简介
> 面向对象语言的三大特点：封装、继承、多态。

- 封装，也就是把客观事物封装成抽象的类，一个类就是一个封装了数据以及操作这些数据的代码的逻辑实体。

- 继承，是指可以让某个类型的对象获得另一个类型的对象的属性的方法，可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展，而通过继承创建的新类称为“子类”或“派生类”，被继承的类称为“基类”、“父类”或“超类”。

- 多态，是指一个类实例的相同方法在不同情形有不同表现形式。

## 1.2. php子类的应用场景

- 代码复用

- 功能扩展

- 方法重写

## 1.3. 演示
```php
<?php

class Demo
{
    // 属性(变量)
    public $product;
    public $price;

    // 构造方法
    public function __construct($product, $price)
    {
        $this->product = $product;
        $this->price = $price;
    }

    // 方法(函数)
    public function getInfo()
    {
        return '商品名称: ' . $this->product.', 商品价格: ' . $this->price;
    }
}

// 子类
// 1. 代码复用
class Sub1 extends Demo
{
    // ...
}

$sub1 = new Sub1('iPhone 11', 9800);
echo $sub1->getInfo() . '<hr>';

// 子类
// 2. 功能扩展
class Sub2 extends Demo
{
    // 增加一个属性
    public $num; // 数量

    // 构造方法
    public function __construct($product, $price, $num)
    {
//        $this->product = $product;
//        $this->price = $price;
        parent::__construct($product, $price);
        $this->num = $num;
    }

    // 子类中增加一个新方法: 计算总和
    public function total()
    {
        return round($this->price * $this->num, 3);
    }
}

$sub2 = new Sub2('电脑', 3980.1234, 13);
echo $sub2->product . '的总价是:　'. $sub2->total(). '<hr>';

// 子类
// 3. 方法重写
class Sub3 extends Sub2
{
    // 重写total()
    public function total()
    {
        $total = parent::total();

//        设置折扣率
        switch (true)
        {
            case ($total > 20000 && $total < 40000):
                $discountRate = 0.88;
                break;
            case ($total >= 40000 && $total < 60000):
                $discountRate = 0.78;
                break;
            case ($total >= 60000):
                $discountRate = 0.68;
                break;
            default:
                // 小于或等于2000,不打折
                $discountRate = 1;
        }
        // 打折后的价格
        $discountPrice = round($total*$discountRate, 2);

        if ($discountRate < 1) {
            $discountPrice=$discountPrice . '元, <span style="color: red">('. $discountRate.'折)</span>';
        }

        // 返回折扣价
        return $discountPrice;
    }
}

$sub3 = new Sub3('电脑', 3980, 13);
$sub3 = new Sub3('电脑', 3980, 33);

echo '折扣价是: ' . $sub3->total();

?>
```

# 2.访问限制符

## 2.1 php的类成员访问限制符有：

- public（公共的、默认） ：该成员能被外部代码访问和操作；

- protected（受保护的）： 对于类内部所有成员都可见，对类外部不允许访问；

- private（私有的）：只允许该类的子类进行访问；

> 分别用在类的属性和方法上，用来修饰类成员的访问权限。

## 2.2. 演示：
```php
<?php
// 访问控制符: 
// public : 类中,类外均可访问, 子类中也可以访问
// protected: 类中,类外不可访问, 但是子类中可以访问
// private: 只允许在类中, 类外, 子类中不可访问

class Demo {
  // 类中成员: 属性, 方法
  // 成员属性, 成员方法
  // 对象属性: 需要使用类的实例进行访问的成员属性
  public $name; // 姓名
  protected $position; // 职位
  private $salary; // 工资
  protected $department; // 部门

  // 构造方法
  public function __construct($name, $position, $salary, $department) {
    $this->name = $name;
    $this->position = $position;
    $this->salary = $salary;
    $this->department = $department;
  }

  // 职位访问器/方法/函数
  public function getPosition() {
    return $this->department === '培训部' ? $this->position : '无权查看';
  }

  // 工资访问器/方法/函数
  public function getSalary() {
    // 工资 只允许财务部的人看
    return $this->department === '财务部' ? $this->salary : '无权查看';
  }

  // 部门获取器/方法/函数
  public function getDepartment() {
    return $this->department;
  }
}

$obj = new Demo('朱老师', '讲师', 8888, '培训部');
echo 'name = ' . $obj->name, '<br>';
// echo 'position = ' . $obj->position, '<br>'; // 会报错，protected 变量，类外部不允许访问
//  echo 'salary = ' . $obj->salary;  // private，会报错不允许访问
echo $obj->getPosition(), '<br>';
echo $obj->getSalary(), '<br>';
echo $obj->getDepartment(), '<hr>';

class Sub extends Demo {
  public function display() {
    echo $this->name . '<br>'; // public
    echo $this->position . '<br>'; // protected
    // echo $this->salary . '<br>'; // private，这里会报错，无法访问
  }
}

$sub = new Sub('欧阳克', '讲师', 9999, '培训部');
$sub->display();
echo '<br>';
```
