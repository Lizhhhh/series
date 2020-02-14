# 前端模块化

## 1 模块化相关规范

### 1.1 模块化概述

- 模块化: 把单独的一个功能封装到一个模块(文件)中,模块之间相互隔离,但是可以通过特定的接口公开内部成员,也可以依赖别的模块
- 模块化的优点: 方便代码的重用, 从而提高开发效率,并且方便后期的维护

### 1.2 浏览器模块化规范

1. AMD: [Require.js](http://www.require.cn/)
2. ACM: [Sea.js](https://seajs.github.io/seajs/docs/)

### 1.3 服务器端模块化规范

1. CommonJS
   1. 模块分为 `单文件模块` 与 `包`
   2. 模块成员导出: `module.exports`和 `exports`
   3.  模块成员导入: require('模块标识符')

### 1.4 大一统的模块化规范 - ES6模块化

- 在ES6模块化规范诞生以前,JavaScript社区已经尝试并提出了 AMD、CMD、CommonJS等模块化规范.

- ES6语法规范中, 在语言层面上定义了ES6模块化规范,是浏览器与服务器端通用的模块化开发规范



<b>ES6模块化规范的定义:</b>

- 每个js文件都是一个独立的模块
- 导入模块成员使用import关键字
- 暴露模块成员使用export关键字



#### 1.4.1 Node.js中通过babel体验ES6模块化

1. `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`
2. `npm install --save @babel/polyfill`
3. 根目录下创建`babel.config.js`

```js
const presets =[
    ["@babel/env",{
        targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1"
        }
    }]
];
module.exports = { presets };
```

4. 创建index.js

5. ```js
   //inedx.js
   console.log('ok')
   ```

6. 命令行输入`npx babel-node index.js`执行代码, 输出ok则代表导入成功

### 1.5 ES6 模块化的基本语法

#### 1.5.1 默认导出 与 默认导入

- 默认导出语法 export default 

```js
// 当前文件模块 m1.js
// 定义私有成员 a 和 c
let a = 10
let c = 20
// 外界访问不到d, 因为它没用被暴露出去
let d = 30
function show() {}

// 将本模块中的私有成员暴露出去,供其它模块使用
export default {
    a,
    c,
    show
}
```

- 默认导入语法 import 接收名称 from '模块标识符'

```js
// 导入模块成员
import m1 from './m1.js'

console.log(m1)
```

#### 1.5.2 按需导出 与 按需导入

- 按需导出语法 export let s1= 10

```js
// 当前文件模块为 m1.js

// 向外按需导出变量 s1
export let s1 = 'aaa';

// 向外按需导出变量 s2
export let s2 = 'ccc';

// 象外按需导出方法 say
export function say = function() {}
```

```js
// 导入模块成员
import {s1, s2 as ss2, say} from './m1.js'
console.log(s1);
console.log(s2);
console.log(say);
```

#### 【小结】

- 一个模块中可以使用多次按需导出
- 按需导出(入)可以和默认导出(入)同时存在

#### 1.5.3 直接导入并执行模块代码

- 有时候,我们只想单纯执行某个模块中的代码,并不需要得到模块中向外暴露的成员,因此直接导入并执行模块代码.

```js
// m2.js
for(let i = 0 ; i< 3; i++){
    console.log(i)
}
```

```js
// 直接导入并执行模块代码
import './m2.js'
```

##  2. Webpack

当前Web开发面临的困境

- 文件依赖关系错综复杂
- 静态资源请求效率低
- 模块化支持不友好
- 浏览器对高级JavaScript特性兼容程度低

### 2.1 webpack概述

webpack是一个流行的前端项目构建工具,可以解决当前web开发中所面临的困境.

webpack提供了友好的模块化支持,以及代码压缩混淆、处理js兼容问题、性能优化等强大的功能,从而让程序员把工作的重心放到具体的功能实现上,提高了开发效率和项目的可维护性

### 2.2 webpack的基本使用

#### 2.2.1 创建列表隔行变色项目

1. 创建package.json: `npm init -y`
2. 新建src: 源代码目录
3. 新建 `src -> index.html`
4. 初始化页面基本的结构

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./index.js"></script>
</head>
<body>
  <ul>
    <li>这是第1个li</li>
    <li>这是第2个li</li>
    <li>这是第3个li</li>
    <li>这是第4个li</li>
    <li>这是第5个li</li>
    <li>这是第6个li</li>
    <li>这是第7个li</li>
    <li>这是第8个li</li>
    <li>这是第9个li</li>
  </ul>
</body>
```

```js
// index.js
import $ from 'jquery'

$(function() {
  $('li:odd').css('backgroundColor', 'lightblue')
  $('li:even').css('backgroundColor', '#ccc')
})
```

5. 浏览器对ES6的兼容性不是很好,因此以上代码可能不会显示列表隔行变色.故下面需要使用webpack配置对ES6的支持

#### 2.2.2 在项目中安装和配置webpack

1. 安装webpack相关的包: `npm install webpack webpack-cli -D`
2. 在项目根目录中,创建名为 webpack.config.js的webpack配置文件
3. 在webpack的配置文件中,初始化如下基本配置:

```js
module.exports = {
    mode: 'development'
}
```

4. 在 package.json配置文件中的scripts节点下,新增dev脚本如下:

```js
"scripts":{
    "dev": "webpack"
}
```

完成上述配置后,在命令行输入:`npm run dev`, webpack就会在当前目录的dist文件夹下面自动生成一个`main.js`文件.里面装的是浏览器兼容的JS代码，因此只需在`index.html`中导入`main.js`即可完成2.2.1的需求

#### 2.2.3 入口与出口

webpack的4.x版本中默认约定:

- 打包的入口文件为 src -> index.js
- 打包的输出文件为 dist -> main.js

如果要修改打包的入口与出口,可以修改`webpack.config.js`:

```js
const path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
```

#### 2.2.4 自动打包功能

1. 自动打包工具: `npm install webpack-dev-server -D`
2. 修改 `package.json -> scripts`

```js
// package.json
"scripts": {
    "dev": "webpack-dev-server"
}
```

3. 执行后会有如下几行输出

```js
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from D:\series\17
i ｢wdm｣: Hash: 5ea127005e76e344e080
Version: webpack 4.41.6
Time: 429ms
Built at: 2020-02-12 18:46:23
    Asset     Size  Chunks             Chunk Names
bundle.js  671 KiB    main  [emitted]  main
Entrypoint main = bundle.js
```

第一句话说明项目运行在 'http://localhost:8080'中

第二句话说明项目的打包文件在当前目录下,最好一句话说明打包的名字为`bundle.js`(在内存中)

因此需要在`index.html` 导入打包的文件

4. 在`http://localhost:8080`地址查看自动打包效果

#### 2.2.5 html-webpack-plugin生成预览页面

- 作用: 将src下面的`index.html`复制到内存中,且默认的路径是项目的根目录,还会自动导入内存中的`bundle.js`

- 使用步骤:

  - `npm install html-webpack-plugin`

  - 修改`webpack.config.js`

  - ```js
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const htmlPlugin = new HtmlWebpackPlugin({
        template: './src/index.html', // 指定要用到的模板文件
        filename: 'index.html'
    })
    
    module.exports = {
        plugins: [htmlPlugin]
    }
    ```

### 2.2.6 自动打包相关参数

```js
// package.json
// --open 打包完成后自动打开浏览器
// --host 配置IP地址
// --port 配置端口
"scripts": {
    "dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
}
```

### 2.3 通过loader打包非js模块

在实际开发中,webpack默认只能打包处理以 .js 后缀名结尾的模块,其他非 .js 后缀名的模块,webpack默认处理不了,需要调用 loader 加载器才可以正常打包.

#### 2.3.1 打包CSS文件

1. `npm i style-loader css-loader -D`
2. `webpack.config.js -> module -> rules`

```js
// webpack.config.js
module.exports = {
    module:{
        rules: {
            test: /\.css$/, use: ['style-loader', 'css-loader']
        }
    }
}
// 多个loader的调用顺序是: 从后往前调用的
```

#### 2.3.2 打包处理less文件

1. `npm i less-loader less -D`
2. `webpack.config.js -> module -> rules`

```js
// webpack.config.js
module.exports = {
    module:{
        rules: {
            test: /\.less$/, use: ['style-loader', 'css-loader','less-loader']
        }
    }
}
// 多个loader的调用顺序是: 从后往前调用的
// can not find module 'less' -> 是因为没用安装less
```

#### 2.3.3 打包处理scss文件

1. `npm i sass-loader node-sass -D`
2. ``webpack.config.js -> module -> rules``

```js
// webpack.config.js
module.exports = {
    module:{
        rules: {
            test: /\.scss$/, use: ['style-loader', 'css-loader','sass-loader']
        }
    }
}
// 多个loader的调用顺序是: 从后往前调用的
// 安装的是sass,验证的是scss
// node-sass的安装可能需要改变源,
```

#### 2.3.4 postCSS自动添加css的兼容前缀

- `npm i postcss-loader autoprefixer -D`

```js
// postcss.config.js
const autoprefixer = require('autoprefixer')
module.exports = {
    pulugins: [autoprefixer]
}
```

```js
// webpack.config.js
module.exports = {
    module:{
        rules:[
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']}
        ]
    }
}
```

#### 2.3.5 打包样式表中的图片和字体文件

- `npm i url-loader file-loader -D`

```js
// webpack.config.js
module.exports = {
    module:{
        rules:[
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use:'url-loader?limit=16940' }
        ]
    }
}
```

其中 ？ 之后的是loader的参数项.

limit用来指定图片的大小,单位是字节(byte),只有小于limit大小的图片,才会被转为base64图片

#### 2.3.6 打包处理js文件中的高级语法

- babel转换器相关的: `npm i babel-loader @babel/core @babel/runtime -D`

- babel语法插件相关的: `npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D`

```js
// babel.config.js
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}
```

```js
// webpack.config.js
module.exports ={
    module:{
        rules:[
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
```

## 3. Vue单文件组件

### 3.1 基本用法

单文件组件的组成结构

- template: 组件的模板区域
- script: 业务逻辑区域
- style: 样式区域

```vue
<template>
	<!-- 这里用于定义Vue组件的模板内容 -->
</template>
<script>
    // 这里用于定义Vue组件的业务逻辑
    export default {
        data: () { return {} },		// 私有数据
        methods: {}		// 处理函数    
    }
</script>
<style scoped>
    /* 这里用于定义组件的样式 */
</style>
```

### 3.2 webpack中配置vue组件的加载器

- `npm i vue-loader vue-template-compiler -D`

- ```js
  // webpack.config.js
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  module.exports = {
      module:{
          rules:[
              { test: /\.vue$/, loader: 'vue-loader'}
          ]
      },
      plugins:[
          new VueLoaderPlugin()
      ]
  }
  ```

### 3.3 在webpack项目中使用vue

- `npm i vue -S`

```js
// src/index.js
import Vue from 'vue'
import App from './components/App.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})

```

### 3.4 webpack打包发布

上线之前需要通过webpack将应用进行整体打包,可以通过package.json文件配置打包命令:

```js
// package.json
"scripts": {
    "build": "webpack -p",
    "dev": "webpack-dev-server --open --host 127.0.0.1 --port 3000"
}
```

## 4. Vue 脚手架

- vue脚手架用于快速生成 Vue 项目基础架构

- [官网](https://cli.vuejs.org/zh)

### 4.1 基本用法

- `npm install -g @vue/cli`

- `vue -V`: 查看安装是否成功

[注意] : 如果想升级脚手架,可以先下载以前的脚手架`npm uninstall vue-cli -g`(推荐node版本 8.11.0 +)

#### 4.1.1 基于3.x版本的脚手架创建vue项目

```js
// 1. 基于交互式命令行的方式,创建新版vue项目
// 箭头上下选择, 空格选中
vue create my-project

// 2. 基于图形界面的方式,创建新版vue项目(推荐)
vue ui

// 3. 基于2x.x的旧模板,创建旧版vue项目(不建议)
vue init webpack my-project
```

### 4.2 脚手架生成的项目结构

- `node_modules`: 依赖包目录
- `public`: 静态资源目录
- `src`: 组件源代码目录
  - `assets`: 项目中可能遇到的资源(样式表、图片)
  - `components`: 组件
  - `router`: 前端路由
  - `views`: 视图组件
  - `App.vue`: 根组件
  - `main.js`: 项目的打包入口文件
  - `.eslintrc.js`: eslint中语法相关的文件
  - `babel.config.js`: babel相关的配置文件
  - `package.json`: 包管理文件
- `babel.config.js`: babel配置文件



手写一个promise

```js
class Promise{
    constructor(exector){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        const resolve = value => {
            this.value = value;
            this.state = 'resolved';
            this.onResolvedCallbacks.forEach(fn => fn())
        }
        
        const reject = reason => {
            this.reason = reason;
            this.state = 'rejected';
            this.onRejectedCallbacks.forEach(fn => fn())
        }
        
        exector(resolve, reject)
    }
    then(onResolved, onRejected){
        if(this.state === 'resolved') {
            onResolved(this.value);
        }
        if(this.state === 'rejected') {
            onRejected(this.reason)
        }
        if(this.state === 'pending') {
            this.onResolvedCallbacks.push(()=>{
                onResolved(this.value)
            })
            this.onResolvedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}
```

### 4.3 Vue脚手架的自定义配置

1. 通过package.json配置项目

```js
// 必须是符合规范的json语法
"vue": {
    "devServer": {
        "port": 8888,
        "open": true
    }
}
```

注意: 不推荐使用以上配置方式。因为package.json主要用来管理包的配置信息;为了方便维护,推荐将vue脚手架相关的配置,单独定义到vue.config.js

2. <font color=red>通过单独的配置文件配置项目(推荐使用)</font>
   1. 在项目的根目录创建文件vue.config.js
   2. 在该文件中进行相关配置,从而覆盖默认配置

```js
// vue.config.js
module.exports = {
    devServer: {
        port: 8888,
        open: true
    }
}
```

## 5. Element-UI的基本使用

Element-UI: 一套为开发者、设计师和产品经理准备的基于Vue 2.0的桌面端组件库。

[官网](http://element-cn.eleme.io/#/zh-CN)

### 5.1 基于命令行方式手动安装

- `npm i element-ui -S`
- 导入Element-UI相关资源

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

### 5.2 基于图形化界面自动安装

1. `vue ui`
2. `vue项目管理器`
3. `插件 -> 添加插件`

4. `vue-cli-plugin-element`
5. 配置插件,实现按需导入,从而减少打包后项目的体积