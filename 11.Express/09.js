const express = require('express')

const app = express()

app.get('/index', (req, res) => {
  res.send(req.query)
})

app.listen(3000)
