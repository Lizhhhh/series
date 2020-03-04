 # Vue 2.x响应式原理的实现

- [Vue.js响应式原理解析与实现](https://segmentfault.com/a/1190000017039526)
- [当面试官问你Vue响应式原理,你可以这么回答](https://juejin.im/post/5adf0085518825673123da9a)

## 【01_数据劫持】

es5新增了Object.defineProperty这个api,它可以允许我们为对象的属性来设定getter和setter,从而我们可以劫持用户对象。

```js
// 劫持某个属性, 假设劫持obj下面的name属性
// 为了避免循环调用,需要新开辟一个内存空间来代理obj
const obj = {};
let newObj = {};
newObj = obj;
Object.defineProperty(obj,'name',{
    set(val){
        console.log('正常尝试给name属性写入: ', val);
        newObj = val;
	},
    get(){
    	console.log('正常尝试读取obj对象的值');
        return newObj;
    }
})

obj.name = 'marron';
console.log(obj.name)
```

## 【02_观察者模式】

解耦,首先将事件注册,再需要的时候调用

```js
class Dep{
    constructor(){
        this.subs = []
    }

    addSub(name, cb){
       	if(this.subs[name] == undefined){
            this.subs[name] = [cb]
        } else {
            this.subs[name].push(cb)
        }
    }
    notify(name, argument){
        if(this.subs[name].length <0) return;
        this.subs[name].forEach(cb=>{
            cb()
        })
    }
}

const dep = new Dep();
dep.addSub('sayHi',()=>{
    console.log('hi')
})
dep.addSub('sayHello',()=>{
    console.log('hello')
})

// 用setTimeout模拟异步环境下的事件调用
setTimeout(()=>{
    dep.notify('sayHi')
},1000)

dep.notify('sayHello')
```

## 【03_Vue2.x响应式原理初体验】

- 什么是响应式: MVVM数据的变化反映到视图的变化上.视图的变化反应到数据的变化

- 给传入的数据data中的每个属性添加响应式
  - 怎么加
  - 给哪些属性加







# 数据驱动

- [参考](https://www.bilibili.com/video/av75366883?t=18)

## Vue与模板

- `01-index.html` 、

- 使用页面模板:
  - 直接在HTML标签中写标签
  - 使用template做模板
  - 使用单文件(`<template />`)

- 创建Vue的实例
  - 在Vue的构造函数中,提供: data, methods,computed,watcher,props...
- 将Vue挂在到页面中.(mount)



## 数据驱动模型

- `02-vue-demo.html`

Vue的执行流程:

- 获取模板: 模板中有 特殊语法(如 `{{}}`)
- 利用Vue构造函数中提供的数据,来替换这些特殊语法, 之后得到可以在页面中显示的"标签"
- 用这些"标签",替换特殊语法.



Vue利用我们提供的数据和页面中的模板一起,生成了一个新的HTML标签(node元素),替换到了页面中放置模板的位置.



## 简单的模板渲染

- `03-likeVue.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 写模板 -->
    <div id="root">
      <div>
        <div>
          <p>{{name}} - {{message}}</p>
        </div>
      </div>
      <p>{{name}}</p>
      <p>{{msg}}</p>
    </div>
    <script>
      let mustache = /\{\{(.+?)\}\}/g

      // 步骤拆解
      /*
        1. 拿到模板
        2. 拿到数据 (data)
        3. 将数据与模板结合,得到的是HTML元素(DOM元素)
        4. 放到页面中
      */
      let tmpNode = document.querySelector('#root')
      let data = {
        name: '一个新name',
        message: '一个消息',
        msg: '哈哈哈'
      }
      function compiler(template, data) {
        let childNodes = template.childNodes // 取出子元素
        for (let i = 0, len = childNodes.length; i < len; i++) {
          // 1，元素、 3.文本
          let type = childNodes[i].nodeType
          if (type == 3) {
            // 文本节点,判断里面是否有{{}}插值
            let txt = childNodes[i].nodeValue // 该属性只有文本节点才有意义
            txt = txt.replace(mustache, function(_, g) {
              let key = g.trim() // 写在双花括号里面的东西
              let value = data[key]
              // 将{{ xxxx }} 用这个替换
              return value
            })
            childNodes[i].nodeValue = txt
            // 有没有双括号.
          } else if (type == 1) {
            // 元素,考虑它有没有子元素,是否需要将其子元素进行判断是否要插值.
            compiler(childNodes[i], data)
          }
        }
      }

      // console.log(tmpNode)
      compiler(tmpNode, data)
      // console.log(tmpNode)
    </script>
  </body>
</html>
```

上述存在问题: 当数据放生变化时,由于原来DOM模板被新的DOM结构替换了,故无法形成响应式。。做如下改进

```js
let generateNode = tmpNode.cloneNode(true)

console.log(tmpNode)
compiler(generateNode, data)
console.log(generateNode)

root.parentNode.replaceChild(generateNode, root)
```

>以上还存在的问题:
>
>- Vue中使用的是虚拟DOM,而上述实现使用的是真实的DOM
>- 上述未考虑层级`{{ a.name}}` 

【解决思路】:

- 一开始把模板读取出来就放在内存中,读入之后的模板是不变的
- 然后把模板和数据一起,生成真正的DOM树
- 然后将DOM树加载到页面中.

【步骤】:

1. 读取模板放到内存中
2. 使用`compiler`函数,用数据替换模板中得mustache语法(不影响模板)
3. 将compiler函数得到的内存中的页面结构,替换到网页中

# 数据驱动2

`04-Vue-ctr.html`

## 改写成构造函数

将上述代码封装成构造函数如下

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 写模板 -->
    <div id="root">
      <div>
        <div>
          <p>{{name}} - {{message}}</p>
        </div>
      </div>
      <p>{{name}}</p>
      <p>{{message}}</p>
    </div>
    <script>
      function compiler(template, data) {
        let mustache = /\{\{(.+?)\}\}/g
        let childNodes = template.childNodes
        for (let i = 0, len = childNodes.length; i < len; i++) {
          let type = childNodes[i].nodeType
          if (type == 3) {
            let txt = childNodes[i].nodeValue
            txt = txt.replace(mustache, function(_, g) {
              let key = g.trim()
              let value = data[key]
              return value
            })
            childNodes[i].nodeValue = txt
          } else if (type == 1) {
            compiler(childNodes[i], data)
          }
        }
      }

      function Mar(options) {
        // 内部数据使用_开头, 只读数据使用$开头
        this._data = options.data
        this._el = options.el

        // 准备工作(准备模板)
        this._templateDOM = document.querySelector(this._el)
        this._parent = this._templateDOM.parentNode

        // 渲染工作
        this.render()
      }

      Mar.prototype.render = function() {
        this.compiler()
      }

      // 编译: 将模板与数据结合得到真正的DOM元素
      Mar.prototype.compiler = function(tmpNode) {
        let realHTMLDOM = this._templateDOM.cloneNode(true)
        compiler(realHTMLDOM, this._data)
        this.update(realHTMLDOM)
      }

      // 将DOM的元素放到页面中
      Mar.prototype.update = function(real) {
        this._parent.replaceChild(real, document.querySelector('#root'))
      }

      let app = new Mar({
        el: '#root',
        data: {
          name: 'jim',
          message: 'info'
        }
      })
    </script>
  </body>
</html>
```

## 考虑层级数据

 层级属性如: `a.name`

`05-deepProps.html`

- 根据路径来获取属性的值

```js
function getValueByPath(obj, path) {
  let paths = path.split('.')

  let res = obj
  let prop
  while ((prop = paths.shift())) {
    if (res[prop]) {
      res = res[prop]
    } else {
      res
    }
  }
  return res
}
var o = {
  a: {
    b: {
      c: {
        d: 'Marron'
      }
    }
  }
}
let res = getValueByPath(o, 'a.b.c.d')
let res1 = getValueByPath(o, 'a.b.c')
console.log(res1)
```

## 函数柯里化

- [函数柯里化](https://juejin.im/post/5a96481d6fb9a0633f0e4cc1)

### 什么是柯里化

函数柯里化是把接受多个参数的函数转变成一个单一参数(最初函数的第一个参数),并且返回接收余下的参数而且返回结果的新函数的技术



柯里化其实本身是固定一个可以预期的参数,并返回一个特定的函数,处理批特定的需求。这增加了函数的适用性,但同时也降低了函数的使用范围.



通用定义

```js
function currying(fn){
    var slice = Array.prototype.slice;
    _args = slice.call(arguments, 1);
    return function(){
        var _inargs = slice.call(arguments);
        return fn.apply(null,_args.concat(_inargs))
    }
}
```

柯里化的实用性体现在很多方面:



<b>提高实用性</b>

通用函数解决兼容性问题,但是同时也会带来使用的不便利性,不同的应用场景往往要传递很多参数,已达到解决特定的目的.有时候应用中,会对同一个规则进行反复使用,这样就造成了代码的重复性.

```js
function square(i) {
    return i * i
}
function dubble(i){
    return i *= 2
}
function map(handler, list){
    return list.map(handler)
}

// 数组的每一项平方
map(square, [1,2,3,4,5])
map(square, [6,7,8,9,10])
map(square, [10,20,30,40,50])

// 数组的每一项加倍
map(dubble, [1,2,3,4,5])
map(dubble, [6,7,8,9,10])
map(dubble, [10,20,30,40,50])
```

例子中,创建一个map通用函数,用于适应不同的应用场景。显然,通用性不用怀疑。同时,例子中重复传入了相同的处理函数: square和dubble



应用中这种可能会更多。当然,通用性的增强必然带来实用性的减弱。但是,我们依然可以在中间找到一种平衡。



- [JavaScript函数柯里化](https://github.com/xingbofeng/xingbofeng.github.io/issues/20)

<b>官方说法:</b>

把接受多个参数的函数变换成接受一个单一参数的函数,并且返回接受余下的参数而且返回结果的新函数的技术

<b>方便的理解</b>

> Currying概念其实很简单,只传递函数一部分参数来调用它,让它返回一个函数去处理剩下的参数	

如果我们需要实现一个求三个数之和的函数:

```js
function add(x, y, z){
    return x + y + z
}
console.log(add(1, 2, 3))
```

```js
var add = function(x) {
    return function(y) {
        return function(z){
            return x + y + z
        }
    }
}
var addOne = add(1)
var addOneAndTwo = addOne(2)
var addOneAndTwoAndThree = addOneAndTwo(3)

console.log(addOneAndTwoAndThree)
```

```js
// ES6写法
const add = x => y => z => x + y + z
```

### 偏函数

来看这个函数:

```js
function ajax(url, data, callback){
    // ..
}
```

有这样的场景: 我们需要对多个不同的接口发起HTTP请求,有下列两种做法:

- 在调用`ajax()`函数时,传入全局`URL`常量

```js
function ajaxText1(data, callback) {
    ajax('http://www.test.com/test1', data, callback)
}
function ajaxText2(data, callback) {
    ajax('http://www.test.com/test2', data, callback)
}
```

对于上面两个类似的函数,我们还可以提取出如下的模式

```js
function beginTest(callback) {
    ajaxTest1({
        data: GLOBAL_TEST_1
    }, callback)
}
```



# 虚拟DOM的实现

使用虚拟DOM的原因: 减少[回流与重绘](https://blog.csdn.net/piano9425/article/details/104551515)



## 将DOM结构转换成对象保存到内存中

>`<img /> => { tag: 'img'}`
>
>`文本节点 => { tag: undefined, value: '文本节点' }`
>
>`<img title="1" class="c" /> => { tag: 'img', data: { title = "1", class="c" } }`
>
>`<div><img /></div> => { tag: 'div', children: [{ tag: 'div' }]}`

<b>根据上面可以写出虚拟DOM的数据结构</b>

```js
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }
    appendChild(vnode){
        this.children.push(vnode)
    }
}
```

<b>可能用到的基础知识</b>

- 判断元素的节点类型: `node.nodeType`

```3
let nodeType = node.nodeType
if(nodeType == 1) {
    // 元素类型
} else if (nodeType == 3) {
	// 节点类型
}
```

- 获取元素类型的标签名和属性 && 属性中具体的键值对,保存在一个对象中

```js
let nodeName = node.nodeName	// 标签名
let attrs  = node.attributes	// 属性
let _attrObj = {}	// 保存各个具体的属性的键值对,相当于虚拟DOM中的data属性
for(let i =0, len = attrs.length; i< len; i++){
    _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
}
```

- 获取当前节点的子节点

```js
let childNodes = node.childNodes
for(let i = 0, len = childNodes.length; i < len; i++){
    console.log(childNodes[i])
}
```

<b>算法思路</b>

- 使用`document.querySelector`获取要转换成虚拟DOM的模板
- 使用`nodeType`方法来获取是元素类型还是文本类型
- 若是元素类型
  - 使用`nodeName`获取标签名
  - 使用`attributes`获取属性名,并将具体的属性保存到一个对象`_attrObj`中
  - 创建虚拟DOM节点
  - 考虑元素类型是否有子节点,使用递归,将子节点的虚拟DOM存入其中
- 若是文本类型
  - 直接创建虚拟DOM,不需要考虑子节点的问题

```js
// 虚拟DOM的数据结构
class VNode{
    constrctor(tag, data, value, type){
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }
    appendChild(vnode) {
        this.children.push(vnode)
    }
}

// 获取要转换的DOM结构
let root = document.querySelector('#root')
// 使用getVNode方法将 真实的DOM结构转换成虚拟DOM
let vroot = getVNode(root)	
```

以上写了虚拟DOM的数据结构,以及使用`getVNode`方法将真实DOM结构转换成虚拟DOM,下面开始逐步实现getVNode方法

- 判断节点类型,并返回虚拟DOM

```js
function getVNode(node){
    // 获取节点类型
    let nodeType = node.nodeType;
    if(nodeType == 1){
        // 元素类型: 获取其属性,判断子元素,创建虚拟DOM
    } else if(nodeType == 3) {
      // 文本类型: 直接创建虚拟DOM
    }
    let _vnode = null;
    return _vnode
}
```

- 下面根据元素类型和文本类型分别创建虚拟DOM

```js
if(nodeType == 1){
    // 标签名
    let tag = node.nodeName
    // 属性
    let attrs = node.attributes
    /*
     属性转换成对象形式: <div title ="marron" class="1"></div>
     { tag: 'div', data: { title: 'marron', class: '1' }}
    */
    let _data = {};   // 这个_data就是虚拟DOM中的data属性
    for(let i =0, len = attrs.length; i< attrs.len; i++){
        _data[attrs[i].nodeName] = attrs[i].nodeValue
    }
    // 创建元素类型的虚拟DOM
    _vnode = new VNode(tag, _data, undefined, nodeType)
    
    // 考虑node的子元素
    let childNodes = node.childNodes
    for(let i =0, len = childNodes.length; i < len; i++){
        _vnode.appendChild(getVNode(childNodes[i]))
    }
}
// 接下来考虑文本类型
else if(nodeType == 3){
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
}
```

<b>总体代码</b>

```js
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }
    appendChild(vnode){
        this.children.push(vnode)
    }
}

