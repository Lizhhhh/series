// 引入mongoose第三方模块, 用来操作数据库
const mongoose = require('mongoose')

// 连接数据库
mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  // 连接成功
  .then(() => console.log('数据库连接成功'))
  // 连接失败
  .catch(err => console.log(err, '数据库连接失败'))

// 用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// 文章集合规则
const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// 用户集合
const User = mongoose.model('User', userSchema)
// 文章集合
const Post = mongoose.model('Post', postSchema)

// // 创建用户
// User.create({ name: 'Marron' }).then(res => console.log(res))

// // 创建文章
// Post.create({ title: '123', author: '5e2d2c8642cdd60d387ac74a' }).then(res =>
//   console.log(res)
// )

// 查询.
// Post.find().then(res => console.log(res))

// User里面显示具体的用户信息
Post.find()
  .populate('author')
  .then(res => {
    console.log(res)
  })
