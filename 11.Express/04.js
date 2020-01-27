const express = require('express')

const app = express()

// // 网站公告
// app.use((req,res,next)=>{
//   res.send('网站正在维护, 请于9012年在来访问...');
// })

app.use('/admin', (req, res, next) => {
  let isLogin = true

  if (isLogin) {
    next()
  } else {
    res.send('您还没有登陆, 不能访问/admin页面')
  }
})

app.get('/admin', (req, res) => {
  res.send('您已经登陆, 可以访问当前页面')
})

app.use((req, res) => {
  res.status(404).send('您访问的网站不存在!')
})

app.listen(3000, () => {
  console.log('服务器启动成功')
})