function getVNode(node) {
  let nodeType = node.nodeType
  let _vnode = null
  if (nodeType == 1) {
    let tag = node.nodeName
    let attrs = node.attributes
    let _data = {}
    for (let i = 0, len = attrs.length; i < len; i++) {
      _data[attrs[i].nodeName] = attrs[i].nodeValue
    }
    _vnode = new VNode(tag, _data, undefined, nodeType)

    let childNodes = node.childNodes
    for (let i = 0, len = childNodes.length; i < len; i++) {
      _vnode.appendChild(getVNode(childNodes[i]))
    }
  } else if (nodeType == 3) {
    _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
  }
  return _vnode
}

let root = document.querySelector('#root')
let vroot = getVNode(root)	
console.log(vroot)
```



## 将虚拟DOM转换成真实的DOM结构

此过程就是上面的反过程

<b>可能用到的知识点</b>

- 创建文本节点

```js
document.createTextNode(value)
```

- 创建元素节点

```js
document.createElement(tag)
```

- 给元素节点添加属性

```js
node.setAttribute(attrName, attrValue)
```

- 给元素节点添加子节点

```js
node.appendChild(node)
```

<b>算法思路</b>

- 虚拟DOM的结构中,元素的节点类型存储在type中,根据type可以判断出是文本节点还是元素节点
- 若为文本节点,直接返回一个文本节点`return document.createTextNode(value)`
- 若为元素节点
  - 创建一个node节点:`_node = document.createElement(tag)`
  - 遍历虚拟DOM中的data属性,将其中的值赋给node节点
  - 给当前节点添加子节点

<b>具体实现</b>

```js
function parseVNode(vnode){
    let type = vnode.type
    let _node = null
    if(type == 3){
        return document.createTextNode(vnode.value)
    } else if (type == 1){
        _node = document.createElement(vnode.tag)
        
        let data = vnode.data
        let attrName,attrValue
        Object.keys(data).forEach(key=>{
            attrName = key
            attrValue = data[key]
            _node.setAttribute(attrName, attrValue)
        })
        // 考虑子元素
        let children = vnode.children
        children.forEach( subvnode =>{
            _node.appendChild(parseVNode(subvnode))
        })
    }
    return _node
}
```

验证:

```js
let root = querySelector('#root')
let vroot = getVNode(root)
console.log(vroot)
let root1 = parseVNode(vroot)
console.log(root1)
```

# 函数式编程部分重点

参考资料: [函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## 柯里化

只传递给函数一部分参数来调用它,让它返回一个函数去处理剩下的参数

```js
var add = function (x) {
    return function(y) {
        return x + y
    }
}

