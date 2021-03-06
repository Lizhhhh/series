const express = require('express')

const app = express()

app.set('secret', 'marron')

// 跨域
app.use(require('cors')())
// post请求参数的使用,通过req.body使用
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
