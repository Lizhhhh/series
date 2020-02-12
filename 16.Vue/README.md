# 组件化开发

# 1. 组件开发思想

## 1.1 Web Components

- 希望尽可能多的重用代码
- Web Components 通过创建封装好的功能的定制元素解决上述问题

- 并未被浏览器广泛的支持, [官网](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

## 1.2 Vue - 全局组件

- 语法

```js
Vue.component(组件名称,{
    data: 组件数据,
    template: 组件模板内容
})
```

[栗子] - 最简单的组件

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter',{
    data: function(){
        return{
            count: 0
        }
    },
    template: '<button v-on:click="count++">点击了{{ count }}次.</button>'
})
```

使用组件

```html
<div id="app">
    <button-counter></button-counter>
</div>
```

[栗子] - 给组件添加方法

```js
Vue.component('button-counter',{
    data: function(){
        return {
            count: 0
        }
    },
    template: '<button v-on:click="handle">点击了 {{ count }} 次.</button>',
    methods: {
        handle: function() {
            this.count += 2;
        }
    }
})
```

### 1.2.1 组件中的data属性

- 必须使用函数的形式,且要返回一个具体的值

```js
data: function(){
    return {
        count: 0
    }
}
```

- 原因: 因为组件是为了复用,让每个组件的数据不相互影响,因此需要形成一个闭包的环境.

### 1.2.2 组件中的模板

- 组件中的模板必须有且只有1个根元素

## 1.3 Vue - 局部组件

- 语法

```js
var ComponentA = { /* ... */}
var ComponentB = { /* ... */}
var ComponentC = { /* ... */}
new Vue({
    el: '#app'
    components: {
    	'component-a': ComponentA,
    	'component-b': ComponentB,
    	'component-c': ComponentC,
	}
})
```

- 栗子

```html
<body>
    <div id="appp"></div>
    <script>
        var HelloWorld = {
            data: function(){
                return {
                    msg: ''
                }
            },
            template: '<div>{{msg}}</div>'
        }
        var vm = new Vue({
            el: '#app',
            data:{
                
            },
            components: {
                'hello-world': HelloWorld
            }
        })
    </script>
</body> 
```

[注] : 局部组件只能在注册它的父组件中使用



## 1.4 Vue调试工具

- [官网克隆](https://github.com/vuejs/vue-devtools)

## 1.5 组件间数据交互

### 1.5.1 父组件向子组件传值

- 注: props中接收

```js
Vue.component('menu-item',{
    props: ['title'],
    template: '<div>{{ title }}</div>'
})
```

- 父组件以属性的方式向子组件传递值
- 静态方式

```html
<div id="app">
	<menu-item title="Marron"></menu-item>
</div>
```

- 动态方式

```html
<div id="app">
    <menu-item :title="ptitle"></menu-item>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            ptitle: '父组件中动态的值'
        }
    })
</script>
```

<b>props属性名规则</b>

- 在props中使用驼峰形式,模板中需要使用短横线的形式

```html
Vue.component('menu-item',{
    // 在JavaScript中是驼峰式的
    props: ['menuTitle'],
    template: '<div>{{ menuTitle }}</div>'
})
<!-- 在html中是短横线方式的 -->
<menu-item menu-title="nihao"></menu-item>
```

- 字符串形式的模板中没有这个限制

```html
<div id="app">
    <menu-item :menu-title="ptitle"></menu-item>
</div>
<script>
    Vue.component('third-dom',{
        props:['testTitle'],
        template: '<div>{{ testTitle }}</div>'
    });
    Vue.component('menu-item',{
        props: ['menuTitle'],
        template: '<div>{{menuTitle}<third-com testTitle="hello"></third-com></div>}'
    });
    var vm = new Vue({
        el: '#app',
        data: {
            psmg: '父组件内容',
            ptitle: '动态绑定属性'
        }
    })
</script>
```

#### 1.5.1.1 数组的传递

```html
<menu-item :parr="parr"></menu-item>

