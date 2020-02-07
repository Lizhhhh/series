// vue执行的过程,先把template解析成render函数
// render返回虚拟dom
// 从template转成render这一步叫compiler.这一步可以在webpack层面搞定.

/*
最终肯定是如下的形式:
render(h) {
  return h('div', {
    attr:''
  })
}
*/

new Vue({
  el: '#app',
  data() {
    return {
      name: 'marron'
    }
  },
  template: '<div>{{name}}</div>'
})
