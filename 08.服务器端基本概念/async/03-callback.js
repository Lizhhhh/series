function getData(cb) {
  setTimeout(() => {
    const a = 10;
    cb(a);
  }, 2000);
}

getData((data)=>{
  console.log(data);
})