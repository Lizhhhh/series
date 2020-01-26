// 获取路由
const router = require('router')()

// 获取学生集合
const Student = require('../model/student')

// 模板引擎处理
const template = require('art-template')

// 处理请求参数
const querystring = require('querystring');



// 呈递学生档案信息页面
router.get('/add', (req, res) => {
  const html = template('index.art', {})
  res.end(html)
})
// 呈递学生档案信息列表页面
router.get('/list', async (req, res) => {
  const students = await Student.find()
  const html = template('list.art', { students: students })
  res.end(html)
})
// 实现学生信息添加功能路由
router.post('/add', (req, res) => {
  let postData = ''
  req.on('data', data => {
    postData += data
  })
  req.on('end', async () => {
    let users = querystring.parse(postData)
    console.log(users)
    await Student.create(users)
    res.writeHead(301, {
      Location: '/list'
    })
    res.end()
  })
})


module.exports = router;