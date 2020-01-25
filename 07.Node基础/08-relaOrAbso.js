const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname,'01-helloworld.js'), 'utf-8', (err,doc)=>{
  if(err == null){
    console.log(doc);
  } else {
    console.log(err);
  }
})