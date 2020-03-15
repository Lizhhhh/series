let depid = 0

class Dep {
  constructor() {
    this.id = depid++
    this.subs = []
  }

  /**  添加一个 watcher */
  addSub(sub) {
    this.subs.push(sub)
  }

  /** 移除 */
  removeSub(sub) {
    for (let i = this.subs.length - 1; i >= 0; i--) {
      if (sub === this.subs[i]) {
        this.subs.splice(i, 1) // 删除第i项
      }
    }
  }

  /** 将当前 Dep 与当前的 watcher 关联  */
  depend() {
    // 就是将当前的 dep 与 当前的 watcher 互相关联
    if (Dep.target) {
      this.addSub(Dep.target) // 将当前的Watcher关联到当前的Dep上

      Dep.target.addDep(this) // 将当前的 dep 与当前渲染 watcher 关联起来
    }
  }

  /** 触发与之关联的 watcher 的update方法,起到更新的作用 */
  notify() {
    // 在真实的Vue中是依次触发this.subs中的watcher的update方法
    // 此时,deps中已经关联到我们使用的Watcher了
    let deps = this.subs.slice()
    deps.forEach(watcher => {
      watcher.update()
    })
  }
}

// 全局的容器存储渲染 watcher
// let globalWatcher
// 学 Vue 的实现
Dep.target = null

let targetStack = []

/** 将当前操作的 watcher 存储到 全局watcher 中,参数 target 就是当前 watcher */
function pushTarget(target) {
  debugger
  targetStack.unshift(Dep.target) // vue的源代码中使用的是 push
  Dep.target = target
}

/** 将当前watcher 踢出 */
function popTarget() {
  Dep.target = targetStack.shift() // 踢出到最后就是 undefined
}

/**
 * 在 watcher 调用 get 方法的时候,调用 pushTarget(this)
 * 在 watcher 的 get方法结束的时候,调用 popTarget
 */