var increment = add(1)
var addTen = add(10)

increment(2) // 3

addTen(10)	// 12
```

- 判断元素:Vue本质上是使用HTML的字符串作为模板的,将字符串转换为AST(抽象语法树),再转换为VNode(虚拟DOM)
  - 模板 -> AST (此处做了字符串解析,最消耗性能)
  - AST -> VNode
  - Vnode -> DOM

【Vue源码中柯里化的使用】

1. 在Vue中常常需要判断,一个标签是原生的HTML标签,还是组件标签.你可能会想到如下的代码

```js
let tags = 'div,p,a,img,ul,li,span'.split(',')  // 有很多种原生的标签,这里只列举了一小部分
function isHTMLTag(tagName){
    tagName = tagName.toLowerCase();
    if( tags.indexOf(tagName) > -1) return true
    return false
}
```

- 以上每次判断都要循环时间复杂度为o(n)遍.

- Vue中,使用柯里化可以将时间复杂度将为O(1)

```js
let tags = 'div,p,a,img,ul.li,span'.split('.')
function makeUp(keys) {
    let set = {}
    tags.forEach( key => set[key] = true)
    
    return function (tagName) {
        return !!set[tagName.toLowerCase()]
    }
}
let isHTMLTag = makeUp(tags)
```

# 不带响应式的Vue缩减实现

## 模板

现有模板如下:

```html
<div id ="app">
    <div class="c1">
        <div title='tt1' id="id">{{ name }}</div>
        <div title='tt2' >{{age}}</div>
        <div>hello3</div>
    </div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data:{
            name: '张三',
            age: 19
        }
    })
