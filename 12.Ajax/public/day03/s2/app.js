const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

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

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
