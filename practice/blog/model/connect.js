const mongoose = require('mongoose')

const config = require('config')

const { user, pwd, host, port, name } = config.get('db')



// 连接数据库
mongoose
  .connect(`mongodb://${user}:${pwd}@${host}:${port}/${name}`, {
    useNewUrlParser: true
  })
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.log('数据库连接失败'))

