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

### 1.7.1 使用步骤

1. 下载art-template模板引擎库文件,并在HTML页面中引入库文件

```html
<script src="./js/template-web.js"></script>
```

2. 准备art-template模板

- `type="text/html"`: 是为了在编辑器中有高亮显示

```html
<script id="tpl" type="text/html">
	<div class="box"></div>
</script>
```

3. 告诉模板引擎将哪一个模板和哪个数据进行拼接

```js
var html = template('tql', {username: 'zhangsan', age: '20'})
```

4. 将拼接好的html字符串添加到页面中

```js
document.getElementById('container').innerHTML = html;
```

5. 通过模板语法告诉模板引擎,数据和html字符串要如何拼接

```html
<script id="tpl" type="text/html">
	<div class="box">{{ username }} </div>
</script>
```

# 2. 案例

## 2.1 验证邮箱地址的唯一性

1.获取文本框,并为其添加离开焦点事件

```js
var $input = document.getElementById('email');
$input.onblur = function () {}
```

2.离开焦点时,检测用户输入的邮箱地址是否符合规则

- 需要获取文本框的内容.由于是onblur事件触发,因此信息在`this`上
- 需要一个邮箱验证规则: `/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/`
- 使用正在表达式验证: `reg.test`

3.如果不符合规则,则程序向下执行并给出提示信息

- 改变dom的样式:`info.className="btn-danger"`

4.向服务器端发出请求,检测邮箱地址是否被别人注册

5.根据服务器端返回值绝对客户端显示何种提示信息

