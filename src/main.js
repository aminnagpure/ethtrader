import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

Vue.config.productionTip = false
const base = axios.create({
  baseURL: 'http://zeta1.us-east-2.elasticbeanstalk.com/'

//  baseURL: 'http://localhost:3000/'
 })

 Vue.prototype.$axios = base
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
