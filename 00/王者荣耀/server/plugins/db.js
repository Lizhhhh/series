module.exports = app =>{
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://marron:marron@localhost:27017/node-vue-moba',{
    useNewUrlParser: true
  })
}