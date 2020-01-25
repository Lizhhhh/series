const fs = require('fs')

let promise = new Promise((resolve, reject) => {
  fs.readFile('./txt/1.txt', 'utf8', (err, result) => {
    if (err == null) {
      resolve(result)
    } else {
      reject(result)
    }
  })
})

promise.then((data)=>{
  console.log(data);
  let promise1 = new Promise((resolve, reject)=>{
    fs.readFile('./txt/2.txt','utf-8',(err,result)=>{
      if(err == null) {
        resolve(result)
      } else {
        reject(result);
      }
    })
  })
  promise1.then((data2)=>{
    console.log(data2);
  })
})
