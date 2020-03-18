module.exports = options => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  return async (req, res, next) => {
    // 获取token
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()
    assert(token, 401, '请先登录') // 未提供token
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录') // token验证不通过
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录') // 无效的token
    await next()
  }
}