<script>
    Vue.component('menu-item',{
        props:['parr'],
        template:`
			<div>
				<ul>
					<li :key="index" v-for="(item, index) in parr">{{item}}</li>
    			</ul>
			</div>
		`
    })
    var vm = new Vue({
        el: '#app',
        data:{
            parr: ['apple', 'orange', 'banana']
        }
    })
</script>
```

### 1.5.2 子组件通过自定义事件向父组件传递信息



#### 1.5.2.1 不带参数通知

- 子组件发起事件

```html
<button v-on:click="$emit('enlarge-text')">
    扩大字体
</button>
```

- 父组件监听

```html
<menu-item v-on:enlarge-text="fontSize += 0.1"></menu-item>
```

#### 1.5.2.2 带参数通知

- 子组件发起事件

```html
<button v-on:click="$emit('enlarge-text': 0.1)">
    扩大字体
</button>
```

- 父组件监听自定义事件

```html
<menu-item @enlarge-text="fontSize += $event"></menu-item>
```

#### 1.5.2.3 非父子组件间的传值

1. 单独的事件中心管理组件间的通信

```js
var eventHub = new Vue()
```

2. 监听事件与销毁事件

```
eventHub.$on('add-todo', addTodo);
eventHub.$off('add-todo');
```

3. 触发事件

```js
eventHub.$emit('add-todo', id)
```

[小栗子] : jerry和tom之间的通信.

- jerry里面有个按钮,点击tom中的值加2
- tom中有个按钮,点击jerry中的值加2

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script src="js/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <div>父组件</div>
      <test-tom></test-tom>
      <test-jerry></test-jerry>
    </div>
    <script>
      var hub = new Vue()

      Vue.component('test-tom', {
        data: function() {
          return {
            num: 0
          }
        },
        template: `
          <div>
            <div>TOM: {{num}}</div>
            <div>
              <button @click="handle">点击</button>
            </div>
          </div>
        `,
        mounted: function() {
          hub.$on('tom-event', val => {
            this.num += val
          })
        },
        methods: {
          handle: function() {
            // 触发兄弟组件的事件
            hub.$emit('jerry-event', 2)
          }
        }
      })
      Vue.component('test-jerry', {
        data: function() {
          return {
            num: 0
          }
        },
        template: `
          <div>
            <div>jerry: {{num}}</div>
            <div>
              <button @click='handle'>点击</button>
            </div>
          </div>
        `,
        mounted: function() {
          hub.$on('jerry-event', val => {
            this.num += val
          })
        },
        methods: {
          handle: function() {
            // 触发兄弟组件的事件
            hub.$emit('tom-event', 1)
          }
        }
      })
      var vm = new Vue({
        el: '#app'
      })
    </script>
  </body>
</html>
```



## 1.6 组件插槽

### 1.6.1 无名字的插槽

1. 插槽的位置: `<slot></slot>`

```html
Vue.component('alert-box',{
	template:`
	<div class="demo-alert-box">
    	<strong>Error!</strong>    
        <slot>默认内容</slot>
	</div>
	`
})
```

2. 插槽内容

```html
<alert-box>Something had happend.</alert-box>
```

### 1.6.2 具名插槽

1. 插槽定义

```html
<div class="container">
    <header>
		<slot name="header"></slot>
    </header>
   	<main>
        <slot>默认值</slot>
        <slot name="main"></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
</div>
```

2. 插槽内容

```html
<layout>
    <h1 slot="header">我是头部</h1>
    <p slot="main">我是身体</p>
   	<p>
        主要内容1
    </p>
    <p>
        主要内容2
    </p>
    <p slot="footer">我是jio</p>
</layout>
```

### 1.6.3 作用域插槽

- 动态的控制子组件的高亮显示,基本模板如下

1. 插槽定义

```html
<ul>
    <li v-for="item in list" v-bind:key="item.id">
        <slot :item="item">
            {{item.name}}
        </slot>
    </li>
</ul>
```

2. 插槽内容

```html
<fruit-list :list="list">
    <template slot-scope="slotProps">
        <strong v-if="slotProps.item.current">
           	{{ slotProps.item.text }}
        </strong>
    </template>
</fruit-list>
```

