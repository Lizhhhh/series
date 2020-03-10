function Vue(options){
  this._data = options.data
  let elm = document.querySelector(options.el)
  this._template = elm
  this._parent = elm.parentNode

  this.initData()
  this.mount()
}