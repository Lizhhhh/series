const express = require('express')
const app = express()

app.get('/find/:id/:name/:age', (req, res) => {
  res.send(req.params)
})

app.listen(3000, () => {
  console.log('ok')
})
