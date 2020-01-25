function getMsg(cb) {
  setTimeout(() => {
    let msg = 'hello node.js';
    cb(msg);
  }, 2000)
}

getMsg(data => {
  console.log(data)
})
