# 1. 项目环境搭建

## 1.1 项目介绍

多人博客管理系统

1. 博客内容展示
2. 博客管理功能

## 1.2 案例初始化

### 1.2.1 建立项目所需文件夹

- `public`: 静态资源
- `model`: 数据库操作
- `route`: 路由操作
- `views`: 模板

### 1.2.2 初始化项目描述文件

`npm init -y`

### 1.2.3 下载项目所需第三方模块

`npm install express mongoose art-template express-art-template`

### 1.2.4 创建网站服务器

```js
const express = require('express')
const app = express()
app.listen(80, () => {
  console.log('[Server]The server is running at http://localhost')
})
```

### 1.2.5 构建模块化路由

- `route/home.js`

```js
const express = require('express')
const home = express.Router()
home.get('/', (req, res) => {
  res.send('home router')
})
module.exports = home
```

- `route/admin.js`

```js
const express = require('express')
const admin = express.Router()
admin.get('/', (req, res) => {
  res.send('admin router')
})
module.exports = admin
```

- `app.js`

```js
const home = require('./route/home')
const admin = require('./route/admin')
app.use('/home', home)
app.use('/admin', admin)
```

### 1.2.6 构建博客管理页面模板

- html 页面中的相对路径

```html
<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css.min.css" />
<link rel="stylesheet" href="css/bas.css" />
```

```js
/*
以上的两个相对路径,不是相对于该文件的路径,而是相对于浏览器当前路由的请求路径.
如项目的网页,在浏览器中的路径为:  http://localhost/admin/login
浏览器会认为,最后一个不是路径,而是请求文件.
此时:href="lib/bootstrap/css/bootstrap.css.min.css",实际上请求的是 "http://localhost/admin/lib/bootstrap/css/bootstrap.css.min.css"
此时:href="css/bas.css",实际上请求的是 "http://localhost/admin/css/bas.css"
此时:<script src="lib/jquery/dist/jquery.min.js"></script>,实际上请求的是 "http://localhost/admin/lib/jquery/dist/jquery.min.js"
此时:<script src="lib/bootstrap/js/bootstrap.min.js"></script>,实际上请求的是 "http://localhost/admin/lib/bootstrap/js/bootstrap.min.js"
*/
```

- 推荐使用绝对路径

```js
/*
在浏览器中 / 代表当前的根目录.
需要将资源改为如下:
- <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css.min.css">
+ <link rel="stylesheet" href="/admin/lib/bootstrap/css/bootstrap.css.min.css">
- <link rel="stylesheet" href="css/bas.css">
+ <link rel="stylesheet" href="/admin/css/bas.css">
*/
```

### 1.2.7 模板引擎的配置

- `/app.js`

```js
// 配置模板引擎
app.set('views', path.join(__dirname, 'views')) // 模板的路径
app.set('view engine', 'art') // 模板的默认后缀
app.engine('art', require('express-art-template')) // 使用什么模板引擎
```

## 1.3 使用模板引擎的模板

### 1.3.1 抽离公共部分

- 抽离头部放到`/views/admin/common/header.art`中

```html
<!-- 头部 -->
<div class="header">
  <!-- 网站标志 -->
  <div class="logo f1">栗子好好吃 <i>Marron</i></div>
</div>
```

- 抽离侧边栏到 `/views/admin/common/aside.art`中

```html
<!-- 侧边栏 -->
<div class="aside f1">
  <ul class="menu list-unstyled">
    <li>
      <a class="item active" href="user.html">
        <span class="glyphicon glyphicon-user"></span>
        用户管理
      </a>
    </li>
    <li>
      <a class="item" href="article.html">
        <span class="glyphicon glyphicon-th-list"></span>
        文章管理
      </a>
    </li>
  </ul>
  <div class="cprt">
    Powered by
    <a href="https://github.com/Lizhhhh" target="_blank">栗子好好吃</a>
  </div>
</div>
```

- 在`/views/admin/user.art`中引用头部和侧边栏

```html
<body>
  <!-- 头部 -->
  <!-- 子模板的相对路径相对的就是当前文件,因为它是由模板引擎解析的,而不是浏览器 -->
  {{include './common/header.art'}}
  <!-- 主体内容 -->
  <div class="content">
    <!-- 侧边栏 -->
    {{include './common/aside.art'}}
    <!-- 侧边栏 -->
    <div class="main"></div>
  </div>
</body>
```

### 1.3.2 抽离骨架

- 预留 `css样式导入`、`主体部分`和`底部scirpt引入`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog - Content Manager</title>
    <link rel="stylesheet" href="/admin/lib/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/admin/css/base.css" />
    {{block 'link'
    }}{{/block}}
  </head>
  <body>
    {{block 'main'}} {{/block}}
    <script src="/admin/lib/jquery/dist/jquery.min.js"></script>
    <script src="/admin/lib/bootstrap/js/bootstrap.min.js"></script>
    {{block 'srcipt'}} {{/block}}
  </body>
