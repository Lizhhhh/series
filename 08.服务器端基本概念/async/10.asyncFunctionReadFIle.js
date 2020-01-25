const fs = require('fs')
const { promisify } = require('util')


const readFile = promisify(fs.readFile);

const run  = async () =>{
  let r1 = await readFile('./txt/1.txt',"utf8")
  let r2 = await readFile('./txt/2.txt',"utf8")
  let r3 = await readFile('./txt/3.txt',"utf8")
  console.log(r1);
  console.log(r2);
  console.log(r3);
}
run();