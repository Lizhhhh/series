const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/base', (req, res) => {
  res.send({ name: 'zhangsan', age: 18 })
})

app.post('/base', (req, res) => {
  res.send({ name: 'zhangsan', age: 18 })
})

app.post('/user', (req, res) => {
  res.send(req.body)
})

app.get('/jsonp', (req, res) => {
  const fn = req.query.cb
  const data = fn + '({name: "zhaoliu"} )'
  res.send(data)
})

// 获取用户列表信息
app.get('/users', (req, res) => {
  res.send('当前是获取用户列表信息的路由')
})

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
  const id = req.params.id
  res.send(`当前我们是在获取id为${id}用户信息`)
})

app.delete('/users/:id', (req, res) => {
  const id = req.params.id
  res.send(`当前我们是在删除id为${id}用户`)
})
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  res.send(`当前我们是在修改id为${id}用户信息`)
})

app.get('/xml',(req, res)=>{
  res.header('content-type','text/xml')
  res.send(`
  <message>
    <title>
      消息标题
    </title>
    <content>
      消息内容
    </content>
  </message>
  `)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
