const express = require('express')
const path = require('path')
const request = require('request')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use('/server', (req, res) => {
  request('http://localhost:3001/cross', (err, response, body) => {
    res.send(body)
  })
})


app.listen(3000, () => {
  console.log('http://localhost:3000')
})
