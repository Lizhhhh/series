const express = require('express')
const admin = express.Router()

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'))
admin.get('/', require('./admin/loginPage'))

// 渲染用户列表路由
admin.get('/user', require('./admin/userPage'))

// 登录逻辑实现
admin.post('/login', require('./admin/login'))

// 实现退出功能
admin.get('/logout', require('./admin/logout'))

// 新增用户页面
admin.get('/user-edit', require('./admin/userEditPage'))

// 新增用户
admin.post('/user-edit', require('./admin/userEdit'))

// 修改用户
admin.post('/user-modify',require('./admin/userModify'))

// 删除用户
admin.get('/delete', require('./admin/userDelete'))

// 文章列表页面路由
admin.get('/article',require('./admin/article'))

// 文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'))

// 实现文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))


module.exports = admin
