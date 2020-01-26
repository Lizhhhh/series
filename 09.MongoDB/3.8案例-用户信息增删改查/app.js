/*
1. 搭建网站服务器,实现客户端与服务端的通信
2. 连接数据库,创建用户集合,向集合中插入文档
3. 当用户访问/list时,将所有用户信息查询出来
4. 将用户信息和表格HTML进行拼接,并将拼接结果响应回客户端.
5. 当用户访问 /add时,呈现表单页面,并实现添加用户信息功能
6. 当用户访问 /modify时,呈现修改页面,并实现修改用户信息功能
7. 当用户访问 /delete时, 实现用户删除功能
 */

const http = require('http')
const url = require('url')
const querystring = require('querystring')

// 连接数据库
require('./model/index.js');
// 导入用户集合
const User = require('./model/user');

// 创建服务器
const app = http.createServer()

app.on('request', async (req, res) => {
  const method = req.method
  const { pathname, query } = url.parse(req.url, true)
  if (method == 'GET') {
    // 呈现用户列表页面
    if (pathname == '/list') {
      // 查询用户信息
      let users = await User.find()
      // html字符串
      let list = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>用户列表</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h6>
      <a href="add" class="btn btn-primary">添加用户</a>
    </h6>
    <table class="table table-striped table-bordered">
      <tr>
        <td>用户名</td>
        <td>年龄</td>
        <td>爱好</td>
        <td>邮箱</td>
        <td>操作</td>
      </tr>
      `

      // 对数据进行循环操作
      users.forEach(item => {
        list += `
        <tr>
        <td>${item.name}</td>
        <td>${item.age}</td><td>`
        item.hobbies.forEach(hb => {
          list += `
          <span>${hb}</span>
          `
        })
        list += ` </td><td>${item.email}</td>
        <td>
          <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
          <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
        </td>
      </tr>
        `
      })

      list += `
      </table>
      </div>

    </body>
    </html>
      `
      res.end(list)
    } else if (pathname == '/add') {
      // 呈现添加用户的页面
      let add = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>用户列表</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h3>添加用户</h3>
    <form method="post" action="/add">
      <div class="form-group">
        <label>用户名</label>
        <input name="name" type="text" class="form-control" placeholder="请填写用户名" >
      </div>
      <div class="form-group">
        <label>密码</label>
        <input name="password" type="password" class="form-control" placeholder="请输入密码">
      </div>
      <div class="form-group">
        <label>年龄</label>
        <input name="age" type="text" class="form-control" placeholder="请输入年龄">
      </div>
      <div class="form-group">
        <label>邮箱</label>
        <input name="email" type="email" class="form-control" placeholder="请输入邮箱">
      </div>
      <div class="form-group">
      <label>请选择爱好</label>
      <div>
        <label class="checkbox-inline">
          <input type="checkbox" value="足球" name="hobbies">足球
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="篮球" name="hobbies">篮球
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="橄榄球" name="hobbies">橄榄球
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="敲代码" name="hobbies">敲代码
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="抽烟" name="hobbies">抽烟
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="喝酒" name="hobbies">喝酒
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="烫头" name="hobbies">烫头
        </label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">添加用户</button>
    </form>
  </div>

</body>
</html>
      `
      res.end(add)
    } else if (pathname == '/modify') {
      // 呈现修改用户表单界面
      // 获取get请求的参数
      let user = await User.findOne({ _id: query.id })
      let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头']
      let modify = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>用户列表</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h3>修改用户</h3>
    <form method="post" action="/modify?id=${user._id}">
      <div class="form-group">
        <label>用户名</label>
        <input name="name" type="text" class="form-control" placeholder="" value="${user.name}" >
      </div>
      <div class="form-group">
        <label>密码</label>
        <input name="password" type="password" class="form-control" placeholder="" value="${user.password}">
      </div>
      <div class="form-group">
        <label>年龄</label>
        <input name="age" type="text" class="form-control" placeholder="" value="${user.age}">
      </div>
      <div class="form-group">
        <label>邮箱</label>
        <input name="email" type="email" class="form-control" placeholder="" value="${user.email}">
      </div>
      <div class="form-group">
      <label>请选择爱好</label>
      <div>


      `
      hobbies.forEach(item => {
        // 判断当前循环项在不在用户的爱好数组里面
        if (user.hobbies.includes(item)) {
          modify += `
          <label class="checkbox-inline">
          <input type="checkbox" value="${item}" name="hobbies" checked>${item}
        </label>
          `
        } else {
          modify += `
          <label class="checkbox-inline">
          <input type="checkbox" value="${item}" name="hobbies">${item}
        </label>`
        }
      })

      modify += `
      </div>
    </div>
    <button type="submit" class="btn btn-primary">修改用户</button>
    </form>
  </div>

</body>
</html>
      `
      res.end(modify)
    } else if (pathname == '/delete') {
        // 等待删除
        await User.findOneAndDelete({_id:query.id});
        // 301重定向
        res.writeHead(301,{
          Location:'/list'
        });
        res.end();
    }
  } else if (method == 'POST') {
    // 用户添加功能
    if (pathname == '/add') {
      // 接受用户提交的信息
      let formData = ''
      req.on('data', param => {
        formData += param
      })
      req.on('end', async () => {
        let user = querystring.parse(formData)
        // 将用户提交的信息添加到数据库中
        await User.create(user)
        // 301 代表重定向
        // location 跳转地址
        res.writeHead(301, {
          Location: '/list'
        })
        res.end()
      })
    } else if (pathname == '/modify') {
      // 修改用户
      let postData = ''
      req.on('data', data => {
        postData += data
      })
      req.on('end', async () => {
        let user = querystring.parse(postData)
        await User.updateOne({ _id: query.id }, user)
        // 301重定向
        res.writeHead(301, {
          Location: '/list'
        })
        res.end()
      })
    }
  }
})

app.listen(3000, () => {
  console.log('[Server]The server is running at http://localhost:3000')
})
