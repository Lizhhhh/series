# 1. 面向对象编程介绍

## 1.1 两大编程思想
- 面向过程
- 面向对象

## 1.2 面向过程编程 POP(Process-oriented programming)

<font color=red>面向过程</font>就是分析出解决问题所需要的步骤,然后函数把这些步骤一步一步实现,使用的时候再一个一个的依次调用。

举个栗子: 将大象装进冰箱,面向过程做法
1. 打开冰箱门
2. 大象装进去
3. 关上冰箱门

<font color=red>面向过程</font>就是按照我们分析好了的步骤,解决问题

## 1.3 面向对象 OOP(Object Oriented Programming)
<font color=red>面向对象</font>是把事务分解成一个个对象,然后由对象之间分工与合作

举个栗子: 将大象装进冰箱,面向对象做法。

先找出对象,并写出这些对象的功能:
1. 大象对象:
- 进去
2. 冰箱对象:
- 打开
- 关闭
3. 使用大象和冰箱的功能

<font color=red>面向对象是以对象为功能来划分问题,而不是步骤。</font>

在面向对象程序开发思想中,每一个对象都是功能中心,具有明确分工

面向对象编程具有灵活、代码可复用、易于维护和开发的优点,更适合多人合作的大型项目。

面向对象的特性:
- 封装性
- 继承性: 子类可以继承父类的属性和方法
- 多态性: 同一个对象在不同环境下有不同的状态

## 1.4 面向过程和面向对象的对比
<font color=red>面向过程</font>
    - 优点: 性能比面向对象高,适合跟硬件联系很紧密的东西,例如单片机采用的面向过程编程.
    - 缺点: 没用面向对象易维护、复用、易扩展

<font color=red>面向对象</font>
    - 优点: 易维护、易复用、易扩展,由于面向对象有封装、继承、多态性的特性,可以设计出低耦合的系统,使系统更加灵活、更加易于维护
    - 缺点: 性能比面向过程低


面向过程的方法写出来的程序是一份蛋炒饭,而用面向对象写出来的程序是一份盖浇饭...

# 2. ES6 中的类和对象
## 面向对象
面向对象更贴近我们的实际生活,可以使用面向对象描述显示世界事物.但是事物分为具体的事物(特指的)和抽象的事物(泛指的)

面向对象的思维特点:
1. 抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)
2. 对类进行实例化,获取类的对象

面向对象编程,我们考虑的是有哪些对象,按照面向对象的思维特点,不断的创建对象、使用对象、指挥对象做事情.

## 2.1 对象
现实生活中: 万物皆对象,对象是<font color=red>一个具体的事物</font>,看得见摸得着的实物。例如,一本书、一辆汽车、一个人可以是"对象",一个数据库、一张网页、一个与远程服务器连接也可以是"对象"

<font color=red>在JavaScript中,对象是一组无序的相关属性和方法的集合,所有的事物都是对象</font>,例如字符串、数值、数组、函数等.

对象是由<font color=red>属性</font>和<font color=red>方法</font>组成的:
- 属性: 事物的<font color=red>特征</font>,在对象中用<font color=red>属性</font>来表示(常用名词)
- 方法: 事物的<font color=red>行为</font>,在对象中用<font color=red>方法</font>来表示(常用动词)

## 2.2 类
在ES中新增了类的概念,可以使用<font color=red>class</font>关键字声明一个类,之后以这个类来实例化对象。
<font color=red>类</font>抽象了对象的公共部分,它<font color=blue>泛指</font>某一大类(class)
<font color=red>对象</font><font color=blue>特指</font>某一个,通过类实例化一个具体的对象

面向对象的思维特点:
1. 抽取(抽象)对象共用的属性和行为组织(封装)成一个<font color=blue>类</font>(模板)
2. 对类进行实例化,获取类的<font color=blue>对象</font>

## 2.3 创建类
#### 语法:
```js
class name {
  // class body
}
```
#### 创建实例:
```js
var xx =new name();
```

<font color=red>注意: 类必须使用 new 实例化对象</font>

## 2.4 类 constructor 构造函数
<font color=red>constructor()</font>方法是类的构造函数(默认方法),<font color=red>用于传递参数,返回实例对象</font>,通过new命令生成对象实例时,自动调用该方法。如果没用显示定义,类内部会自动给我们创建一个<font color=red>constructor()</font>

## 2.5 类添加方法
#### 语法
```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log(`你好 ${this.name}`);
  }
}
```

# 3. 类的继承
## 3.1 继承
    现实中的继承: 子承父业,比如我们都继承了父亲的姓.
    程序中的继承: 子类可以继承父类的一些属性和方法.

## 3.2 super关键字
<font color=red>super关键字</font>用于访问和调用对象父类上的函数。可以调用父类的构造函数,<font color=red>也可以调用父类的普通函数。</font>

#### 语法:
```js
class Person {    // 父类
  constructor(surname) {
    this.surname = surname;
  }
}
class Student extends Person {    // 子类继承父类
  constructor(surname, firstname) {
      super(surname);   // 调用父类的constructor(surname)
      this.firstname = firstname;   // 定义子类独有的属性
  }
}
```

<font color=red>注意: 子类在构造函数中使用super,必须放到this前面(必须先调用父类的构造方法,在使用子类构造方法)</font>

#### 三个注意点:
1. 在ES中类没用变量提升, 所以必须先定义类,才能通过类实例化对象.
2. 类里面的共有属性和方法一定要加this使用.
3. 类里面的this指向问题
4. constructor里面的this指向实例对象,方法里面的this指向这个方法的调用者


