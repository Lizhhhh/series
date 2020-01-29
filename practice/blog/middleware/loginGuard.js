module.exports = (req, res, next) => {
  if (req.url !== '/login') {
    // 访问的不是登录页面
    // 判断用户是否登录
    if (req.session.username) {
      next()
    } else {
      res.redirect('/admin/login')
    }
  } else {
    // 访问的是登录页面
    next()
  }
}
