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



