// 客户端入口

import React from 'react'
import ReactDom from 'react-dom'

import Index from '../container/index'

// ssr render要用hydreacte替换 注水
ReactDom.hydrate(<Index></Index>, document.getElementById('root'))
