const express = require('express')
const path = require('path')
const app = express()

// 模板配置
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')

app.locals.users = [{
  name: 'zhangsan',
  age: 23
},{
  name: 'lisi',
  age: 24
}]

app.get('/index', (req, res) => {
  res.render('index')
})

app.get('/list', (req, res) => {
  res.render('list')
})

app.listen(3000,()=>{
  console.log('odk');
})
