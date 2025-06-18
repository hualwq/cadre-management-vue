// src/utils/request.js
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8088', // 后端地址
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器（可选）
service.interceptors.response.use(
  response => response,
  error => {
    console.error('请求出错：', error)
    return Promise.reject(error)
  }
)

export default service
