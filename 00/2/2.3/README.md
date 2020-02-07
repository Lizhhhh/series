# 面试

# 1. 课程目标

1. 掌握前端工程师面试的方方面面
2. 掌握常见面试题
3. 简历优化
4. 职业生涯软技能

# 2. 知识要点

1. javascript
2. ES6
3. this
4. promise
5. 浏览器
6. 安全
7. vue
8. react
9. 工程化
10. 计算机基础



# 3. 起步

## 3.1 学习计划

1. 知识要点都是要掌握的吗?
   1. 基础一定要掌握
      1. js运行机制
      2. ES6
      3. 算法数据结构
      4. 没用基础很难做源码分析
   2. 通用的技能,有一个深入掌握即可
      1. vue、react、工程化,小程序
      2. 每一个都是入门,其实没意义
      3. 一定有一个源码级的技能
      4. 回顾以下vue源码
2. vue源码学习细节
   1. vue2为什么引入虚拟dom
      1. 有了watcher,能够监听每个变量的变化,且可以直接更新.为什么还要虚拟dom
   2. Object.defauneProperty的缺点
   3. vue的虚拟DOM有什么特点
   4. vue源码执行的流程

## 3.2 简历

需包含以下信息

1. 基本信息: 姓名、年龄、手机、邮箱
2. 学历
3. 工作经验
4. 开源项目
5. 技术点(最好源码级)



## 3.3 Vue源码解读 (一)

<font color=red>注意: 先不要太过关注具体细节,而是对Vue整体流程进行了解.之后在对感兴趣的模块深度学习</font>

1.从官网上拷贝文件: `git clone https://github.com/vuejs/vue.git`

2.寻找入口文件

- 打开 `package.json`找到属性`"build"`

```json
"scripts": {
    "build":"node scripts/build.js"
}
```

3.进入`build.js`

```js
// 部分关键代码
let builds = require('./config').getAllBUilds()

build(builds)

function build (builds){
    
}
```

4.发现builds引入了`config`,打开config.js

```js
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
// 上面导出了一个getAllBuilds函数.
// 该函数将 builds展开.并给予配置
// 找到builds
// 发现builds是所有vuejs版本的构建配置
// 找到我们学习所需的builds
const builds ={
    // 学习阶段需要的配置
    // Runtime + compiler ES modules build (for builders)
    "web-full-esm":{
        entry: resolve('web/entry-runtime-with-compiler.js'),
        dest: resolve('dist/vue.esm.js'),
        format: 'es',
        alias: { he: './entity-decoder'},
        banner
    }
}
```

4.找到了`entry`顺着找到了`web/entry-runtime-with-compiler.js`

```js
// 发现entry-runtime-with-compiler.js 就是 vue代码的入口文件
// 往上面找Vue的定义
import Vue from './runtime/index';
// 发现Vue是通过当前目录下面的runtime/index引入的


// 再这个文件里面修改了一下 $mount
// 赋值了一个 compile

// 再最后一行发现了
export default Vue
```

5.`runtime/index.js`

```js
// 靠前
import Vue from 'core/index'

// 定义了$mount

// 最下面
export default Vue

```

6.`core/index.js`

```js
import Vue from './instance/index'

// 全局api扩展

export default Vue
```

7.`core/instance/index.js`