## 1.7 购物车案例

1. 按照组件化方式实现业务需求

   - 根据业务功能进行组件化划分

     - 标题组件(展示文本)
     - 列表组件(列表展示、商品数量变更、商品删除)
     - 结算组件(计算商品总额)

     

### 1.7.1 子组件传递input数据

- 购物车组件如下:

```js
var CartList = {
  props: ['list'],
  template: `
  <div>
    <div class="item" v-for="item in list" :key="item.id">
        <div class="name">{{item.name}}</div>
        <div class="change">
          <a href="javascript:;" @click="subtract1(item.id)">-</a>
            <input type="text" class="num" :value="item.num" @blur='changeNum(item.id, $event)'/>
          <a href="javascript:;" @click="add1(item.id)">+</a>
        </div>
        <div class="del" @click="del(item.id)">×</div>
    </div>
  </div>
`,
  methods: {
    changeNum: function(id, event) {
      this.$emit('changeNum', {
        id: id,
        num: event.target.value
      })
    },
    del: function(id) {
      this.$emit('del', id)
    },
    subtract1: function(id) {
      this.$emit('subtract1', id)
    },
    add1: function(id) {
      this.$emit('add1', id)
    }
  }
}
```

- 父级组件如下:

```js
Vue.component('my-cart', {
  data: function() {
    return {
      uname: '张三',
      list: list
    }
  },
  template: `
<div class="cart">
    <cart-title :uname="uname"></cart-title>
    <cart-list :list="list" @del='delCart($event)' @subtract1='subtractCart($event)' @add1='addCart($event)' @changeNum='changeCart($event)'></cart-list>
    <cart-total :list='list'></cart-total>
  </div>
`,
  components: {
    'cart-title': CartTitle,
    'cart-list': CartList,
    'cart-total': CartTotal
  },
  methods: {
    changeCart: function($event) {
      let { id, num } = $event

      var index = this.list.findIndex(item => {
        return item.id == id
      })

      if (num < 1) {
        this.list.splice(index, 1)
      } else {
        this.list[index].num = num
      }
    },
    delCart: function(id) {
      var index = this.list.findIndex(item => {
        return item.id == id
      })
      this.list.splice(index, 1)
    },
    subtractCart: function(id) {
      var index = this.list.findIndex(item => {
        return item.id == id
      })
      if (this.list[index].num - 1 == 0) {
        this.list.splice(index, 1)
      } else {
        this.list[index].num -= 1
      }
    },
    addCart: function(id) {
      var index = this.list.findIndex(item => {
        return item.id == id
      })
      this.list[index].num += 1
    }
  }
})
```

# 2. 前后端交互模型

## 2.1 异步调用

- 异步调用: 定时任务、Ajax、事件函数

## 2.2 Promise概述

Promise是异步编程的一种解决方案,从语法上讲,Promise是一个对象,从它可以获取异步操作的消息.

## 2.3 Promise 基本用法

- 实例化Promise对象,构造函数传递函数,该函数用于处理异步任务
- resolve和reject两个参数用于处理成功和失败两种情况,并通过p.then获取处理结果

```js
var p = new Promise(function(resolve, reject){
    // 成功调用 resolve()
    // 失败调用 reject()
});

p.then(function(ret){
    // 从resovle得到正常结果
}, function(ret){
    // 从reject得到错误信息
})
```

### 2.3.1 手写Promise

1、 对象的状态不受外界影响.Promise对象代表一个异步操作,有三种状态: pending(进行中)、fulfilled(已成功)和rejected(已失败).只有异步操作的结果,可以决定当前是哪一种状态,任何其他操作都无法改变这个状态。这也是Promise这个名字的由来,它的英语意思就是"承诺",表示其他手段无法改变.

2、一旦状态改变,就不会再变,任何时候都可以得到这个结果。Promise对象的状态改变,只有两种可能: 从pending变为fulfilled和从pending变为rejected.只要这两种情况发生,状态就凝固了,不会再变了,会一直保持这个结果,这时就称为resolved(已定型)。如果改变已经发生了,你再对Promise对象添加回调函数,也会立即得到这个结果。这与事件(Event)完全不同,事件的特定是,如果你错过了它,再去监听,是得不到结果的

