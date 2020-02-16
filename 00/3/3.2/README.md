# 1. 大前端时代需要掌握的技术栈

HTML5

> https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5


  - 语义化标签
  - 音视频处理
  - canvas/WebGL
  - history API
  - requestAnimationFrame
  - 地理位置
  - web socket
  - ...

CSS3

- 常规
- 动画
- 盒子模型
- 响应式布局
- ...

JavaScript

- ECMAScript 3/5/6/7/8/9
- DOM
- BOM
- 设计模式
- 底层原理
  - 堆栈内存
  - 闭包作用域 AO/VO/GO/EC/ECSTACK
  - 面向对象OOP
  - THIS

# 2 BAT/TMD大公司的面试

- 什么是标签语义化
  
- 合理的标签干合理的事情,头部使用header标签
  
- 都有哪些标签,都是啥意思
  
  - 有块级标签,行内标签,行内块标签.
- 块级标签和行内标签的区别
  
- 块级标签独占一行,行内标标签没用宽高.
  
- 如何转换: 

  - 使用display属性

- display还有哪些属性:

  - `display: none`:
    - 除了`display: none`能隐藏,还有哪些能够隐藏.
      - `visibility: hidden`
      - `visibility:hidden`和`display:none`的区别 -> `visibility: hidden`是占文档流的,而 `display:none`是占文档流的
  - display: flex

  

1. 使用css,让一个div消失在视野中

```css
div{
    visibility: hidden
}
```

```css
div {
    display: none;
}
```

```css
div {
    display: inline;
    width: 0;
    height: 0;
}
```

```css
div {
    opacity: 0
}
```

## 2.1 盒子水平垂直居中的五大方案

### 2.1.1 绝对定位方式

- 盒子如下:

```html
<div class="box"></div>
.box{
	width: 100px;
	height: 100px;
	background: skyblue;
}
```

[实现方案1: 绝对定位]

```css
.box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
}
```

[实现方案2: margin]