总体代码:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>验证邮箱地址是否已经注册</title>
    <link
      rel="stylesheet"
      href="/assets/bootstrap/dist/css/bootstrap.min.css"
    />
    <style type="text/css">
      p:not(:empty) {
        padding: 15px;
      }
      .container {
        padding-top: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-group">
        <label>邮箱地址</label>
        <input
          type="email"
          class="form-control"
          placeholder="请输入邮箱地址"
          id="email"
        />
      </div>
      <!-- 错误 bg-danger 正确 bg-success -->
      <p id="info"></p>
    </div>
    <script src="/js/ajax.js"></script>
    <script>
      var emailInp = document.getElementById('email')
      var info = document.getElementById('info')

      emailInp.onblur = function() {
        // 获取邮箱的地址
        var email = this.value
        var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        // 用户输入的规则不符合规则,阻止程序向下执行
        if (!reg.test(email)) {
          info.innerHTML = '请输入符合规则的邮箱地址'
          info.className = 'bg-danger'
          return
        }
        // 向服务器端发送请求
        ajax({
          type: 'get',
          url: 'http://localhost:3000/verifyEmailAdress',
          data: {
            email: email
          },
          success: function(result) {
            info.innerHTML = result.message
            info.className = 'bg-success'
          },
          error: function(result) {
            info.innerHTML = result.message
            info.className = 'bg-danger'
          }
        })
      }
    </script>
  </body>
</html>
```

## 2.2 搜索框内容自动提示

1.获取搜索框并为其添加用户输入事件

```js
var $input = document.getElementById('search');
$input.oninput = function () {}
```

2.获取用户输入的关键字

```js
$input.oninput = function () {
    console.log(this.value)
}
```

3.向服务器端发送请求并携带关键字作为请求参数

4.将响应数据显示在搜索框底部

```html
<script>
  var searchInp = document.getElementById('search')
  var listBox = document.getElementById('list-box')

  searchInp.oninput = function() {
    var key = this.value
    ajax({
      type: 'get',
      url: 'http://localhost:3000/searchAutoPrompt',
      data: {
        key: key
      },
      success: function(result) {
        // 使用模板引擎拼接字符串,将拼接好的字符串
        var html = template('tpl', { result: result })
        listBox.innerHTML = html
        // 显示ul容器
        listBox.style.display = 'block'
      }
    })
  }
</script>
```

- 去掉重复的请求

使用定时器延迟发送

```html
<script>
    var searchInp = document.getElementById('search');
    var listBox = document.getElementById('list-box');
    var timer = null;
    serachInp.oninput = function(){
        clearTimeout(timer);
        // 获取输入的值
        var key = this.input;
        // 延迟发送ajax请求
        timer = setTimeout(function(){
            ajax({
                type: 'get',
                url: 'http://localhost:3000/searchAutoPrompt',
                data:{
                    key: key
                },
                success: function(result) {
                    var html = template('tpl', { result: result });
                    listBox.innerHTML = html;
                    listBox.style.display = 'block'
                }
            })
        },800)
    }
</script>
```

- 如果输入框的值为空,将提示框隐藏.并阻止程序向下执行

```html
<script>
    searchInp.oninput = function(){
        var ket = this.input;
        if(key.trim().length == 0){
            listBox.style.display = 'none';
            return;
        }
    }
</script>
```

总体代码:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>案例 - 搜索框内容自动提示</title>
    <link
      rel="stylesheet"
      href="/assets/bootstrap/dist/css/bootstrap.min.css"
    />
    <style type="text/css">
      .container {
        padding-top: 150px;
      }
      .list-group {
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="请输入搜索关键字"
          id="search"
        />
        <ul class="list-group" id="list-box">
          <li class="list-group-item">提示文字显示的地方</li>
        </ul>
      </div>
    </div>
    <script src="/js/ajax.js"></script>
    <script src="/js/template-web.js"></script>
    <script type="text/html" id="tpl">
      {{each result}}
         <li class="list-group-item">{{$value}}</li>
      {{/each}}
    </script>
    <script>
      var searchInp = document.getElementById('search')
      var listBox = document.getElementById('list-box')
      var timer = null
      searchInp.oninput = function() {
        // 清除上一次开启的定时器
        clearTimeout(timer);

        var key = this.value

        // 如果用户没有在搜索框中输入内容
        if(key.trim().length == 0){
          listBox.style.display = 'none';
          return;
        }

        timer = setTimeout(function() {
          ajax({
            type: 'get',
            url: 'http://localhost:3000/searchAutoPrompt',
            data: {
              key: key
            },
            success: function(result) {
              // 使用模板引擎拼接字符串,将拼接好的字符串
              var html = template('tpl', { result: result })
              listBox.innerHTML = html
              // 显示ul容器
              listBox.style.display = 'block'
            }
          })
        }, 800)
      }
    </script>
  </body>
</html>
```

## 2.3 省市区三级联动

1.通过接口获取省份信息

2.使用JavaScript获取到省市区下拉框元素

3.将服务器端返回的省份信息显示在下拉框中

```html
<select class="form-control" id="province">
</select>
<!-- 模板 -->
<script type="text/html" id="tpl">
	<option>请选择省份</option>
	{{each province}}
		<option value="{{$value.id}}">{{$value.name}}</option>
	{{/each}}
</script>
```

```html
<script>
    // 获取省份
    var province = document.getElementById('province')
    // 获取数据
    ajax({
        type: 'get',
        url: 'http://localhost:3000/province',
        success: function(data){
            // 将返回的数据渲染模板
            var html = template('tpl', {province: data});
            province.innerHTML = html;
        }
    })
</script>
```

4.为下拉框元素添加表单值改变事件(onchange)

5.当用户选择省份时,根据省份id获取城市信息

6.当用户选择城市时,根据城市id获取县城信息(略)

```html
<!-- 省份下拉框 -->
<select class="form-control" id="province">
```

```html
<script>
    var province = document.getElementById('province');
    province.onchange = function (){
        var pid = this.value;
        // 清空县城
        var html = template('areaTpl', {data: []});
        area.innerHTML = html;

        // 发送ajax请求,获取信息
        ajax({
            type: 'get',
            url: 'http://localhost:3000/areas',
            success: function(data){
                var html = template('cityTpl', {data: data});
                city.innerHTML = html;
            }
        })
    }
</script>
```



### 2.3.1 获取省份信息的接口文档

#### 获取省份信息

- 请求地址
  - /province
- 请求方式
  - GET
- 返回值

```js
[{
    id: '001',
    name: '黑龙江省'
},{
    id: '002',
    name: '四川省'
},{
    id: '003',
    name: '河北省'
},{
    id: '004',
    name: '江苏省'
}]
```

#### 根据省份id获取城市信息

- 请求地址
  - /cities
- 请求方式
  - GET
- 参数

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| id     | 是   | string | 省份id |

- 返回值

```js\
[{
	id: '100',
	name: '哈尔滨市'
},{
	id: '101',
	name: '齐齐哈尔市'
},{
	id: '102',
	name: '牡丹江市'
},{
	id: '103',
	name: '佳木斯市'
}]
```

#### 根据城市id获取县城信息

- 请求地址
  - /areas
- 请求方式
  - GET
- 参数

| 参数名 | 必选 | 类型   | 说明   |
| ------ | ---- | ------ | ------ |
| id     | 是   | string | 城市id |

- 返回值

```js
[{
    id: '20',
    name: '道里区'
},{
    id: '21',
    name: '平房区'
},{
    id: '23',
    name: '松北区'
}]
```

## 2.4 腾讯天气

- 请求地址:
  - http://wis.qq.com/weather/common
- 请求方式
  - get支持jsonp
- 参数

| 参数名       | 必选 | 类型   | 说明                                            |
| ------------ | ---- | ------ | ----------------------------------------------- |
| source       | 是   | string | pc、xw                                          |
| weather_type | 是   | string | forecast_1h 未来48小时<br/>forecast_24h 未来7天 |
| province     | 是   | string | 省份                                            |
| city         | 是   | string | 城市                                            |

- 返回值

```js
{
    "data":{
        // 逐时天气(48小时)
        "forecast_1h": {
            '0': {
                "degree": "7",	// 温度
           		"update_time": "20190304130000",	//时间
                "weather": "晴",		// 天气名称
                "weather_code": "00",		// 天气码
                "weather_short": "晴",	// 天气简要名称
                "wind_direction": "南风",	// 风向
                "wind_power": "3" // 风力级别
            }
        }
    },
    "message": "OK",
    "status": 200
}
```







# 3. FormData

## 3.1 FormData对象的作用

1.模拟HTML表单,相当于将HTML表单映射成表单对象,自动将表单对象中的数据拼接成请求参数的格式

2.异步上传二进制文件

+ 准备HTML表单

```html
<form id="form">
    <input type="text" name="username" />
    <input type="password" name="password" />
    <input type="button" />
</form>
```

- 将HTML表单转化为 formData 对象

```js
var form = document.getElementById('form');
// FormData构造函数,会自动将表单元素转换成表单对象.
var formData = new FormData(form);
```

- 提交表单对象

```js
// 注: formData对象不能用于get请求
xhr.send(formData);
```

- 服务端使用`formidable`接收参数

```js
const formidable = require('formidable');
app.post('/formData', (req, res)=>{
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, fils) => {
        res.send(fields)
    })
})
```

## 3.2 FormData 对象的实例方法

1.获取表单对象中属性的值

```js
formData.get('key')
```

2.设置表单对象中属性的值

```js
formData.set('key', 'value')
```

3.删除表单中属性的值

```js
formData.delete('key')
```

4.向表单对象中追加属性值

```js
formData.append('key','value')
```

注意: set方法与append方法的区别是,在属性名已存在的情况下,set 会副高已有键名,append会保留两个值

## 3.3 FormData 二进制文件上传

```html
<input type="file" id="file">
```

```js
var file = document.getElementById('file');
// 当用户选择文件的时候
file.onchange = function() {
    // 创建空表单对象
    var formData = new FormData();
    // 将用户选择的二进制文件追加到表单对象中
    formData.append('attrName', this.files[0]);
    // 配置ajax对象,请求方式必须为post
    xhr.open('post', 'www.example.com');
    xhr.send(formData);
}
```

### 3.3.1 [栗子]前端

```html
<div class="container">
  <div class="form-group">
    <label>请选择文件</label>
    <input type="file" id="file" />
  </div>
</div>
<script type="text/javascript">
  var file = document.getElementById('file')
  // 为文件选择控件添加onchanges事件
  // 在用户选择文件时触发
  file.onchange = function() {
    // 创建空的表单对象
    var formData = new FormData()
    formData.append('attrName', this.files[0])
    var xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:3000/upload')
    // 发送ajax请求
    xhr.send(formData)
    xhr.onload = function() {
      // 请求成功
      if (xhr.status == 200) {
        // 将服务器端返回的数据显示在控制台中
        console.log(xhr.responseText)
      }
    }
  }
</script>
```

### 3.3.2 [栗子]后端

```js
const path = require('path');
const fomidable = require('formidable');
app.post('/uploads',(req, res)=>{
    // 创建接收二进制文件的实例
    const form = new formidable.IncomingForm();
    // 设置二进制文件的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    // 设置上传的文件保留后缀名
    form.keepExtensions = true;
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        res.send('OK')
    })
})
```

## 3.4 FormData文件上传进度展示

```js
// 当用户选择文件的时候
file.onchange = function() {
    // 文件上传过程中持续触发onprogress事件
    xhr.upload.onprogress = function (ev) {
        // 当前文件上传 大小/文件总大小 再将结果转换为百分数
        // 将结果赋值给进度条的宽度属性
        bar.style.width = (ev.loaded / ev.total) * 100 +'%';
    }
}
```

- 进度展示的思想:

1.在input框下面有一个显示进度条的元素

2.点击文件上传后,会触发`file.onchange`事件

3.在文件传到服务器(`FormData`)的过程中会持续触发`xhr.upload.onprogress`事件.

4.在`onprogress`事件中,会有一个`ev`对象,它保留着,文件上传的信息

5.利用文件上传的信息,算出上传的进度,显示在网页中

- [栗子] - 上传的表单控件

```html
<div class="container">
  <div class="form-group">
    <label>请选择文件</label>
    <input type="file" id="file" />
    <br />
    <div class="progress">
      <div class="progress-bar" style="width: 0%;" id="bar">0%</div>
    </div>
  </div>
</div>
```

- [栗子] - 上传的代码(前端)

```html
<script>
    var file = document.getElementById('file');
    var bar = document.getElementById('bar');
    file.onchange = function () {
        // 文件上传使用到 FormData构造函数
        var formData = new FormData();
        // 'attrName'方便后面使用.
        formData.append('attrName', this.files[0]);
        // 上传的信息准备好了,接下来准备Ajax请求
		var xhr = new XMLHttpRequest();
        xhr.open('post','http://localhost:3000/uploads');
        // 文件上传的过程中,会持续触发onprogress事件
        xhr.upload.onprogress = function(ev){
            var result = (ev.loaded / ev.total) * 100 + '%';
            // 算出上传的百分比,并将值放在bar中
            bar.style.width = result;
            bar.innerHTML = result;
        }
        xhr.send(formData);
        xhr.onload = function () {
            if(xhr.status == 200 ){
                console.log(xhr.responseText)
            }
        }
    }
</script>
```

- [栗子] - 上传的代码(服务端)

```js
// 服务端使用formidable解析参数
const formidable = require('formidable');
const path = require('path')
app.post('/uploads', (req, res)=>{
    // 创建接收的实例
    const form = new formidable.IncomingForm();
    // 设置文件的存储位置
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    // 保留后缀名
    form.keepExtensions = true;
    // 解析客户端的数据
    form.parse(req, (err, fields ,files) =>{
        res.send({ path: files.attrName.path.split('public')[1] })
    })
})
```

## 3.5 FormData文件上传图片即使预览

在我们将图片上传到服务器端以后,服务器端通常都会将图片地址作为响应数据传递到客户端,客户端可以从响应数据中获取图片地址,然后将图片再显示到页面中

- [栗子] - 后端代码见 3.4
- [栗子] - 前端dom元素如下

```html
<div class="container">
    <div class="form-group">
        <label>请选择</label>
        <input type="file" id="file" />
        <!-- 用来显示上传的图片 -->
        <div class="padding" id="box">
        </div>
    </div>
</div>
```

- [栗子] - 前端上传文件的代码如下

```html
<script>
    var file = document.getElementById('file');
    var box = document.getElementById('box');
    file.onchange = function () {
        var formData = new FormData();
        formData.append('attrName', this.files[0]);
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:3000/uploads')
        xhr.send(formData);
        xhr.onload = function() {
            if(xhr.status == 200) {
                var result = JSON.parse(xhr.responseText);
                var img = document.createElement('img');
                img.src = result.path;
                img.onload = function() {
                    box.appendChild(img)
                }
            }
        }
	}
</script>
```



# 4. 同源策略

## 4.1 Ajax请求限制

Ajax只能向自己的服务器发送请求.

## 4.2 什么同源

如果两个页面拥有相同的协议、域名和端口,那么着两个页面就属于同一个源,否则就是不同源

## 4.3 同源政策的目的

同源政策是为了保护用户信息的安全,放置恶意的网站窃取数据。最初的同源政策是指A网站再客户端设置的Cookie,B网站是不能访问的.

随着互联网的发展,同源政策也越来越严格,在不同源的情况下,其中有一项规定就是无法向非同源地址发送Ajax请求,如果请求,浏览器就会报错

## 4.4 使用JSONP解决同源限制问题

jsonp是json with padding(将JSON数据作为填充内容)的缩写,它不属于Ajax请求,但它可以模拟Ajax请求。

1.将不同源的服务端请求地址写在script标签的src属性中

```html
<script src="www.example.com"></script>
```

2.服务器响应数据必须是一个函数的调用,真正要发给客户端的数据需要作为函数调用的参数

```js
const data = `fn({name: "张三", age: "20"})`;
res.send(data);
```

3.在客户端全局作用域下定义函数fn

```js
function fn(data) {}
```

4.在fn函数内部对服务器端返回的输就进行处理

```js
function fn(data) {console.log(data)};
```

- [栗子] - JSONP的实现

1.在S2服务器中添加如下代码:

```js
app.get('/jsonp',(req,res)=>{
    const data = `fn({name:'Marron', age:18, remarks:'JSONP测试'})`;
    res.send(data)
})
```

2.先定义一个全局函数,在使用script标签加载S2服务器的资源

```html
<script>
    // 假设服务器返回的数据存储在data中
    function fn(data) {
        console.log(data);
	}
</script>
<!-- 使用jsonp加载资源 -->
<script src="http://localhost:3001/jsonp"></script>
```

<font color=red>核心</font>:利用了script标签可以向非同源端的服务器发送请求的特性,加载完毕后,相当于把服务器返回的内容当作JavaScript代码执行

## 4.5 JSON 代码优化

1.客户端将函数名称传递到服务器端

```html
<script src="http://localhost:3001/jsonp?cb=fn"></script>
```

2.将script请求的发送变成动态请求

```html
<script>
    var srcipt = document.creatElement('script');
    script.src="http://localhost:3001/jsonp?cb=fn"
    document.body.appendChild(script);
</script>
```

3.发送请求后,删除掉script标签

```html
<script>
    var srcript = document.createElement('script');
    script.src="http://localhost:3001/jsonp?cb=fn";
    document.body.appendChild(script);
    script.onload = function (){
        document.body.removeChild(script)
    }
</script>
```

4.封装jsonp

```js
function jsonp(url) {
  var script = document.createElement('script')
  script.src = url
  document.body.appendChild(script)
  script.onload = function() {
    document.body.removeChild(script)
  }
}
```

### 4.5.1 将回调函数封装进的JSONP

由于上面封装的JSONP它调用的函数和JSONP函数是分离的,破坏了JSONP的封装性,下面尝试将JSONP的回调函数封装如JSONP中,请求参数如下:

```js
jsonp({
    url: 'http://localhost:3001/better?cb=fn',
    success: function(){}
})
```

产生了如下2个问题:

- 回调函数不再是一个全局变量,即当使用script标签加载完毕只会,找不到回调函数
- success是一个匿名函数,传递到后端是没有名称(如 fn)传递

```js
// 将回调函数挂在到全局对象上
function jsonp(options) {
    var script = document.createElement('script');
    window.fn = options.success;
    script.src = options.url + '?cb=fn';
    document.body.appendChild(script)
    script.onload = function(){
        document.body.removeChild(script);
        window.fn = null;
    }
}
```

以上代码,当服务器端的返回的数据很慢时,如果连续发送多个不同的JSONP请求时,会导致多个请求的回调函数是同一个.

解决办法是,每次调用回调函数时,名字不能相同(即随机产生一个名字)

```js
// 每次随机产生一个名字
function jsonp(options) {
  var script = document.createElement('script')
  var fn = 'fn'+ Math.random().toString().replace('.','')
  window[fn] = options.success
  script.src = options.url + '?cb=' + fn
  document.body.appendChild(script)
  script.onload = function() {
    document.body.removeChild(script)
    // 用完后释放内存
    delete window[fn]
  }
}
```

### 4.5.2 将get请求参数封装进jsonp

```js
function jsonp(options) {
  var script = document.createElement('script')
  var fn =
    'fn' +
    Math.random()
      .toString()
      .replace('.', '')
  window[fn] = options.success
  var params = []
  params.push('cb=' + fn)
  for (let attr in options.data) {
    params.push(attr + '=' + options.data[attr])
  }
  params = params.join('&')
  script.src = options.url + '?' + params
  document.body.appendChild(script)
  script.onload = function() {
    document.body.removeChild(script)
    delete window[fn]
  }
}
```

## 4.6 CORS跨域资源共享

CORS: 全称为 Cross-origin resource sharing,即跨域资源共享,它允许浏览器向跨域服务器发送Ajax请求,克服了Ajax只能同源使用的限制

1.客户端向服务端发送请求时,会带一个origin的请求头部

```js
origin: http://localhost:3000
```

2.服务端会返回一个Access-Control-Access-Origin的响应头部

```js
Access-Control-Access-Origin: '*'
```

### 4.6.1 响应头部设置

- 允许所有客户端(域名)访问

```js
res.header('Access-Control-Allow-Origin', '*');
```

- 设置允许访问的方法

```js
res.header('Access-Control-Allow-Methods', 'get,post')
```

### 4.6.2 封装CORS

使用中间件,将允许访问的头部设置放在所有路由前

```js
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Orgin': '*');
    res.setHeader('Access-Control-Allow-Method': 'get,post');
    next();
})
```

## 4.7 访问非同源数据,服务器端解决方案

- 同源政策是浏览器给予Ajax技术的限制,服务器端是不存在同源政策限制.

- 可以使用自己客户端的服务器,去访问要访问数据的服务器去获取数据,然后再将数据传给前端.

### 4.7.1 使用Ajax技术,获取自己网站的服务器

思路:

- 点击按钮.发送Ajax请求,获取同源服务端的数据

```html
<body>
    <button id="btn">点我发送请求</button>
    <script>
        var btn = document.getElementById('btn')
       	btn.onclick = function () {
            var xhr = new XMLHttpRequest();
            xhr.open('get','http://localhost:3000/server')
            xher.send();
            xhr.onload = function(){
                if(xhr.status == 200) {
                    console.log(xhr.responseText)
                }
            }
        }
    </script>
</body>
```

### 4.7.2 后端访问另一个端口的后端

- 使用第三方模块`request`: `npm i request`
- 基本使用如下

```js
const request = require('request');
request('http://www.google.com', function(error, response, body){
	console.log('error', error);
    console.log('statusCode', response && response.statusCode);
    console.log('body', body)
})
```



## 4.8 cookie复习

1.客户端可以对服务器端发出请求

2.服务器端可以对客户端做出响应

3.客户端和服务器端进行沟通的时候,需要遵循HTTP协议中的规则

4.在HTTP协议当中: 客户端和服务器的沟通是(无状态的)

5.所谓无状态: 服务端不关心客户端是什么,只关心请求的路由,一旦监听到对应的路由,就调用对应的路由处理函数,一旦处理结束,这次沟通也就结束

<font color=red>cookie:</font>用来实现 客户端/服务端 身份识别的一种技术.

## 4.9 withCredentials属性

- 在使用Ajax技术发送跨域请求时,默认情况下不会再请求中携带cookie信息

- withCredentials: 指定在涉及跨域请求时,是否携带cookie信息,默认值为false

```js
xhr.withCredentials = true;
```

- 在服务器端,还必须设置允许客户端发送请求时携带cookie: `Access-Control-Allow-Credentials: true`

```js
res.header('Access-Control-Allow-Credentials',true);
```



