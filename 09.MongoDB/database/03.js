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
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: Array,
  isPublished: Boolean
})

// 使用规则创建集合
// 第一个参数首字母必须大写, Course -> courses
const Course = mongoose.model('Course', courseSchema) // courses

// Course.create(
//   {
//     name: 'JavaScript基础',
//     author: 'Marron',
//     tags: ['javascript'],
//     isPublished: false
//   },
//   (err, doc) => {
//     console.log(err)
//     console.log(doc)
//   }
// )

Course.create({
  name: 'JavaScript基础',
  author: 'Marron',
  tags: ['javascript'],
  isPublished: false
})
  .then(doc => console.log(doc))
  .catch(err => console.log(err))
