const {Article} = require('../../model/article')
module.exports =async (req, res) => {
  // 标识: 表示当前访问的是文章管理页面
  req.app.locals.currentLink = 'article'

  // 从数据库中查找所有文章
  const articles = await Article.find().populate('author')
  res.render('admin/article', {
    articles
  })
}