```css
.box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

- 以上方法得知道盒子得宽高

- 不知道盒子的宽高

[实现方案3: tranform方法]

```css
.box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```

### 2.1.2 flex布局

```css
body{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 2.1.3 js实现

```html
<script>
    let HTML = document.documentElement,
        windowWidth = HTML.clientWidth,
        windowHeight = HTML.clientHeight,
        boxWidth = box.offsetWidth,
        boxHeight = box.offsetHeight
    box.style({
        position: absolute;
        left: ( windowWidth - boxWidth) /  2 + 'px';
    	top: (windowHeight - boxHeight) / 2 + 'px';
    })
</script>
```

### 2.1.4 table-cell

- 要求父级有固定宽高

```html
<style>
    body{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .box{
        display: inline-block;
    }
</style>
```



## 2.2 盒子模型

### 2.2.1 标准盒模型

```html
<style>
    div{
        box-sizing: content-box
    }
</style>
```

- 我们项目中经常用到的盒子模型,就是标准盒子模型,它对应在css中的属性是`box-sizing: content-box`.
- 它的大小是 我们内容区域的 宽/高 + 边框 + 内边距.

- 标准盒模型的不足点在于, 例如我们想在项目中写一个 宽/高 都是100px的 盒子. 如果我们加上了边框(比如1px),会使得盒子实际的 宽/高 变成 102px. 使得我们不得不改变已经写好的 宽/高

### 2.2.2 怪异盒模型

- css3提供了一种怪异盒模型(IE盒模型), `display: border-box`
- 它设置的宽高,就包含了 边框 / 内边距 和 内容区域, 这一点比较好



## 2.3 JS底层原理

### 2.3.1 对象的 深/浅 拷贝

```js
let obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
    x: 10
  },
  d: /^\d+$/
}
```

- 实现一个浅拷贝: 引用类型的赋值赋值的是地址.
- 注: `hasOwnPropery`用于判断是否是私有属性

```js
function shallowC(obj){
    let obj2 ={};
    for(let k in obj){
        if(!obj.hasOwnProperty(k)) break;
        obj2[k] = obj[k]
    }
    return obj2
}
```

### 2.3.2 解决浅拷贝

- 使用typeof判断是否是 数组和对象的形式

- 但是使用 typeof === ‘object’ 会遗漏掉掉null的情况

- 然后使用instanceof来判断正则和日期的形式

```js
const deepClone = (obj) =>{
    if(obj === null) return null
    if(typeof obj !== 'object') return obj
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    let obj2 = new obj.constructor;
    for(let k in obj){
        if(obj.hasOwnProperty(k)){
            obj2[k] = deepClone(obj[k])
        }
    }
    return obj2
}
```



### 2.3.3 堆栈内存与闭包

1. 数字和字符串是相等的

```js
let a = {}, b='0', c=0;
a[b] = 'marron';
a[c] = 'Mar'
console.log(a[b]) // Mar
```

- 堆内存: 存储引用类型值所在的空间
- 栈内存: 存储基本类型值和存储代码所在空间
- 执行a[b]的时候,会在堆内存中存储一个 a['0'] = 'marron'
- 执行a[c]的时候,会在堆内存中存储一个a[0] = 'Mar'
- 对于堆内存来说,数字和字符串是一样的即, 数字0 作为键与 字符串0作为键是相等的.
- 因此在打印 a[b] 是实际上会输出 Mar

2. 对象中的键中的对象,最终都会转换成字符串

```js
let a = {},
  b = {
    n: '1'
  },
  c = {
    m: '2'
  }
a[b] = 'marron'
a[c] = 'Mar'
console.log(a[b]);		// 'Mar'
// 在堆内存中都是   { '[object object]': 'Mar' }
```

3. 闭包问题

```js
var test = (function(i){
  return function(){
    alert(i *= 2);
  }
})(2)
test(5)     // 会弹出字符串4
```

- 函数一定会创建一个执行上下文
- 引用类型的赋值是先开辟一个堆空间,然后将内容存在堆中.最后将堆的地址返回给变量

- 在执行`var test = (function(2){})(2)`时,右边是一个自执行函数,因此会开辟一个执行上下文.里面保存着i = 2

```js
// 自执行函数的执行上下文
i = 2;
return AAAFF11		// AAAFF11 返回函数的引用地址
```

- 由于JS中的函数是引用类型, 因此会开辟一个堆空间用来存放函数体内的信息

```js
// 堆空间: 地址 AAAFFF11
"alert(i *=2)"   // 代码字符串.
prototype	// 原型
length		// 形参的个数
name		// 函数的名字

// 注意,
// 作为函数这个堆空间中会存储 代码字符串
// 作为对象 会存在 prototype、length、name等属性
// 此时堆: AAAFFF11的上级作用域是 自执行函数的执行上下文
```

- 接下来就是将自执行函数的执行结果赋值给test

```js
test = AAFF11
```

- 调用test(5)的时候,会创建一个新的执行上下文,

```js
// test(5)的 执行上下文
-> 堆: AAAFFF11
```

- 然后顺着地址去找到堆AAAFFF11,找到堆AAAFFF11之后,遇到函数代码字符串. `alert( i *= 2)`,

```js
// test(5)的 执行上下文
"alert( i*= 2)"
```

- 由于当前堆中没用i的值,会顺着作用域链,往上级作用域寻找,找到了 自执行函数的上下文.然后回弹出字符串 "4",同时堆内存中i的值被改成了4

- 完毕之后,由于`test(5)的执行上下文`中没用变量被引用,会根据JS的垃圾回收机制,进行销毁.
- 而`自执行函数的 执行上下文`中的变量i被堆AAAFFF11引用,会一直存在,因此形成了闭包.

4. 闭包小练手

```js
var a = 0,
    b = 0;
function A(a){
  A = function(b){
    alert(a + b++);
  };
  alert(a++)
}
A(1);
A(2);
```

- 首先有个全局作用域

```js
// global
a = 0;
b = 0;
A = 堆: FFFAAA00
ctx:A(1)
ctx:A(2)
```

- 执行到`A(1)`时

```js
// ctx: A(1)
a(局部) = 1
A(全局) = 堆: FFFAAA01
alert(a++)	 // 会弹出'1',此时局部a = 2
// 由于a被堆: FFFAAA01 引用,因此结束时, ctx: A(1)不会被清除
```

- `A(1)`执行完毕,此时全局作用域

```js
// global
a = 0;
b = 0;
A = 堆: FFFAAA01
ctx: A(2)  <-- 执行到这一行
```

- `A(2)`开始执行

```js
// ctx: A(2) 传入参数由b接收
a(ctx(A(1))) = 2;
b(局部) = 2;
alert(a + b++); // 弹出'4', 然后局部b = 3
// 完毕后,作用域销毁
```

- 综上所述,会弹出'1','4'



### 2.3.4 变量提升、优先级综合案例

- 求下列函数输出结果	

```js
function Foo() {
  getName = function() {
    console.log(1)
  }
  return this
}
Foo.getName = function() {
  console.log(2)
}
Foo.prototype.getName = function() {
  console.log(3)
}
var getName = function() {
  console.log(4)
}

function getName() {
  console.log(5)
}
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

- 首先由变量提升阶段

```js
// Global
Foo = 0xffffff00
getName = () -> 5  // () -> 5 代表函数引用类型,输出5
```

- 然后到执行阶段,从上到下一行行执行

- `Foo.getName = function(){}`

```js
// 0xffffff00
getName: () -> 2
```

- `Foo.prototype.getName = function(){}`

```js
// 0xffffff00
getName: () -> 2
prototype: 0xffffff01
```

```js
// 0xffffff01
getName: () -> 3
```

- `getName = function(){}`

```js
// Global
Foo = 0xffffff00
getName = () -> 4
```

- `Foo.getName()` , 顺着内存地址找输出2

- `getName()`: 输出4

- `Foo().getName()`,先执行`Foo`,在执行`getName`

  - 执行`Foo`

  - ```js
    // ctx: Foo
    getName(全局) = () -> 1
    // return this  // 由于Foo函数是在全局环境下执行,因此this执行window
    return window
    // 执行完即销毁
    ```

  - 执行完毕后,Global中的getName改变

  - ```js
    // Global
    Foo = 0xffffff00
    getName = () -> 1
    ```

  - 此时,相等于执行`window.getName()`, 直接输出1

- `getName()`,输出1

- `new Foo.getName()`: 根据[优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) `new ...`是18, 而`.`是19,因此先执行后面的

  - `Foo.getName()`: 输出2
  - 再执行`new `

- `new Foo().getName()`: `new Foo()`的优先级是19, 和`.`是一样的,因此从左往右执行

  - `new Foo()`: 创建一个Foo实例f,然后执行`f.getName`方法.
  - 实际上就是执行`Foo.prototype.getName`,会输出3

- `new new Foo().getName()`: 这个可以看作: `new ((new Foo()).getName())`,还是输出3

- 综上所述输出: `2 4 1 1 2 3 3 `



### 2.3.5 事件循环(Event Loop)

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})
console.log('script end')
```

#### 2.3.5.1 知识储备

- 浏览器是多线程,JS是单线程的. 浏览器只给了JS一个线程来渲染
- 浏览器首先会分配一个栈内存供JS代码执行,由于是单线程,再每次遇到异步任务时,都会将异步任务放到一个任务队列中(Event Queue),
- 任务队列分为`微任务` 和 `宏任务`
- 浏览器将所有同步任务执行完毕之后,会从任务队列中取出微任务,到栈内存中.微任务执行完了,会取出宏任务.
- 常见的`宏任务`: 定时器、xhr、事件绑定、I/O 事件、浏览器渲染
- 常见的`微任务`: promise.then()、async await、node中还有一个 process.nextTick
- `事件循环`:就是第一次同步任务执行完毕之后,从任务队列中获取准备好的任务到栈内存中(一条一条)执行的过程

#### 2.3.5.2 解析

```js
// 栈内存
/*
创建 async1
创建 async2
-> 输出 "script start"
-> 将定时器任务放入宏任务队列
-> 执行asnyc1
	-> 输出 "async1 start"
	-> 遇见 await 将async2()执行,等待async2的返回结果 -> 将该等待任务放到微任务队列中
	-> 输出 "async2"
-> new Promise()中的函数是同步函数,它的resolve和reject是异步的
    -> 输出 "promise1"
    -> 将then 放到微任务队列
—> 输出 "script end"
*/

// 微任务队列
任务B: 执行await async2()后面的函数
任务C: 输出 promise2

// 宏任务队列
任务A: 在很短时间后输出"setTimeout"
```

- 上面第一次同步代码执行完毕,接下来开始事件循环,不断从微任务队列和宏任务队列中取出任务执行

```js
// 栈内存
-> 从微任务队列中取出任务B -> 输出 "async1 end"
-> 取出任务C -> 输出 "promise2"
-> 取出任务A -> 输出 "setTimeout"
```

- 综上所述,输出:

```js
/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

- 注: 在node版本 10.15.0中,将promise.then的在微任务中的优先级提高了,因此有可能输出结果如下:

```js
/*
script start
async1 start
async2
promise1
script end
promise2
async1 end
setTimeout
*/
```

### 2.3.6 双等号的隐式调用和数据劫持

- 求下面条件,在a为什么样时,等号成立

```js
if(a == 1 && a == 2 && a == 3){
    console.log('等号成立')
}
```

#### 2.3.6.1 双等号的隐式转换

- 首先得了解双等号的隐式转换规则

| 等式              | 备注                                    |
| ----------------- | --------------------------------------- |
| 对象 == 字符串    | 隐式调用 toString方法将对象转换成字符串 |
| null == undeifned | 相等                                    |
| NaN == NaN        | 不相等                                  |
| 其他情况          | 都转换成数字进行比较.                   |

- 思路: 根据双等号的隐式转换规则,每次调用调用toString(),可以重写a属性下面的toString方法，初始时i的值设置为0,每次返回++i

```js
// 双等号
var a ={
    i: 0,
    toString(){
        return ++this.i
	}
}
if(a == 1 && a == 2 && a == 3){
    console.log('等号成立')
}
```

#### 2.3.6.2 数据劫持

- 还有一种方法是使用数据劫持,没当读取a元素时返回一个i

- 数据劫持回顾:

```js
// ES5: Object.defineProperty
Object.defineProperty(obj, 'name', {
    get(){
        console.log('获取')
    },
    set(){
        console.log('设置')
    }
})

```

- 使用数据劫持完成小栗子

```js
var i = 0;
Object.defineProperty(window, 'a',{
    get(){
        return ++i;
    }
})
```





# 3. 各大框架中的核心内容

Vue: 

- Vue-cli 3.0( 2.0向3.0的过渡): 配置、优化
- Vue基础知识: 双向数据绑定、template模板渲染语法和原理(vue-loader、 虚拟DOM)、指令和自定义指令、methods computed watch filters、class/style、 条件和循环渲染、 事件处理、 表单处理、 组件(属性)、 ref、生命周期、 插槽、 transition、 渲染函数和jsx、 插件编写、 混入、devtools
- vue-router: 基础知识、动态路由、编程式导航、命名路由和命名容器、导航守卫、Hash和Browser路由、路由原理
- vuex:state、getter、mutation、action、module、mapXxx、实现原理...
- 单元测试
- SSR服务器渲染 nuxt.js
- UI组件库
- ......

React: 

- create-react-app
  - 配置
  - 优化
- react基础: JSX语法(虚拟DOM)、状态、属性、ref、组件、生命周期、PureComponent、Hooks...
- react-router-dom
- redux
  - redux
  - react-redux
  - 中间件
  - ...
- dva
- umi
- typescript
- UI组件
- SSR服务器渲染 next.js

## 3.1 Vue 2.0/3.0 数据双向绑定的实现原理

<b>ES5: Object.defineProperty</b>

```html
<body>
    姓名: <span id="spanName"></span>
    <br>
    <input type="text" id="inpName">
    
    <!-- import js -->
    <script>
        let obj ={
            name: ''
        };
        let newObj ={
            ...obj
        };
        Object.defineProperty(obj, 'name', {
            get() {
                return newObj.name
            },
            set(val) {
                newObj.name = val;
                observe();
            }
        })
        
        function observe() {
            spanName.innerHTML = newObj.name;
        }
        inputName.oninput = function(){
            obj.name = this.value;
        }
    </script>
</body>
```



## 3.2 MVC和MVVM的区别

- Vue框架的核心是 MVVM
- React框架的核心是 MVC

本质上没区别,都是数据的改变影响视图的改变,视图的改变反过来影响数据的改变.不同的是,vue中vue充当VM帮助实现了视图的改变到数据的改变,而react得靠自己来实现













## 3.3 跨域问题的解决方案和实现原理

## 3.4 Vue/React框架中关于组件信息通信引发的面试题







[传送门](https://www.bilibili.com/video/av87108516?from=search&seid=13004288958820703555)