const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  // 标识: 表示当前访问的是文章管理页面
  req.app.locals.currentLink = 'article'

  // 接收当前分页
  const { page } = req.query  || 1

  // 从数据库中查找所有文章
  const articles = await pagination(Article)
    .find()
    .page(page)
    .size(2)
    .display(3)
    .populate('author')
    .exec()

  // res.send(articles)
  console.log(articles)

  res.render('admin/article', {
    articles
  })
}
