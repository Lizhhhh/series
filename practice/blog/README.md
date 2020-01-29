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

- 配置`body-parser`获取 post 请求的参数

```js
// 配置获取post参数
const bodyParser = require('body-parser')
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true  方法内部使用第三方模块qs处理请求参数的格式
// 拦截所有请求
app.use(bodyParser.urlencoded({ extended: false }))
```

- 在客户端判断,邮箱和密码是否为空,并给予提示
  因为浏览器可以通过禁用 javascript 来跳过验证.

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
{{include './common/layout.art'}} {{block 'main'}} {{msg}} {{/block}} {{block
'script'}}
<script type="text/javascript">
  setTimeout(() => {
    location.href = '/admin/login'
  }, 3000)
</script>
{{/block}}
```

- 返回错误模板

```js
admin.post('/login', (req, res) => {
  res.render('admin.error', {
    msg: '邮箱地址或者密码错误'
  })
})
```

### 2.1.6 从数据库获取用户信息并验证

- 从`/model/user.js`中得到 User 规则,并根据邮箱获取用户信息
- `/route/admin.js`

```js
const { User } = require('../model/user.js')

admin.post('/login', async (req, res) => {
  const { email, password } = req.body
  let user = await User.findOne({ email })
  if (user == null || user.password !== password) {
    res.status(400).render('/admin/error', {
      msg: '邮箱地址或者密码错误'
    })
  }
})
```

## 2.2 新增用户

### 2.2.1 在用户列表页面上为新增用户添加链接

```html
<a href="/admin/user-edit" class="btn btn-primary new">新增用户</a>
```

### 2.2.2 实现添加用户的路由

- 在准备好了添加用户的页面之后
- 下面监听路由,并获取数据: `/route/admin/userEdit.js`

```js
module.exports = (req, res) => {
  res.send(req.body)
}
```

之所以能使用`req.body`获取数据,是因为在`app.js`中配置了:

```js
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
```

### 2.2.3 对获取的参数进行验证

- 使用 joi 进行验证: `/rote/admin/userEdit.js`

```js
const Joi = require('joi')
module.exports = async (req, res) => {
  // 定义对象的验证规则
  const schema = {
    username: Joi.string()
      .required()
      .min(2)
      .max(20)
      .error(new Error('用户名不符合规范')),
    email: Joi.string()
      .email()
      .required()
      .error(new Error('邮箱格式不符合要求')),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{6,18}$/)
      .error(new Error('密码格式不符合要求')),
    role: Joi.string()
      .required()
      .valid('normal', 'admin')
      .error(new Error('角色值不符合要求')),
    state: Joi.number()
      .valid(0, 1)
      .error(new Error('状态值不符合要求'))
  }
  try {
    await Joi.validate(req.body, schema)
  } catch (ex) {
    res.redirect(`/admin/user-edit?message=${ex.message}`)
    return
  }
  res.send('验证通过')
}
```

- 验证邮箱在数据库中是否已经存在

```js
const { User } = require('./model/user.js')
module.exports = async (req, res) => {
  // 假设到达这里,用户的格式已经验证通过
  // 下面验证邮箱是否是唯一的
  let user = await User.find({ email: req.body.email })
  if (user != null) {
    res.redirect(`/admin/user-edit?message=邮箱已存在`)
  } else {
    res.send('验证成功,将数据插入到数据库')
  }
}
```

### 2.2.4 将用户信息存入数据库中
- 验证通过了,需要将用户信息存入数据库(磁盘中)
- 在将数据添加到数据库之前,先需要对密码进行加密.
- 然后跳转到用户列表页面
```js
const bcrypt = require('bcryptjs');
const {User} = require('../../model/user.js')
module.exports = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(req.body.password, salt);
  req.body.password = pass;
  User.create(req.body);
  req.redirect('/admin/user')
}
```

## 2.3 分页功能实现
1. 通过get请求传递分页信息: `http://localhost/admin/user?page=1`
2. 默认显示第一页,且每页显示10条数据(`pageSize`)
3. 获取(`User.countDocuments`)总的用户数(`count`).
4. 计算总页数(`total`);
5. 分页查询使用到了`limit`和`skip`
```js
module.exports = async (req, res) =>{
  const page = req.query.page || 1;
  const pageSize = 10;
  const count = await User.countDocuments({});
  const total = Math.ceil(count/pageSize);
  const start = (page - 1) * pageSize;
  const users = await User.find({}).skit(start).limit(pageSize)
  // 渲染用户列表
  res.render('/admin/user',{
    users,
    total,
    page
  })
}
```

