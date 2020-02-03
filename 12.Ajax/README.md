# 1. Ajax基础

## 1.1 传统网站中存在的问题

- 网速慢的情况下,页面加载时间长,用户只能等待
- 表单提交后,如果一项内容不合格,需要重新填写所有表单内容
- 页面跳转,重新加载页面,造成资源浪费,增加用户等待时间



## 1.2 Ajax概述

它是浏览器提供的一套方法,可以实现页面无刷新更新数据,提高用户浏览网站应用的体验,局部更新网页,极大的提高用户的体验.

在不刷新页面的情况下,向服务器端发送请求,然后通过javascript更改页面数据,提要用户浏览网站的体验



## 1.3 Ajax的应用场景

1. 页面上拉加载更多数据
2. 列表数据无刷新分页
3. 表单项离开焦点验证数据
4. 搜索框提示文字下拉列表



## 1.4 Ajax的运行环境

Ajax技术<font color=red>需要运行在网站环境中才能生效</font>,当前课程会使用Node创建的服务器作为网站服务器

### 1.4.1 通过域名的方式访问html文件

- 思路,通过服务器技术,将html文件作为静态资源暴露给浏览器

```js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, ()=>{conosle.log('ok')})
```

## 1.5 Ajax运行原理及实现

Ajax相当于浏览器发送请求与接收响应的代理人,以实现在不影响用户浏览页面的情况下,局部更新页面数据,从而提高用户体验.

### 1.5.1 Ajax的实现步骤

1. 创建Ajax对象: 为浏览器创建帮助发送请求的代言人

```js
var xhr = new XMLHttpRequest();
```

2. 告诉Ajax请求地址以及请求方式

```js
xhr.open('get', 'http://www.example.com')
```

3. 发送请求

```js
xhr.send()
```

4. 获取服务器端与客户端的响应数据

```js
xhr.onload = function () {
    console.log(xhr.responseText);
}
```

### 1.5.2 服务器端响应的数据格式

在真实的项目中,服务器端<font color=red>大多数情况下会以JSON对象作为响应数据的格式</font>。当客户端拿到响应数据时,要将JSON数据和HTML字符串进行拼接,然后将拼接的结果展示在网页中

在http请求与响应的过程中,无论是请求参数还是响应内容,如果是对象内类型,最终都会被转换为对象字符串进行传输.因此在客户端需要使用`JSON.parse`将字符串类型转换成对象.

1. 将服务器端的数据转换成对象
2. 将对象与html进行拼接,放到页面中

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/responseData');
xhr.send()
xhr.onload = function () {
    // 将服务器端的数据转换成对象
	var resposneText = JSON.parse(xhr.responseText);
    // 将对象与html进行拼接,放到页面中
    var str = `<h2>${responseText.name}</h2>`
    document.body.innerHTML = str;
}
```

- 服务器端的响应代码如下

```js
const express = require('express');
const app = express();

app.get('/responseData', (req, res)=>{
    res.send({"name": "zs"})
})
app.listen(3000)
```

### 1.5.3 请求参数传递

#### 1.5.3.1 传统请求方式: 表单

```html
<form method = 'get' action="http://example.com">
    <input type="text" name="username" />
    <input type="password" name="password" />
</form>
<!-- http://www.example.com?username=zhangsan&password=123456 -->
```

#### 1.5.3.2 Ajax中get请求

- 划重点:

```js
xhr.open('get', 'http://www.example.com?name=zhangsan&age=20');
```

- 栗子如下:

```html
<body>
    <p>
        姓名: <input type="text" id="name">
    </p>
    <p>
        年龄: <input type="text" id="age">
    </p>
    <p>
        <input type="button" value="提交" id="btn">
    </p>
    <script>
        var $name = document.getElementById('name');
        var $age = document.getElementById('age');
        var $btn = document.getElementById('btn');
        $btn.onclick = function(){
            var xhr = new XMLHttpRequest();
            var params = "name=" + $name.value + "&age=" + $age.value;
            xhr.open('get',"http://localhost:3000/get?" + params);
            xhr.send();
            xhr.onload = function(){
                console.log(xhr.responseText);
            }
        }
    </script>
