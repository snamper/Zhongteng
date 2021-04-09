import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router'
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token') ?? ''
    NProgress.start()
    // 请求前的拦截 设置统一的headers
    console.log(token, 'token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    //关闭加载

    NProgress.done()
    if (error.response) {
      if (error.response.data.message == 'token has expired') {
        Message.error('用户信息失效，请重新登录')
        router.replace('/login')
        localStorage.removeItem('token')
        return false
      }
      //弹出错误信息
      Message.error(error.response.data.message ?? '服务器出错')
    }
    return Promise.reject(error.response.data)
  }
)
// 相应拦截

export default axios
