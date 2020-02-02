const { Article } = require('../../model/article')

const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
  const { id } = req.query

  let article = await Article.findOne({ _id: id }).populate('author')

  // 查询当前文章所对应的评论信息
  const comments = await Comment.find({ aid: id }).populate('uid')

  res.render('home/article.art', {
    article,
    comments
  })
}