</body>
```

- 服务器端的响应如下:

```js
app.get('/get', (req, res)=>{
    ressend(req.query);
})
```

#### 1.5.3.3 Ajax中的post请求

- 划重点:

```javascript
xhr.open('post','http://localhost:3000/post');
// 一定要设置请求头部
xhr.setRequestHeader('Content-Type', 'application/x-www.form-urlencoded');
xhr.send('name=zhangsan&age=20')
```

- 请求报文: 在HTTP请求和响应的过程中传递的数据块就叫报文,包括要传送的数据和一些附加信息,这些数据和信息要遵守规定好的格式

- 一个小栗子:

客户端:

```html
<body>
  <p>姓名: <input type="text" id="name" /></p>
  <p>年龄: <input type="text" id="age" /></p>
  <p>
    <input type="button" value="提交" id="btn" />
  </p>
  <script>
    var $name = document.getElementById('name')
    var $age = document.getElementById('age')
    var $btn = document.getElementById('btn')
    $btn.onclick = function() {
      var xhr = new XMLHttpRequest()
      var params = 'name=' + $name.value + '&age=' + $age.value
      xhr.open('post', 'http://localhost:3000/post')
      // 设置请求参数格式的类型(post请求必须设置)
      xhr.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
      xhr.send(params)
      xhr.onload = function() {
        console.log(xhr.responseText)
      }
    }
  </script>
</body>
```

服务端:

```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())
app.post('/post', (req,res)=>{
    res.send(req.body);
})
```

### 1.5.4 请求参数的格式

#### 1.5.4.1 application/x-www-form-urlencoded

```js
name=zhangsan&age=20&sex=男
```

#### 1.5.4.2 application/json

```js
{name: 'zhangsan', age: '20', sex: '男'}
```

在请求头中指定Content-Type属性的值是application/json,告诉服务器端当前请求参数的格式是json

- 栗子

<font color=red>通过请求头部,让服务器端知道客户端的请求格式是什么</font>:

客户端:

```js
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://localhost:3000/json');

// 传递json格式
xhr.setRequestHeader('Content-Type','application/json');
xhr.send(JSON.stringify({name: "zhangsan", age: 50}))

xhr.onload = function () {
    console.log(xhr.responseText);
}
```

服务端:

```js
// 接收json格式的数据需要使用bodyParser.json()
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.post('/json', (req, res)=>{
    res.send(req.body);
})
```

4. 小结: 传递JSON数据格式的注意点
   - 请求方式为post
   - 必须设置请求头部: `xhr.setRequestHeader('Content-Type': 'application/json')`
   - 传递的参数必须为J字符串: `JSON.stringify(obj)`

<font color=red>注意:get请求是不能提交json对象数据格式的,传统网站的表单也是不支持json对象数据格式的</font>

### 1.5.5 获取服务器端的响应

- Ajax状态码: 在创建ajax对象,配置ajax对象,发送请求,以及接收完服务器端响应数据,这个过程中的每一个步骤都会对应一个值,这个数值就是ajax状态码
- 通过状态码可以知道ajax过程到达了哪一个步骤:
  - `0 - 请求未初始化`: 创建 xhr 对象, 未使用xhr.open 方法
  - `1 - 请求已经建立`:  使用xhr.open方法, 未使用 xhr.send 方法
  - `2 - 请求发出`:  调用了xhr.send方法,但是请求还未得到回复
  - `3 - 请求正在处理`: 响应中已经有部分数据可以用了 
  - `4 -响应已经完成`: 可以获取并使用服务器中的相应

- 获取ajax状态码:

```js
xhr.readyState
```

- ajax状态码发生变化时的事件

```js
xhr.onreadystatechange
```

- 使用状态码接收数据的栗子:

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/readystate');
xhr.onreadystatechange = function (){
    if(xhr.readyState == 4){
        console.log(req.responseText)
    }
}
xhr.send();
```

- onload事件和  onreadystatechange事件的对比

| 区别描述               | onload事件 | onreadystatechange事件 |
| ---------------------- | ---------- | ---------------------- |
| 是否兼容IE低版本       | 不兼容     | 兼容                   |
| 是否需要判读Ajax状态码 | 否         | 是                     |
| 是否被调用多次         | 一次       | 多次                   |

### 1.5.6 Ajax错误处理

1. 网络畅通,服务器端能接收到请求,服务器端返回的结果不是预期结果

```js
// 根据状态码进行处理
xhr.onload = function (){
    if(xhr.status == 400) {
        console.log('请求出错')
    }
}
```

