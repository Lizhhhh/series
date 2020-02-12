const data = require('./data.json')
const path = require('path')
const fs = require('fs')


// 自动生成图书编号
let maxBookCode = () => {
  let arr = []
  data.forEach(item => {
    arr.push(item.id)
  })
  return Math.max.apply(null, arr)
}

// 把内存数据写入文件
let weiteDataToFile = (res)=>{
  fs.watchFile(path.join(__dirname, 'data.json'), JSON.stringify(data,null,4),(err)=>{
    if(err){
      res.json({
        status:500
      });
    }
    res.json({
      status: 200
    })
  })
}

// 验证图书名称是否存在
// exports.checkName = (req, res)=>{
//   let name = req.params.name;
//   let flag = false;
//   data.some(item=>{
//     if(name == item.name){}
//   })
// }
