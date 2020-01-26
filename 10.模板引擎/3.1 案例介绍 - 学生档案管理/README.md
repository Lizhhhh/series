# 3. 案例

## 3.1 案例介绍 - 学生档案管理

目标: 模板引擎应用,强化 node.js 项目制作流程.
知识点: http 请求响应、数据库、模板引擎、静态资源访问

## 3.2 制作流程

1. 建立项目文件夹并生成项目描述文件
2. 创建网站服务器实现客户端和服务器端通信
3. 连接数据库并根据需求设计学员信息表
4. 创建路由实现页面模板传递
5. 实现静态资源访问
6. 实现学生信息的添加功能
7. 实现学生信息的展示功能

<font color=red>以下@符号代表根目录,即: `3.1 案例介绍 - 学生档案管理`</font>

### 3.2.1 建立项目文件夹并生成项目描述文件

- `npm init -y`

### 3.2.2 创建网站服务器实现客户端和服务器端通信

- `@/app.js`

```js
// 引入http模块
const http = require('http')
// 创建网站服务器
const app = http.createServer()
// 当客户端访问服务器的时候
app.on('request', async (req, res) => {
  res.end('ok')
})
// 监听3000端口
app.listen(80, () => {
  console.log('[Server]:The server is running at http://localhost:80')
})
```

### 3.2.3 连接数据库并根据需求设计学员信息表

1. 首先下载 mongoose: `npm install mongoose`
2. 连接数据库: `@/app.js`
```js
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log('数据库连接失败!'))
```
3. 测试成功后,将数据库相关的操作放在model层,即将以上`@/app.js`中的数据库相关的代码抽离出来.注意下面的目录:
4. 新建数据库连接文件: `@/model/connect.js`
```js
const mongoose = require('mongoose')
mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log('数据库连接失败!'))
```
5. 在`@/app.js`中添加如下:
```js
require('./model/connect.js');
```
6. 下面开始设计学员信息表: `@/model/student`
```js
const mongoose = require('mongoose')
// 创建学生集合规则
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  age: {
    type: Number,
    min: 10,
    max: 25
  },
  sex: {
    type: String
  },
  email: String,
  hobbies: [String],
  collage: String,
  enterDate: {
    type: Date,
    dafault: Date.now
  }
})
// 创建学生信息集合
const Student = mongoose.model('Student', studentsSchema);
// 将学生信息集合进行导出
module.exports = Student;
```
7. 在`@/app.js`中导入学生集合
```js
const Student = require('./model/student');
```

### 3.2.4 创建路由实现页面模板传递
1. 使用到第三方模块router,先下载: `npm install router`
2. 在`@/app.js`中加入如下代码:
```js
// 引入router模块
const router = require('router')();

// 呈递学生档案信息页面
router.get('/add', (req, res) => {
  res.end('add')
})
// 呈递学生档案信息列表页面
router.get('/list', (req, res) => {
  res.end('list')
})
// 在app中启用路由
app.on('request',(req, res)=>{
  router(req,res,()=>{});
})
```
3. 下载模板引擎: `npm install art-template`
4. 配置模板引擎: `@/app.js`
```js
const template = require('art-template');
const path = require('path');
template.defaults.root = path.join(__diraname, 'views');
```


### 3.2.5 实现静态资源访问
- 使用到第三方模块 `serve-static`.
- 静态资源是指:在服务器磁盘中,当浏览器通过http请求获取时,不经过处理,直接返回的资源

功能: 实现静态资源访问服务
步骤:
1. 引入serve-static模块获取创建静态资源服务功能的方法: `npm install serve-static`
2. 调用方法创建静态资源服务,并指定静态资源服务目录
3. 启用静态资源服务功能
```js
const serveStatic = require('serve-static');
const serve = serveStatic('public');
server.on('reqeust', (req, res)=>{
  // 第三个参数是必须的. 否则报错.
  serve(req, res, ()=>{});
});
server.listen(3000);
```

### 3.2.6 实现学生信息的添加功能
1. 在模板的表单中指定请求地址与请求方式
2. 为每一个表单项添加name属性
3. 添加实现学生信息功能路由
4. 接收客户端传递过来的学生信息
5. 将学生信息添加到数据库中
6. 将页面重定向到学生信息列表页面

- 将学生信息 student 添加到数据库中
```js
router.post('/add', (req, res) => {
  let postData = ''
  req.on('data', data => {
    postData += data
  })
  req.on('end', async () => {
    let users = querystring.parse(postData)
    console.log(users)
    await Student.create(users)
    res.writeHead(301, {
      Location: '/list'
    })
    res.end()
  })
})
```

### 3.2.7 实现学生信息的展示功能
1. 访问 '/list'的时候,使用使用数据库的方法(`Student.find()`)读取所有的学生信息.
2. 使用模板引擎,将信息和模板对应生成字符串
3. 将字符串返回

- 性别在数据库中是 0 | 1,分别代表男女.
```html
<!-- 在模板字符串中 0 显示为 "男", 否则显示为女 -->
{{each students}}
  <tr>
    <td>{{$value.sex == '0' ? "男" : "女" }}</td>
  </tr>
{{/each}}
```

- 爱好显示的是 ["0","1"], 将它在模板字符串里面显示 ["敲代码","打篮球"]
```html
<td>
  {{each  $value.hobbies}}
    <span>
      {{if $value == 0}}
          敲代码
      {{else if $value == 1}}
          打篮球
      {{else}}
          睡觉
      {{/if}}
    </span>
  {{/each}}
</td>
```

- 对时间的处理: `dateformat`
```js
const template = require('art-template');
const path = require('path');
const dateformat = require('dateformat');

template.defaults.imports.dateformat = dateformat;
const views = path.join(__dirname,'views','06.art');
const html = template(views, {
  time: new Date();
})
console.log(html);
```
- 在`html`中使用如下:
```html
{{extend './common/layout.art'}}
{{block "content"}}
  {{ dateformat(time,"yyyy-mm-dd HH:MM:ss") }}
{{/block}}
```

## 3.3 项目结构说明
- `model`: 存放数据库相关代码
- `public`: 存放静态资源
- `router`: 存放路由相关文件
- `views`: 存放模板引擎
- `app.js`: 项目的主入口文件
- `package.json`: 项目的描述文件
