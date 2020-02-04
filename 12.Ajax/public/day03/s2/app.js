const express = require('express')
const path = require('path')
const session = require('express-session')
const formidable = require('formidable')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'marron' }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'get, post')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/test', (req, res) => {
  res.send('ok')
})

app.get('/jsonp', (req, res) => {
  const data = `fn({name: 'zhangsan', age: 20, remark: '测试jsonp'})`
  res.send(data)
})

app.get('/better', (req, res) => {
  // 注: 传送的是字符串.对象在传输过程中会显示 [Object Object]
  const data = JSON.stringify({
    name: 'zhangsan',
    age: 20,
    remark: '动态发送jsonp'
  })
  const result = `${req.query.cb}(${data})`
  res.send(result)
})

app.get('/cross', (req, res) => {

  res.send('ok')
})

app.post('/login', (req, res) => {
  // 创建表单解析对象
  var form = formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    const { username, password } = fields
    if (username == 'marron' && password == '123456') {
      // 设置session
      req.session.isLogin = true
      res.send({ message: '登录成功' })
    } else {
      res.send({ message: '登录失败,用户名或密码错误' })
    }
  })
})

app.get('/checkLogin', (req, res) => {
  if (req.session.isLogin) {
    return res.send({ message: '处于登录状态' })
  } else {
    return res.send({ message: '未登录' })
  }
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