## 2.4 修改用户的实现
1. 将要修改的用户ID传递到服务器端
2. 建立用户信息修改功能对应的路由
3. 接收客户端表单传递过来的请求参数(`req.body`)
4. 根据id查询用户信息,并将客户端传递过来的密码和数据库中的密码进行比对
5. 如果对比失败,对客户端做出响应
```js
const { User } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async (req, res, next) => {
  const { id: _id } = req.query
  const { password } = req.body
  // 从数据库中根据_id找到用户
  const user = await User.findOne({ _id })
  // 验证密码
  const isValid = await bcrypt.compare(password, user.password)
  if (isValid) {
    // 密码比对成功.
    // 1.将用户信息(需要使用加密后的密码)更新到数据库中
    // 2.重定向到用户列表页面
    req.body.password = user.password
    await User.updateOne({_id}, req.body);
    res.redirect('/admin/user')
  } else {
    // 密码验证失败
    return next(
      JSON.stringify({ path: '/admin/user-edit', message: '密码比对失败', id: _id })
    )
  }
}
```

## 2.5 用户信息删除
1.在确认删除框中添加隐藏域用以存储要删除的用户的ID值
```html
<input type="hidden" name="id">
```
2.为删除按钮添加自定义属性用于存储要删除用户的ID值
3.为删除按钮添加点击事件,在点击事件处理函数中获取自定义属性中存储的ID值并将ID值存储在表单的隐藏域中
4.为删除表单添加提交地址以及提交方式
```html
<form class="model-content" action="/admin/delete" method="get">

</form>
```
5.在服务端建立删除功能路由
6.接收客户端传递过来的id参数
7.根据id删除用户

## 2.6 创建文章集合,并将之与用户集合进行关联
- 集合关联
```js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})
```
- 关联查找



## 2.7 上传文件的表单
- 上传文件的表单要求,传输的数据是二进制的形式.
- form表单有一个 `enctype`属性: 表示表单提交的编码类型
- `enctype`: 默认值是 `application/x-www-form-urlencoded` -> `name=zhangsan&age=20`
- `multipart/form-data`: 将表单数据编码成二进制类型

## 2.8 服务器端接收表单传递的二进制数据
- `formidable`: 解析表单,支持get请求参数、post请求参数、文件上传.
```js
// 引入formidable模块
const formidable = require('formidable');
const path = require('path');
// 1.创建表单解析对象
const form = new formidable.IncomingForm();
// 2.设置文件上传路径
form.uploadDir = path.join(__dirname, '../','../','public','uploads');
//是否保留表单上传文件的扩展名
form.keepExtensions = false;
// 对表单进行解析
form.parse(req,(err, fields, files) =>{
  // 1.err错误对象 如果表单解析失败 err里面存储错误信息, 如果表单解析成功.err为空
  // 2.fields 存储普通请求参数, Object类型
  // 3.files 存储上传的文件信息, Object类型
  res.send(files)
})
```

## 2.9 创建模板引擎通用的数据
```js
admin.get('/login',(req, res)=>{
  // express默认把 app 挂在到 req.app上
  req.app.locals.publicData = '我是模板引擎公共数据'
})
```

## 2.10 前端读取文件
- 使用表单上传文件
```html
<input type="file" name="cover" id="file"/>
```
- 将上传的文件显示在浏览器上
```js
//
var file = document.quertSelector('#file');
// 当用户选择完文件以后执行
file.onchange = function () {
  //  1. 创建文件读取对象
  var reader = new FileReader();
  // 2.读取文件
  // reader.readAsDateURL(this.files);
  // reader.onload = function(){

  // }
}
```

## 2.11 多集合联合查询
```js
const mongoose = require('mongoose');
// 先建立关联
const userSchema = new mongoose.Shcema({})
const articleSchema = new mongoose.Schema({
  title:{
    type: String,
    minlength: 4,
    maxlength: 20,
    required:[true, "请填写文章标题"]
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "请传递作者"]
  }
})
const User = mongoose.model('User', userSchema);
const Article = mongoose.model('Article', articleSchema);
// 再联合查询
const run = async()=>{
  const articles = await Article.find().populate('author')
  console.log(articles)
}
run()
```


