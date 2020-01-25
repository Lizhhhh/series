const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const app = http.createServer()

app.on('request', (req, res) => {
  // 获取用户的请求的路径
  let { pathname } = url.parse(req.url)

  pathname = pathname == '/' ? '/default.html' : pathname

  // 将用户的请求路径转换为实际的服务器硬盘路径
  const realPath = path.join(__dirname, 'public', pathname)

  let type = mime.getType(realPath)

  fs.readFile(realPath, (err, result) => {
    if (err == null) {
      // 给请求参数写头部
      res.writeHead(200, {
        'content-type': type
      })
      res.end(result)
    } else {
      res.end('文件读取失败')
    }
  })
})

app.listen(3000, () => {
  console.log('[Server]: The server is running at http://localhost:3000')
})
