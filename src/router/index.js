import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '@/views/main'
import my from '@/views/my'

const routes = [
  {
    name: 'main',
    path: '/',
    component: main,
  },
  {
    name: 'my',
    path: '/my',
    component: my,
  }
]
export default new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueRouter)
