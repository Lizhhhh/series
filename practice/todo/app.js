const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
  .connect('mongodb://marron:marron@localhost:27017/todo', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('数据库连接成功')
  })

const taskSchema = new mongoose.Schema({
  completed: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  }
})

const Task = mongoose.model('Task', taskSchema)

app.get('/base', (req, res) => {
  res.send({
    name: 'zhangsan',
    age: 30
  })
})

app.post('/base', (req, res) => {
  res.send(req.body)
})

app.get('/todo/task', async (req, res) => {
  const tasks = await Task.find()
  res.send(tasks)
})

app.post('/todo/addTask', async (req, res) => {
  await Task.create(req.body)
  res.send(req.body)
})

app.get('/todo/deleteTask', async (req, res) => {
  const result = await Task.findOneAndDelete(req.query)
  res.send(result)
})

app.post('/todo/modifyTask', async (req, res) => {
  const { _id: id } = req.body
  // 更新数据库
  await Task.updateOne({ _id: id }, req.body)
  // 根据id查找数据
  const result = await Task.findOne({ _id: id })
  res.send(result)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