```js
class Promise{
    constructor(exector){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = value => {
            if(this.state === 'pending'){
                this.state = 'resolved';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        
        const reject = reason => {
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        exector(resolve, reject);
    }
    then(onFulfilled, onRejected){
        if(this.state === 'resolved'){
            onFulfilled(this.value)
        }
        if(this.state === 'rejected'){
            onRejected(this.reason)
        }
        if(this.state === 'pending'){
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}

```

### 2.3.2 基于Promise处理Ajax请求

1. 处理原生Ajax

```js
function queryData(){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('get','http://localhost:3000/data');
        xhr.sen();
        xhr.onload = function(err, data){
            if(err){
                reject(err.msg)
            } else{
                resolve(data)
            }
        }
    })
}
```

# 3. 接口调用 -fetch 用法

## 3.1 fetch特性

1. 基本特性

- 更加简单的数据获取方式,功能更加强大、更强大、更灵活,可以看做是xhr的升级版
- 基于Promise实现

2. 语法结构

```js
fetch(url).then(fn2)
		  .then(fn3)
		  ...
          .catch(fn)
```

- [官网](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 3.2 fetch的基本用法

```js
fetch('/abc').then(data=>{
    return data.text();
}).then(ret=>{
    console.log(ret)
})
```

## 3.3 fetch请求参数

1. 常见配置选项

```js
fetch('/abc',{
    method:'get'
}).then(data=>{
    return data.text();
}).then(ret =>{
    console.log(ret)
})
```

2. GET请求方式的参数传递

```js
fetch('/abc?id=123').then(data=>{
    return data.text();
}).then(ret=>{
    console.log(ret)
})

// 后端
app.get('/books', (req, res) => {
  res.send('传统URL传递参数!' + req.query.id)
})
```

```js
fetch('/abc/123',{
    method: 'get'
}).then(data=>{
    return data.text():
}).then(ret=>{
    console.log(ret)
})

// 后端
app.get('/books/:id', (req, res) => {
  res.send('传统URL传递参数!' + req.params.id)
})
```

3. DELETE请求方式的参数传递

```js
fetch('/abc/123',{
    method: 'delete',
}).then(data=>{
    return data.text();
}).then(ret=>{
    console.log(ret)
})

// 后端
app.delete('/books/:id', (req, res) => {
  res.send('传统URL传递参数!' + req.params.id)
})
```

4. POST请求方式的参数传递

```js
fetch('/books',{
    method: 'post',
    body: 'uname=lisi&pwd123',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})
.then(data=>{
    return data.text();
}).then(ret=>{
    console.log(ret)
})

// 后端代码
app.post('/books',(req, res)=>{
    res.send('Restful风格:post, uname:' + req.body.uname + '---' + req.body.pwd)
})
```

```js
// 传递参数类 `application/json`
fetch('/books',{
    method:'post',
    body:JSON.stringify({
        uname:'lisi',
        pwd:123
    }),
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(data=>{
    return data.text()
}).then(ret=>{
    console.log(ret)
})
```

5. PUT请求方式的参数传递

```js
fetch('/books/123',{
    method:'put',
    body:JSON.stringify({
        uname:'lisi',
        pwd: 123
    }),
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(data=>{
    return data.text();
}).then(ret=>{
    console.log(ret)
})
```

## 3.4 fetch响应结果

响应数据格式

- text(): 将返回体处理成字符串类型
- json(): 返回结果和 JSON.parse(resonseText)一样



# 4. 接口调用 -axios 用法

## 4.1 axios的基本特性

- [官网](https://github.com/axios/axios)

- 是一个基于Promise,用于浏览器和node.js的HTTP客户端

- 支持浏览器和node.js
- 支持promise
- 能拦截请求和响应
- 自动转换JSON数据

## 4.2 axios的基本用法

```js
axios.get('adata')
.then(ret=>{
    console.log(ret.data)
})
```

### 4.2.1 axios拦截器

1. 请求拦截器: 在发出之前设置一些信息

```js
// 添加一个请求拦截器
axios.interceptors.request.use(function(config){
    // 在请求发出之前进行一些信息设置
    return config;
}, function(err){
    // 处理象用的错误信息
})
```

2. 响应拦截器: 在获取数据之前对数据做一些加工处理

```js
// 添加一个响应拦截器
axios.interceptors.response.use(function(res){
    // 在这里对返回的数据进行处理
    return res;
}, function(err){
    // 处理错误信息
})
```

# 5. 接口调用 - async/await 用法

## 5.1 async/await 的基本用法

- async/await 是ES7引入的新语法, 可以更加方便地进行异步操作
- async关键字用于函数上 (async函数的返回值是Promise实例对象)
- await关键字用于async函数当中 (await可以得到异步的结果)

```js
async function queryData(id) {
    const ret = await axios.get('/data');
    return ret;
}
quertData.then(ret=>{
    console.log(ret)
})
```



## 5.2 async/await 处理多个异步请求

```js
      async function queryData() {
        var info = await axios.get('async1')
        var ret = await axios.get('async2?info=' + info.data)
        return ret.data
      }
      queryData().then(data=>{
        console.log(data)
      })
```

# 6. 路由的基本概念与原理

## 6.1 路由

### 6.1.1 后端路由

- 概念: 根据不同的用户URL请求,返回不同的内容
- 本质: URL请求地址与服务器资源之间的对应关系

### 6.1.2 SPA(Single Page Application)

- 后端渲染(存在渲染问题)
- Ajax前端渲染(前端渲染提高性能, 但是不支持浏览器的前后退操作)
- SPA(Single Page Application) 但单页面应用程序: 整个网站只有一个页面, 内容的变化通过Ajax局部更新实现、同时支持浏览器地址栏的前进和后退
- SPA实现原理之一: 基于URL地址的hash (hash的变化会导致浏览器记录访问历史的变化、但是hash的变化不会触发新的URL请求)
- 在实现SPA过程中,最核心的技术点就是前端路由

## 6.2 前端路由

- 概念: 根据不同的用户事件,显示不同的页面内容
- 本质: 用户事件与实践处理函数之间的对应关系

### 6.2.1 实现简易前端路由

- 基于URL中的hash实现(点击菜单的时候改变URL的hash,根据hash的变化控制组件的切换)

```js
// 监听 window 的 onhashchange 事件,根据获取的最新的 hash 值,切换要显示的组件的名称
window.onhashchange = function () {
    // 通过 location.hash 获取到最新的 hash 值
}
```

1. 使用`window.onhashchange`的方法得到当前的hash值
2. 使用`<component :is="'str'"></component>`,根据is后面的动态属性,改变组件的名字
3. `vm.$data.comName`: 获取实例中的数据

```js
const zhuye = {
  template: '<h1>主页信息</h1>'
}
const keji = {
  template: '<h1>科技信息</h1>'
}
const caijing = {
  template: '<h1>财经信息</h1>'
}
const yule = {
  template: '<h1>娱乐信息</h1>'
}

const vm = new Vue({
  el: '#app',
  data: {
    comName: 'zhuye'
  },
  components: {
    zhuye,
    keji,
    caijing,
    yule
  }
})

window.onhashchange = function() {
  // 通过location.hash 获取到最新的 hash值
  // vm.data.comName = location.hash.split('/')[1]
  vm.$data.comName = location.hash.split('/')[1]
}
```

## 6.3 Vue Router

- [Vue Router](https://router.vuejs.org/zh/)是  Vue.js 官方的路由管理器
- 它和Vue.js的核心深度集成,可以非常方便的用于SPA应用程序的开发



Vue Router包含的功能有:

- 支持HTML5历史模式或hash模式
- 支持嵌套路由
- 支持路由参数
- 支持编程式路由
- 支持命名路由

```html
<div id="app">
    <router-link to='/user'>User</router-link>
    <router-link to='/register'>Register</router-link>
    <!-- 将来通过路由规则匹配到的组件,将会被渲染到router-view所在的位置-->
    <router-view></router-view>
</div>
<script>
    const User={
        template: `<h1>User</h1>`
    }
    const Register={
        template: `<h1>Register</h1>`
    }
    const router = new VueRouter({
        routes:[
            {path: '/user',component: User},
            {path: '/register',component: Register}
        ]
    })
    const vm = new Vue({
        el:'#app',
        data: {},
        router
    })
</script>
```

### 6.3.1 路由重定向

```js
var router = new VueRouter({
    routes:[
        { path: '/', redirect: '/user'},
        { path: '/user', component: User},
        { path: '/register', component: Register}
    ]
})
```

### 6.3.2 嵌套路由

```js
const router = new VueRouter({
    routes:[
        { path: '/user', component: User },
        { path: '/register',
          component: Register,
          children: [
              { path: '/register/tab1', component: Tab1 },
              { path: '/register/tab2', component: Tab2}
          ]
        }
    ]
})
```

### 6.3.3 动态路由匹配

- 以下路由规则该如何匹配

```html
<router-link to="/user/1">User1</router-link>
<router-link to="/user/2">User2</router-link>
<router-link to="/user/3">User3</router-link>
```

- 进行动态路由匹配

```js
var router = new VueRouter({
    routes: [
        {path: '/user/:id', component: User}
    ]
})
// 匹配得到的参数存在 $route.params 中
const User = {
    template: '<div>User {{ $route.params.id }}</div>'
}
```

### 6.3.4 路由组件传递参数

1. props的值为布尔类型

```js
const router = new VueRouter({
    routes:[
        { path: '/user/:id', component: User, props: true}
    ]
})
const User = {
    props: ['id'],
    template: `<div>用户ID: {{ id }}</div>`
}

```

2. props的值为对象类型

```js
const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User, props: { uname: 'lisi', age: 12}}
    ]
})
const User = {
    props: ['uname', 'age'],
    template: '<div>用户信息: {{ uname + '---' + age}}</div>'
}
```

3. props的值为函数类型

```js
const router = new VueRouter({
    routes:[
        { path: '/user/:id', component: User, props: route => ({ uname: 'zs', age:20, id: route.params.id  })}
    ]
})
const User = {
    props: ['uname', 'age', 'id'],
    template: '<div>用户信息: {{ uname + '---' + age + '---' +id}}</div>'
}
```

### 6.3.5 命名路由

- 未来更加方便的表示路由的路径,可以给路由规则起一个别名,即为"命名路由"

```html
<router-link :to="{ name: 'user', params: {id: 123}}">User</router-link>
<script>
    const router = new VueRouter({
        routes:[
            { path: '/user/:id', name: 'user', component: User}
        ]
	})
    const User = {
        template: `
		<div>
			<h1> User -- {{$route.parmas.id}} </h1>
    	</div>`
    }
</script>
```

### 6.3.6 编程式导航

- 声明式导航: 通过点击链接实现导航的方式,叫做声明式导航
  - 普通网页: 点击`<a></a>`
  - vue: `<router-link></router-link>`
- 编程式导航: 通过JavaScript形式中的API实现导航的方式
  - 普通网页中: `location.href`
  - Vue: 
    - this.$router.push('hash地址')
    - this.$router.go(n)  - 前进后退

```js
// this.$router.push
const User = {
  template: `
    <div>
      <h1>User {{$route.params.id}} 组件</h1>
      <button @click="goRegister">跳转到注册页面</button>
    </div>
  `,
  methods:{
    goRegister(){
      this.$router.push('/register')
    }
  }
}

// this.$router.go
const Register = {
  template: `
  <div>
    <h1>Register</h1>
    <button @click="goBack">后退</button>
  </div>
  `,
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
```

- router.push()方法的参数规则

```js
// 字符串(路径名称)
router.push('/home')

// 对象
router.push({ path: '/home'})

// 命名的路由(传递参数)
router.push({ name: '/user', params: { userId: 123}})

// 带查询参数,变成 /register?uname=lisi
router.push({ path: '/register', query: { uname: 'lisi'}})
```