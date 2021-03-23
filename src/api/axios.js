import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'

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
      console.log(error.response)
      //弹出错误信息
      Message.error(error.response.data.message ?? '服务器出错')
      //如果是401和404的话就跳转登陆页面
      if (error.response.status == 401 || error.response.status == 404) {
        //清除token信息
        localStorage.removeItem('token')
      }
    }
    return Promise.reject(error.response.data)
  }
)
// 相应拦截

export default axios
