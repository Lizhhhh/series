Vue.prototype.mount = function() {
  this.render = this.createRenderFn()
  this.mountComponent()
}

Vue.prototype.mountComponent = function() {
  let mount = () => {
    this.update(this.render())
  }
  mount.call(this)
}

Vue.prototype.createRenderFn = function() {
  let AST = getVNode(this._template)
  return function render() {
    let _tmp = combine(AST, this._data)
    return _tmp
  }
}

Vue.prototype.update = function(vnode){
  let realDOM = parseVNode(vnode)
  this._parent.replaceChild(realDOM,document.querySelector('#app'))
}