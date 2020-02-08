function f(){
  console.log(this.a);
}

var obj = {
  a: 2,
  f: f
}
var f2 = obj.f;
var a = 'hello';
f2();