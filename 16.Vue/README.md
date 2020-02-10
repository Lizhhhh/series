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



## 1.3 Vue调试工具

- [官网克隆](https://github.com/vuejs/vue-devtools)

- 注意以管理员的身份打开命令行运行

