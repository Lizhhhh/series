const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/test', (req, res) => {
  res.send('ok')
})

app.get('/jsonp',(req, res)=>{
  const data = `fn({name: 'zhangsan', age: 20, remark: '测试jsonp'})`;
  res.send(data);
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
