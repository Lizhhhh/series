const run = () =>{
  var a = 'hello';
  let b = 'hi';

  // 1、 不存在变量提升
  console.log(c); // error
  let c = 'c';

  // var c;
  // console.log(c);
  // 2、 同一个作用域下不能重复定义同一个名称
  let t = 1;
  // let t = 100;  // error
  t = 100;  // ok
  console.log(t);
  // 3、 有着严格的作用域  var 属于函数作用域 let 块级作用域
  function fun(){
    let n = 10;
    if(true) {
      let n = 100;
    }
    console.log(n);
  }
  fun();
}
run();