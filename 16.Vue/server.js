const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 处理静态资源
app.use(express.static('public'))
// 处理函数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/async1',(req,res)=>{
  res.send('1')
})

app.get('/async2',(req,res)=>{
  res.send(`get方式带参数: ${req.query.info}`)
})

app.put('/adata/:id', (req, res) => {
  console.log(req.body)
  res.send(`[axios]: 修改${req.params.id}的数据`)
})

app.post('/adata/', (req, res) => {
  res.json({
    id: req.body.id,
    name: req.body.name
  })
})

app.delete('/adata/:id', (req, res) => {
  res.send(`[axios]: 删除${req.params.id}`)
})

app.get('/adata', (req, res) => {
  res.send('hello axios')
})
app.get('/a1', (req, res) => {
  setTimeout(() => {
    res.send('Hello TOM')
  }, 1000)
})
app.get('/a2', (req, res) => {
  setTimeout(() => {
    res.send('Hello Marron')
  }, 2000)
})
app.get('/a3', (req, res) => {
  setTimeout(() => {
    res.send('Hello June')
  }, 3000)
})

app.get('/books', (req, res) => {
  res.send('传统URL传递参数!' + req.query.id)
})

app.get('/books/:id', (req, res) => {
  res.send('Restful形式的URL传递参数!' + req.params.id)
})

app.delete('/books/:id', (req, res) => {
  res.send('Restful形式的URL传递参数! 删除id为:' + req.params.id)
})

app.post('/books', (req, res) => {
  res.send(
    'Restful形式的post传递方式 uname:' + req.body.uname + ' pwd:' + req.body.pwd
  )
})

app.put('/books/:id', (req, res) => {
  res.send(
    `修改了编号为: ${req.params.id},数据如下:${req.body.uname} ,${req.body.pwd} `
  )
})

app.get('/json', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 26
  })
})

app.get('/data', (req, res) => {
  res.send('Hello World!')
})
app.get('/data1', (req, res) => {
  res.send('Hello Jerry!')
})
app.get('/data2', (req, res) => {
  res.send('Hello TOM!')
})
app.get('/data3', (req, res) => {
  res.send('Hello Marron!')
})

app.get('/promise', (req, res) => {
  res.send('specail API for promise')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