</script>
```

## [Vue初始化流程](https://www.cnblogs.com/DivHao/p/11805829.html)

Vue的初始化,是从`new Vue`开始的,以下的图中可以知道在`new Vue`后,会执行`init`,再`$mount`实现挂载,再到编译`compile`,生成`render`函数,接下来是响应式依赖收集,通过`pach`实现异步更新。`render function`会被转化为`Vnode`节点,`Virtual DOM`是一棵以`JavaScript`对象(`Vnode`节点)为基础的树。是对真实DOM的描述。通过`patch()`转化为真实DOM。在数据有变化时,会通过`setter -> Watcher -> update`来更新视图。整个Vue的运行机制大致就是这样

![img](https://img2018.cnblogs.com/blog/1103090/201911/1103090-20191106154644797-489764010.png)

## 实现

- 在这里实现`new Vue -> $mount -> compile -> render function -> Virtual DOM Tree -> patch() -> DOM`,即除了响应式的部分.

- 简略版

【流程梳理】: 

- 首先要明确目的,我们需要将现有的HTML模板与数据结合,生成一个新的HTML结构,并渲染到页面上.考虑到性能问题,我们首先将模板读取到内存中(源代码是进行HTML解析,生成一棵抽象AST).在这里使用`带mustcache语法的HTML模板`代替.

- 首先是执行`new Vue`,在Vue函数中会将传入的数据和模板保存起来,为了后续的方便,会将模板及其父元素也保存起来,然后执行`mount`

```js
function Vue(options){
    let elm = document.querySelector(options.el)
    this._data = options.data
    this._template = elm
    this._parent = elm.parentNode
    this.mount()
}
```

- 然后是mount函数,在里面做了2件事:
  - 第一件事是将HTML读取为AST保存在内存中,并返回一个`根据AST 和 data 生成 虚拟DOM`的render函数
  - 第二件事是调用`mountComponent`: 将`render`函数生成的VNode(虚拟DOM)转换成真实的HTML节点渲染到页面上

【先看第一件事】

```js
Vue.prototype.mount = function(){
    this.render = this.createRenderFn()
}
Vue.prototype.createRenderFn = function(){
    let AST = getVNode(this._template)
    return function render(){
        let _tmp = combine(AST, this._data)
        return _tmp
    }
}
```

上面在mount中调用了`createRenderFn`,生成了一个render函数(AST + DATA -> VNode). 之所以写出那种形式,

是因为AST仅在一开始读取DOM结构时候就固定不变了,采用上面的写法可以提高性能.

`getVNode`函数根据模板,返回`带mustache语法的`虚拟DOM.[更多参考](https://blog.csdn.net/piano9425/article/details/104553403)

```js
class VNode {
    constructor(tag ,data, value, type){
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []
    }
    appendChild(vnode){
        this.children.push(vnode)
    }
}
function getVNode(node){
    let nodeType = node.nodeType
    let _vnode = null
    if(nodeType == 1){
        // 元素节点
        let tag = node.nodeName
        ,attrs = node.attributes
        ,_data = {}
        for(let i = 0, len = attrs.length; i < len; i++){
            _data[attrs[i].nodeName] = attrs[i].nodeValue
        }
        _vnode = new VNode(tag, _data, undefined, nodeType)
        
        // 考虑子元素
        let childNodes = node.childNodes;
        for(let i = 0, len = childNodes.length; i< len; i++){
            _vnode.appendChild(getVNode(childNodes[i]))
        }
    } else if(nodeType == 3){
        // 文本节点
        _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
    }
    return _vnode
}
```

此时得到的是一个对象,这个对象中的值类似`{{name}}`(模拟了AST),下面使用combine将该对象模板与数据结合生成一个新的对象(在Vue中是虚拟的DOM)。即将mustache语法用真实的数据替换

```js
function combine(vnode ,data){
    let _type = vnode.type
    , _data = vnode.data
    , _tag = vnode.tag
    , _value = vnode.value
    , _children = vnode.children
    , _vnode = null
    
    if(_type == 3){
        // 文本节点
        _value = _value.replace(/\{\{(.+?)\}\}/g, function(_, g){
            return getValueByPath(data, g.trim())
        })
        _vnode = new VNode(_tag, _data, _value, _type)
    } else if(_type == 1){
        // 元素节点
        _vnode = new VNode(_tag, _data, _value, _type)
        _children.forEach(_subVNode => _vnode.appendChild(combine(_subVNode, data)))
    }
    return _vnode
}
// getValueByPath,深层次获取对象的数据. 栗子: 获取 a.name.age.salary
function getValueByPath(obj, path){
    let res=obj
    , currProp
    , props = path.join('.')
    while(currProp = props.shift()){
        res = res[props]
    }
    return res
}
```

【再看第二件事】

在`mountComponent`中会使用第一件事中的render函数将AST和Data结合起来生成虚拟DOM,然后调用this.update方法将虚拟DOM渲染到页面上

```js
Vue.prototype.mountComponent = function(){
    let mount = () => {
        this.update(this.render())
    }
    mount.call(this)
}
// 之所以采用this.update,是因为update后面会交付给watcher来调用的
Vue.prototype.update = function (vnode){
    let realDOM = parseVNode(vnode)
    this._parent.replaceChild(realDOM, this._template)
}
function parseVNode(vnode){
    let type = vnode.type
    , _node = null
    if(type ==3){
        return document.createTextNode(vnode.value)
    } else if (type == 1){
        _node = document.createElement(vnode.tag)
        let data = vnode.data
        Object.keys(data).forEach(key => {
            _node.setAttribute(key, data[key])
        })
        
        let children = vnode.children
        children.forEach(subvnode =>{
            _node.appendChild(parseNode(subvnode))
        })
    }
    return _node
}
```



## 整体代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <div class="c1">
        <div title="tt1" id="id">{{ name }}</div>
        <div title="tt2">{{age}}</div>
        <div>hello3</div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>

    <script>
      /* 虚拟DOM 构造函数 */
      class VNode {
        constructor(tag, data, value, type) {
          this.tag = tag && tag.toLowerCase()
          this.data = data
          this.value = value
          this.type = type
          this.children = []
        }
        appendChild(vnode) {
          this.children.push(vnode)
        }
      }

      /* HTML DOM -> VNode(带坑的Vnode): 将这个函数当做 compiler 函数  */
      /*
         Vue中会将真实的DOM结构当作字符串去解析得到一棵 AST
         此处使用带有mustache语法的虚拟DOM来代替 AST
      */
      function getVNode(node) {
        let nodeType = node.nodeType
        let _vnode = null
        if (nodeType == 1) {
          // 元素
          let nodeName = node.nodeName
          let attrs = node.attributes
          let _attrObj = {}
          for (let i = 0; i < attrs.length; i++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue
          }
          _vnode = new VNode(nodeName, _attrObj, undefined, nodeType)

          // 考虑node的子元素
          let childNodes = node.childNodes
          for (let i = 0; i < childNodes.length; i++) {
            _vnode.appendChild(getVNode(childNodes[i]))
          }
        } else if (nodeType == 3) {
          _vnode = new VNode(undefined, undefined, node.nodeValue, nodeType)
        }
        return _vnode
      }

      /* 将虚拟DOM转换成真正的DOM */
      function parseVNode(vnode){
        // 创建真实的DOM
        let type = vnode.type;
        let _node = null;
        if( type == 3){
          return document.createTextNode(vnode.value)
        } else if(type == 1){
          _node = document.createElement(vnode.tag)

          // 属性
          let data = vnode.data  // 现在这个data是键值对
          Object.keys(data).forEach((key)=>{
            let attrName = key
            let attrValue = data[key]
            _node.setAttribute(attrName, attrValue)
          })

          // 子元素
          let children = vnode.children;
          children.forEach(subvnode =>{
            _node.appendChild(parseVNode(subvnode))
          })
          return _node

        }
      }



      const mustache = /\{\{(.+?)\}\}/g // 匹配{{}}的正则表达式

      // 根据路径访问对象成员
      function getValueByPath(obj, path) {
        let res = obj,
          currProp,
          props = path.split('.')
        while ((currProp = props.shift())) {
          res = res[currProp]
        }
        return res
      }

      /*
        模拟 AST -> VNode 的过程
        将带有坑(mustache语法)的VNode与数据data结合,得到填充数据的VNode:
      */
      function combine(vnode, data) {
        let _type = vnode.type
        let _data = vnode.data
        let _tag = vnode.tag
        let _value = vnode.value
        let _children = vnode.children

        let _vnode = null
        if (_type == 3) {
          // 文本节点
          // 对文本处理
          _value = _value.replace(mustache, function(_, g) {
            return getValueByPath(data, g.trim())
          })
          _vnode = new VNode(_tag, _data, _value, _type)
        } else if (_type == 1) {
          // 元素节点
          _vnode = new VNode(_tag, _data, _value, _type)
          _children.forEach(_subVNode => _vnode.appendChild(combine(_subVNode, data)))
        }
        return _vnode
      }

      function JGVue(options) {
        // this._options = options;
        this._data = options.data
        let elm = document.querySelector(options.el)
        this._template = elm
        this._parent = elm.parentNode
        this.mount() // 挂载
      }

      JGVue.prototype.mount = function() {
        // 需要提供一个render方法: 生成虚拟DOM
        // if(typeof this._options.render !== 'function'){

        // }

        this.render = this.createRenderFn() // 带有缓存

        this.mountComponent()
      }

      JGVue.prototype.mountComponent = function() {
        // 执行mountComponent()
        let mount = () => {
          // update将虚拟DOM渲染到页面上
          this.update(this.render())
        }
        mount.call(this) // 本质上应该交给 watcher 来调用

        // 为什么
        // this.update(this.render())  // 使用发布订阅模式,渲染和计算的行为应该交给watcher来完成
      }

      /*
        在真正的Vue中,使用了二次提交的设计结构
        第一次提交是在内存中,在内存中确定没有问题了在修改硬盘中的数据
        1. 在页面中的DOM和虚拟DOM是一一对应的关系
      */

      // 这里是生成render函数,目的是缓存抽象语法树(我们使用虚拟DOM来模拟)
      JGVue.prototype.createRenderFn = function() {
        let AST = getVNode(this._template)
        // 将 AST + data => VNode
        // 我们: 带坑的VNode + data => 含有数据的 VNode
        return function render() {
          // 将带坑的VNode转换为真正带数据的VNode
          let _tmp = combine(AST, this._data)
          return _tmp
        }
      }

      // 将虚拟DOM熏染到页面中: diff算法就在这里
      JGVue.prototype.update = function(vnode) {
        // 简化,直接生成HTML DOM replaceChild 到页面中
        // 父元素.replaceChild(新元素,旧元素)
        let realDOM = parseVNode(vnode)
        // debugger
        this._parent.replaceChild(realDOM, document.querySelector('#app'))
        // 这个算法是不负责任的
        // 每次都会将页面中的DOM全部替换
      }

      let app = new  ({
        el: '#app',
        data: {
          name: '张三',
          age: 19
        }
      })
    </script>
  </body>
</html>
```



