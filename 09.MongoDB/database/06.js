// 引入mongoose第三方模块来操作数据库
const mongoose = require('mongoose')
// 连接数据库
mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  //连接成功
  .then(() => {
    console.log('连接成功!')
  })
  // 连接失败
  .catch(err => {
    console.log(err, '连接失败')
  })

// 创建集合规则
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String]
})

// 使用规则创建集合
const User = mongoose.model('User', userSchema)

// // 更新一个文档
// User.updateOne({ name: '李四' }, { name: '李狗蛋' }).then(res =>
//   console.log(res)
// )

// 更新多个文档
User.updateMany({}, { age: 56 }).then(res => console.log(res))
