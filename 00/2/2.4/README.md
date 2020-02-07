# SSR演示

- 使用到: express、react、react-dom: `npm install express react react-dom`

### 1. 最简单的hooks组件

- `@/container/index.js`

```js
import React, { useState } from 'react'

// hooks组件
const Index = () => {
  let [count, setCount] = useState(1)
  return (
    <div>
      <h1>开课吧 {{ count }}</h1>
      <button onClick={() => setCount(count + 1)}>累加</button>
    </div>
  )
}
export default Index
```

### 2. 客户端入口

- `@/client/index.js`

```js
// 客户端入口

import React from 'react'
import ReactDom from 'react-dom'

import Index from '../container/index'

// ssr render要用hydreacte替换 注水
ReactDom.hydrate(<Index></Index>, document.getElementById('root'))
```

- 在渲染的时候,在由于服务端已经渲染好了,因此使用hydrate替换render

### 3. 服务器端入口

- 由于要渲染jsx文件,而node不能识别jsx文件,因此需要借助 webpack 和 babel来识别jsx文件
- 下面先配置webpack: `@/webpack.server.js`

#### 3.1 webpack的配置

##### 3.1.1 设置模式、入口、出口文件

```js
const path = require('path');

module.exports = {
    target: 'node',
    mode: 'devlopment',
    entry: './server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
}
```

##### 3.1.2 设置js的解析规则

```js
module.exports = {
    module:{
        rules:[
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options:{
                    preset:['@babel/preset-react',['@babel/preset-env']]
                }
            }
        ]
    }
}
```

- 写好配置之后,还需要下载一些插件帮助构建项目: `npm install webpack webpack-cli babel-loader @babel/preset-react @babel/preset-env`

##### 3.1.3 启动命令

- 写个启动命令,一个是构建命令,一个是启动命令
- `package.json`

```js
{
    "scripts":{
        "dev:server": "webpack --config webpack.server.js --watch",
        "dev:start": "nodemon --webpack build --exec node \"./buld/bundle.js\""
    }
}
```

- 使用命令先打包

```cli
$ npm run dev:server
```





