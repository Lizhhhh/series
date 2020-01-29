const { User, validateUser } = require('../../model/user.js')
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {

  // 标识: 表示当前访问的是用户管理页面
  req.app.locals.currentLink = 'user'

  try {
    await validateUser(req.body)
  } catch (ex) {
    return next(JSON.stringify({ path: '/admin/user-edit', msg: ex.message }))
  }

  // 到达这里,用户的格式已经验证通过
  // 下面验证邮箱是否是唯一的
  let user = await User.findOne({ email: req.body.email })
  if (user != null) {
    return next(
      JSON.stringify({ path: '/admin/user-edit', msg: '邮箱已经存在' })
    )
  } else {
    // 将用户信息添加到数据库中
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(req.body.password, salt)
    req.body.password = pass
    User.create(req.body)
    res.redirect('/admin/user')
  }
}


