
# 1. ES6常见语法及实例

## 1.1 let

1. 不存在变量提升
2. 同一个作用域下不能重复定义同一个名称
3. 有严格的作用域



## 1.2 const

声明一个只读的常量:

- 一旦声明常量的值就不能改变
- 声明时必须赋值

- const代表,执行内存的地址不能改变.

```js
const obj = {};
obj.name = 'amy';	// ok,内存的引用地址没用改变
const arr = [];
arr.push(1);	// ok,指向内存的地址没有改变.
```

## 1.3 箭头函数

1. this的指向明确了,指向此法作用域



## 1.4 数据结构 Set 、 Map

1. `set`: 类似数组,但是其中的成员是唯一的

```js
const s = new Set()
s.add(1).add(2).add(3).add(2);   //  Set {1,2,3}
```

- 去重处理:

```js
const arr2 = [2,3,4,4,5,7,3,3,6,3,7,7,8,3];
const arr = [...new Set(arr2)];
console.log(arr);		// [2, 3, 4, 5, 7, 6, 8]
```



2. `map`: 类似于对象,但是它的键可以是对象

```js
const m = new Map();
m.set('name', 'marron').set('age', 18)
```

- 使用`for...of...`拿到map中的键值对

```js
for(let [key, value] of m){
    console.log(key, value);
}
```



# 2. 瀑布流

- 出现问题: 设计给的图片不是同一个尺寸大小,因此不能规则的放入到给定的DOM结构中.此时,需要使用瀑布流技术来解决这个问题
- 解决的思路:  让图片等宽、不等高

- 核心: 用到了定位

```css
img {
    position: absolute;
    left: 最小的索引 * 图片的宽度;
    top: 最小的图片的高度;
}
```

- 算法如下:

1. 首先获取浏览器的宽度w,用w除以图片盒子的宽度向下取整记为列数: col
2. 利用数组,保存每一列当前的高度
3. 如果是第一行,则将图片的高度保存在数组arr中
4. 如果不是第一行,取出arr中的最小值和索引,计算出绝对定位的位置.并给图片设置绝对定位

## 2.1 用到的API

### 2.1.1 获取当前屏幕的宽度

- 由于每个图片盒子还有对应的高度,因此获取的时候,还要获取内边距.
- 在jquery中,可以通过`$().outerWidth`实现

```js
var screenWidth = $(window).outerWidth()
```

### 2.1.2 给DOM元素加css样式

```js
$().css({
    position: 'absolute',
    left: currLeft,
    top: currTop
})
```

### 2.1.3 总体代码

- 总体代码如下:

```js
$(function() {
  waterFall()
})
function waterFall() {
  // 获取盒子
  var box = $('.box')
  // 1. 求出对应得列数
  // 1.1 得到当前屏幕的宽度
  var screenWidth = $(window).outerWidth()
  // 1.2 获取每张图片的宽度
  var boxWidth = $('.box').outerWidth()
  // 1.3 获取当前的列数
  var col = Math.floor(screenWidth / boxWidth)
  // 2. 创建数组,记录当前列数的高度
  var arr = []
  for (var i = 0; i < col; i++) {
    arr.push(0)
  }
  // 3. 遍历盒子中的图片
  $.each(box, function(index, value) {
    // 得到每一张图片的高度
    var thisHeight = $(this).height()
    if (index < col) {
      // 如果是第一行将高度的存入数组中.
      arr[index] = thisHeight
    } else {
      // 如果不是第一行,找到数组中最小的高度和索引
      var currMinHeight = Math.min.apply(arr, arr)
      var currMinIndex = arr.indexOf(currMinHeight)
      // 算出距离 左侧/上侧 的距离
      var currLeft = currMinIndex * boxWidth
      var currTop = currMinHeight
      // 将当前的图片变为绝对定位,放在盒子中
      $(this).css({
        position: 'absolute',
        left: currLeft,
        top: currTop
      })
      arr[currMinIndex] = currMinHeight + thisHeight
    }
  })
}
```

# 3. 防抖与节流

##  3.1 防抖

- `防抖`: 触发事件后,在n秒内函数只执行一次

