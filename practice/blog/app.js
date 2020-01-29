const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

// 使用config
const config = require('config');
console.log(config.get('title'))

if (process.env.NODE_ENV === 'development') {
  console.log('当前环境是开发环境')
  app.use(morgan('dev'))
} else {
  console.log('当前环境是生产环境')
}

// 连接数据库
require('./model/connect')

// 配置session
const session = require('express-session')
app.use(session({ secret: 'Marron' }))

// 开发静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 配置模板引擎
app.set('views', path.join(__dirname, 'views')) // 模板的路径
app.set('view engine', 'art') // 模板的默认后缀
app.engine('art', require('express-art-template')) // 使用什么模板引擎
// 在模板引擎中使用dateformat
const template = require('art-template')
const dateformat = require('dateformat')
template.defaults.imports.dateformat = dateformat

// 配置获取post参数
const bodyParser = require('body-parser')
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true  方法内部使用第三方模块qs处理请求参数的格式
// 拦截所有请求
app.use(bodyParser.urlencoded({ extended: false }))

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 拦截 -> 路由守卫
app.use('/admin', require('./middleware/loginGuard'))

app.use('/home', home)
app.use('/admin', admin)

// 错误处理 -> 重定向 -> 路由守卫
app.use(require('./middleware/errorGuard.js'))

app.listen(80, () => {
  console.log('[Server]The server is running at http://localhost')
})
