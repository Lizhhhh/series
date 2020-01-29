const { User } = require('../../model/user')
module.exports = async (req, res) => {


  // 标识: 表示当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';


  // 接收客户端传递过来的当前页面参数
  let page = req.query.page || 1
  let pageSize = 10
  let count = await User.countDocuments({})
  let total = Math.ceil(count / pageSize)
  let start = (page - 1) * pageSize

  // 将用户信息从数据库中查询出来
  const users = await User.find({})
    .limit(pageSize)
    .skip(start)
  // 渲染用户列表
  res.render('admin/user', {
    users,
    total,
    page,
    len: users.length
  })
}
