import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js' // 引入elementUI
import router from './router' // 引入路由

import './style.css' // 引入总体样式

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http

// maxin可以理解为代码块,让Vue的每一个实例都拥有这个代码块
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