2. 网络畅通,服务器端没有收到请求, 返回404状态码
3. 网络畅通,服务器端能收到请求,服务器端返回500状态码

4. 网络中断,请求无法发送到服务器端

```js
xhr.onerror = function () {
    alert('网络中断, 无法发送ajax请求')
}
```

### 1.5.7 低版本IE浏览器的缓存问题

<font color=red>问题:</font>在低版本的IE浏览器中,Ajax请求有严重的缓存问题,即在请求地址不发生变化的情况下,只有第一次请求会真正发送到服务器,后续的请求都会从浏览器的缓存中获取结果。即使服务器端的数据更新了,客户端依然拿到的是缓存中的就数据.

<font color=red>解决方案:</font>在请求地址的后面加请求参数,保证每一次请求中的请求参数的值不同

- 核心代码

```js
xhr.open('get','http://www.example.com?t=' + Math.random());
```

- 整体代码

```js
var xhr = new XMLHttpRequest();
xhr.open('get','http://localhost:3000/cache?t=' + Math.random())
// 低版本ie没有onload事件
xhr.onreadystatechange = function() {
    if(xhr.status == 200 && xhr.readyState == 4){
        alert(xhr.responseText)
    }
}
xhr.send()

```

## 1.6 Ajax异步编程

### 1.6.1 同步、异步概述

- 同步: 一个人同一时间只能做一件事,只有一件事情做完,才能做另一件事
- 异步: 一个人一件事情做了一半,转而去做其他事情,当其他事情做完以后，再回头来继续做之前未完成的事情

```js
console.log('before');
setTimeout(
    () => {console.log('last')}, 2000
)
console.log('after');
```

### 1.6.2 Ajax封装

- 问题: 发送一次请求代码过多,发送多次请求代码冗余且重复
- 解决方案: 将请求代码封装到函数中,发请求时调用函数即可

```js
ajax({
    type: 'get',
    url: 'http://www.example.com',
    sucess: function (data) {
        console.log(data)
    }
})
```

#### 1.6.4.1 判断请求 类型/参数 的格式

思路:

1.请求类型(post、get)分类

2.请求参数的格式:`application/x-www-form-urlencoded`和`application/json`

实现如下:

```js
function ajax(options) {
  //创建ajax对象
  var xhr = new XMLHttpRequest()
  var params = []
  if (options.data) {
    for (var attr in options.data) {
      params.push(attr + '=' + options.data[attr])
    }
  }
  params = params.join('&')
  if (options.type == 'get') {
    options.url = options.url + '?' + params
  }
  xhr.open(options.type, options.url)

  if(options.type == 'post') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  } else {
    xhr.send()
  }

  xhr.onload = function() {
    options.success(xhr.responseText)
  }
}
```

#### 1.6.4.2 判断请求 成功/失败

- 根据状态码将请求 成功/失败分离

```js
xhr.onload = function() {
    if(xhr.status == 200) {
	    // 请求成功
        options.success(xhr.responseText , xhr)
    } else {
        // 请求失败
        options.error(xhr.responseText, xhr)
    }
}
```

- 此时调用ajax函数 & 参数如下:

```js
ajax({
  type: 'get',
  url: 'http://localhost:3000/first',
  data: {
    name: 'zhangsan',
    age: 20
  },
  header: {
    'Content-Type': 'application/json'
  },
  success: function(data) {
    console.log('这里是success', data)
  },
  error: function(data, xhr) {
    console.log('这里是error函数' + data)
    console.log(xhr)
  }
})
```

#### 1.6.4.3 封装服务器返回的数据

- `getResponseHeader`属性可以获取服务器返回的数据类型.
- 如果返回的是JSON类型的数据,将其返回的参数

```js
xhr.onload = function () {
    var contentType = xhr.getResponseHeader('Content-Type');
    var responseData = xhr.responseText
    if(contentType.includes('application/json')){
        responseData = JSON.parse(responseData)
    }
    if(xhr.status == 200){
        options.success(xhr.responseText, xhr)
    }else {
        options.error(xhr.responseText, xhr)
    }
}
```

## 1.7 模板引擎

作用: 使用模板引擎提供的模板语法,可以将数据和HTML拼接起来

[官方地址](https://aui.github.io/art-template/zh-cn/index.html)

