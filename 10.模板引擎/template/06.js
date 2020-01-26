const template = require('art-template');
const path = require('path');
const dateformat = require('dateformat');


// 导入模板变量
template.defaults.imports.dateformat = dateformat;
template.defaults.root = path.join(__dirname, "views");
template.defaults.extname = '.html';

let html = template("06.art", {
  time: new Date()
})

html += template("07",{});

console.log(html);