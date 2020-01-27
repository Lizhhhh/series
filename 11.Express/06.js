const express = require('express')
const fs = require('fs')
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)
const app = express()

app.get('/index', async (req, res, next) => {
  try {
    await readFile('./aaa.js')
  } catch (ex) {
    // 手动触发错误处理中间件
    next(ex)
  }
})

// 错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(3000, () => {
  console.log('服务器启动成功!')
})
