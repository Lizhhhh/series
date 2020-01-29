const express = require('express')
const home = express.Router()

// 博客前台首页的展示页面
home.get('/', require('./home/index'))

// 博客前台文章详情展示页面
home.get('/article', require('./home/article'))

module.exports = home
