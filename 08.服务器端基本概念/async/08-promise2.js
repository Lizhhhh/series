const fs = require('fs')

const p1 = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./txt/1.txt', 'utf8', (err, result) => {
      resolve(result)
    })
  })
}

const p2 = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./txt/2.txt', 'utf8', (err, result) => {
      resolve(result)
    })
  })
}

const p3 = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./txt/3.txt', 'utf8', (err, result) => {
      resolve(result)
    })
  })
}

p1()
  .then(r1 => {
    console.log(r1)
    return p2()
  })
  .then(r2 => {
    console.log(r2)
    return p3()
  })
  .then(r3 =>{
    console.log(r3);
  })
