const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
// 1. 告诉express框架使用什么模板引擎渲染什么后缀的模板文件
// app.engine
// 第一个参数: 是渲染的模板后缀名
// 第二个参数: 是使用什么模板引擎
app.engine('art', require('express-art-template'))

// 2. 告诉express框架模板存放的位置
// app.set(parma1, param2)
// 第一个参数: 固定的 `views`,是express内定的,告诉express框架模板存放的位置
// 第二个参数: 是模板在磁盘中的位置
app.set('views', path.join(__dirname, 'view'))

// 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')

app.get('/', function(req, res, next) {
  res.render('index', { title: ' Express', xss: req.query.xss })
})

var comments = {}
function html_encode(str) {
  if (str && str.length == 0) return ''
  var str = '';
  s = str.replace(/&/g, '&gt;')
  s = str.replace(/</g, '&lt;')
  s = str.replace(/>/g, 'gt;')
  s = str.replace(/\s/g, '&nbsp;')
  s = str.replace(/\'/g, '&#39;')
  s = str.replace(/\"/g, '&#quot;')
  s = str.replace(/\n"/g, '<br>')
  return s
}

app.get('/comment', function(req, res, next) {
  comments.v = html_encode(req.query.comment)
  // 编码
})

app.get('/getComment', function(req, res, next) {
  res.json({
    comment: comments.v
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