## 2.12 在模板引擎中使用dateformat
```js
// app.js
const template = require('art-template')
const dateformat = require('dateformat');
template.defaults.imports.dateformat = dateformat;

// 使用
{{ dateFormat(time, 'yyyy-mm-dd hh:mm:SS') }}
```

## 2.13 数据分页
```js
const pagination = require('mongoose-sex-page');
pagination(集合构造函数).page(1).size(20).display(8).exec();
```
参数说明:
- `page`: 当前页
- `pages`: 总共的页数
- `size`: 每页显示的数据条数
- `display`: 指定要向客户端一次显示的页码数量
- `exec`: 向数据库发送查询请求
- `total`: 总共的数据条数
- `records`: 查询出来的具体数据

- 数据分页使用栗子
```js
const {Article} = require('../../model/article')
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) =>{
  const { page } = req.query || 1;
  const articles = await pagination(Article)
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate('author')   // 关联查询
    .exec()
}
```

#

# 3. 项目包含的知识点

## 3.1 密码加密 bcrypt

哈希加密是单程加密方式: 1234 => abcd
在加密的密码中加入随机字符串可以增加密码被破解的难度.

### 3.1.1 bcrypt 基本语法

```js
// 导入bcrypt
const bcrypt = require('bcrypt')
// 生成随机字符串 gen => generate 生成 salt 盐
let salt = await bcrpt.genSalt(10)
// 使用随机字符串对密码进行加密
let pass = await bcrpt.hash('明文密码', salt)
```

### 3.1.2 bcrypt 的环境依赖

