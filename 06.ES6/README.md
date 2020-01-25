# ES6 简介

#### 什么是 ES6?

ES 的全称是 ECMAScript,它是由 ECMA 国际标准化组织指定的<font color=red>一项脚本语言的标准化规范</font>

- 2015 年 6 月: ES2015
- 2016 年 6 月: ES2016
- 2017 年 6 月: ES2017
- 2018 年 6 月: ES2018

ES6 实际上是一个泛指,泛指 ES2015 及后续的版本.

#### 为什么使用 ES6?

每一次标准的诞生都意味着语言的完善,功能的加强。JavaScript 语言本身也有一些令人不满意的地方.

- 变量提升的特性增加了程序运行时的不可预测性
- 语法过于松散,实现相同的功能,不同的人可能会写出不同的代码.

#### let

ES6 中新增的用于声明变量的关键字。

- let 声明的变量只在所处的块级有效

```js
if (true) {
  let a = 10
}
console.log(a) // a is not defined
```

注意: 使用 let 声明的变量才具有块级作用域, 使用 var 声明的变量不具备块级作用域特性.

- 防止循环比哪里变成全局变量

```js
for (var i = 0; i < 3; i++) {
}
console.log(i)
for (let i = 0; j < 3;j++){}
console.log(j)    // j is not defined
```

- 不存在变量提升
```js
console.log(a);   // a is not defined
let a  = 123
```

- 暂时性死区
```js
var tmp = 123;
if(true) {
  tmp = 'abc';
  let tmp;
}
```
- 经典面试题
```js
var arr = [];
for(var i=0; i<2; i++){
  arr[i] = function () {
    console.log(i);
  }
}
arr[0]();     // 2
arr[1]();     // 2
```
```js
let arr = [];
for(let i =0; i<2; i++){
  arr[i] = function () {
    console.log(i);
  }
}
arr[0]();   // 0
arr[1]();   // 1
```
经典面试题图解: 此题的关键点在于每次循环都会产生一个块级作用域,每个块级作用域中的变量都是不同的,函数执行时输出的是自己上一级(循环产生的块级作用域)作用域下的i值.


#### const
作用: 声明常量, 常量就是值(内存地址) 不能变化的量.

- 具有块级作用域
```js
if(true){
  const a = 10;
}
console.log(a);   // a is not defined
```

- 声明常量是必须赋值
```js
const PI;   // Missing initializer in const declaration
```
- 常量赋值后,值不能更改
```js
const PI = 3.14;
PI = 3.1415926;     // Assignment ot constant variable.
```
```js
const arr = [100, 200];
arr[0] = 'a';
arr[1] = 'b';
console.log(arr);     //  ['a', 'b'];
arr = ['a', 'b'];     // Assignment to constant variable.
```
以上的原因在于,数组中的各个数值是引用类型,所保存的只是一个引用.因此其内存地址并未改变.故可以采用`.`赋值.

#### let、const、var的区别
1. 使用<font color=red>var</font>声明的变量,其作用域为<font color=red>该语句所在的函数内,且存在变量提升现象</font>
2. 使用<font color=red>let</font>声明的变量,其作用域为<font color=red>该语句所在的代码行内,不存在变量提升</font>
3. 使用<font color=red>const</font>声明的是常量,在后面出现的代码中<font color=red>不能再修改该常量的值</font>


#### 解构赋值
ES6中允许从数组中提取值,按照对应位置,对变量赋值。对象也可以实现解构。

##### 数组结构
```js
let [a, b, c] = [1,2,3];
console.log(a);
console.log(b);
console.log(c);
```
如果结解构不成功,变量的值为undefined;
```js
let [foo] = [];
let [bar, foo] = [1];
```
##### 对象解构
按照一定模式,从数组或对象中提取值,将提取出来的值赋值给另外的变量.
```js
let person = { name:'zhangsan', age:20};
let { nage, age} = person;
console.log(name);    //  "zhangsan"
console.log(age);     // 20
```
```js
let {name: myName, age: myAge } = person; // myName myAge 属于别名
console.log(myName);
console.log(myAge);
```

