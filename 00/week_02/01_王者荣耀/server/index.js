const express = require('express')

const app = express()

// 跨域
app.use(require('cors')())
// post请求参数的使用,通过req.body使用
app.use(express.json())


require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
