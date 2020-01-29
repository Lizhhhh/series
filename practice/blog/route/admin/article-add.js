// 引入formidable第三方模块
const formidable = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')

module.exports = (req, res) => {
  // 1. 创建表单解析对象
  const form = new formidable.IncomingForm()
  // 2. 配置上传文件的存放位置
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
  // 3. 保留上传文件的后缀
  form.keepExtensions = true
  // 4.解析表单
  form.parse(req, async (err, fields, files) => {
    // 将上传的文件在磁盘中的路径处理成,在url中访问的路径
    const cover = files.cover.path.split('public')[1]
    // 将url中访问的路径 存储到 文章的cover属性中, 与普通属性进行拼接
    fields.cover = cover
    // 将文章的数据添加到磁盘中(数据库)
    await Article.create(fields)
    // 重定向到文章列表
    res.redirect('/admin/article')
  })
  // res.send('ok')
}
