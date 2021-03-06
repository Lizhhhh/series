const express = require('express')
const app = express()

// 获取POST请求
const bodyParser = require('body-parser')
// 拦截所有请求
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true  方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/add', (req, res) => {
  res.send(req.body)
})

app.listen(3000,()=>{
  console.log('server ok');
})
