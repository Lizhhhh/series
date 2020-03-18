import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 给所有http请求,添加请求头
http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截返回的http
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message.error({
        type: 'error',
        message: err.response.data.message
      })
      if(err.response.status == 401){
        router.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

export default http
