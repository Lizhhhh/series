// 响应式化的部分
let ARRAY_METHOD = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']

let array_methods = Object.create(Array.prototype)

ARRAY_METHOD.forEach(method => {
  array_methods[method] = function() {
    // 调用原来的方法
    console.log(`调用的是拦截的 ${method} 方法`)
    // 将数据进行响应式化
    for (let i = 0; i < arguments.length; i++) {
      observe(arguments[i]) // 这里还是有一个问题, 在引入Watcher以后解决
    }

    let res = Array.prototype[method].apply(this, arguments)
    return res
  }
})

function defineReactive(target, key, value, enumerable) {
  let that = this
  if (typeof value == 'object' && value != null) {
    observe(value)
  }
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,

    get() {
      console.log(`读取${key}属性`)
      return value
    },
    set(newVal) {
      console.log(`设置${key} 属性为 ${newVal}`)

      // 将重新赋值的数据变成响应式, 因此如果传入的是对象类型,那么就需要使用 observe 将其转换为响应式
      if (typeof newVal == 'object' && newVal != null) {
        observe(newVal)
      }

      value = newVal
      typeof that.mountComponent === 'function' && that.mountComponent()
      // 临时: 数组现在没有参与页面的渲染
      // 所以在数组上进行响应式处理,不需要页面的刷新
      // 即使这里无法调用也没有关系
    }
  })
}

// 将某一个对象的属性访问映射到对象的某一个属性成员上
function proxy(target, prop, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return target[prop][key]
    },
    set(newVal) {
      target[prop][key] = newVal
    }
  })
}

/*  将对象o变成响应式的
    vm: Vue实例,在调用时处理上下文
 */
function observe(obj, vm) {
  // 之前没有对obj本身进行操作,直接对o进行判断
  if (Array.isArray(obj)) {
    // 对其每一个元素处理
    obj.__proto__ = array_methods
    for (let i = 0; i < obj.length; i++) {
      // 递归处理每一个数组的元素
      observe(obj[i], vm)
      // 如果想要这么处理,就在这里继续调用defineReactive
      // defineReactive.call(vm, obj, i, obj[i], true)
    }
  } else {
    // 对其成员进行处理
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      let prop = keys[i]
      defineReactive.call(vm, obj, prop, obj[prop], true)
    }
  }
}

// 初始化数据
Vue.prototype.initData = function() {
  // 遍历 this._data 的成员,将属性转换为响应式(上),将直接属性,代理到实例上
  let keys = Object.keys(this._data)

  observe(this._data, this)

  // 代理
  for (let i = 0; i < keys.length; i++) {
    // 将 this._data[keys[i]] 映射到this[keys[i]]上
    // 就是要让 this 提供keys[i]这属性
    // 在访问这个属性的时候,相当于在访问this._data的这个属性

    proxy(this, '_data', keys[i])
  }
}
