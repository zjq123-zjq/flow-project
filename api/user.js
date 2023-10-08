/* 登录模块 */

import uniFetch from './uni-fetch.js'

export const login = (data) => {
  if (!data.account || !data.password) return
  // return uniFetch({
  //   url: '/driver/login/account',
  //   method: 'POST',
  //   data
  // })
  return uniFetch.post('/driver/login/account', data)
}