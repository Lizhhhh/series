console.log("代码开始执行");
setTimeout(()=>{console.log('2秒后开始执行的代码')}, 2000);
setTimeout(()=>{console.log("立即执行的代码")},0);
console.log("代码执行结束");