const fs = require('fs');

const content = "best wish for Wuhan!";

fs.writeFile("./wish.txt", content, err=>{
  if(err !== null) {
    console.log("写入失败",err);
  }
  console.log("写入成功!");
})