- 记忆: 你手比较抖,不小心按了按钮2下...你只希望它只执行一次.且按第二次结束时间算..这就用到了防抖技术

  

## 3.2 节流

- `节流`: 连续发生的事件,在n秒内只执行一次函数

## 3.3 防抖与节流的区别

- 在一段时间内,不管触发多少次事件,事件处理函数都只处理一次称之为节流
- 防抖,是在最后一次事件发生时开始计算,到固定时间触发

## 3.4 准备工作

- 准备一个给定宽、高的盒子,初始化显示为0.(innerHTML = 0)
- 当鼠标移入盒子的时候,触发鼠标移动事件(box.onmousemove)
- 鼠标移动事件的处理函数: 当鼠标在盒子中移动的时候,会将一个全局变量(count)加1并写入盒子中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>防抖与节流</title>
    <style>
      .box {
        width: 150px;
        height: 150px;
        margin: 50px auto;
        line-height: 150px;
        text-align: center;
        border: 1px solid black;
        font-size: 50px;
      }
    </style>
  </head>
  <body>
    <div id="box" class="box">0</div>
    <script>
      var box = document.getElementById('box')
      var count = 1
      box.onmousemove = function() {
        box.innerHTML = count++
      }
    </script>
  </body>
</html>
```

## 3.5 防抖的实现(先等待在执行)

- 思路: 
  1. 在事件处理器中放一个延迟执行函数(setTimeout)
  2. 每触发一次,清除上一次的事件处理函数(clearTimout)

```js
var box = document.getElementById('box')
var count = 1
var timer = null;
function debounce() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    box.innerHTML = count++;
  }, 1 * 1000);
}
box.onmousemove = debounce
```

### 3.5.1 防抖的改进

- 上面的等待时间和处理函数是静态的,封装成动态的

```js
var debounce = (handUp, fn) {
    var timer = null;
    return function (){
        if(timer) clearTimeout(timer);
        timer = setTimeOut(function(){
            fn.call(this, arguments)
        }, handUp)
    }
}
box.onmousemove = debounce(1000, function(){
    box.innerHTML = count++;
})
```



## 3.6 防抖的实现(先执行在等待)

- 描述: 触发事件处理函数的时候,先执行一次函数,然后过n秒后再执行
- 思路:

1. 由于核心是异步函数(setTimeout)的清除.
2. 用一个flag函数记录当前定时器的状态,如果定时器为空则代表执行

```js
function debounce(handUp, fn) {
  // 进来的时候设置为null
  var timer = null
  return function() {
    if (timer) clearTimeout(timer)
    var flag = !timer
    timer = setTimeout(() => {
      timer = null
    }, handUp)
    if (flag) fn.apply(this, arguments)
  }
}
```

## 3.7 节流的实现

- 描述: 在给定时间内,无论时间处理函数触发多少次都只执行一次
- 思路:

1.根据timer是否为空,如果为空则执行一次.

2.在给定时间后,将定时器的序号timer清空.让它可以重新执行

```js
function throttle(handUp, cb){
    var timer = null;
    return function(){
        if(!timer){
            timer = setTimeout(()=>{
                cb.apply(this);
                timer = null;
            }, handUp)
        }
    }
}
```

## 3.8 节流的实现(不使用定时器)

- 触发的第一次的时候,先记录第一次执行的时间(last)
- 触发然后随着函数不断触发,得到第一个时间间隔大于给定时间的环境.
- 触发给定的函数,然后将last设置为当前时间

```js
function throttle(handUp, cb){
    var last = 0;
    return function(){
        var now = Date.now();
        if(now - last > handUp){
            last = now;
            cb.apply(this);
        }
    }
}
```

# 4. 常见面试题

## 4.1 求以下函数的输出

### 4.1.1 考察点: 变量提升、this、作用域

```js
// 考察点 作用域、this、变量提升
var a = 10
function test() {
  a = 100
  console.log(a)  
  console.log(this.a) 
  var a
  console.log(a) 
}
test()
```

- 第一个和第三个肯定是100
- 在node环境下,没有window的概念,因此输出的是 undefined. (最后答案 100 undefined100)
- 在浏览器环境下,在没用找到this时,会顺着作用域链找到window,而 window.a =10,因此会输出 10. (最后答案 100 10 100)

[稍微改进]

```js
var a = 10;
function test(){
    console.log(a);
    a = 100;
    console.log(this.a);
    var a;
    console.log(a)
}
test();
```

- 此时根据与解析,会有如下:

```js
var a = 10;
function test() {
    // var a;
    console.log(a);
    a = 100;
    console.log(this.a);
    var a;
    console.log(a)
}
test();
```

- 浏览器环境下因此答案为: `undefined 10 100` 

### 4.1.2 考察点: 闭包的作用域

```js
(function(){
    var a = b = 3;
})()
console.log(b);	// 3
console.log(a);	// a is not defined
```

- 说明: 在非严格模式下面,出现了`var a = b = 3`,实际上是`b=3` 和 `var a = b`
- 在执行`b=3`时,JS解释器会自动在当前的全局环境下面挂在一个b属性,值为3
- 所以会输出`b=3`和 `a is not defined`

### 4.1.3 考察点: 事件循环、单线程异步

```js
for(var i=1 ; i<=3; i++){
    setTimeout(function(){
        console.log(i)
    }, 0)
}
```

- 答案: `4 4 4 `
- JS是单线程异步,当遇到异步函数的时候,会将异步函数添加到异步函数队列中.
- for是同步任务,因此,优先执行了3次循环,然后再执行3次输出.此时,由于i的值是4 ,故输出 3个4

[变形]:

```js
for(let i = 1; i<=3; i++){
    setTimout(function(){
        console.log(i);
    }, 0);
}
```

- 答案: `1 2 3`
- 前面和上面一样的,但执行到输出i的时候, 由于`let` 创建的变量是块级作用域.
- 可以看作是把i 同异步函数一起放在一个块中,放入异步函数的队列中.
- 当时间到了从异步队列中拿出块来执行

### 4.1.4 考察点: 作用域 变量提升 形参实参

```js
function fun(n){
    console.log(n);
    var n = 456;
    console.log(n);
}
var n = 123;
fun(n);
```

- 根据与解析,函数实际如下

```js
function fun(n){
    // var n = n;
    console.log(n);
    n = 456;
    console.log(n);
}
var n = 123;
fun(n);
```

- 答案为: `123 456`



[稍微改进一下]

```js
function fun(){
    console.log(n);
    var n = 456;
    console.log(n);
}
var n = 123;
fun(n);
```

- 答案是: `undefined 456`

[再稍微改进一下]

```js
function fun(){
    console.log(n);
    n = 456;
    console.log(n);
}
var n = 123;
fun(n);
```

- 此时没用变量提升,答案是 `123 456`



[再再稍微改进一下]

```js
function fun(){
  console.log(fun);
  fun = 456;
  console.log(fun);
}
fun();
var fun = 123;
```

- 考察函数的提升和变量的提升,等价于,变量提升的速度快于函数提升

```js
var fun = undefined;
var fun = function (){
    console.log(fun);
    fun = 456;
    console.log(fun);
}
fun();
fun = 123;
```

- 由于函数的提升比变量的提升慢,因此,在遇到`fun()`时,会先执行`console.log(fun)`,
- 此时会输出fun函数
- 然后fun赋值为456,然后的console.log会输出456
- 故输出结果为:`[Function fun] 456`

[再再再稍微改进一下]

```js
function fun(){
    console.log(fun);
    fun = 456;
    console.log(fun);
}
var fun = 123;
fun();
```

- 根据 变量提升,改造如下:

```js
var fun = undefined;
var fun = function(){...};
fun = 123;
fun();
```

- 执行到`fun()`时,由于fun是一个变量,因此会报错: `fun is not a function`

[再再再再稍微改进一下]

```js
var fun = 123;
function fun(){
    console.log(fun);
    fun = 456;
    console.log(fun);
}
fun();
```

- 变量提升改造如下:

```js
var fun = undefined;
var fun = function(){...}
fun = 123
fun();             
```

- 执行到`fun()`时,由于fun是一个变量,因此会报错: `fun is not a function`















[学习地址](https://www.bilibili.com/video/av79716929?from=search&seid=12191391131428238353)