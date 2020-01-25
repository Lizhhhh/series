const fs = require('fs')

fs.readFile('./txt/1.txt', 'utf8', (err, res1) => {
  if (err == null) {
    fs.readFile('./txt/2.txt', 'utf8', (err, res2) => {
      if (err == null) {
        fs.readFile('./txt/3.txt', 'utf8', (err, res3) => {
          console.log(res1)
          console.log(res2)
          console.log(res3)
        })
      }
    })
  }
})
