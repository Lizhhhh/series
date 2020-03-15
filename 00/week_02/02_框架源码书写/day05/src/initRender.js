Vue.prototype.mount = function() {
  this.render = this.createRenderFn()
  // 闭包的使用
  this.mountComponent()
}

Vue.prototype.mountComponent = function() {
  let mount = () => {
    this.update(this.render())
  }

  // 这个 Watcher 就是全局的 Watcher,在任何一个位置都可以访问他
  new Watcher(this, mount)

}

Vue.prototype.createRenderFn = function() {
  let AST = getVNode(this._template)
  return function render() {
    let _tmp = combine(AST, this._data)
    return _tmp
  }
}

Vue.prototype.update = function(vnode) {
  let realDOM = parseVNode(vnode)
  this._parent.replaceChild(realDOM, document.querySelector('#app'))
}
