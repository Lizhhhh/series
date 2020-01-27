const express = require('express');
const app = express();
const home = require('./route/home');
const admin = require('./route/admin');


app.use('/home',home);
app.use('/admin',admin);


app.listen(3000,()=>{
  console.log('ok');
})