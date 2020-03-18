# 项目开发所需的东西

- [node.js](https://nodejs.org/zh-cn/)
  - 将npm设置成淘宝镜像

```js
$ npm config set registry http://registry.npm.taobao.org/
$ yarn config set registry http://registry.npm.taobao.org/
```

- [mongoDB](https://www.mongodb.com/download-center/community)

- [学习地址 - 视频](https://www.bilibili.com/video/av51931842?p=1)

# 初始化项目

- 项目主要有三端: server(服务端)、手机上看到的(移动端)、管理的后台(web端)

```js
$ mkdir server
$ vue create web (defaults - babel,eslint)
$ vue create admin (defaults - babel,eslint)
```

- 初始化server(服务端)
  - 新建`index.js`

```js
$ npm init -y
```

# 后台管理界面(admin)

【1. 启动项目】

```js
$ cd admin
$ npm run serve
```

【2. 在vue中安装 element组件】

```js
$ vue add element
```

- 选择 Fully import(完全引用)
- 然后一直回车

- 完成后页面报错,根据提示安装其他依赖
- 完事重启项目: `npm run serve`

【3. 安装路由】

```js
$ vue add router
```

- Use history mode for router?  No(不使用历史模式)



【4. 打开elementUI官网, 找到后台布局】

- [Container布局容器](https://element.eleme.cn/#/zh-CN/component/container)
  - 将代码复制到`views`下面的`Main.vue`
  - 在`router/index.js`中找到首页路由,将首页的路由组件替换成`Main.vue`

```js
// index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    }
]

const router = new VueRouter({
    routes
})

export default router
```

- Vue使用路由

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

# admin

## admin/src

### admin/src/index.js

#### 1. 让container容器充满整个 屏幕的高度 

```html
<template>
    <el-container style="height: 100vh;"></el-container>
</template>
```

#### 2. 在elementUI中使用前端路由

主要是针对左侧导航栏

```vue
<el-menu router :default-openeds="['1','3']">
    <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-message"></i>内容管理
        </template>
        <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index='/categories/create'>新建分类</el-menu-item>
            <el-menu-item index='/categories/list'>分类列表</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
</el-menu>
```

#### 3. 创建子路由

```vue
<!-- Main.vue -->
<template>
	<el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)"></el-aside>
    	<el-container>
            <el-header style="text-align: right; font-size: 12px"></el-header>
            <el-main>
                <!-- 在这里添加的子路由 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
```

```js
// router/index.js
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
const routes = [
    { path: '/', name: 'main', component: Main, children:[
        { path: 'categories/create', component: CategoryEdit },
        { path: 'categories/list', component: CategoryList }
    ] }
]
```

#### 4. elementUI表单阻止默认提交事件

阻止默认的表单提交事件,并将提交事件绑定到save上

```vue
<template>
    <el-form label-width='120px' @submit.native.prevent="save">
    </el-form>   
</template>
<script>
    export default{
        data(){},
        methods:{
            save(){
                
            }
        }
    }
</script>
 
```

#### 5. 引入axios

- `npm i axios`
- 编写`http.js`,编写http的基本配置

```js
//   src/http.js
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http
```

- 在`src/main.js`中引入http,将axios的方法挂在到vue实例的原型上

```js
import http from './http'
Vue.prototype.$http = http;
```

#### 6. 发起请求给后端

经过`Server -> 1~4`(见后面的Server)的步骤,已经成功的搭建好了一个监听路由:`http://localhost:3000/admin/api/categories`的服务器,下面是前端像后端提交表单了.

```js
// src/views/CategoryEdit.vue
methods{
    async save(){
        await this.$http.post('/categories', this.model)
        // 跳转到商品分类列表
        this.$router.push('/categories/list')
        this.$message({
            type: 'success',
            message: '保存成功'
        })
    }
}
```

`this.$router.push`可以参考[vue-router](https://blog.csdn.net/piano9425/article/details/104277297)

#### 7. ElementUI中表格的使用

```vue
<template>
	<div>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID"
    	</el-table>
    </div>
</template>
```

### admin/src/views

#### ItemEdit.vue

##### 1. 使用element-ui上传头像

- 上传头像的流程
  - 使用elementUI组件库的上传头像
  - 点击上传,会发送Post请求给服务器
  - 服务器将上传的图片存储在public下,并返回图片地址
  - 前端接收到图片的地址.将其保存在model.icon下
  - 当提交时,会将物品名称和图片的地址,提交给后端,存放在Item集合中

```vue
<el-form label-width="120px" @submit.native.prevent="save">
  <el-form-item label="名称">
    <el-input v-model="model.name"></el-input>
  </el-form-item>
  <el-form-item label="图标">
    <el-upload
      class="avatar-uploader"
      action="$http.defaults.baseURL + '/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="model" :src="model.icon" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>
  </el-form-item>
</el-form>
```





# server

## index.js

- server端使用`express`构建服务器

- 使用`mongoose`来连接数据库
- 使用`cors`来允许跨域请求

```js
$ cd server
$ npm i express@next cors mongoose
```

### 1. 创建服务器

```js
// server/index
const express = require('express')
const app = express();

require('./routes/admin')(app)

app.listen(3000, ()=>{
    console.log('localhost:3000')
})
```

### 2. 引入路由

```js
// server/routes/admin/index.js
module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    
    router.get('/categories', async(req, res)=>{
        res.send('test')
    })
    app.use('/admin/api', router)
}
```

此时,通过浏览器访问`http://localhost:3000/admin/api/categories`,页面会显示`test`

### 3. 引入mongoose数据库

- 由于[之前的项目](https://blog.csdn.net/piano9425/article/details/104107740)给mongoose设置了需要账户密码登录,因此此时需要给新的数据库创建一个读取权限的账户

```js
// 进入mongoDB环境
$ mongo
// 切换到管理数据库
$ use admin
// 添加身份认证
$ db.auth('root', 'root')
// 切换到要添加用户的数据库
$ use demo
// 添加读写权限的账户
$ db.createUser({user: 'marron', pwd: 'marron', roles: ['readWrite']})
```

- 添加好账户之后,就可以在`server/plugins/db.js`中写连接数据库的代码了

```js
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://marron:marron@localhost:27017/demo',{
        useNewUrlParser: true
    })
}
```

- 在主入口文件`server/index.js`中使用

```js
require('./plugins/db')(app)
```

## routes

### admin

#### index.js

##### 1. 处理图片上传

- 使用multer来处理post传递的二进制文件啊
  - `npm i multer`

```js
app.post('/admin/api/upload', async(req, res)=>{
    
})
```



## models

### Category.js

#### 1. Category规则的创建与使用

【创建规则】

使用mongoose,创建数据库的Category集合的规则

```js
// server/models/Category.js
const mongoose = require('mongoose')

const schema = new monsoose.Schema({
    name: { type: String}
})
module.exports = mongoose.model('Category', schema)
```

【使用规则】

假设在路由`/admin/api/categories`中想用Category规则.

```js
// server/routes/admin/index.js
module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  app.use('/admin/api', router)
}
```

上面涉及到,post的引用和跨域,在后端的主入口文件`server/index.js`中配置如下:

```js
// 跨域
app.use(require('cors')())
// post请求参数的使用,通过req.body使用
app.use(express.json())
```

#### 2. 数据库的操作

【新增信息】

```js
router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
})
```

【查询信息】

限制10条

```js
router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
})
```

【根据id查找信息】

```js
router.get('/categories/:id', async(req, res)=>{
    const model = await Category.findById(req.params.id)
    res.send(model)
})
```

【根据id修改信息】

```js
router.put('/categories/:id', async(req, res)=>{
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
})
```

【根据id删除信息】

```js
// this.$http.delete(`categories/${row._id}`)
router.delete('/categories/:id', async(req, rex)=>{
    await Category.findByIdAndDelete(req.params.id);
    res.send({
        success: true
    })
})
```

【规则添加关联】

```js
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: { sype: String},
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})
module.exports =  mongoose.model('Category', schema)
```

关联查询

```js
router.get('/categories', async(req, res)=>{
    const items = await Categories.find().pupolate('parent').limit(10)
    res.send(items)
})
```

#### 3. 通用的 CRUD 的接口

- 现有静态接口如下:

```js
const express = require('express');
const app = express();
const Category = require('../../models/Category.js')
const router = express.Router();
router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
}
router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})
router.get('/categories',async (req, res) => {
    const items = await Category.find()
      .populate('parent')
      .limit(10)
    res.send(items)
})
router.get('/categories/:id',async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
})
router.delete('/categories/:id',async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
})
app.use('/admin/api', router)
```

- 使用通用接口改写如下

```js
const express = require('express');
const app = express();
const router = express.Router({
    mergeParams: true    // 将父级的url参数合并到子路由中,让子路由可以用到父级的url参数
});
router.post('/', ()=>{})
router.put('/:id', ()=>{})
router.get('/')
router.get('/:id')
router.delete('/:id')
app.use('/admin/api/rest/:resource')
```

【 将小写的复数形式,转换成大写的单数形式】

- `npm i inflection`

```js
router.get('/categories', async(req, res)=>{
    const modelName = require('inflection').classify(req.params.resource)
    console.log(modelName)
})
app.use('/admin/api/rest/:resource')
```

上面如果发生url为`http://localhost:3000/admin/api/rest/categories`,那么输出的将是`Category`

- 使用中间件将将小写复数(`categories`)转换成大写但单数(`Category`)

```js
app.use('/admin/api/rest/:resource', async(req, res, next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
}, router)
```

<b>最终的通用接口形式如下</b>

```js
module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.get('/', async (req, res) => {
    const items = await req.Model.find()
      .populate('parent')
      .limit(10)
    res.send(items)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )
}
```

#### 4. 可扩展的关联查询

- 上述写成通用接口以后

```js
router.get('/',async(req, res)=>{
    const items = await req.Model.find()
     .populate('parent')
     .limit(10)
    res.send(items)
})
```

其中的关联查询.populate并不合适了,因为后续,可能关联查询别的.因此做改进如下:

```js
router.get('/',async(req, res)=>{
    const queryOptions = {}
    if(req.Model.modelName === 'Category'){
        queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
})
```

### Item.js

- 装备规则:
  - 装备名字: String字段
  - 装备图标: String字段. 会上传图片,将图片存储在磁盘上.将路径存储在装备图标的String字段



# 其他操作

## 上传图片

- 如果有图片则显示图片,否则显示图标

```html
<img v-if="model" :src="model.icon" class="avatar" />
<i v-else class="el-icon-plus avatar-uploader-icon"></i>
<!-- 如果有图片则显示图片,否则显示图标 -->
```

***

- action: 上传时,发送请求的URL
- on-success: 成功之后的操作, 写在Vue的methods中

```html
<el-upload
   class="avatar-uploader"
   :action="$http.defaults.baseURL + '/upload'
   :on-success="afterLoader"
>
```

***

- express中本身是无法处理上传的二进制文件的.
- 使用multer第三方库来实现

```js
$ npm i multer

const multer = require('multer')
const upload = multer({dest: __dirname + '/../../uploads'})

app.post('/admin/api/upload',upload.single('file') ,async(req, res)=>{
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
})

// 其中 dest: 代表上传的地址,即保存在哪个磁盘内
// req自身是没有req.file的,是通过中间件 upload.single('file') 加上去的 
// file.url是图片在服务端的地址
```

***

- 将图片资源暴露出去
- 在服务端的src目录下的 index.js

```js
app.use('/uploads', express.static(__dirname + '/uploads'))
```

***

- 上传成功后,在前端显示图片

```html
<el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :on-success="afterUpload"></el-upload>

<script>
    export default {
        methods: {
            afterUpload(res){
                this.$set(this.model, 'icon', res.url)
            }
        }
    }
    // 使用this.$set的原因是,vue 2.0 响应式的缺陷: model属性的赋值,有时候无法响应式监听到
</script>
```

## element UI中 table显示图标

```html
<el-table-column prop="icon" label="图标">
    <template slot-scope="scope">
        <img :src="scope.row.icon" alt="" style="height: 3em" />
    </template>
</el-table-column>

<!-- scope.row在elementUI中指向当前行 -->
```



## axios基本配置

- 写在src目录下的 http.js 文件中

```js
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http
```

- 在根目录 src 下的 main.js中引用 axios配置

```js
import http from './http'
Vue.prototype.$http = http
```

经过以上配置,就可以在Vue中使用 $http 访问到 配置的`http://localhost:3000/admin/api`了

## express中静态资源暴露

使用express生成的服务中,想要被访问的东西可见一定要写路由. 可以尝试使用 express.static方法暴露被显示的东西(静态文件托管)

```js
app.use('/uploads', express.static(__dirname + '/uploads'))
```

## 英雄与分类关联

英雄可以分为战士、法师、此客、射手. 需要将英雄与这些分类关联起来,在新增英雄的时候,选择对应的分类.而不是自己输入哪个类型

```js
// 在mongoose中做关联
const mongoose = require('mongoose')

// 分类的父类 也是分类, 即 自己和自己做关联
const schema = new mongoose.Schema({
    name: { type: String},
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

// 英雄与分类(Category)关联
const schema = new mongoose.Schema({
    name: { type: String},
    avatar: { tpye: String},
    title: {type: String},
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})
```

一个英雄可能有多个分类: 露娜可以是 战士/法师.改进如下

```js
const schema = new mongoose.Schema({
    name: {type: String},
    avatar: { type: String},
    title: { type: String},
    category: [ {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} ]
})
```

## 多选下拉框

英雄的分类可以有多个: 如露娜可以是 战士和法师

```html
<template>
    <el-form-item label="类型">
        <el-selcet v-model="model.categories" multiple>
            <el-option
               v-for="item of categories"
               :key="item._id"
               :label="item.name"
               :value="item._id"
            ></el-option>
        </el-selcet>
    </el-form-item>
</template>
<!-- 上面循环categories中的数据, 将之绑定在model.categories上 -->
<script>
    // 请求数据库中的数据
    export default{
        props: {
            id: {}
        },
        data(){
            return {
                model:{
                    categories: []
                }
            }
        },
        methods:{
            async fetchCategories(){
                const res = await this.$http.get('rest/categories')
                this.categories = res.data
            }
        }
    }
</script>
```

- 上述能使用`this.$http.get`的原因,是在根目录的src/main.js中引入了配置好的src/http.js文件

```js
// src/http.js
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http
```

```js
// src/main.js
import http from './http'
Vue.prototype.$http = http
```

## 在elementUI中使用tabs切换

英雄本身涉及到多个不同的方面: 基本信息、技能.因此使用elementUI中的tabs进行切换输入

```html
<el-tabs tpye="border-card" value="skills">
    <!-- 基本信息 -->
    <el-tab-pane label="基本信息">
    </el-tab-pane>
    <!-- 技能 -->
    <el-tab-pane label="技能" name="skills">
    </el-tab-pane>
</el-tabs>
```

## 富文本编辑器

在某些页面(如文章详情页面),需要某些字体加粗之类的操作.这个时候需要一个富文本编辑器. elementUI本身不带富文本编辑器,在[npm](https://www.npmjs.com/package/vue2-editor)找到一个vue2-editor.下面介绍如何使用

- `安装vue2-editor`

```js
$ npm install vue2-editor
```

- 使用vue2-editor

```html
<template>
    <div id="app">
        <vue-editor v-model="content"></vue-editor>
    </div>
</template>
<script>
    import { VueEditor } from 'vue2-editor'
    
    export default{
        component:{
            VueEditor
        },
        data(){
            return {
                content: `<h1>Some inital content</h1>`
            }
        }
    }
</script>
```

- vue2-editor自带的处理图片的组件,默认会将图片转换成base64编码(可能很大),因此需要调用以下接口,自己处理图片

```html
<template>
    <div id="app">
        <vue-editor id="editor"
        useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="htmlForEditor">
        </vue-editor>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    export default {
        components: {
            VueEditor
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader){
              const formData =  new FormData()
              formData.append('file', file)
              const res = await this.$http.post('upload', formData) // 返回结果是图片在服务器中的地址
              Editor.insertEmbed(cursorLocation, "image", res.data.url)  // 在指定位置(cursorLocation)处,插入一张图片,图片的地址是 res.data.url
              resetUploader()  // 重写加载富文本编辑器
            }
        }
    }
</script>
```

## 密码的处理

在做管理员账户密码的时候,密码通常需要进行加密处理,这样可以更好的保护用户隐私.下面从前端开始,在创建的时候.一步一步到后端

```html
<!-- 使用 elementUI -->
<div class="about">
	<el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
<!-- @submit.native.prevent="save": 阻止了表单的默认提交,并将其提交方法保存在save函数中 -->
<script>
    export default{
        data(){
            return{
                model: {}
            }
        },
        methods{
        	async save(){
                await this.$http.post('rest/admin_users', this.model)
            }
    	}
    }
</script>
```

在点击提交按钮后,会在异步函数(async)中执行`this.$http.post()`,这个方法之所以能够使用,是因为在`src/http.js`中,有如下配置

```js
// src/http.js
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

export default http
```

并在`src/main.js`中将http对象引入,并挂载到Vue的原型上

```js
// src/main.js
import http from './http.js'
Vue.prototype.$http = http
```

因此,上面`await this.$http.post('rest/admin_users', this.model)`实际上请求的网址是:`http://localhost:3000/admin/api/rest/admin_users`。

有了URL就可以通过URL与后端进行交互了。此时后端必然在监听3000端口下的路由:

```js
// server/index.js
const express = require('express')
const app = express()

require('./routes/admin')(app)

app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})
```

路由是对通用接口的处理

```js
// server/routes/admin/index.js
module.exports	= app =>{
    const express = require('express')
    const router = express.Router({		// 导入父级参数到子级的配置
        mergeParams: true
    })
    app.use('/admin/api/rest/:resource', async(req, res, next)=>{
        const modelName = require('inflection').classify(req.paramas.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}
```

上述使用了中间件,在请求url地址为 `http://localhost:3000/admin/api/rest/XXXs`的时候,会通过中间件.将XXXs变为XXX

如请求网址为`http://localhost:3000/admin/api/rest/ads`,中间件中的第三方模块`inflection`会将`ads`转换成Ad.然后加载Ad的模型(mongoose提供的一个操作数据库的接口),并将该API挂载到req.Model上

【言归正传】.

在新建管理员界面.输入用户名密码,然后点击提交键

此时会发送一个POST请求,URL:`http://localhost:3000/admin/api/rest/admin_users`。密码传入到后端后.需要进行加密处理(这里使用bcrypt).在Model层

```js
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String},
    password: { 
        type: String,
        select: false,			// 密码无法被查询到。保证用户信息的安全
        set(val) {
            // 使用mongoose的劫持函数,在密码输入的时候,调用第三方模块 bycrypt 将输入的密码变为10位数的散列函数(使用前,先按照 npm i bcrypt)
            return require('bcrypt').hasSync(val, 10)
        }}
})
```

> 建议使用bcrypt做密码的散列

## 登录

### 界面

使用Vue2.x + elementUI实现的登录界面

```html
<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <!-- @submit.native.prevent阻止表单的默认提交行为,并将提交的事件处理函数,绑定到login上 -->
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
```

### 逻辑

- 前端传入用户名和密码

```html
<template>
    <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data(){
            return {
                model: {}
            }
        },
        methods:{
            async login(){
                // post提交数据,返回的是一个token
                const res = await this.$http.post('login', this.model)
            }
        }
    }
</script>
```

- 后端得到数据后,与数据库进行对比
  - 根据用户名,查找数据库中的用户信息
  - 对密码使用bcrypt的对比操作
- 通过验证后,返回一个token

```js
app.post('/admin/api/login', async(req, res)=>{
    const { username, password } = req.body
    const AdminUser = require('../../models/AdminUser')
    // 根据用户名 查找数据库中的用户信息
    const user = await AdminUser.findOne({username}).select('+password')
    if(!user) return res.status(422).send({message:'用户名不存在'})
    
    // 走到这里,用户查找到了
    const isValid = password && user.password && require('bcrypt').compareSync(password, user.password)
    if(!isValid) return res.status(422).send({ message:'密码错误'}) 
    
    // 到这里就使用jwt生成token并返回了
    // 首先需要安装: npm i jsonwebtoken
    const token = jwt.sign({id: username._id}, app.get('secret'))
    res.send({token})
})

```

>注意: 上面的jwt.sign接收2个参数,第一个应该是作为区分的一个对象.如用户的id. 第二个是一个密钥字符串.在express中使用app.set('secret', 'Marron'),将密钥保存在全局app中. 之后使用app.get('secret')获取该密钥.
>
>jwt.sign返回一个散列值,就是我们需要的token

### 异常处理

http响应并不总是成功的,比如在登录这一块.用户名或密码很容易不成功.这个时候就会返回一个403 forbidden,其中一个比较好的解决方案是: 使用axios的拦截器,对http的返回进行拦截. 若发生错误,使用Vue原型上面的`$message.error`(前面已经使用elementUI挂载了)方法给出错误提示

```js
// admin/src/http.js
import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 拦截返回的http
http.interceptors.response.use(
    res=>{
        // http响应是成功的
        return res
    },
    err=>{
        if(err.message.response.data.message){
             // http响应失败.使用Vue原型上面的方法弹出错误
            Vue.prototype.$message.error({
                type: 'error',
                message: err.message.response.data.message
            })
            return Promise.reject(err)
        }
    }
)
```

### 前端得到token

1. 前端得到token中,首先将其保存在浏览器缓存中(sessionStorage或localStorage)
2. 然后跳转到首页,在vue中使用`this.$router.push('/')`
3. 弹出提示框,登录成功, 在vue2.x + elementUI中使用`this.$message({ type:'success', message:'登录成功'})`

```html
<template>
    <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data(){
            return {
                model: {}
            }
        },
        methods:{
            async login(){
                // post提交数据,返回的是一个token
                const res = await this.$http.post('login', this.model)
                // 将token存入localStorage中(前端磁盘),浏览器关闭了,下次还能访问到
                localStorage.token = res.data.token
                // 跳转到首页
                this.$router.push('/')
                // 弹出登录成功
                this.$message({
                    type: 'success',
                    message: '登录成功'
                })
            }
        }
    }
</script>
```

## 登录验证

### 前端请求添加token

如果用户登录了,那么在浏览器的localStorage中必然会保存token.在发送登录请求给后端时,需要带上这个token.在axios中使用全局的请求拦截(`http.interceptors.request.use`)来实现这个功能

```js
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(
    config => {
        if(localStorage.token) {
            // 给请求头部加token
            config.headers.Authorization = 'Bearer ' + localStorage.token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 在使用`config.headers.Authorization`之后,每次http请求都会附带一个 Authorization 请求头.
// Authorization值的最前面加 'Bearer '的原因是为了符合规范
```

在添加好了对所有路由的前端请求拦截后,如果因为登录原因,出现的错误.后端一般返回的是401状态码,这个时候,需要跳转到登陆页面,下面对状态码 401 的返回值进行处理

```js
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.response.use(
    res => { return res},
    err => {
        // 这里处理报错
        if(err.response.data.message){
            Vue.prototype.$message.error({
                type: 'error',
                message: err.response.data.message
            })
            
            // 处理401状态码: 跳转到登陆页面
            if(err.response.status == 401) router.push('/login')
        }
    }
)
```

### 后端解析请求头,验证token

以上实现了前端在发送http请求时,携带token(放在Authorization请求头部中),后端需要在前端通过URL请求非登陆接口时,判断用户是否登录.可以写一个登陆验证的中间件. 如果在对正常的路径进行处理之前,先通过中间件验证.

中间件的逻辑如下:

- 首先通过`req.headers.authorization`获取token,若无token则设置为 `''`
  - 若token存在则继续下一步,否则使用`assert`抛出异常
- 然后使用`jwt`验证token.得到解码后的id
  - 若存在id,则证明token没有被篡改,继续下一步,否则`assert`抛出异常
- 最后根据id在数据库中查询user.并将user赋给`req.user`.
  - 若存在req.user则跳转到下一个中间件,否则使用`assert抛出异常`

```js
// sever/middleware/auth.js
module.exports = options =>{
    const assert = require('http-assert') // 简化代码
    const jwt = require('jsonwebtoken')	// 用于将token密文解析为明文
    const AdminUser = require('../models/AdminUser') // 获取AdminUser模型
    return async(req, res, next)=>{
        // 获取token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登陆')	// 这里若无token: 则代表未登陆
        const {id} = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登陆')  // 这里若无id: 则代表token过期或被篡改了
        req.user = AdminUser.findById(id)
        assert(req.user, 401, '请先登录') // 这里若没用找到user, 则代表给的是假id
        await next()
    }
}
```

以上提供了一个中间件: 它判断token是否存在(正确),若不正确则抛出异常.若正确则继续下一个中间件.在主路由中导入.并在需要的地方添加这个中间件

```js
// server/router/admin/index.js
module.exports = app => {
    const express = require('express')
    const authMiddleware = require('../../middleware/auth')
    const router = express.router({
        mergeParams: true
    })
    
    app.use('/admin/api/rest/:resource', authMiddleware(), router)
}
```

上面使用了assert抛出异常,因此还需要一个错误捕捉中间件,放在所有路由的最后,用于捕捉错误,它会将捕获到的异常,作为参数传递给前端.这样前端就能根据状态码做出响应的处理了

```js
// server/router/admin/index.js
module.exports = app => {
    const express = require('express')
    const authMiddleware = require('../../middleware/auth')
    const router = express.router({
        mergeParams: true
    })
    
    // 放到所有路由的后面
    app.use(async (err, req, res, next)=>{
        console.log(err)
        res.status(err.statesCode || 500).send({ message: err.message})
    })
}
```

## 前端路由校验

上面已经完成了,在发送Http请求时,进行路由校验.若401则跳转到登陆页面.但是,那些不需要HTTP请求的网页还是可以不需要登陆就能直接访问.下面有必要做前端的路由校验

【具体实现如下】:

- 将不需要登陆的就能访问的(主要是是Login组件)路由,添加一个`{isPublic: true}`属性
- 然后使用全局前置守卫,在进入路由前判断`localStorage`中是否存在token.若存在,则进行下一步,否则跳转到登陆页面. 而登陆页面设置了公开访问属性,因此不会触发全局前置守卫

```js
// admin/src/router/index.js
import Vue from 'vue'
import VurRouter from 'vue-router'
const routes = [
    { 
        path: '/login',
        name: 'login',
        component: Login,
        meta: { isPublic: true}
    },
    {
        path: '/',
        name: 'main',
        component: Main,
        children: [ ... ]
    }
]
const router = new VueRouter({
  routes      
})

router.beforeEach((to, from, next) =>{
    if(!to.meta.isPublic && localStorage.token){
        return next('/login')
    }
    next()
})
export default router
```

在主函数中加载路由,并渲染更新

```js
// admin/src/main.js
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
```

## 使用element上传组件发送http请求时,发送token验证

在添加了登陆功能后, axios做的路由守卫只能针对使用axios发起的路由, 使用elementUI的upload上传图片时,会染过axios,因此请求头部是不带Athroization的.因此需要带上token

### mixin

Vue的高级语法,在主组件中添加一个方法,相当于写在各个组件中

```js
// admin/src/main.js
Vue.mixin({
    methods:{
        getAuthHeaders(){
            return {
                Authorization: `Bearer ${localStorage.token || ''}`
            }
        }
    }
})
```

之后就可以在各个子组件的elementUI的 upload组件中使用这个方法,添加token首部了

```html
<!-- admin/src/views/ItemEdit.vue -->
<template>
    <div class="about">
        <el-form @submit.native.prevent="save">
            <el-form-item label="图标">
                <el-upload
                   class="avatar-uploader"
                   :action="$http.defaults.baseURL" + '/upload'"
                   :headers="getAuthHeaders()"
                   :show-file-list="false"
                   :on-success="afterUpload">
                   <img v-if="model.icon" :src="model.icon" class="avatar" />
                   <i v-else class="el-icon-plus avatar-uploaders-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>
```









