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

// 查询用户集合中的所有文档
// User.find().then(result => console.log(result));

// 通过_id字段查找文档
// User.find({ _id: '5e2d11f96c42a8b00fe16ce1' }).then(res => console.log(res))

// 查找一个,不传参数则默认返回第一条文档
// User.findOne({name: "李四"}).then(res=>{console.log(res)});

// 查询用户集合中年龄字段大于20,且小于40的用户
// User.find({ age: { $gt: 20, $lt: 40 } }).then(res => console.log(res))

// 匹配包含
// User.find({ hobbies: { $in: ['足球'] } }).then(res => console.log(res))

// // 选择要查询的字段,
// // 查询用户的名字和邮箱
// User.find()
//   .select('name email')
//   .then(res => console.log(res))

// // 查询所有爱好为足球的人的名字
// User.find({ hobbies: { $in: ['足球'] } })
//   .select('name -_id')
//   .then(res => console.log(res))

// // 查询所有用户,根据年龄(升序)排序
// User.find()
//   .sort('age')
//   .select('name age -_id')
//   .then(res => console.log(res))

// // 查询所有用户,根据年龄(将序)排序
// User.find()
//   .sort('-age')
//   .select('name age -_id')
//   .then(res => console.log(res))

// 跳过2条数据,限制2条数据,进行查询(分页用到)
User.find()
  .skip(0)
  .limit(2)
  .select('name age -_id')
  .then(res => console.log('第一页: ', res))
User.find()
  .skip(2)
  .limit(2)
  .select('name age -_id')
  .then(res => console.log('第二页: ', res))
User.find()
  .skip(4)
  .limit(2)
  .select('name age -_id')
  .then(res => console.log('第三页: ', res))
