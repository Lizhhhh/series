// a 等于什么值时,使得以下式子成立

// if (a == 1 && a == 2 && a == 3) {
//   console.log('条件成立')
// }


// == 数据类型不一样处理方案
/*
1. 对象 == 字符串, 对象.toString() 和 字符串进行比较
2. null == undefined
3. NaN !== NaN
4. 剩下的都转换成数字

4.1 对象 和 数字比较
首先会将对象转换成字符串,然后将字符串转换成数字

*/

// // 解法一: 重写 toString方法
// var a = {
//   i: 0,
//   toString() {
//     return ++this.i
//   }
// }

// if (a == 1 && a == 2 && a == 3) {
//   console.log('条件成立')
// }


// 解法二: 数据劫持
/* es5: defineProperty 、es6: proxy
Object.defineProperty(obj, 'name',{
  get() {
    console.log('获取')
  },
  set() {
    console.log('设置')
  }
})
*/
// var i = 0;
// Object.defineProperty(window, 'a',{
//   get(){
//     return ++i;
//   }
// })
// if (a == 1 && a == 2 && a == 3) {
//   console.log('条件成立')
// }

