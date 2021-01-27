import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store/index'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
// console.log('service', service)
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  (error: object) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: any) => {
    const res = response.data
    if (Array.isArray(res)) {
      return {
        total: Number(response.headers['X-Total-Count'] || response.headers['x-total-count']) || response.data.length,
        list: response.data
      }
    } else {
      return res
    }
  },
  (error: any) => {
    const { response } = error
    // console.log('err', response) // for debug
    // console.log('response.config.url', response.config.url) // for debug
    // if (error.message && error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    //   message({
    //     message: 'Request timeout. might be poor network connection, please try again',
    //     type: 'error',
    //     duration: 2 * 1000
    //   })
    //   return Promise.reject(error)
    // }

    if (response.status === 401) { // 401 代表token失效，需要重新登录（没权限也是401，error_message是invalid rule）
      if (response.data.error_message !== 'Token Not Found') {
        message.error({
          message: '你已被登出，请重新登录',
          duration: 3 * 1000,
          onClose() {
            store.dispatch('user/resetToken').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }
        })
      } else {
        return Promise.reject(response)
      }
    } else if (response.status === 500) { // 500
      if (response.data.error_message !== 'Part Operator Failure') {
        message.error('服务端不太给力哦~')
      }
      return Promise.reject(response)
    } else {
      return Promise.reject(response)
    }
  }
)

export default service

// / 创建axios 实例
// const service = axios.create({
//     baseURL: config.baseURL, // api的base_url
//     timeout: 10000 // 请求超时时间
// })

// // request 拦截器
// service.interceptors.request.use(
//     config => {
//         // 这里可以自定义一些config 配置
//         return config
//     },
//     error => {
//         //  这里处理一些请求出错的情况
//         Promise.reject(error)
//     }
// )

// // response 拦截器
// service.interceptors.response.use(
//     response => {
//         const res = response.data
//         // 这里处理一些response 正常返回时的逻辑
//         return res
//     },
//     error => {
//         // 这里处理一些response 出错时的逻辑

//         return Promise.reject(error)
//     }
// )

// export default service
