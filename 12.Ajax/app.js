const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser())
app.get('/first', (req, res) => {
  res.send('Hello Ajax')
})

app.get('/responseData', (req, res) => {
  res.send({ name: 'zs' })
})

app.get('/get', (req, res) => {
  res.send(req.query)
})

app.post('/post', (req, res) => {
  res.send(req.body)
})

app.post('/json', (req, res) => {
  res.send(req.body)
})

app.get('/readystate', (req, res) => {
  res.send('hello')
})

app.get('/error', (req, res) => {
  res.status(400).send('bad request')
})

app.get('/cache', (req, res) => {
  fs.readFile('./list.txt', (err, result) => {
    res.send(result)
  })
})

app.listen(3000, () => {
  console.log('The Server is running at http://localhost:3000')
})
