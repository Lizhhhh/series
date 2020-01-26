// 引入http模块
const http = require('http')
// 创建网站服务器
const app = http.createServer()
// 连接数据库
require('./model/connect')
// 模板引擎处理
const template = require('art-template')
const path = require('path')
// 对时间的处理
const dateformat = require('dateformat');
template.defaults.root = path.join(__dirname, 'views')
template.defaults.imports.dateformat = dateformat
// 静态资源处理
const serveStatic = require('serve-static')
const serve = serveStatic(path.join(__dirname, 'public'))

// 引入路由
const router= require('./router/index');


// 当客户端访问服务器的时候
app.on('request', async (req, res) => {
  // 实现路由: 注意,第三个参数是必须的
  router(req, res, () => {})
  // 实现静态资源访问: 注意,第三个参数是必须的.
  serve(req, res, () => {})
})
// 监听3000端口
app.listen(80, () => {
  console.log('[Server]:The server is running at http://localhost:80')
})
