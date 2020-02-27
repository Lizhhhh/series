// 参考 : https://segmentfault.com/a/1190000017039526

class Observer {
  constructor(data) {
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

  defineReactive(obj, key, val) {
    const dep = new Dep()
    new Observer(val)
    // 给数据添加响应式
    Object.defineProperty(obj, key, {
      get() {
        // 如果是要添加的目标
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
    console.log('订阅事件')
    if (this.subs.indexOf(sub) < 0) {
      this.subs.push(sub)
    }
  }
  notify() {
    console.log('发布事件')
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

data.obj.name
