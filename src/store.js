import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged:false
  },
  mutations: {
    loginMut:function(state){      
      state.isLogged=true 
    },
    logoutMut:function(state){
      state.isLogged=false      
    }
  },
  actions: {
    loghimin:function({commit}){   
      commit('loginMut')
    },
    loghimout:function({commit}){
      commit('logoutMut')
    }
  }
  ,
  plugins: [vuexLocal.plugin]
})
