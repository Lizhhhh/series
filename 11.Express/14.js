const express = require('express')
const path = require('path')
const app = express()

// 1. 告诉express框架使用什么模板引擎渲染什么后缀的模板文件
// app.engine
// 第一个参数: 是渲染的模板后缀名
// 第二个参数: 是使用什么模板引擎
app.engine('art', require('express-art-template'))

// 2. 告诉express框架模板存放的位置
// app.set(parma1, param2)
// 第一个参数: 固定的 `views`,是express内定的,告诉express框架模板存放的位置
// 第二个参数: 是模板在磁盘中的位置
app.set('views', path.join(__dirname, 'views'))

// 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')

app.get('/index', (req, res) => {
  res.render('index', {
    msg: '我是模板引擎渲染出来的'
  })
})

app.get('/list', (req, res) => {
  res.render('list', {
    msg: 'list模板引擎渲染出来的!'
  })
})

app.listen(3000, () => {
  console.log('server ok')
})
