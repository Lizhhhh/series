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

// // 根据_id删除一条文档
// // 返回删除的文档
// // 如果查询条件匹配了多个文档, 那么将会删除第一个匹配的文档
// User.findOneAndDelete({ _id: '5e2d166b6f7493088b520b43' }).then(res =>
//   console.log(res)
// )


// 删除多个文档
// 不传递参数默认会把集合中所有的数据都删除
// 返回值 : {n: 5, ok: 1}. ok为1表示删除成功, n为5表示删除了5条文档
// User.deleteMany({}).then(res=>console.log(res));

