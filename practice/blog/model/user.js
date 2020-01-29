// 创建用户集合规则
const mongoose = require('mongoose');
const Joi = require('joi')
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

// 验证用户信息
const validateUser = user => {
  // 定义对象的验证规则
  const schema = {
    username: Joi.string()
      .required()
      .min(2)
      .max(20)
      .error(new Error('用户名不符合规范')),
    email: Joi.string()
      .email()
      .required()
      .error(new Error('邮箱格式不符合要求')),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{6,18}$/)
      .error(new Error('密码格式不符合要求')),
    role: Joi.string()
      .required()
      .valid('normal', 'admin')
      .error(new Error('角色值不符合要求')),
    state: Joi.number()
      .valid(0, 1)
      .error(new Error('状态值不符合要求'))
  }
  // 返回验证信息
  return Joi.validate(user, schema)
}


// 将用户成员作为模块成员导出
module.exports = {
  User,
  validateUser
}
