// 用于创建网站服务器的模块
const http = require('http');
// 用于处理url地址
const url = require('url');

// app对象就是网站服务器对象
const app = http.createServer()

// 当客户端有请求来的时候
app.on('request', (req, res) => {
  // 获取请求方式
  // req.method
  // console.log(req.method);

  // 获取请求地址: req.url
  // console.log(req.url);

  // 获取请求报文信息
  // req.headers
  // console.log(req.headers['accept']);


  // res.writeHead(500);
  res.writeHead(200,{
    'content-type': 'text/html;charset=utf8',
  });

  let {query, pathname} = url.parse(req.url, true);
  console.log(query.name);
  console.log(query.age);


  if(pathname == '/index' || pathname == "/"){
    res.end('<h1>欢迎来到首页</h1>');
  } else if (pathname == "/list"){
    res.end('welcome to listpage');
  } else {
    res.end('not found');
  }

  // if(req.method == "POST"){
  //   res.end('POST');
  // } else if( req.method == "GET"){
  //   res.end('GET');
  // }
  // res.end('<h2>Hello user</h2>')
})

app.listen(3000,()=>{
  console.log("The server is running at http://localhost:3000");
})