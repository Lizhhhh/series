let obj = {
  a: 100,
  b: [10, 20, 30],
  c: {
    x: 10
  },
  d: /^\d+$/
}

// // 实现浅拷贝
// // 只赋值私有属性
// let obj2 = {};
// for(let key in obj){
//   if(!obj.hasOwnProperty(key)) break;
//   obj2[key] = obj[key]
// };

// 实现深拷贝
function deepClone(obj){
  if(typeof obj === null) return null;
  if(typeof obj !== 'object') return obj;
  if(obj instanceof RegExp){  // 正则
    return new RegExp(obj)
  }
  if(obj instanceof Date){
    return new Date(obj);
  }

  // 克隆的结果和之前保持相同的所属类
  let newObj = new obj.constructor;
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
        newObj[key] = deepClone(obj[key])
    }
  }
  return newObj;
}

// typeof obj !== 'object' -> 普通类型
// 注: typeof null === 'object' ---> true. 因此得先把null过滤掉


var obj2 = deepClone(obj)
obj2.c.x = 100;
console.log(obj2)
console.log(obj === obj2)
console.log(obj.c === obj2.c)
