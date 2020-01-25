# 1. Node开发概述
## 1.1 为什么要学习服务器开发基础
- 能够和后端程序员更加紧密的配合
- 网站业务逻辑前置,学习前端技术要后端技术支撑(Ajax)
- 扩宽知识视野,能够站在更高的角度审视整个项目

## 1.2 服务器开发要做的事情
- 实现网站的业务逻辑(登陆、登出)
- 数据的增删改查(Java,PHP,.net)

## 1.3 为什么选择Node
- 使用JavaScript语法开发后端应用
- 一些公司要求前端工程师掌握Node开发
- 生态系统活跃,有大量开源库可以使用
- 前端开发工具大多基于Node开发(Webpack)


## 1.4 Node是什么
Node是一个基于Chrome V8引擎的JavaScript代码执行环境

#### 运行环境
- 浏览器(软件): 能够运行JavaScript代码,浏览器就是JavaScript代码的运行环境
- Node(软件): 能够运行JavaScript代码,Node就是JavaScript代码的运行环境.


## 2.1 Node.js运行环境安装
[官网](https://nodejs.org/en/)

- LTS = Lont Term Support长期支持版(稳定版)
- Current: 拥有最新特性(实验版)

# 3. Node.js快速入门
## 3.1 Node.js的组成
- JavaScript由三部分组成, ECMAScript、DOM、BOM.
- Node.js是由ECMAScript及Node环境提供的一些附加API组成的,包括文件、网络、路径等等一些更加强大的API

## 3.2 Node.js基础语法
所有ECMAScript语法在Node环境中都可以使用.

## 3.3 Node.js全局对象global
在浏览器中全局对象是window,在Node中全局对象是global.

Node中全局对象下有以下方法,可以在任何地方使用,global可以省略
- console.log()  在控制台中输出
- setTimeout()   设置定时器
- clearTimeout()  清除定时器
- setInterval()   设置间歇定时器
- clearInterval()  清除间歇定时器


# 1. Node.js模块化开发
## 1.1 JavaScript开发弊端
JavaScript在使用时存在两大问题,文件依赖和命名冲突.

- 文件依赖: 文件中的依赖关系不明确.
- 命名冲突: 代码覆盖问题.

## 1.2 生活中的模块化开发(电脑主机)

## 1.3 软件中的模块化开发
一个功能就是一个模块,多个模块可以组成完整应用,抽离一个模块不会影响其他功能的运行.

## 1.4 Node.js中模块化开发规范
- Node.js规定一个JavaScript文件就是一个模块,模块内部定义的变量和函数默认情况下在外部无法得到
- 模块内部可以使用exports对象进行成员导出,使用require方法导入其他模块.

## 1.5 模块成员导出
```js
// a.js
// 在模块内部定义变量
let version = 1.0;
// 在模块内部定义方法
const sayHi = name => `您好,${name}`
// 像模块外部导出数据
exports.version = version;
exports.sayHi = sayHi;
```
## 1.6 模块成员的导入
```js
// b.js
// 在b.js模块中导入模块a
let a = require('./b.js');
// 输出b模块中的version变量
consolg.log(a.version);
// 调用b模块中的sayHi方法并输出返回值
console.log(a.sayHi("Marron"));
```

## 1.7 模块成员导出的另一种方式
```js
module.exports.version = version;
module.exports.sayHi = sayHi
```
`exports`是`module.exports`的别名(地址引用关系),导出对象最终以module.exports为准


## 1.8 模块导出两种方式的联系与区别
1. 一开始 `exports`和 `module.exports`指向的是同一块内存区域.
2. `exports`拥有写该内存区域的权力.
3. 最终的导出以`module.exports`所指的内存区域为准.


# 3. 系统模块
## 3.1 什么是系统模块
Node运行环境提供的API。因为这些API都是以模块化的方式进行开发的,所以我们又称Node运行环境的提供的API为系统模块.

- 文件模块(fs): 读取文件、写入文件、创建文件夹

## 3.2 文件操作: fs

- f: file文件
- s: system系统. 文件操作系统
```js
const fs = require('fs');
```
##### 读取文件内容
```js
fs.readFile('文件路径/文件名称',['文件编码'], callback);
```
##### 读取文件语法示例
```js
// 读取上一级css目录下中的base.css
fs.readFile('../css/base.css', 'utf-8', (err,doc) =>{
  // 如果文件读取发生错误 参数err的值为错误对象 否则err的值为null
  // doc参数为文件内容
  if(err == null) {
    // 在控制台输出文件的内容
    console.log(doc);
  }
});
```
##### 写入文件内容
```js
fs.writeFile('文件路径', '数据', callback);
```
具体代码示例
```js
const content = `<h3>正在使用fs.writeFile写入文件内容</h3>`;
fs.writeFile('../index.html', content, err=>{
  if(err !== null) {
    console.log(err);
    return;
  }
  console.log('文件写入成功');
})
```

## 3.3 系统模块  path 路径操作
##### 为什么要进行路径拼接
- 不同操作系统的路径分隔符不统一
- /public/uploads/avatar
- Windows上是 \ /
- Linux 上是 /

## 3.4 路径拼接语法
```js
path.join('路径','路径',...)
```
路径栗子
```js
// 导入path模块
const path = require('path');
// 路径拼接
let finalPath = path.join('itcast', 'a','b','c.css');
// 输出结果   itcast\a\b\c.css
console.log(finalPath);
```

## 3.5 相对路径 vs 绝对路径
- 大多数情况下使用绝对路径,因为相对路径有时候相对的是命令行工具的当前工作目录
- 在读取文件或者设置文件路径时都会选择绝对路径
- 使用__dirname获取当前文件所在的绝对路径

看下面栗子:
```js
cosnst fs = require('fs');
fs.readFile('./wish.txt',"utf-8",(err, doc)=>{
  if(err == null) {
    console.log(doc);
  } else {
    console.log(err)
  }
})
```
上面的代码在项目目录 `07.Node基础`中执行,可.
但是当在项目目录 `SERIES`中执行,`fs.readFile`会寻找`SERIES/wish.txt`.找不到, 因此需要使用绝对目录


# 4.第三方模块
## 4.1 什么是第三方模块
别人写好的、具有特定功能的、我们能直接使用的模块即第三方模块,由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中,所以又名包.

##### 第三方模块有两种存在形式:
- 以js文件的形式存在,提供实现项目具体功能的API接口
- 以命令行工具形式存在,辅助项目开发

## 4.2 获取第三方模块
npmjs.com: 第三方模块的存储和分发仓库

npm(node package manager): node的第三方模块管理工具

- 下载: npm install 模块名称
默认情况下,下载到命令行的当前目录下面
- 删除: npm unintall 模块名称

全局安装与本地安装
- 命令行工具: 全局安装
- 库文件: 本地安装

## 4.3 第三方模块 nodemon
nodemon是一个命令行工具,用以辅助项目开发
在Node.js中,每次修改文件都要在命令工具中重新执行该文件,非常繁琐.

##### 使用步骤
1. `npm install nodemon -g`
2. 在命令行工具中使用`nodemon 文件名称`代替`node`


## 4.4 第三方模块 nrm
nrm(npm registry manager): npm下载地址切换工具

npm默认的下载地址在国外,国内下载速度慢.

##### 使用步骤
1. 使用`npm install nrm -g`下载
2. `nrm ls`: 查看源
3. `nrm test`: 测试源的速度
4. `nrm use`: 使用源

## 4.5 第三方模块 Gulp
基于node平台开发的前端构建工具
将机械化操作编写成任务,想要执行机械化操作时执行一个命令行命令任务就能自动执行了
用机器代替手工,提高开发效率

## 4.6 Gulp能做什么
- 项目上线, HTML、CSS、JS文件压缩合并
- 语法转换 (es6、less...)
- 公共文件抽离
- 修改文件浏览器自动刷新

## 4.7 Gulp使用
1. `npm install gulp`下载gulp库文件
2. 在项目根目录下新建gulpfile.js文件 (该文件名不允许修改)
3. 重构项目的文件夹结构, src目录放置源代码文件, dist目录放置构建后文件
4. 在gulpfile.js文件中编写任务
5. 在命令行工具中执行gulp任务.

## 4.8 Gulp中提供的方法
- gulp.src(): 获取任务要处理的文件
- gulp.dest(): 输出文件
- gulp.task(): 建立gulp任务
- gulp.watch(): 监控文件的变化

```js
const gulp = require('gulp');
// 使用gulp.task()方法建立任务
gulp.task('first', ()=>{
  // 获取要处理的文件
  gulp.src('./src/css/base.css')
  // 将处理后的文件输出到dist目录
  .pipe(gulp.dest('./dist/css'));
});
```

## 4.9 Gulp插件
- gulp-htmlmin: html文件压缩
- gulp-csso: 压缩css
- gulp-babel: JavaScript语法转化
- gulp-less: less 语法转化
- gulp-uglify: 压缩混淆JavaScript
- gulp-file-include: 公共文件包含
- browsersync: 浏览器实时同步


# 5.package.json文件

## 5.1 node_modules文件夹的问题
1. 文件夹以及文件过多过碎,当我们将项目整体拷贝给别人的时候,传输速度会很慢很慢.(使用描述文件)
2. 复杂的模块依赖关系需要被记录,确保模块的版本和当前保持一致,否则会导致当前项目运行报错

## 5.2 package.json文件的作用
项目描述文件,记录了当前项目信息,例如项目名称版本,作者,github地址,当前项目依赖了哪些第三方模块等.
使用`npm init -y`命令生成.
- `name`: 项目的名称
- `version`: 项目的版本
- `description`: 项目的描述
- `main`: 项目的主入口文件
- `scripts`: 命令的别名
- `keywords`: 关键字
- `license`: 遵循的协议规范

## 5.3 项目依赖
- 在项目的开发阶段和线上运营阶段,都需要依赖的第三方包,称为项目依赖
- 使用`npm install packageName`命令下载的文件会默认被添加到package.json文件的`dependencies`字段中
```js
{
  "dependencies":{
    "jequery": "^3.3.1"
  }
}
```

## 5.4 开发依赖
- 在项目开发阶段需要的依赖,线上运行项目不需要依赖的第三方包,称为开发依赖
- 使用`npm install [packageName] --save-dev`将包添加到package.json的`devDependencies`字段中
```js
{
  "devDependencies":{
    "gulp": "^3.9.1"
  }
}
```
## 5.5 package-lock.json文件的作用
- 锁定包的版本,确保再次下载时不会因为包版本不同而产生问题
- 加快下载速度,因为该文件中已经记录了项目所依赖第三方包的树状结构和包的下载地址,重新安装时只需下载即可,不需要做额外的工作

# 6. Node.js中模块加载机制
## 6.1 模块查找规则-当模块拥有路径但没有后缀时
```js
require('./find.js');
require('./find');
```
1. require方法根据模块路径查找模块,如果是完整路径,直接进入模块
2. 如果模块后缀省略,先找同名JS文件再找同名JS文件夹
```js
require('./find');
// 以上会先找到命令行目录下的find.js文件.若找到则返回.否则寻找同名文件夹.
```
3. 如果找到同名文件夹.若文件夹中存在`package.json`,且`package.json`中存在`main`属性.则会执行main属性对应的值
4. 否则,找到文件夹中的index.js
5. 如果找指定的入口文件不存在或者没有指定入口文件就会报错,模块没有被找到

## 6.2 模块查找规则-当模块没有路径且没有后缀时
```js
require('find');
```
1. Node.js会假设它是系统模块
2. Node.js会去node_modules文件夹中
3. 看是否有该名字的JS文件
4. 再看是否有改名字的文件夹
5. 如果是文件夹,检查是否有`package.json`.若有,从main中找到对应的js文件
6. 如果没有会查找有没有index.js文件.
7. 都没有报错