</html>
```

### 1.3.3 继承骨架

- `/views/admin/user.art`

```html
{{extend './common/layout.art'}} {{block 'main'}} {{include
'./common/header.art'}}
<!-- 主体内容 -->
<div class="content">
  <!-- 侧边栏 -->
  {{include './common/aside.art'}}
  <!-- 侧边栏 -->
  <div class="main"></div>
  <!-- 删除确认弹出框 -->
  <div class="modal fade confirm-modal"></div>
  {{/block}}
</div>
```

---

# 2. 项目功能实现

## 2.1 登录

### 2.1.1 创建用户集合,初始化用户

- 连接数据库:
  1. 数据库连接文件:`/model/connect.js`
  ```js
  const mongoose = require('mongoose')
  mongoose
    .connect('mongodb://localhost/blog', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))
  ```
  2. 在`/app.js`中引人连接数据库
  ```js
  require('./model/connect.js')
  ```
- 创建用户集合规则

```js
// 创建用户集合规则
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true // 保证邮箱地址在插入数据库时不重复
  },
  password: {
    type: String,
    required: true
  },
  role: {
    // admin: 超级管理员   normal: 普通用户
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0 // 0: 启用状态 1:禁用状态
  }
})
const User = mongoose.model('User', userSchema)
// 将用户成员作为模块成员导出
module.exports = {
  User
}
```

- 初始化用户

```js
User.create({
  username: 'Marron',
  email: '543288744@qq.com',
  password: '123456',
  role: 'admin',
  state: 0
})
  .then(() => {
    console.log('用户创建成功')
  })
  .catch(() => {
    console.log('用户创建失败')
  })
```

### 2.1.2 表单添加必要的参数

为登录表单设置请求地址、请求方式及表单项 name 属性

- 给 input 框添加 name 属性 && 给 form 表单添加提交地址和提交的方法

```html
<form action="/login" method="post" id="loginForm">
  <div class="form-group">
    <label>邮件</label>
    <input
      name="email"
      type="email"
      class="form-control"
      placeholder="请输入邮件地址"
    />
  </div>
  <div class="form-group">
    <label>密码</label>
    <input
      name="password"
      type="password"
      class="form-control"
      placeholder="请输入密码"
    />
  </div>
  <button type="submit" class="btn btn-primary">登录</button>
</form>
```

- 阻止表单提交的默认行为
- 使用 serializeArray()方法获取表单中用户输入的内容, 返回值是一个数组

```js
<script type="text/javascript">
  // 为表单添加提交事件
  $('#loginForm').on('submit',function(){
    // 获取到表单中用户输入的内容
    // [{name: 'email', value: '用户输入的内容'}]
    var f = $(this).serializeArray();
    console.log(f);

    // 阻止表单提交的行为
    return false
  })
</script>
```

- 将公共方法放入`/public/js/common.js`中
- jquery 提供的获取表单元素的 API`serializeArray`返回的是一个数组,不利用编程.自己写一个公共的方法放在`common.js`中

```js
// serializeArray获取用户输入的表单信息,将数组转换成对象形式
const serializeToJson = form => {
  // 获取到表单中用户输入的内容
  // [{name: 'email', value: '用户输入的内容'}]
  const arr = form.serializeArray()
  const o = {}
  arr.forEach(item => {
    o[item.name] = item.value
  })
  return o
}
```

### 2.1.3 前端(简单的)表单的验证

- 如果其中一项没有输入,阻止表单提交,并提示
```js
$('#loginForm').on('submit', function() {
  const result = serializaToJson($(this))

  // 没有输入账号 或者密码, 阻止表单提交
  if (result.email.trim().length == 0) {
    alert('请输入邮箱')
    return false
  }

  if (result.password.trim().length == 0) {
    alert('请输入密码')
    return false
  }
})
```

### 2.1.4 后端验证邮箱地址或密码是否为空
- 配置`body-parser`获取post请求的参数
```js
// 配置获取post参数
const bodyParser = require('body-parser')
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true  方法内部使用第三方模块qs处理请求参数的格式
// 拦截所有请求
app.use(bodyParser.urlencoded({ extended: false }))
```
- 在客户端判断,邮箱和密码是否为空,并给予提示
因为浏览器可以通过禁用javascript来跳过验证.
```js
admin.post('/login', (req, res) => {
  // 接收请求参数
  const { email, password } = req.body
  if (email.trim().length == 0 || password.trim().length == 0) {
    // 阻止向下执行,并返回错误提示信息
    return res.status(400).send(`<h4>邮箱或密码错误</h4`)
  }
})
```
### 2.1.5 设置错误模板
- 错误模板: `/admin/error.art`
```html
{{include './common/layout.art'}}
{{block 'main'}}
    {{msg}}
{{/block}}

