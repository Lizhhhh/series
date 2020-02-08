var length = 100
function f1() {
  console.log(this.length)
}
var obj = {
  x: 10,
  y: 11,
  f2: function(f1) {
    f1()
    arguments[0]()
  }
}
obj.f2(f1, 1)
// 考察点: 预解析、作用域、arguments
