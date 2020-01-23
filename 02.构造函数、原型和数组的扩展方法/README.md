- 能够使用构造函数创建对象
- 能够说出原型的作用
- 能够说出访问对象成员的规则
- 能够使用ES5新增的一些方法


- 构造函数和原型
- 继承
- ES5中新增方法

# 1. 构造函数和原型
## 1.1 概述
在典型的OOP的语言中(如Java),都存在类的概念,类就是对象的模板,对象就是类的实例,但在ES6之前,JS中没用引入类的概念.

ES6,全称ECMAScript6.0,2015.06发版。但是目前浏览器的JavaScript是ES5版本,大多数高版本的浏览器也支持ES6,不过只实现了ES6的部分特性和功能.

在ES6之前,对象不是基于类创建的,而是用一种称为<font color=red>构造函数</font>的特殊函数来定义对象和它们的特征.

创建对象可以通过以下三种方式:
1. 对象字面量
2. new Object()
3. 自定义构造函数

## 1.2 构造函数
<font color=red>构造函数</font>是一种特殊的函数,主要用来初始化对象,即为对象成员变量赋初始值,它总与new一起使用。我们可以把对象中一些公共的属性和方法抽取出来,然后封装到这个函数里面.

在JS中,使用构造函数时要注意以下两点:
1. 构造函数用于创建一类对象,其<font color=red>首字母要大写</font>
2. 构造函数要<font color=red>和new一起使用</font>才有意义

#### new 在执行时会做四件事情:
1. 在内存中创建一个新的空对象.
2. 让this指向这个新的对象.
3. 指向构造函数里面的代码,给这个对象添加属性和方法.
4. 返回这个新对象(所以构造函数里面不需要return)

JavaScript的构造函数中可以添加一些成员,可以在构造函数本身上添加,也可以在构造函数内部的this上添加.通过这两种方式添加的成员,就被称为静态成员和实例成员

- 静态成员: 在构造函数本上添加的成员称为<font color=red>静态成员,只能由构造函数本身来访问</font>,通过给构造函数赋值添加.
- 动态成员: 在构造函数内部创建的成员对象称为<font color=red>实例成员,只能由实例的对象来访问</font>,通过在this上添加.

## 1.3 构造函数的问题
构造函数方法很好用,但是<font color=red>存在浪费内存的问题</font>

```js
function Star(uname, age){
  this.uname = uname;
  this.age = age;
  this.sing = function () {
    console.log('我会唱歌');
  }
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
```

## 1.4 构造函数原型 prototype
构造函数通过原型分配的函数是所有对象所<font color=red>共享的</font>
JavaScripy规定,<font color=red>每一个构造函数都有一个prototype属性</font>,指向另一个对象。注意这个prototype就是一个对象,这个对象的所有属性和方法,都会被构造函数所拥有.

<font color=red>我们可以把哪些不变的方法,直接定义在prototype对象上,这样所有对象的实例就可以共享这些方法</font>


#### 问答?
1. 原型是什么?
一个对象,我们也称prototype为<font color=red>原型对象</font>,每个函数中都存在的一个对象.

2. 原型的作用是什么?
它里面保存了所有的公共方法(不变方法),共享方法,相同的方法共享一块内存空间



## 1.5 对象原型 `__proto__`
<font color=red>对象都会有一个属性__protp__</font> 指向构造函数的prototype原型对象,之所以我们对象可以使用构造函数prototype原型对象的属性和方法,就是因为对象有__proto__原型的存在.

- __proto__ 对象原型和 原型对象 prototype是等价的.


## 1.6 constructor 构造函数
<font color=red>对象原型(__proto__)</font>和<font color=red>构造函数原型对象(prototype)</font>里面有一个属性<font color=red>constructor</font>属性,constructor我们称为构造函数,因为它指回构造函数本身.

constructor表示,原型对象、对象原型到底是由那个构造函数构造出来的.
constructor主要用于记录该对象引用于哪个构造函数,它可以让原型对象重新指向原来的构造函数.

当使用对象字面量的形式对原型对象进行赋值的时候,会使constructor丢失指向(即不再指向原构造函数)


