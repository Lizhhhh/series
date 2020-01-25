// 用于创建网站服务器的模块
const http = require('http')
// app对象就是网站服务器对象
const app = http.createServer()
// 处理请求参数模块
const querystring = require('querystring')

// 当客户端有请求来的时候
app.on('request', (req, res) => {
  // post参数是通过事件的方式接受的
  // data 当请求参数传递的时候触发data事件
  // end 当请求参数完成的时候触发end事件

  let postParams = ''

  req.on('data', params => {
    postParams += params
  })
  req.on('end', () => {
    let pas = querystring.parse(postParams);
    console.log(pas);
    res.end('ok')
  })
})
// 监听端口
app.listen(3000, () => {
  console.log('The server is running at http://localhost:3000')
})
