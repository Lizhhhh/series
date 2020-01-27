const express = require('express')
const fs = require('fs')

const app = express()

app.get('/index', (req, res, next) => {
  // throw new Error('程序发生未知错误');
  fs.readFile('./01.js', 'utf8', (err, doc) => {
    if (err != null) {
      next(err)
    } else {
      res.send(doc)
    }
  })
  // res.send('程序正常执行')
})

// 错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
