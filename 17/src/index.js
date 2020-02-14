// import $ from 'jquery'
import './css/1.css'
// import './css/1.less'
// import './css/1.scss'
// // 导入单文件组件
// import App from './components/App.vue'

// $(function() {
//   $('li:odd').css('backgroundColor', 'blue')
//   $('li:even').css('backgroundColor', 'lightblue')
// })

// class Person {
//   static info = 'aaa'
// }

// console.log(Person.info)

// --------------------- Vue 的使用
import Vue from 'vue'
import App from './components/App.vue'

const vm = new Vue({
  el:'#app',
  render: h => h(App)
})
