// // example 1
// let a = {}, b='0', c=0;
// a[b] = 'marron';
// a[c] = 'Mar'
// console.log(a[b]) // Mar

// // example 2
// let a = {},
// b = Symbol('1'),
// c = Symbol('1');
// a[b] = 'marron';
// a[c] = 'Mar';
// console.log(a[b]);   // marron

// // example 3
// let a = {},
//   b = {
//     n: '1'
//   },
//   c = {
//     m: '2'
//   }
// a[b] = 'marron'
// a[c] = 'Mar'
// console.log(a)  // 'Mar'


// // example 4
// var test = (function(i){
//   return function(){
//     console.log(i *= 2);
//   }
// })(2)
// test(5)     // 会弹出字符串4
// test(5)


// example 5
var a = 0,
    b = 0;
function A(a){
  A = function(b){
    alert(a + b++);
  };
  alert(a++)
}
A(1);
A(2);

