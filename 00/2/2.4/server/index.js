const express = require('express')
const React = require('react')
const { renderToString } = require('react-dom/server')
const path = require('path')
const Index = require('../container/index')
const app = express()
app.use(static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  let content = renderToString(
    <Index></Index>
  )
  res.send(
    `
    <html>
      <head>
        <title>kkbssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
    `
  )
})

app.listen(9092, () => {
  console.log('http://localhost:9092')
})