## 1.7 构造函数、实例、原型对象三者之间的关系
- 构造函数(Star)、实例(ldh)、原型对象(Star.prototype)
1. Star.prototype = 原型对象;
2. 原型对象.constructor = Star;
3. ldh = new Star();
4. ``ldh.__proto__ = Star.prototype``;
5. `ldh.__proto__.constructor = Star`;


## 1.8 原型链
- 只要是对象,里面都有一个原型__proto__
- 在寻找某个属性或方法时,现在对象实例上寻找,若没有则顺着对象原型的原型链往顶层找.
- Object.prototype是所有对象的最顶层原型.它的__proto__属性指向null.

## 1.9 JavaScript的成员查找机制(规则)
1. 当访问一个对象的属性(包括方法)时,首先查找这个<font color=red>对象自身</font>有没有该属性
2. 如果没用就查找它的原型(也就是__proto__指向的<font color=red>prototype原型对象</font>)
3. 如果还没用就查找原型对象的原(<font color=red>Object的原型对象</font>)
4. 依次类推一直找到Object为止(<font color=red>null</font>)

## 1.10 原型对象this指向
1. 构造函数中的this,指向实例对象
2. 原型对象中方法的this指向它实际的调用者

## 1.11 扩展内置对象
可以通过原型对象,对原来的内置对象进行扩展自定义的方法。比如给数组增加自定义求偶数和的功能.

# 2. 继承
ES6之前并没有给我们提供extends继承。我们可以通过<font color=red>构造函数+原型对象</font>模拟实现继承,也称为<font color=red>组合继承</font>

## 2.1 call()
调用这个函数,并修改函数运行时的this指向
fun.call(thisArg, arg1, arg2, ...)
- thisArg: 当前调用函数this的指向对象
- arg1, arg2: 传递的其他参数

## 2.2 借用构造函数继承父类型属性
核心原理: 通过call()把父类型的this指向子类型的this,这样就可以实现子类型继承父类型的属性

```js
function Father (uname, age) {
  this.uname = uname;
  this.age = age;
}
function Son (uname, age, score){
  Father.call(this, uname, age);
  this.score = score;
}
```

## 2.3 借用原型对象继承父类型方法
- 方法是通过原型来继承,尝试如下:
```js
function Father (){}
Father.prototype.money = function () {
  console.log('I can make money');
}
function Son () {}
Son.prototype = Father.prototype;
Son.prototype.exam = function () {
  console.log('孩子要考试');
}
```
以上方法,错在: 当执行`Son.prototype = Father.prototype`时,此时`Son.prototype`和`Father.prototype`指向的是同一块内存空间,因此对`Son.prototype`进行改变的同时`Father.prototype`也进行相应的改变
- 解决办法.
```js
Son.prototype = new Father();
```
以上操作后:
1. 会新开辟一个内存空间用于存放,Father实例.
2. Father实例可以通过原型(`__proto__`)访问到Father的原型对象(Father.prototype)
3. Son的原型对象(Son.prototype)此时指向的是Father实例的内存空间

# 3. ES5 中的新增方法

## 3.1 ES5 新增方法概述
ES5中给我们新增了一些方法,可以很方便的操作数组或者字符串,这些方法主要包括:
- 数组方法
- 字符串方法
- 对象方法

## 3.2 数组迭代(遍历)方法: forEach()、map()、filter()、some()、every();
`array.forEach(function(currentValue, index, arr))`
- currentValue: 数组当前项的值
- index: 数组当前项的索引
- arr: 数组对象本身

&nbsp;
`array.filter(function(currentValue, index, arr))`
- filter()方法创建一个新的数组,新数组中的元素是通过检查指定数组中符合条件的所有数组,<font color=red>主要用于筛选数组
- 注意它直接返回一个新数组</font>
- currentValue: 数组当前项的值
- index: 数组当前项的索引
- arr: 数组对象本身

&nbsp;
`array.some(function(currentValue, index, arr))`
- some()方法用于检测数组中的元素是否满足指定条件.通俗点查找数组中是否有满足条件的元素
- <font color=red>注意它返回值是布尔值,如果查找到这个元素,就返回true,如果查找不到就返回false.</font>
- 如果找到第一个满足条件的元素,则终止循环,不再继续查找
- currentValue: 数组当前项的值
- index: 数组当前项的索引
- arr: 数组对象本身


