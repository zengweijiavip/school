/**
 * 封装request请求，在调用api接口时使用
 */

import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// 创建axios实例
const service = axios.create({
  // url = base url + request url
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // send cookies when cross-domain requests 
  // 当跨域请求时发送cookie
  // withCredentials: true, 
  // request timeout
  // 超时
  timeout: 5000 
})

// request interceptor
// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 在发送请求之前做些什么
    if (store.getters.token) {
      // let each request carry token
      // 让每个请求携带自定义token
      // ['X-Token'] is a custom headers key
      // ['X-Token'] 是自定义标题键
      // please modify it according to the actual situation
      // 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * 如果您想获得http信息，如头信息或状态信息
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * 通过自定义代码确定请求状态
   * Here is just an example
   * 这只是一个例子
   * You can also judge the status by HTTP Status Code
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // 如果自定义代码不是20000，则判断为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008:非法令牌;50012:其他客户登录;50014:令牌过期
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
