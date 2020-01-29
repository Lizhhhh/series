const { User } = require('../../model/user')
module.exports = async (req, res) => {
  // 删除路由操作
  // 1.获取id
  const { id } = req.query
  // 2.根据id将用户从数据库中删除(findOneAndDelete)
  await User.findOneAndDelete({_id:id})
  // 3.重定向到用户列表页面
  res.redirect('/admin/user')
}
