const { User } = require('../../model/user')
const bcrypt = require('bcryptjs')
module.exports = async (req, res) => {
  // 接收请求参数
  const { email, password } = req.body
  if (email.trim().length == 0 || password.trim().length == 0) {
    // 阻止向下执行,并返回错误提示信息
    return res.status(400).render('admin/error', {
      msg: '邮箱或密码错误'
    })
  }

  // 到了这里,说明用户名和密码都不为空.
  // 此时
  // 1.根据邮箱地址从数据库中获取用户信息
  let user = await User.findOne({ email }) // 如果查询到用户是一个对象类型, 如果没有查询到.则返回一个 null

  // 2.对比数据库中的密码和当前获取的密码
  const isEqual =
    user == null ? false : await bcrypt.compare(password, user.password)

  if (user == null || !isEqual) {
    return res.status(400).render('admin/error', {
      msg: '邮箱或密码错误'
    })
  } else {
    // 登录成功
    // 1.将用户名存储在请求对象中
    // 2.将用户信息保存到 app.locals中,作为模板引擎的公共变量(app属性,在app创建时挂在到req中了)
    // 3.重定向到用户列表页面
    req.session.username = user.username
    req.session.role = user.role
    req.app.locals.userInfo = user
    if(user.role == 'admin'){
      res.redirect('/admin/user')
    } else {
      res.redirect('/home/')
    }
  }
}