# 响应式原理

- 我们在使用Vue实时,赋值属性是直接使用Vue实例的
- 我们在设计属性值时,页面的数据更新,在页面上会直接响应

```js
let o = {}
, _gender
Object.defineProperty(obj, gender,{
    get(){
        return _gender
    },
    set(newVal){
        _gender = newVal
    }
})
```

- 注意: 如果同时使用get和set需要一个中间变量去存储真正的数据.如上使用了一个`_gender`

- 问题: Vue在使用的过程中可能会用到很多变量,而_gender被暴露在全局作用域中,很可能会污染全局作用域.如何解决这个问题呢?
  - 在Vue中使用`defineReactive` 函数来对数据实现响应式变化. 这个函数形成了一个闭包.这样就避免了对全局作用域的污染
  - 下面是实现方式

```js
function defineReactive(target, key, value, enumerable){
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get(){
            console.log(`读取${key}`)
            return value
        }
        set(newVal){
        	console.log('更新${key}')
        	value  = newVal
    	}
    })
}

let o = {
    name: 'marron',
    age: 26,
    remark: 'hunt for job'
}
Object.keys(o).forEach(k=>{
    defineReactive(o, k, true)
})
```

实际开发中,对象可能是有多级的

```js
let o = {
    list: [],
    ads:[
        {}
    ],
    user: {
        
    }
}
```

