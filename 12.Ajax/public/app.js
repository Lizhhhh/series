const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const formidable = require('formidable')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser())
app.get('/first', (req, res) => {
  res.send('Hello Ajax')
})

app.get('/responseData', (req, res) => {
  res.send({ name: 'zs' })
})

app.get('/get', (req, res) => {
  res.send(req.query)
})

app.post('/post', (req, res) => {
  res.send(req.body)
})

app.post('/json', (req, res) => {
  res.send(req.body)
})

app.get('/readystate', (req, res) => {
  res.send('hello')
})

app.get('/error', (req, res) => {
  res.status(400).send('bad request')
})

app.get('/cache', (req, res) => {
  fs.readFile('./list.txt', (err, result) => {
    res.send(result)
  })
})

app.get('/verifyEmailAdress', (req, res) => {
  const email = req.query.email
  if (email == '543288744@qq.com') {
    return res.status(400).send({ message: '邮箱已经注册,请更换其他邮箱地址' })
  }
  res.send({ message: '恭喜,邮箱可以使用' })
})

app.get('/searchAutoPrompt', (req, res) => {
  const key = req.query
  if (key == '黑' || key == '黑马') {
    return res.send([
      '黑马程序员',
      '黑马程序员官网',
      '黑马程序员顺义校区',
      '黑马程序员学院报名系统'
    ])
  }
  res.send(['栗子', '栗子好好吃', '栗子好好吃的博客'])
})

app.get('/province', (req, res) => {
  res.send([
    {
      id: '001',
      name: '黑龙江省'
    },
    {
      id: '002',
      name: '四川省'
    },
    {
      id: '003',
      name: '河北省'
    },
    {
      id: '004',
      name: '江苏省'
    }
  ])
})

app.get('/cities', (req, res) => {
  const id = req.query.id
  if (id == '001') {
    // 黑龙江省
    return res.send([
      {
        id: '100',
        name: '哈尔滨市'
      },
      {
        id: '101',
        name: '齐齐哈尔市'
      },
      {
        id: '102',
        name: '牡丹江市'
      },
      {
        id: '103',
        name: '佳木斯市'
      }
    ])
  }
  if (id == '002') {
    // 四川省
    return res.send([
      {
        id: '200',
        name: '成都市'
      },
      {
        id: '201',
        name: '绵阳市'
      },
      {
        id: '202',
        name: '德阳市'
      },
      {
        id: '203',
        name: '攀枝花市'
      }
    ])
  }
  if (id == '003') {
    return res.send()
  }
  if (id == '004') {
    return res.send()
  }
})

app.get('/areas', (req, res) => {
  const id = req.query.id
  if (id == '100') {
    return res.send([
      {
        id: '10001',
        name: '道里区'
      },
      {
        id: '10002',
        name: '南岗区'
      },
      {
        id: '10003',
        name: '平房区'
      },
      {
        id: '10004',
        name: '松北区'
      }
    ])
  }
  if (id == '101') {
    return res.send([
      {
        id: '10101',
        name: '龙沙区'
      },
      {
        id: '10102',
        name: '铁锋区'
      },
      {
        id: '10103',
        name: '富拉尔基区'
      }
    ])
  }
})

app.post('/formData', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {
    res.send(fields)
  })
})

// 实现文件上传的路由
app.post('/upload', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 设置客户端上传文件的存储路径
  form.uploadDir = path.join(__dirname, 'public', 'uploads')
  // 保留上传文件的后缀名字
  form.keepExtensions = true
  // 解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {
    res.send({ path: files.attrName.path.split('public')[1] })
  })
})

app.listen(3000, () => {
  console.log('The Server is running at http://localhost:3000')
})