1. `python 2.x`
2. `node-gyp`: `npm install -g node-gyp`
3. `window-build-tools`: `npm install --global --production windows-build-tools`(下载了 10min)
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
let isEqual = await bcrypt.compare('明文密码', '加密密码')
```

## 3.2 cookie 和 session

### 3.2.1 cookie 和 session 的基本概念

- 由于 HTTP 协议的无状态性,当一次连接断开后. 服务器并不会记录用户是否登录. 因此需要引入 cookie/session 机制
  `cookie`: 浏览器在电脑硬盘中开辟的一块空间,主要供服务器端存储数据
- cookie 中的数据是以域名的形式进行区分的.
- cookie 中的数据是有过期时间的,超过时间数据会被浏览器自动删除.
- cookie 中的数据会随着请求被自动发送到服务器

  1.客户端第一次向服务器端发送请求的时候,是不存在 cookie 的. 2.服务端验证客户端,会响应一个 cookie 给客户端. 3.客户端验证通过后,在发送请求会自动带上 cookie

`session`:实际上就是一个对象,存储在服务器端的内存中,在 session 对象中也可以存储多条数据,每一条数据都有一个 sessionid 做为唯一标识.

<font color=red>注意:cookie 在客户端的磁盘中,session 在服务端的内存中</font>

### 3.2.2 cookie 和 session 的使用

1. [client] --> 邮件地址、密码 --> [server]
2. server 端,对邮箱地址、密码进行验证,若通过则生成 sessionid
3. [client] <-- sessionid(存储在客户端的 cookie 中) <-- [server]
4. 客户端再次登录
5. [client] --> cookie [server]
6. 服务端,获取 cookie 中的 sessionid,验明身份后,响应数据

### 3.2.3 实战: cookie 与 session

```js
const session = requier('express-session')
app.use(session({ secret: 'secret key' }))
admin.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // 假设登录成功
  req.session.username = user.username // 此处能用req.session是在app.js中使用app.use方法进行了拦截
})
```

### 3.2.3 登录成功后重定向到用户列表页

- 重定向到用户列表页

```js
admin.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  // 假设登录成功
  // 重定向到用户列表页
  req.redirect('/admin/user')
})
```

### 3.2.4 未登录时的登录拦截

- 1.当访问的路由为 '/admin'时,先判断用户是否登录(req.session.username)
- 2.若为登陆,重定向到 '/admin/login'
- 3.判断用户是否是申请访问`admin/login`
- 使用 express 提供的中间件进行拦截.

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

## 3.3 Joi

JavaScript 对象的规则描述语言和验证器

```js
const Joi = require('joi')
const schema = {
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new Error('错误信息')),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  access_token: [Joi.string(), Joi.number()],
  birthyear: Joi.number()
    .integer()
    .min(1900)
    .max(2013),
  email: Joi.string().email()
}
Joi.validate({ username: 'abc', birthyear: 1994 }, schema)
```

- `.string()`: 只能是字符串
- `.alphanum()`: 只能是字母或数字
- `.min()`: 最小长度
- `.max()`: 最大长度
- `.requred()`: 必须
- `.error()`: 报错信息
- `.regex()`: 使用正则进行验证
- `[Joi.string(), Joi.number()]`: 数组类型,数组内容可以是字符串或数值
- `.integer()`:整数
- `.email()`: 邮箱验证


## 3.4 文件读取(前端) FileReader
```js
// 创建文件读取对象
var reader = new FileReader();
reader.readAsDataURL('文件');
reader.onload = function () {
  console.log(reader.result);
}
// 注: 机器看的图片是一长串二进制编码.
// javascript读取文件的接口是一个异步方法.
// 它提供了一个onload事件,当文件读取结束时执行.
```


## 3.5 mongoDB数据库添加账号
1. 以系统管理员的方式运行powershell
2. 连接数据库 mongo
3. 查看数据库: `show dbs`
4. 切换到admin数据库: `use admin`
5. 创建超级管理员账户: `db createUser({user: 'root', pwd: 'root', roles: ['root']})`
6. 切换到blog数据: `use blog`
7. 创建普通账号: `db.createUser({user: 'marron', pwd: 'marron', roles: ['readWrite']})`
8. 卸载mongodb服务
    1. 停止服务: `net stop mongodb`
    2. 删除服务: `mongod --remove`
9. 创建mongodb服务
    `mongod --logpath="C:\Program Files\MongoDB\Server\4.2\log\mongod.log" --dbpath="C:\Program Files\MongoDB\Server\4.2\data" --install --auth`
10. 启动mongodb服务: `net start mongodb`
11. 在项目中使用账号连接数据库:`mongoose.connect('mongodb://user:pass@localhost:port/database')`

## 3.6 开发环境与生产环境
- 什么是开发环境、生产环境
> 环境,就是项目运行的地方,当项目处于开发阶段,项目运行在开发人员的电脑上,项目所处的环境就是开发环境。当项目开发完成以后,要将项目放到真实的网站服务器电脑中运行,项目所处的环境就是生产环境.


- 为什么要区分开发环境与生产环境
> 因为在不同的环境中,项目的配置是不一样的,需要在项目代码中判断当前项目运行的环境,根据不同的环境应用不同的项目配置.

- 如何获取系统环境变量
```js
// 获取系统环境变量,返回值是对象
console.log(process.env.NODE_ENV == 'development'){
  // 当前环境是开发环境
  console.log('当前环境是开发环境');
} else {
  // 当前环境是生产环境
  console.log('当前环境是生产环境');
}
```

## 3.7 morgan
- 在开发环境中,将客户端向服务器的请求打印到控制台中
```js
const morgan = require('morgan');
if(process.env.NODE_ENV === 'development') {
  // 开发环境
  app.use(morgan('dev'));   // 在开发环境中,将客户端发送到服务器的请求信息打印到控制台中
} else {
  console.log('当前是生产环境')
}
```


## 3.8 第三方模块config
> 作用: 允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中,模块内部自动判断当前应用的运行环境,并读取对应的配置信息,极大提供应用配置信息的维护成本,避免了当运行环境重复的多次切换时,手动到项目代码中修改配置信息.

#### 使用步骤
1.使用`npm install config`命令下载模块
2.在项目的根目录下新建config文件夹
3.在config文件夹下新建default.json、development.json、production.json文件
4.在项目中通过require方法,将模块进行导入
5.使用模块内部提供的get方法获取配置信息
```js
const config = require('config');
console.log(config.get('title'));
// 根据生产环境和开发环境.
```

- 将敏感配置信息存储在环境变量中
1.在config文件夹中建立custom-environment-variables.json文件
2.配置项属性的值填写系统环境变量的名字
3.项目运行时config模块查找系统环境变量,并读取其值作为当前配置项属于的值
