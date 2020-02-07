// 考察点 作用域、this、变量提升
var a = 10
function test() {
  a = 100
  console.log(a)  // 100
  console.log(this.a) // 10
  var a
  console.log(a)  // 100
}
test()

