# 1. $.ajax()

## 1.1 $.ajax()方法概述

- 作用: 发送Ajax请求

```js
$.ajax({
    type: 'get',
    url: 'http://www.example.com',
    data: { name: 'zhangsan', age: '20'},
    contentType: 'application/x-www-form-urlencoded',
    beforeSend: function() {
        return false
    },
    success: function (response) {},
    error: function (xhr) {}
})
```

```js
{
	data: 'name=zhangsan&age=20'		// contentType: 'application/x-www-form-urlencoded'
}
```

```js
{
    data: JSON.stringify({ name: 'zhangsan', age: 20 })	// contentType: 'application/json'
}
```

- 栗子: 使用$.ajax发送第一个请求

```js
$('#btn').on('click', function() {
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/base',
    success: function(response) {
      console.log(response)
    },
    error: function(xhr) {
      console.log(xhr)
    }
  })
})
```

## 1.2 serialize方法

作用: 将表单中的数据自动拼接成字符串类型的参数

```js
var params = $('#form').serialize();
```

- 栗子,使用serialize方法将form表单中的数据转换成对象格式

```js
$('#form').on('submit', function(){
    var params = $('#form').serialize();	// 返回值是一个数组对象
    var obj = {};
    $.each(params, function(index, value){
        obj[value.name] = value.value;
    })
    console.log(obj);
})
```

## 1.3 发送jsonp请求

```js
$.ajax({
    url: "http://www.example.com",
    // 指定当前发送jsonp请求
    dataType: 'jsonp',
    // 修改callback参数名称
    jsonp: 'cb',
    // 指定函数名称
    jsonCallback: 'fnName',
    success: function(response) {}
})
```

- `jsonp`:默认值是 `'callback'`
- `jsonCallback`: 默认执行 success里面的回调函数
- 服务器: `express`

```js
app.get('/jsonp', (req, res)=>{
    res.jsonp({
        name: 'lisi',
        age: 18
    })
})
```

# 2. $.get()、$.post()

作用: `$.get()`方法用于发送get请求 , $.post()方法用于发送post请求

```js
$.get('http://www.example.com', {name: 'zhangsan', age: 18}, function(response){})
$.post('http://www.example.com', {name: 'lisi', age: 19}, function(respons) {})
```

# 3. jQuery中Ajax全局事件

## 3.1 全局事件

只要页面中有Ajax请求被发送,对应的全局事件就会被触发

```js
.ajaxStart()		// 当请求开始发送时触发
.ajaxComplete()		// 当请求完成时触发
```

- 栗子

```js
// 当页面中有ajax请求发送时触发
$(document).on('ajaxStart', function(){
    console.log('start');
})

// 当ajax请求完成时触发
$(document).on('ajaxComplete', function(){
    console.log('complete');
})
```

## 3.2 NProgress

纳米级进度条,使用逼真的涓流动画来告诉用户正在发生的事情

```html
<link rel="stylesheet" href="nprogress.css" />
<script src="nprogress.js"></script>
```

```js
NProgress.start();	// 进度条开始运动
NPrgoress.done();	// 进度条结束运动
```

## 3.3 Ajax的全局进度条事件

```js
// 当页面中有ajax请求发送时触发
$(document).on('ajaxStart', function(){
    NProgress.start();  // 进度条开始运动
})

// 当ajax请求完成时触发
$(document).on('ajaxComplete', function(){
    NPrgoress.done();	// 进度条结束运动
})
```

# 4 . RESTful风格的API

## 4.1 传统请求地址回顾

```js
GET "http://www.example.com/getUsers"		 // 获取用户列表
GET "http://www.example.com/getUser?id=1"	 // 获取某个用户的信息
POST "http://www.example.com/modifyUser"     // 修改用户信息
GET "http://www.example.com/deleteUser?id=1" // 删除用户信息
```



## 4.2 RESTful API概述

一套关于设计请求的规范

- `GET`: 获取数据
- `POST`: 添加数据
- `PUT`: 更新数据
- `DELETE`: 删除数据

## 4.3 RESTful API的实现

- 创建用户列表数据: `GET http://www.example.com/users`
- 创建(添加用户)数据: `POST http://www.example.com/users`
- 获取用户ID为1的用户信息: `GET http://www.example.com/users/1`
- 修改用户ID为1的用户信息: `PUT http://www.example.com/users/1`
- 删除用户ID为1的用户信息: `DELETE http://www.example.com/users/1`

## 4.4 express中获取RESTful风格的参数

- 获取某一个用户具体信息的路由

```
app.get('/users/:id', async (req, res)=>{
	const id = req.params.id;
	const res = await User.findOne({_id: id})
	res.send(`当前我们是在获取id为${id}用户信息`);
});
```

- 删除某一个用户

```
app.delete('/users/:id',(req, res)=>{
	const id = req.params.id;
	res.send(`当前我们是在删除id为${id}用户`)
})
```

- 修改某一个用户

```js
app.put('/users/:id', (req,res)=>{
    const id = req.params.id;
    res.send(`当前我们是在修改id为${id}的用户信息`)
})
```



# 5. XML基础

## 5.1 XML是什么

XML的全称是 extensible markup language,代表可扩展标记语言,它的作用是传输和存储数据

```xml
<students>
    <student>
        <sid>001</sid>
        <name>张三</name>
    </student>
    <student>
        <sid>002</sid>
        <name>王二丫</name>
    </student>	
</students>
```

## 5.2 XML DOM

XML DOM即XML文档对象模型,是w3c组织定义的一套操作XML文档对象的API.浏览器会将XML文档解析成文档对象模型

### 5.2.1 获取服务器端返回的xml数据

- 关键属性: `xhr.responseXML`
- 客户端

```html
<body>
  <button id="btn">发送请求</button>
  <div id="container"></div>
  <script>
    var btn = document.getElementById('btn');
    var container = document.getElementById('container');

    btn.onclick = function(){
      var xhr = new XMLHttpRequest();
      xhr.open('get', '/xml');
      xhr.send();
      xhr.onload = function() {
        // xhr.responseXML 获取服务器端返回的xml数据
        console.log(xhr.responseXML)
      }
    }
  </script>
</body>
```

- 服务端

```js
// 设置响应头数据 content-type text/xml
app.get('/xml',(req, res)=>{
    res.header('content-type', 'text/xml');
    res.send(`
	<message>
		<title>消息头部</title>
		<content>消息内容</content>
	</message>
	`)
})
```

说明: 因为设置了`text/xml`,估在客户端接收的时候,可以从`xhr.responseXML`中获取

### 5.2.2 解析xml中的数据

- 前端通过`xhr.responseXML`获取xml数据.
- 它得到的是一个XML DOM.
- 可以向HTML一样使用它

```js
xhr.onload = function (){
    var XMLDocument = xhr.responseXML;
    var title = XMLDocument.getElementByTagName('title')[0].innerHTML;
    console.log(title);
}
```

