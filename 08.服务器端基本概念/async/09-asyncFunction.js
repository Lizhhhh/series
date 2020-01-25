// 1. 在普通函数定义的前面加上async关键字,将普通函数变成异步函数
// 2. 异步函数默认的返回值是promise对象
// 3. 在异步函数内部,使用throw关键字进行错误抛出
// const fn = async () =>{
//   throw "发生了一些错误"
//   return 123
// }

// fn().then(data=>{
//   console.log(data);
// }).catch(err=>{
//   console.log(err);
// })

// await关键字
// 1.它只能出现在异步函数中
// 2. await promise,可以暂停异步函数的执行,等待promise对象返回结果后再向下执行函数

const p1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1')
    }, 1000)
  })
}

const p2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2')
    }, 1000)
  })
}

const p3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p3')
    }, 1000)
  })
}


const run = async () => {
  let r1 = await p1()
  let r2 = await p2()
  let r3 = await p3()
  console.log(r1)
  console.log(r2)
  console.log(r3)
}
run()
