//引入pinia
import {
  createPinia
} from 'pinia'

//pinia持久化插件
import piniaPluginpersistedstate from '@/stores/persist.js'

// 实例化Pinia
const pinia = createPinia()

export default function(app) {
  pinia.use(piniaPluginpersistedstate)
  app.use(pinia)
}