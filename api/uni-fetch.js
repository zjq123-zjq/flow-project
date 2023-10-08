/* http请求文件 */

// 引入 uni-app-fetch 
import {
  createUniFetch
} from 'uni-app-fetch'

import {
  useUserStore
} from '@/stores/user.js'

//创建实例
const uniFetch = createUniFetch({
  loading: {
    title: '加载中...'
  },
  baseURL: 'https://slwl-api.itheima.net',
  intercept: {
    // 请求拦截器
    request(options) {
      const store = useUserStore()
      // if (store.token) options.header.Authorization = store.token

      const defaultHeader = {
        Authorization: store.token
      }
      options.header = Object.assign({}, defaultHeader, options.header)

      return options
    },
    // 响应拦截器
    response(result) {

      if (result.statusCode === 200 && result.data.code === 200) {
        return result.data
      }
      if (result.statusCode === 401) {
        //token过期处理
      }
      uni.utils.toast(result.data.msg || '请求失败')
    },
  },
})

export default uniFetch