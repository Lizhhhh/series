const { User } = require('../../model/user')
module.exports = async (req, res) => {
  const { id, message: msg } = req.query
  // 根据id判断是新增用户还是修改用户
  if (!id) {
    // 新增用户
    res.render('admin/user-edit', {
      msg,
      link: '/admin/user-edit',
      button: '添加'
    })
  } else {
    // 修改用户
    // 根据id在数据库中查找用户信息
    const user = await User.findOne({ _id: id })
    res.render('admin/user-edit', {
      user,
      msg,
      link: `/admin/user-modify?id=${id}`,
      button: '修改'
    })
  }
}
