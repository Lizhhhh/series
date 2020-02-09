# 1. Vue 概述

Vue: 渐进式JavaScript框架

- 框架: 提供了一些基础性的服务, 虚拟diff算法、虚拟DOM的支撑

- 库: 仅仅只提供一些便捷的API(jQuery)

- [官网](https://cn.vuejs.org)



## 1.1 Vue解放了DOM操作

- vue内部有一个compile机制。会将数据和模板结合起来渲染成HTML, 解放了DOM的操作

- Vue代码运行原理: Vue语法 -> 原生语法

## 1.2 模板语法概述

### 1.2.1 如何理解前端渲染

- 前端渲染 : 把数据(Ajax从后台获取数据)填充到HTML(模板)标签中,最终得到静态的HTML内容

### 1.2.2 前端渲染的方式

- 使用原生js拼接字符串,然后操作DOM渲染

```js
var tag = '';
tag += '<span>日期' + date + '</span>';
var div = document.getElementById('div');
div.innerHTML = tag;
```

[缺点] ： 不同开发人员的风格差别很大,随着业务的复杂,后期的维护变得逐渐困难

- 使用前端模板引擎(art-template)

```html
<script id="abc" type="text/html">
	{{if isAdmin}}
		<h1>{{title}}</h1>
		<ul>
			{{each list as value i}}
				<li>索引 {{i + 1}} : {{ value }} </li>
			{{/each}}
		</ul>
	{{/if}}
</script>
```

[缺点] : 没用提供原生的事件处理方式

- 使用vue特有的模板语法



## 1.3 指令

### 1.3.1 v-cloak

- 基本使用, [官网](https://cn.vuejs.org/v2/api/)

```html
<div id="app">
	<div v-cloak>
        {{msg}}
    </div>    
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            msg: 'Hello Vue'
        }
    })
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>
```

- 实现的原理: 先通过样式隐藏内容,然后在内存中进行值的替换,替换好之后再显示最终的结果

### 1.3.2 v-text

- 栗子

```html
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

- 与插值表达式的区别, v-text渲染的页面是没用闪动的.

### 1.3.3 v-html

- 存在安全隐患.存在XSS攻击
- 原则: 本网站内部数据可以使用,来自第三方的数据不可用

### 1.3.4 v-pre

- 显示原始信息,跳过编译过程



# 记忆碎片

P397 07.数据响应式_ 00:32/07:26