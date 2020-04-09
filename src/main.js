import 'assets/css/main.scss'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueSocketIO from 'vue-socket.io'

import MintUI from 'mint-ui'

Vue.use(MintUI)

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://139.196.72.220:3660',
  vuex: {       // 不需要用到vuex这个可以不加
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})