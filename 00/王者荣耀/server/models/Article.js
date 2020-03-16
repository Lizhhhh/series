const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 标题
  title: { type: String },
  // 分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  // 详情
  body: { type: String }
})

module.exports = mongoose.model('Article', schema)
