const mongoose = require('mongoose')

// 连接playground数据库,如果没有会自动创建该数据库
mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err, '数据库连接失败')
  })
