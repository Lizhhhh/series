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

  // res.jsonp({
  //   name: 'lisi',
  //   age: 50
  // })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
