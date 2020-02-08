function f(s) {
  console.log(this.a, s)
  return this.a + s
}
var obj = {
  a: 2
}
var f2 = function() {
  return f.apply(obj, arguments)
}
var b = f2(3)
console.log(b)