#### 箭头函数
ES6中新增的定义函数的方式。
```js
() => {}
const fn = () => {}
```
函数体只有一句代码,且代码的执行结果就是返回值,可以省略大括号
```js
// ES5写法
function sum(num1, num2){
  return num1 + num2
}
// ES6写法
const sum = (num1, num2) => num1 + num2;
```
如果形参只有一个,可以省略小括号
```js
// ES5写法
function (age){
  console.log(`年龄: {${age}`);
}
// ES6写法
const age = age => console.log(`年龄: ${age}`)
```
箭头函数不绑定this关键字,箭头函数中的this,指向的是<font color=red>函数定义位置的上下文this</font>
```js
const obj = {name:"张三"};
function fn() {
  console.log(this);
  return () =>{
    console.log(this)
  }
}
const resFn = fn.call(obj);
resFn();
```

#### 剩余参数
剩余参数语法允许我们将一个不定数量的参数表示为一个数组.
```js
function sum (first, ...args){
  console.log(first);   //  10
  console.log(args);    // [20, 30]
}
sum(10, 20, 30);
```
剩余参数和解构配合使用
```js
let students = ['wangwu','zhangsan','lisi'];
let [s1, ...s2] = students;
console.log(s1);    // "wangwu"
console.log(s2);    // ["zhangsan", "lisi"]
```

#### Array的扩展方法

##### 扩展运算符(展开语法)
扩展运算符可以将数组或者对象转为用逗号分隔的参数序列
```js
let arr = [1,2,3];
console.log(...arr);     // 1 2 3
```

扩展运算符可以应用于<font color=red>合并数组</font>
```js
// 方法一
let arr1 = [1, 2, 3];
let arr2 = [3, 4, 5];
let arr3 = [...arr1, ...arr2];
```

将类数组转换成真正的数组
```js
let oDiv = document.getElementByTagName('div');
oDivs = [...oDivs];
```

##### 构造函数方法: Array.from()
将类数组或可遍历对象转换为真正的数组
```js
let arrLike = {
  "0":"a",
  "1":"b",
  "2":"c",
  length: 3
};
let arr2 = Array.from(arrLike);
```
Array.from()方法,还可以接收第二个参数,作用类似于数组的map方法,用来对每个元素进行处理,将处理后的值放入返回的数组中.
```js
let arrLike = {
  "0": 1,
  "1": 2,
  "length": 2
}
let newArray = Array.from(arrLike, item => item*2);
```

##### 实例方法: find()
用于找出第一个符合条件的数组成员,如果没有则返回undefined
```js
let arr = [{
  id: 1,
  name: "张三"
},{
  id: 2,
  name: "李四"
}];
let target = arr.find(item => item.id==2);
console.log(target);
```

##### 实例方法: findIndex()
用于找出第一个符合条件的数组成员的位置,如果没有找到则返回 -1
```js
let arr = [1, 5, 10, 15];
let index = arr.findIndex(v => v >9);
console.log(index);
```

##### 实例方法: includes()
表示某个数组是否包含给定的值,返回布尔值
```js
[1,2,3].includes(2);    // true
[1,2,3].includes(4);    // false
```

#### String 的扩展方法
##### 模板字符串
ES6新增的创建字符串的方式,使用反引号定义.
```js
let name = `zhangshan`;
```
##### 实例方法: startsWith() 和 endsWith()
- `startsWith()`: 表示参数字符串是否在原字符串的头部,返回布尔值
- `endsWith()`: 表示参数字符串是否在原字符串的尾部,返回布尔值
```js
let str = 'Hello World!';
str.startWith('Hello');   // true
str.endsWith('!');    // true
```

##### 实例方法: repeat()
repeat方法表示将原字符串重复n次,返回一个新的字符串.
```js
'x'.repeat(3);     // "xxx"
"hello".repeat(2);      // "hellohello"
```

#### Set 数据结构
ES6提供了新的数据结构Set。它类似于数组,但是成员的值都是唯一的,没有重复的值.

Set本身是一个构造函数,用来生成 Set 数据结构.
```js
const s = new Set();
```
Set函数可以接受一个数组作为参数,用来初始化
```js
const set = new Set([1,2,3,4,4]);
```
##### 实例方法
- add(value): 添加某些值, 返回Set结构本身
- delete(value): 删除某个值, 返回一个布尔值,表示删除是否成功
- has(value): 返回一个布尔值, 表示该值是否为Set的成员
- clear(): 清除所有成员,没有返回值
```js
const s = new Set();
s.add(1).add(2).add(3);   // 向 set 结构中添加值
s.delete(2)     // 删除 set 结构中的 2 值
s.has(1)      // 表示 set 结构中是否有 1 这个值 返回布尔值
s.clear()     // 清除 set 结构中的所有值
```

##### 遍历
Set结构的实例与数组一样,也拥有forEach方法,用于对每个成员执行某种操作,没有返回值。
```js
s.forEach(v => console.log(v))
```
