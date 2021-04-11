import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$message = Message
axios.defaults.baseURL = 'http://127.0.0.1:8086/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
