学习目标:
- 能够说出函数的多种定义和调用方法
- 能够说出和改变函数内部this的指向
- 能够说出严格模式下的特点
- 能够把函数作为参数和返回值传递
- 能够说出闭包的作用
- 能够说出递归的两个条件
- 能够说出深拷贝和浅拷贝的区别


# 1. 函数的定义和调用
## 1.1 函数的的定义方式
1. 函数声明方式function关键字(命名函数)
2. 函数表达式(匿名函数)
3. new Function()

- Function 里面参数都必须是字符串格式
- 第三种执行效率低,也不方便书写,因此较少使用
- 所有函数都是 Function 的实例(对象)
- 函数也属于对象(JS中万物皆对象)

## 1.2 函数的调用方式
1. 普通函数
2. 对象的方法
3. 构造函数
4. 绑定事件函数
5. 定时器函数
6. 立即执行函数

# 2 this
## 2.1 函数内this的指向
这些this的指向,是当我们调用函数的时候确当的.调用方式的不同决定了this的指向不同.一般指向调用者

## 2.2 改变函数内部的this指向
JavaScript为我们专门提供了一些函数方法来帮我们更优雅的处理函数内部this的指向问题,常用的有 bind()、call()、apply()三种方法

#### 1.call方法
call()方法<font color=red>调用</font>一个对象。简单理解为调用函数的方式,但是它可以改变函数的this指向。
`
fun.call(thisArg, arg1, arg2, ...)
`


#### 2.apply方法
apply()方法<font color=red>调用</font>一个函数.简单理解为调用函数的方式,但是它可以改变函数的this的指向.
`
fun.apply(thisArag, [argsArray])
`
- thisArg: 在fun函数运行时指定的this值
- argsArray: 传递的值,必须包含在<font color=red>数组</font>里面
- 返回值就是函数的返回值,因为它就是调用函数

#### 3.bind方法
bind()方法不会调用函数,但是能改变函数内部this指向.
`
fun.bind(thisArg, arg1, arg2, ...)
`
- thisArg: 在fun函数运行时指定的this值
- arg1, arg2: 传递的其他参数
- 返回由指定的this值和初始化参数改造的<font color=red>原函数拷贝</font>


###### 按钮的禁用
- 点击按钮,按钮即禁用
```js
var btn = document.querySelector('button');
btn.onclick = function (){
  this.disabled = true;
}
```

## 2.3 call apply bind 总结
#### 相同点:
都可以改变函数内部的this指向.

#### 区别点:
1. call 和 apply 会调用函数,并且改变函数内部this指向.
2. call 和 apply 传递的参数不一样,call传递参数arg1, arg2... 形式. apply必须使用数组形式[arg]
3. bind 不会调用函数,可以改变函数内部this指向.

#### 主要应用场景:
1. call 经常做继承
2. apply 经常处理跟数组有关的数据. 比如借助数学对象实现数组最大值、最小值
3. bind 不调用函数,但是还想改变this指向. 比如定时器内的this指向.

# 3. 严格模式
## 3.1 什么是严格模式
JavaScript除了提供正常模式外,还提供了<font color=red>严格模式(strict mode)</font>。ES5的严格模式采用具有限制性JavaScript变体的一种方式,即在严格的条件下运行JS代码.

严格模式在IE10以上版本的浏览器才会被支持,旧版本浏览器中会被忽略
严格模式对正常的JavaScript语义做了一些更改:
1. 消除了JavaScript语法的一些不合理、不严谨之处,减少了一些怪异行为.(变量不声明可以直接使用)
2. 消除代码运行的一些不安全之处,保证代码运行的安全,
3. 提高编译效率,增加运行速度。
4. 禁用了ECMAScipt的未来版本中可能会定义的一些语法,为未来新版本的JavaScript做好铺垫.比如一些保留字: class, enum, export, extends, import, super 不能做变量名。


## 3.2 开启严格模式
严格模式可以应用到<font color=red>整个脚本</font>或<font color=red>个别函数</font>中.因此在使用时,我们可以将严格模式分为<font color=red>为脚本开启严格模式</font>和<font color=red>为函数开启严格模式</font>两种情况

#### 1. 为脚本开启严格模式
为脚本文件开启严格模式,需要<font color=red>在所有语句之前放一个特定语句 "use strict"; (或 'use strict' ; )</font>


## 3.3 (略)

## 3.4 严格模式中的变化(略)

# 4. 高阶函数
<font color=red>高阶函数</font>是对其他函数进行操作的函数,它<font color=red>接收函数作为参数</font>或<font>将函数作为返回值输出</font>

1. 接收的参数是函数
```js
function fn(callback) {
  callback && callback();
}
fn(function() {alert('hi')})
```

2. 返回的值是函数
```js
function fn () {
  return function(){}
}
fn();
```

以上两个都属于高阶函数,
函数也是一种数据类型,同样可以作为参数,传递给另一个参数使用.最典型就是作为回调函数

# 5. 闭包
## 5.1 变量作用域
变量根据作用域的不同分为两种: 全局变量 和 局部变量
1. 函数内部可以使用全局变量
2. 函数外部不可以使用局部变量
3. 当函数执行完毕,本作用域内的局部变量会被销毁

## 5.2 什么是闭包
<font color=red>闭包(closure)</font>指有权访问另一个函数作用域中变量的<font color=red>函数. --- 《JavaScript高级程序设计》

- 简单理解,一个作用域访问另一个函数的局部变量,就产生了闭包.那个局部变量所在的函数称为闭包函数.