> 此时该如何处理呢?

## 深层次对象的处理

问题: 上述实现的响应式中,仅仅只考虑了一层对象.多层级的并不是响应式.

```js
let o = {
    list:[
        { person1: {
            name: '张三',
            age: 18
        }}
    ]
}
o.list[0].person1.name
```

思路如下:

- 需要一个函数`reactify`它接受一个对象作为参数,遍历该对象的所有属性
  - 如果当前属性是一个数组类型: 对其中的每一项都调用`reacify`(递归)
  - 如果不是数组类型,调用`defineReactive`,同时在`defineReactive`中需要判断,传入的value是不是非数组的对象
    - 如果是,则递归调用 `reactify`
    - 否则,直接响应式化

```js
let data = {
    name: 'Marron',
    age: 18,
    mark: [
        {name: 'javascript'},
        {name: 'html'},
        {name: 'css'},
        {name: 'vue'},
        {name: 'react'},
        {name: 'webpack'},
        {name: 'elementUI'},
        {name: 'node.js'},
        {name: 'express'}
    ]
}

function defineReactive(target, key, value, enumerable) {
  if (typeof value == 'object' && value !== null && !Array.isArray(value)) {
    // 非数组的引用类型
    reactify(value)
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取${key}属性`)
      return value
    },
    set(newVal) {
      console.log(`设置${key}属性为${newVal}`)
      value = newVal
    }
  })
}

