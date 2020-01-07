import Vue from 'vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import './styles/element-variables.scss'
// lang i18n
// import locale from 'element-ui/lib/locale/lang/en'

// global css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// icon
import '@/assets/icons'
// permission control
import '@/permission'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 * 如果您不想使用模拟服务器
 * 您希望使用MockJs作为模拟api
 * 您可以执行:mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 * 目前MockJs将在生产环境中使用，请在上线前删除！！！
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
// 将elementUi语言设置为英文
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
