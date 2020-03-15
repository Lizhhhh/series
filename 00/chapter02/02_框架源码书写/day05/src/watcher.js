let watcherid = 0

/* Watcher 观察者,用于发射更新的行为 */
class Watcher {
  constructor(vm, expOrFn) {
    this.id = watcherid++
    this.vm = vm
    this.getter = expOrFn


    this.deps = [] // 依赖项
    this.depIds = {}

    this.get()
  }

  /** 计算, 触发 getter */
  get() {
    pushTarget(this)
    this.getter.call(this.vm, this.vm)
    popTarget()
  }

  /** 执行,并判断是懒加载,还是同步执行,还是异步执行
   *  现在只考虑异步执行(简化的是 同步执行)
   */
  run() {
    // 在真正的vue中是调用queueWatcher,来触发nextTick 进行异步的执行
    this.get()
  }

  /** 对外公开的额函数,用于在属性发生变化时触发的接口 */
  update(){
    this.run()
  }

  /** 清空依赖队列 */
  cleanupDep() {}

  /** 将当前的 dep 与当前的 watcher 关联 */
  addDep(dep) {
    this.deps.push(dep)
  }
}
