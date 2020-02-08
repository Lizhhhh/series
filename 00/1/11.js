
var n = 123
function f1() {
  console.log(n)
}
function f2() {
  var n = 456
  f1()
}
f2()
console.log(n)
