const express = require('express');
const path = require('path');
const app = express();

// 第一个参数是请求的路径.
app.use(express.static(path.join(__dirname,'public')))

app.listen(3000,()=>{
  console.log('server ok1');
})