## 5.3 闭包的作用
- 让函数外面的作用域可以访问到函数内部.
- 延申了变量的作用范围
```js
// function fn (){
//   var num = 10;
//   function fun(){
//     console.log(num);
//   }
//   return fun
// }

// 一种更简洁的写法
function fn () {
  var num = 10;
  return function () {
    console.log(num);
  }
}
var f = fn();
f();
```

## 5.4 闭包案例
1. 循环注册点击事件.
- 假设有结构如下
```html
<ul>
  <li>react</li>
  <li>vue</li>
  <li>javascript</li>
  <li>es6</li>
  <li>nodejs</li>
  <li>java</li>
  <li>react native</li>
</ul>
```
- 使用闭包的形式输出,li当前的索引值
```js
var lis = document.querySelectorAll('li');
for(let i = 0; i< lis[i]; i++) {
  (function (i){
    lis[i].onclick = function () {
      alert(i);
    }
  })(i);
}
```
总结: 闭包的优缺点,延长了函数的作用范围,可能会造成内存泄漏,影响程序的性能

2. 循环中的setTimeout()
- 由于JS中 for循环是同步进行的, 而异步任务有: setTimeout、事件的回调、 ajax
- 因此,当执行
```js
var lis = document.querySelectorAll('li');
for(var i = 0; i < lis.length; i++) {
  setTimeout(() => {
    lis[i].onclick = function () {
      alert(lis[i].innerHTML);
    }
  }, 3000)
}
```
- 当执行`lis[i].onclick`时,此时的i是4. 因此会显示未定义.onclick
- 使用闭包改进如下:
```js
var lis = document.querySelectorAll('li');
for(var i =0; i< lis.length; i++){
  (function(i){
    setTimeout(() => {
      lis[i].onclick = function () {
        alert(lis[i].innerHTML);
      }
    }, 3000)
  })(i);
}
```

3. 计算打车的价格
```js
// 闭包应用 - 计算打车价格
// 打车起步价13(3公里以内),之后每多一公里加5块钱. 用户输入公里数就可以计算打车价格
// 如果有拥堵情况, 多收取10块钱拥堵费.
var countPrice = (function (){
  var total = 0;
  var start = 13;
  return {
    price: function (n) {
      if( n <= 3 ) {
        total = start;
      } else {
        total = start + parseInt(n -3) *5 ;
      }
      return total;
    },
    // 拥堵之后的费用
    yd: function (flag) {
      return flag ? total + 10 : total;
    }
  }
})()
```


## 5.5(略)

## 5.6 闭包总结
1. 闭包是什么?
闭包是一个函数(一个作用域可以访问另外一个函数的局部变量)
&nbsp;
2. 闭包的作用是什么?
延长函数的变量作用域范围.

# 6.递归

## 6.1 什么是递归?
如果<font color=red>一个函数在内部可以调用其本身</font>,那么这个函数就是<font color=red>递归函数</font>

简单理解: 函数内部自己调用自己,这个函数就是递归函数

递归函数作用和循环效果一样

由于递归很容易发生 "栈溢出" 错误(stack overflow), 所以<font color=red>必须要加退出条件return</font>

## 6.2 利用递归求数学题
1. 求 1 * 2 * 3 * 4 ... * n 阶乘
2. 求斐波那契数列


## 6.3 利用递归求: 根据id返回对应的数据对象
```js
var data = [
  {
    id: 1,
    name: '家电',
    goods: [
      {
        id: 11,
        gname: '冰箱',
        goods: [
          {
            id: 111,
            gname: '海尔'
          },
          {
            id: 112,
            gname: '美菱'
          }
        ]
      },
      {
        id: 12,
        gname: '洗衣机'
      }
    ]
  },
  {
    id: 2,
    name: '服饰'
  }
]
// 我们想要输入id号,就可以返回的数据对象
function f(data, id) {
  var o = {}
  data.forEach(item => {
    if (item.id == id) {
      // console.log(item)
      o = item
      return item
    } else if (item.goods && item.goods.length > 0) {
      o = f(item.goods, id)
    }
  })
  return o
}
console.log(f(data, 1))
console.log(f(data, 2))
console.log(f(data, 111))
console.log(f(data, 12))
```

##  6.4 浅拷贝和深拷贝
1. 浅拷贝只是拷贝一层,更深层次对象级别的只拷贝引用
2. 深拷贝拷贝多层,每一级别都会拷贝.

#### 将一个对象的值拷贝到另一个对象中
```js
var obj = {
  id: 1,
  name: 'andy'
}
var o = {};
for(let k in obj){
  o[k] = obj[k];
}
console.log(o);
```
- 浅拷贝问题复现.
```js
// 当在一个对象中,有更深一层的对象.
var obj = {
  id: 1,
  name: "andy",
  msg: {
    age: 18
  }
}
// 此时采用刚才那种赋值方式,会出现问题.
var o = {};
for(let k in obj) {
  o[k] = obj[k];
}
console.log(o);
o.msg.age = 19;
console.log(obj.msg.age);     // 19
```
在JavaScript中对对象的存储会重新开辟一个新的空间,当进行赋值时,实际上是进行地址的赋值.
所带来的后果是,o 和 obj 的属性`age`都是指向同一个内存空间.即修改`o.msg.age`会同时修改`obj.msg.age`

3. Object.assign(target, ...sources) es6新增方法可以浅拷贝.(语法糖)
```js
var obj = {
  id: 1,
  name: "andy",
  msg: {
    age: 18
  }
}
var o = Object.assign({}, obj);
console.log(o);
```