module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  // 获取模型中间件
  const resourceMiddleware = require('../../middleware/resource')

  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10)
    res.send(items)
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  const path = require('path')
  const upload = multer({ dest: path.join(__dirname, '../../uploads') })

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录路由
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 根据用户名

    const user = await AdminUser.findOne({ username }).select('+password')
    // 校验密码
    assert(user, 422, '用户不存在')

    // 用户存在
    const isValid = require('bcrypt').compareSync(password || '', user.password)

    assert(isValid, 422, '密码错误')

    // jwt(obj, key)
    // 第二个参数是一个密钥,如果客户端篡改了token, 就通过不了 jwt.verify 方法认证
    const token = jwt.sign(
      {
        id: user._id
      },
      app.get('secret')
    )
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
