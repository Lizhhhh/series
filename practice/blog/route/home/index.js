const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  const { page } = req.query

  const result = await pagination(Article)
    .page(page)
    .size(4)
    .display(5)
    .find()
    .populate('author')
    .exec()

  res.render('home/default.art', {
    result
  })
}
