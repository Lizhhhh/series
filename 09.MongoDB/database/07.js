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
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '文章标题是必填项'],
    minlength: [2, '标题名称最小为2'],
    maxlength: [5, '标题名称最大为5'],
    trim: true
  },
  age: {
    type: Number,
    // 数值的最小范围
    min: [18, '年龄值最小为18'],
    max: 100
  },
  publishData: {
    type: Date,
    // 默认值
    default: Date
  },
  category: {
    type: String,
    // 枚举, 只能传递数组中所枚举出来的值
    enum: {
      values: ['html', 'css', 'javascript', 'node.js'],
      message: 'category属性只能是 html, css, javascript 或 node.js'
    }
  },
  author: {
    type: String,
    // 自定义验证规则
    validate: {
      validator: v => {
        // 返回布尔值
        // true 验证成功
        // false 验证失败
        // v:插入数据库时传递的值
        return v && v.length > 4
      },
      // 自定义错误信息
      message: '传入的值不符合规则'
    }
  }
})

// 使用规则
const Post = mongoose.model('Post', postSchema)

Post.create({ title: 'aa', age: 60, category: 'java', author: 'bd' })
  .then(res => console.log(res))
  .catch(error => {
    // 获取错误信息对象
    const err = error.errors
    // 循环错误信息对象
    for (let attr in err) {
      // 将错误信息打印到控制台中
      console.log(err[attr]['message'])
    }
  })
