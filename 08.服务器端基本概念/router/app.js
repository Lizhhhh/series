// 1.引入系统模块http
// 2.创建网站服务器
// 3.为网站服务器对象添加请求事件
// 4.实现路由功能
const http = require('http')
const url = require('url')
const app = http.createServer()

app.on('request', (req, res) => {
  const method = req.method.toLowerCase();
  const { pathname } = url.parse(req.url);
  res.writeHead(200,{
    'content-type': "text/html;charset=utf8"
  })

  if(method == "get" ) {  // get请求

    if(pathname == '/' || pathname == '/index') {
      res.end("欢迎来到首页")
    } else if (pathname == '/list') {
      res.end("欢迎来到列表页")
    } else {
      res.end("您访问的页面不存在");
    }

  } else if (method == "post"){ // post请求

  }
})

app.listen(3000, () => {
  console.log('The server is running at http://localhost:3000')
})