```js
// 这里是Vue定义的地方
function Vue(options){
    if(process.env.NODE_ENV !== 'production' && !(this instanceof Vue)){
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 执行了 init 函数
    this._init(options)
}

// 5个扩展函数
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

### 3.3.1 initMixin

- `core/instance/init.js`

```js
export function initMixin () {
    Vue.prototype._init = function (options ?: Object){
        ...
        // 初始化生命周期
        initLifecycle(vm)
        // 初始化事件
        initEvents(vm)
        // 初始化渲染函数
        initRender(vm)
        // 执行生命周期
        callHook(vm, 'beforeCreate')
        initInjections(vm) // resolve injections before data/props
        initState(vm)
        initProvide(vm) // resolve provide after data/props
        
        // 如果有el执行 $mount
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
}
```

#### 3.3.3.1 initLifecycle

- `core/instance/lifecycle.js`

```js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  // 定位第一个具体的父元素
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
// 初始化 $parent、$root、$children、$refs、_watcher、...
  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

- 定位第一个具体的父元素
- 初始化 $parent、$root、$children、$refs、_watcher、...



#### 3.3.3.2 initEvents

```js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

```

- 初始化_events,事件存储

#### 3.3.3.3 initRender

```js
export function initRender(vm: Component) {
    // 初始化子树的根节点
    vm._vnode = null;
    // 一次的缓存树?
    vm._staticTrees = null;
    // 获取传入的 options
    const options = vm.$options;
    // 父树中的占位符节点
    const parentVnode = vm.$vnode = options._parentVnode;
    // 渲染上下文
    const renderContext = parentVnode && parentVnode.context
    // 插槽相关
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopeSlots = emptyObject
    // 将创建元素的函数绑定到这个实例上
    // 这样我们就可以在里面得到一个合适的上下文
    // 排列的顺序: tag, data, children, normalizationType, alwaysNormalize
    // 内部版本由模板编译的渲染函数使用
    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
    // 标准化经常被用来申请公开版本,用于用户编写的渲染函数
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
    
    // 将属性($attr)和监听者($listener)暴露出去,使创建更简单
    const parentData = parentVnode && parentVnode.data
    
    // 后面是环境优化,没用细看
}
export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
    if(Array.isArray(data) || isPrimitive(data)){
        normalizationType = children
        children = data
        data = undefined
    }
    if(isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS.NORMALIZE
    }
    return _createElement(context, tag, data, children, normalizationType)
}
```

- vm.c就是createElement,在compile模块会用到__c
- vm.$createElement也是createElement(重点看的函数)
- attrs、listeners

#### 3.3.3.4 initInjections

```js
export function initInjections () {
    defineReactive(vm, key, result[key]);
}
```

- 定义了向上查找provide的逻辑

#### 3.3.3.5 initState

```js
export function initState() {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }  
}
```

- 初始化了props、methods、data、observe、computed、watch
- 就是整体的配置

#### 3.3.3.6 initProvide

```js
export function initProvide (){
    const provide = vm.$options.provide;
    if(provide) {
        vm._provided = typeof provide === 'function'
        ? provde.call(vm)
        : provide
    }
}
```

- 可以是函数

### 3.3.2 stateMixin

- `core/instance/state.js`

```js
export function stateMixin(){
    // 定义了Vue的 $data 属性
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);
    
    Vue.prototype.$set = set;
    Vue.prototype.$delete =del;
    Vue.prototype.$watch = function(){}
}
```

### 3.3.3 eventsMixin

- `core/instance/events.js`

```js
export function eventsMixin (){
    // 事件
    Vue.prototype.$on = function() {}
    Vue.prototype.$once = function() {}
    Vue.prototype.$off = function () {}
    Vue.prototype.$emit = function () {}
}
```

### 3.3.4 lifecycleMixin

- `core/instance/lifecycle.js`

```js
export function lifecycleMixin(){
    Vue.prototype._update = function() { // 非常重要,虚拟DOM更新
        if(!prevVnode) {
            // 首次渲染
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
        } else {
            // 更新
            vm.$el = vm.__patch__(prevVnode, vnode)
        }
    }	
    Vue.prototype.$forceUpdate = function() {	// 强制更新
        if(vm._watcher){
            vm._watcher.update()
        }
    }
    Vue.prototype.$destroy = function() {}
}
```

### 3.3.5 renderMixin

- `core/instance/render.js`

```js
export function renderMixin() {
    Vue.prototype.$nextTick = function() {
        return nextTick(fn, this)
    }
    Vue.prototype._render = function() {
        // 渲染过程,生产虚拟DOM
        try {
            vnode = render.call(vm._renderProxy, vm.$createElement)
        }
    }
}
```

## 3.4 Vue源码解读 (二)

### 3.4.1 runtime-with-compile

1. $mount修正

2. runtime-/index

   1. 定义 patch

   2. 定义$mount

   3. core/index

      1. initGlobalAPI

      2. ```js
         Vue.util = {
             warn,
             extend,
             mergeOptions,
             defineReactive
         }
         
         Vue.set = set
         Vue.delete = del
         Vue.nextTick = nextTick
         
         export const ASSET_TYPES = [
           'component',
           'directive',
           'filter'
         ]
         
         ASSET_TYPES.forEach(type => {
         	Vue.options[type + 's'] = Object.create(null)
         })
         
         /*
         {
         	components:{},
         	filters:{},
         	directives:{}
         }
         */
         
         // 注册keep-alive
         /*
         initUse: 初始化 vue.use 插件机制
         initMixin: Vue.mixin 合并配置
         initExtend: Vue.extend 继承机制
         initAssetRegisters
         */
         ```



### 3.4.2 initState

```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```









