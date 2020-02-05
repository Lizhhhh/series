# 1. Todo案例 - 前期准备

## 1.1 首次为mongoDB添加账号

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

## 1.2 再次为mongoDB添加账号

- 为todo数据库添加账号

1. 使用mongo命令进入mongodb数据库
2. 使用use admin命令进入admin数据库 
3. 使用db.auth('root', 'root')命令登录数据库
4. 使用 use todo 命令切换到todo数据库
5. 使用db.createUser({ user: 'marron', pwd:'marron', roles: ['readWrite'] })创建todo数据库账号
6. 使用exit命令退出mongodb数据库

## 1.3 使用mongoose连接数据库

- 连接的数据库为`todo`, 用户名: `marron`,密码:`marron`

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://marron:marron@localhost:27017/todo',{useNewUrlParser: true})
.then(()=>{console.log('数据库连接成功')})
.catch(ex=>{console.log('数据库连接失败')})
```

## 1.4 导入前端的代码

[github](https://github.com/tastejs/todomvc-app-template)

# 2. Todo案例 - 功能实现

## 2.1 展示任务列表

1.准备一个放置任务列表的数组

2.向服务器端发送请求,获取已存在的任务

3.将已存在的任务存储再任务列表数组中

4.通过模板引擎将任务列表数组中的任务显示再页面中

## 2.2 添加任务

1.为文本框绑定键盘抬起事件,在事件处理函数中判断当前用户敲击的是否是回车键

2.当用户敲击回车键的时候,判断用户在文本框中是否输入了任务名称

3.向服务器端发送请求,将用户输入的任务名称添加到数据库中,同时将任务添加到任务数组中

4.通过模板引擎将任务数组中的任务显示在页面中

### 2.2.1 监听键盘的抬起事件

```html
<input class="new-todo" placeholder="What needs to done?" autofocus id="task" />
<scritp>
    $('#task').on('focous', function(event){
    	if(event.keyCode == 13){
    		console.log('回车')
    	} else {
    		console.log('其他')
    	}
    })
</scritp>
```

### 2.2.2 获取用户在文本框中输入的信息

```html
<input class="new-todo" placeholder="What needs to done?" autofocus id="task" />
<script>
    $('#task').on('keyup', function(event){
        if(event.keyCode == 13){
            console.log(this.value)
        }
    })
</script>
```

### 2.2.3 清空文本框内容

```html
<input class="new-todo" placeholder="What needs to done?" autofocus id="task" />
<script>
    $('#task').val('')
</script>
```

## 2.3 删除任务

1.为删除按钮添加点击事件

2.在事件处理函数获取到要删除任务的id

3.向服务器端发送请求,根据ID删除任务,同时将任务数组中的相同任务删除

4.通过模板引擎将任务列表中的任务重新显示在页面中

### 2.3.1 mongoose删除文档的接口

```
Task.findOneAndDelete({}).then()
```

## 2.4 修改任务名称

1.为任务名称外层的label标签添加双击事件,同时为当前任务外层的i标签添加ediiting类名,开启编辑状态

2.将任务名称显示在文本框中让文本框获取焦点

3.当文本框离开焦点时,将用户在文本框中输入值提交到服务器端,并且将最新的任务名称更新到任务列表数组中

4.使用模板引擎重新渲染页面中的任务列表

### 2.4.1 给input框添加双击事件

```js
taskBox.on('dblclick', function(){})
```

### 2.4.2 找到当前元素的父元素

```js
$(this).parent()
```

### 2.4.3 找到当前元素的下一个兄弟元素(input)

```js
$(this).siblings(input)
```

### 2.4.4 给input框设置值

```
$(this).val()
```

### 2.4.5 获取两个标签之间的值

```html
<label id="label">aaa</label>
<script>
	$('#id').text()	
</script>
```

### 2.4.6 获取兄弟元素中button的属性`data-id`

```html
<div class="view">
    <input class="toggle" type="checkbox" />
    <label>啦啦啦</label>
    <button class="destro" data-id="9527"></button>
</div>
<input class="edit" value="" />
<script>
    // 当前在 input 上
    $(this).siblings().find('button').attr('data-id');
</script>
```



















# 3. 接口文档

## 3.1 获取任务列表

- 请求地址
  - /todo/task
- 请求方式
  - GET
- 返回值

```json
[
    {
        "completed": false,
        "_id": "5c87f3ea3de40165408f956",
        "titile": "吃饭"
    },
    {
        "completed": false,
        "_id": "5c873f43a3de40165408f957",
        "titile": "睡觉"
    },
    {
        "completed": false,
        "_id": "5c873f49a3de40165408f958",
        "title": "打豆豆"
    }
]
```

## 3.2 添加任务

- 请求地址
  - /todo/addTask
- 请求方式
  - POST
- 参数

| 参数名 | 说明     |
| ------ | -------- |
| title  | 任务名称 |

- 返回值

```js
{
    "completed": false,
     "_id": "5c8135e9b5f41712609418b2",
    "title": "测试任务"
}
```

## 3.3 删除任务

- 请求地址
  - /todo/deleteTask
- 请求方式
  - GET
- 参数

| 参数名 | 说明                |
| ------ | ------------------- |
| _id    | 要删除的任务_id字段 |

- 返回值

```js
{
    "completed": false,
    "_id": "5c81359e10f12e2018a66513",
    "title": "测试任务"
}
```

## 3.4 修改任务

- 请求地址
  - /todo/modifyTask
- 请求方式
  - POST
- 参数

| 参数名    | 说明                         |
| --------- | ---------------------------- |
| _id       | 要修改任务的_id字段          |
| title     | 任务名称                     |
| completed | 任务状态true完成,false未完成 |

- 返回值

```json
{
    "completed": false,
    "_id":"5c8137f9b5f41712609418b3",
    "title": "测试任务"
}
```

