# 7. 前端模块化

## 7.1 模块化相关规范

### 7.1.1 模块化概述

- 模块化: 把单独的一个功能封装到一个模块(文件)中,模块之间相互隔离,但是可以通过特定的接口公开内部成员,也可以依赖别的模块
- 模块化的优点: 方便代码的重用, 从而提高开发效率,并且方便后期的维护

### 7.1.2 浏览器模块化规范

1. AMD: [Require.js](http://www.require.cn/)
2. ACM: [Sea.js](https://seajs.github.io/seajs/docs/)

### 7.1.3 服务器端模块化规范

1. CommonJS
   1. 模块分为 `单文件模块` 与 `包`
   2. 模块成员导出: `module.exports`和 `exports`
   3.  模块成员导入: require('模块标识符')

### 7.1.4 大一统的模块化规范 - ES6模块化

- 在ES6模块化规范诞生以前,JavaScript社区已经尝试并提出了 AMD、CMD、CommonJS等模块化规范.

- ES6语法规范中, 在语言层面上定义了ES6模块化规范,是浏览器与服务器端通用的模块化开发规范



<b>ES6模块化规范的定义:</b>

- 每个js文件都是一个独立的模块
- 导入模块成员使用import关键字
- 暴露模块成员使用export关键字



#### 7.1.4.1 Node.js中通过babel体验ES6模块化

1. `npm install --save-dev @bable/core @babel/cli @babel/preset-env @babel/node`
2. `npm install --save @babel/polyfill`
3. 根目录下创建`babel.config.js`

```js
const preset=[
    ["@babel/env",{
        target: {
            edge: '17',
            firefox: '60',
            chrome: '67',
            safari: '11.1'
        }
    }]
];
module.exports = { presets };
```

4. 命令行输入`npx babel-node index.js`执行代码