{{block 'script'}}
<script type="text/javascript">
  setTimeout(()=>{
    location.href ="/admin/login"
  }, 3000)
</script>
{{/block}}
```
- 返回错误模板
```js
admin.post('/login',(req, res)=>{
  res.render('admin.error',{
    msg: "邮箱地址或者密码错误"
  })
})
```

### 2.1.6 从数据库获取用户信息并验证
- 从`/model/user.js`中得到User规则,并根据邮箱获取用户信息
- `/route/admin.js`
```js
const { User } = require('../model/user.js');

admin.post('/login', async(req, res)=>{
  const {email, password} = req.body;
  let user = await User.findOne({email});
  if(user ==null ||user.password !== password){
    res.status(400).render('/admin/error',{
      msg: "邮箱地址或者密码错误"
    })
  }
})
```






# 3. 项目包含的知识点

## 3.1 密码加密 bcrypt
哈希加密是单程加密方式: 1234 => abcd
在加密的密码中加入随机字符串可以增加密码被破解的难度.

### 3.1.1 bcrypt基本语法
```js
// 导入bcrypt
const bcrypt = require('bcrypt');
// 生成随机字符串 gen => generate 生成 salt 盐
let salt = await bcrpt.genSalt(10);
// 使用随机字符串对密码进行加密
let pass = await bcrpt.hash('明文密码', salt);
```

### 3.1.2 bcrypt的环境依赖
1. `python 2.x`
2. `node-gyp`: `npm install -g node-gyp`
3. `window-build-tools`: `npm install --global --production windows-build-tools`(下载了10min)
4. `bcrypt`: `npm install bcryptjs`
5. 使用
```js
// 导入bcrypt
const bcrypt = require('bcryptjs')
// 生成随机字符串
// 接受一个数值作为参数
// 默认值是10,指越大复杂度越高
async function run() {
  const salt = await bcrypt.genSalt(10)
  // 对密码进行加密
  // 参数1: 要进行加密的明问
  // 参数2: 随机字符串
  // 返回值: 加密之后的密码
  const result = await bcrypt.hash('123456', salt)
  console.log(salt)
  console.log(result)
}
run()
```
- 密码的比对
```js
let isEqual = await bcrypt.compare('明文密码','加密密码');
```

## 3.2 cookie和session

### 3.2.1 cookie和session的基本概念
- 由于HTTP协议的无状态性,当一次连接断开后. 服务器并不会记录用户是否登录. 因此需要引入 cookie/session 机制
`cookie`: 浏览器在电脑硬盘中开辟的一块空间,主要供服务器端存储数据
- cookie中的数据是以域名的形式进行区分的.
- cookie中的数据是有过期时间的,超过时间数据会被浏览器自动删除.
- cookie中的数据会随着请求被自动发送到服务器

1.客户端第一次向服务器端发送请求的时候,是不存在cookie的.
2.服务端验证客户端,会响应一个cookie给客户端.
3.客户端验证通过后,在发送请求会自动带上cookie

`session`:实际上就是一个对象,存储在服务器端的内存中,在session对象中也可以存储多条数据,每一条数据都有一个sessionid做为唯一标识.


<font color=red>注意:cookie在客户端的磁盘中,session在服务端的内存中</font>

### 3.2.2 cookie和session的使用
1. [client] --> 邮件地址、密码 --> [server]
2. server端,对邮箱地址、密码进行验证,若通过则生成 sessionid
3. [client] <--  sessionid(存储在客户端的cookie中) <-- [server]
4. 客户端再次登录
5. [client] --> cookie [server]
6. 服务端,获取cookie中的 sessionid,验明身份后,响应数据

### 3.2.3 实战: cookie 与 session
```js
const session = requier('express-session');
app.use(session({secret: 'secret key'}));
admin.post('/login',async(req, res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});
  // 假设登录成功
  req.session.username = user.username;   // 此处能用req.session是在app.js中使用app.use方法进行了拦截
})
```

### 3.2.3 登录成功后重定向到用户列表页
- 重定向到用户列表页
```js
admin.post('/login',async(req, res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});
  // 假设登录成功
  // 重定向到用户列表页
  req.redirect('/admin/user')
})
```

### 3.2.4 未登录时的登录拦截
- 1.当访问的路由为 '/admin'时,先判断用户是否登录(req.session.username)
- 2.若为登陆,重定向到 '/admin/login'
- 3.判断用户是否是申请访问`admin/login`
- 使用express提供的中间件进行拦截.
```js
  if (req.url !== '/login') {
    // 访问的不是登录页面
    // 判断用户是否登录
    if (req.session.username) {
      next()
    } else {
      res.redirect('/admin/login')
    }
  } else {
    // 访问的是登录页面
    next()
  }
})
```