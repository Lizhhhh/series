const express = require('express');

const home = express.Router();

home.get('/',(req,res)=>{
  res.send('home路由')
})

home.get('/index',(req,res)=>{
  res.send('欢迎来到博客首页')
})

module.exports = home;