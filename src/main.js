import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueXgplayer from 'vue-xgplayer'
import Chat from 'vue-beautiful-chat'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

Vue.use(Chat)
Vue.config.productionTip = false
const base = axios.create({
  baseURL: 'http://zeta1.us-east-2.elasticbeanstalk.com/'

//  baseURL: 'http://localhost:3000/'
 })
 

 Vue.use(VueXgplayer, {
   // globalOptions
   enterLogo: {
     url: '/images/video-player-loading.png',
     width: 100,
     height: 40
   },
   playsinline: true
 })

 Vue.prototype.$axios = base
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
