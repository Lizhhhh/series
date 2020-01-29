const { User } = require('../../model/user')
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {
  const { id: _id } = req.query
  const { password } = req.body

  // 从数据库中根据_id找到用户
  const user = await User.findOne({ _id })
  // 验证密码

  const isValid = await bcrypt.compare(password, user.password)

  if (isValid) {
    // 密码比对成功.
    // 1.将用户信息(需要使用加密后的密码)更新到数据库中
    // 2.重定向到用户列表页面
    req.body.password = user.password
    await User.updateOne({_id}, req.body);
    res.redirect('/admin/user')
  } else {
    // 密码验证失败
    return next(
      JSON.stringify({ path: '/admin/user-edit', message: '密码比对失败', id: _id })
    )
  }
}
