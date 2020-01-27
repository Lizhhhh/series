const express = require('express')
const admin = express.Router()

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'))

// 渲染用户列表路由
admin.get('/user', require('./admin/userPage'))

// 登录逻辑实现
admin.post('/login', require('./admin/login'))

// 实现退出功能
admin.get('/logout', require('./admin/logout'))

module.exports = admin
