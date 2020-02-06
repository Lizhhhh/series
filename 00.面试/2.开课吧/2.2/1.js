class Event {
  constructor() {
    // 存储事件
    this.callbacks = {}
  }

  // 取消订阅事件
  $off(name) {
    this.callbacks[name] = null
  }

  // 触发事件
  $emit(name, arg) {
    let cbs = this.callbacks[name]
    if (cbs) {
      // 将事件拿出来.
      cbs.forEach(v => {
        v.call(this, arg)
      })
    }
  }

  // 订阅事件
  $on(name, fn) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }
    this.callbacks[name].push(fn)
  }
}

let event = new Event()
event.$on('event1', function(arg) {
  console.log('事件1', arg)
})

event.$on('event1', function(arg) {
  console.log('又一个事件1', arg)
})
event.$on('event2', function(arg) {
  console.log('事件2', arg)
})
event.$emit('event1', { name: 'marron' })
event.$emit('event2', { name: 'marron' })
