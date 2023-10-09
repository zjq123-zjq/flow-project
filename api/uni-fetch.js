/* http请求文件 */

// 引入 uni-app-fetch 
import {
  createUniFetch
} from 'uni-app-fetch'

import {
  useUserStore
} from '@/stores/user.js'
import {
  login
} from './user'

const tabBarPagePaths = ['pages/task/index', 'pages/message/index', 'pages/my/index']

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
        const pageStack = getCurrentPages()
        const redirectURL = pageStack[pageStack.length - 1].route
        const routeType = tabBarPagePaths.includes(redirectURL) ? 'switchTab' : 'redirectTo'

        return uni.redirectTo({
          url: `/pages/login/index?routeType=${routeType}&redirectURL=/${redirectURL}`,
        })
      }
      uni.utils.toast(result.data.msg || '请求失败')
    },
  },
})

export default uniFetch