// 将对象o响应式化
function reactify(o) {
  Object.keys(o).forEach(k => {
    let value = o[k]
    if (Array.isArray(value)) {
      // 数组
      value.forEach(val => {
        reactify(val)
      })
    } else {
      defineReactive(o, k, value, true)
    }
  })
}
reactify(data)
```

此时可以在浏览器的控制台中检查是否响应式化了.

## 数组的push、pop类型的处理

问题: 在上述实现的响应式化中,如果使用元素的数组方法`push`.则新加入的数据并不会是响应式的.

```js'
data.mark.push({name: 'linux'})	
```

需要实现如下:

- 在改变数组数据的时候发出通知
  - 注意在Vue2.x中: 设置数组的length并未做对应的处理(Vue 3.0中使用Proxy的语法解决了这个问题)

>tips: 如果一个函数已经定义了,且我们需要扩展其功能,我们一般的处理办法(函数拦截)
>
>1. 使用一个临时的函数名来存储函数
>2. 重新定义原来的函数
>3. 定义扩展的功能
>4. 调用临时的那个函数

```js
function fn(){
    console.log('原生功能')
}
let _tmpFn = fn
fn = function(){
    console.log('这里是扩展功能')
    _tmpFn()
}
fn()
fn = _tmpFn
_tmpFn = null
```

> 下面扩展数组的方法: 修改要进行响应式化的数组的原型`__proto__`

```js
let data = {
  name: '张三',
  age: 19,
  course: [{ name: '语文' }, { name: '数学' }, { name: '英语' }]
}

