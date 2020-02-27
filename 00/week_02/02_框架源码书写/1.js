
class Observer {
  constructor(data) {
    // 如果不是对象则返回
    if (!data || typeof data !== 'object') {
      return
    }
    this.data = data
    // 对传入的数据进行劫持
    this.walk()
  }

  walk() {
    for (let key in this.data) {
      this.defineReactive(this.data, key, this.data[key])
    }
  }
  // 具体的添加响应式
  defineReactive(obj, key, val) {
    const dep = new Dep()
    new Observer(val)
    Object.defineProperty(obj, key, {
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        new Observer(newVal)
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    if (this.subs.indexOf(sub) < 0) {
      this.subs.push(sub)
    }
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

Dep.target = null

class Watcher {
  constructor(vm, keys, updateCb) {
    this.vm = vm
    this.keys = keys
    this.updateCb = updateCb
    this.value = null
    this.get()
  }

  get() {
    Dep.target = this
    const keys = this.keys.split('.')
    let value = this.vm
    keys.forEach(_key => {
      value = value[_key]
    })
    this.value = value
    Dep.target = null
    return this.value
  }

  update() {
    const oldValue = this.value
    const newValue = this.get()
    if (oldValue !== newValue) {
      this.updateCb(oldValue, newValue)
    }
  }
}

let data = {
  name: 'cjg',
  obj: {
    name: 'zht'
  }
}

new Observer(data)

new Watcher(data, 'name', (oldValue, newValue) => {
  console.log(oldValue, newValue)
})

data.name = 'zht'

new Watcher(data, 'obj.name', (oldValue, newValue) => {
  console.log(oldValue, newValue)
})

data.obj.name = 'cwc'
data.obj.name = 'dmh'