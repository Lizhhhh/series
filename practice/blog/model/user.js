// 创建用户集合规则
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true // 保证邮箱地址在插入数据库时不重复
  },
  password: {
    type: String,
    required: true
  },
  role: {
    // admin: 超级管理员   normal: 普通用户
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0 // 0: 启用状态 1:禁用状态
  }
})

const User = mongoose.model('User', userSchema)

// const bcrypt = require('bcryptjs')
// const createUser = async () => {
//   const salt = await bcrypt.genSalt(10)
//   const pass = await bcrypt.hash('123456', salt)
//   const user = await User.create({
//     username: 'Marron',
//     email: '543288744@qq.com',
//     password: pass,
//     role: 'admin',
//     state: 0
//   })
// }

// createUser();

// 将用户成员作为模块成员导出
module.exports = {
  User
}