let ARRAY_MEDHOD = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']
// 思路, 原型式继承: 修改原型链的结构
let array_methods = Object.create(Array.prototype)
// array_methods是一个空的对象,原型是Array.prototype
ARRAY_MEDHOD.forEach(method => {
  array_methods[method] = function() {
    // 调用原来的方法
    console.log(`调用的是拦截的${method}方法`)

    for(let i = 0, len = arguments.length; i< len; i++){
      reactify(arguments[i])
    }

    // 将数据进行响应式化

    return Array.prototype[method].apply(this, arguments)
  }
})

function defineReactive(target, key, value, enumerable) {
  if (typeof value == 'object' && value !== null && !Array.isArray(value)) {
    // 非数组的引用类型
    reactify(value)
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取o的${key}属性`)
      return value
    },
    set(newVal) {
      console.log(`设置o的${key}属性为${newVal}`)
      value = newVal
    }
  })
}

// 将对象o响应式化
function reactify(o) {
  Object.keys(o).forEach(k => {
    let value = o[k]
    if (Array.isArray(value)) {
      // 数组
      value.__proto__ = array_methods   // 数组就可以响应式了
      value.forEach(val => {
        reactify(val)
      })
    } else {
      defineReactive(o, k, value, true)
    }
  })
}
reactify(data)
```

## 改变对象属性的处理

以上已经将对象处理成响应式的了,但是如果给对象重写赋值,则不会是响应式

```js
// 例如上面的栗子


```

## 响应式流程梳理

梳理响应式的流程

# Vue初始化(给数据添加响应式)







