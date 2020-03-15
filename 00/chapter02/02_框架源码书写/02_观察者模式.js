// class Dep {
//   constructor() {
//     this.subs = []
//   }

//   // 增加订阅者
//   addSub(sub) {
//     if (this.subs.indexOf(sub) < 0) {
//       this.subs.push(sub)
//     }
//     return this
//   }

//   // 发布订阅
//   notify() {
//     this.subs.forEach(sub => {
//       sub.update()
//     })
//     return this
//   }
// }

// const dep = new Dep()

// const sub1 = {
//   update() {
//     console.log('sub1 update')
//   }
// }

// const sub2 = {
//   update() {
//     console.log('sub2 update')
//   }
// }

// dep
//   .addSub(sub1)
//   .addSub(sub2)
//   .notify()

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(name, cb) {
    if (this.subs[name] == undefined) {
      this.subs[name] = [cb]
    } else {
      this.subs[name].push(cb)
    }
  }
  notify(name, argument) {
    if (this.subs[name].length < 0) return
    this.subs[name].forEach(cb => {
      cb()
    })
  }
}

const dep = new Dep()
dep.addSub('sayHi', () => {
  console.log('hi')
})
dep.addSub('sayHello', () => {
  console.log('hello')
})

// 用setTimeout模拟异步环境下的事件调用
setTimeout(() => {
  dep.notify('sayHi')
}, 1000)

dep.notify('sayHello')
