# 3. MongoDB 增删改查操作

## 3.8 案例: 用户信息增删改查

1. 搭建网站服务器,实现客户端与服务端的通信
2. 连接数据库,创建用户集合,向集合中插入文档
3. 当用户访问/list 时,将所有用户信息查询出来
4. 将用户信息和表格 HTML 进行拼接,并将拼接结果响应回客户端.
5. 当用户访问 /add 时,呈现表单页面,并实现添加用户信息功能
6. 当用户访问 /modify 时,呈现修改页面,并实现修改用户信息功能
7. 当用户访问 /delete 时, 实现用户删除功能

### 3.8.1 搭建网站服务器,实现客户端与服务端的通信

- 创建一个服务器,监听 3000 端口
```js
const http = require('http')
// 创建服务器
const app = http.createServer()

// 监听端口
app.listen(3000)
```

- 为服务器对象添加请求事件
```js
app.on('request', (req, res) => {
  res.end('ok')
})
```

### 3.8.2 连接数据库,创建用户集合,向集合中插入文档
- 连接数据库
```js
const mongoose = require('mongoose');
/* mongoose查找规则
1. 首先mongoose不是系统模块,且当前目录下不存在 node_modules 文件
2. 会顺着往上一级查找.node_modules.寻找是否含有mongoose.js文件.
3. 没有找到.会查找是否有mongoose文件夹.
4. 找到mongooses,先查看是否有package.json 和 main字段
5. 若没有,会查找是否有 inedx.js文件
*/
// 数据库连接 27017是mongodb数据库的默认端口
mongoose.connect('mongodb://localhost/playground', {useNewUrlParse: true})
  .then(()=>console.log('数据库连接成功'))
  .catch(()=>{console.log("数据库连接失败")})
```
- 创建用户集合规则:
```js
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  age: {
    type: Number,
    min: 18,
    max: 80
  },
  password: String,
  email: String,
  hobbies: [String]
})
// 创建集合
const User = mongoose.model('User', userSchema)
```
- 导入数据到 User 集合中: `mongoimport -d playground -c users --file ./user.json`

### 3.8.3 当用户访问/list 时,将所有用户信息查询出来
### 3.8.4 将用户信息和表格 HTML 进行拼接,并将拼接结果响应回客户端.
1. 实现路由功能
2. 呈现用户列表页面
3. 从数据库中查询用户信息,将用户信息展示在列表中
```js
const url = require('url');
app.on('request', async(req, res)=>{
  // 获取请求方式
  const method = req.method;
  // 获取请求地址
  const { pathname } = url.parse(req.url);

  if(method == 'GET') {

      // 呈现列表页面的路由
      if (pathname == '/list') {
          let users = await User.find();
          let list = `
          在此处将模板和数据结合
          `;
          // 返回拼接好的网页字符串
          res.end(list)
      }

  } else if (method == 'POST') {

  }
})
```


### 3.8.5 当用户访问 /add 时,呈现表单页面,并实现添加用户信息功能
- 复选框提交的的处理
```html
<!-- 复选框提交是按组提交,因此其name属性应该一致 -->
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
```
- `解析POST提交的参数`:
```js
// 通过post提交的参数形如 name=&password=&age=&email=name=123&password=123456&age=20&email=123%40163.com&hobbies=%E8%B6%B3%E7%90%83&hobbies=%E7%AF%AE%E7%90%83
// 需要使用内置模块 querystring来进行解析
const querystring = require('querystring');
app.on('request', (req, res)=>{
  const method = req.method
  if(method == "POST") {
    let postData = '';
    req.on('data', data=>{
      postData += data;
    })
    req.on('end', ()=>{
      console.log(querystring.parse(postData))
    })
  }
})
```
<font color=red>相应新增用户</font>
```js
const querystring = require('querystring');
app.on('request',async (req, res)=>{
 const method = req.method;
 if(method == "POST") {
   let formData = '';
   req.on('data', data=>{
     formData += data;
   });
   req.on('end',async ()=>{
     let user = querystring.parse(formData);
     // 等待将信息存入数据库
     await User.create(user);
     // 重定向到 /list
     res.writeHead(301, {
       Location: '/list'
     });
     res.end();
   })
 }
})
```

### 3.8.6 当用户访问 /modify 时,呈现修改页面,并实现修改用户信息功能
1. 增加页面路由呈现页面
2. 实现修改功能

- 获取get方法请求的字符串
- 根据id在数据库中查找数据
```js
const url = require('url');
app.on('request', async(req, res) =>{
  const { query } = url.parse(req.url, true);
  // 注意 _id是唯一的, 如果使用find. 会返回一个数组, 而我们需要的是对象. 因此在此处使用findOne比较好.且findOne的查找效率更高
  let user = await User.findOne({_id: query});
  console.log(user);
})
```
- 根据数组,让复选框处于选中状态
1. 首先将复选框的值列成一个列表.
2. 循环该列表,判断当前用户的hobbies属性是否在里面
3. 若选中则添加一个checked属性.
```js
const user = await User.findOne({_id: query:id});
const hobbies = ['足球','篮球','橄榄球','敲代码','抽烟','喝酒','烫头'];

hobbies.forEach(item =>{
  if(user.hobbies.includes(item)){  // 含有当前项
    modify += `
      <label class="checkbox-inline">
        <input type="checkbox" value="${item}" name="hobbies" checked>${item}
      </label>
    `
  } else {
    // 没有该爱好
    modify += `
    <label class="checkbox-inline">
      <input type="checkbox" value="${item}" name="hobbies">${item}
    </label>
    `
  }
})
```


- 在提交修改信息的时候,传递用户_id
- 后端接收post数据
```html
<!-- 前端 -->
<form method="POST" action="/modify?id=${user.id}">
```
```js
/*
在form表单提交数据时,将_id信息放到url中传递给后端
*/
// 后端
const url = require('url');
const querystring = require('querystring');
app.on('request',async(req,res) =>{
  const {pathname, query} = url.parse(req.url, true);
  const method = req.method;
  if(method == "POST"){
    if(pathname == "/modify") {
      let postData = '';
      req.on('data', data=>{
        postData += data;
      });
      req.on('end', async ()=>{
        let user = querystring.parse(postData);
        await User.updateOne({_id: query.id}, user);
      })
    }
  }
})
```

### 3.8.7 当用户访问 /delete时, 实现用户删除功能
1. 用户点击删除按钮的时候,会将当前用户的_id(GET方式)传给后端
2. 后端监听 /delete 拿到id.
3. 使用mongoose的删除API findOneAndDelete,删除数据然后重定向到list页面

