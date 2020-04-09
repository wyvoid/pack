import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '@/views/main'
import my from '@/views/my'
import liveList from '@/views/live/liveList'
import liveRoom from '@/views/live/liveRoom'

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
  },
  {
    name: 'liveList',
    path: '/liveList',
    component: liveList
  },
  {
    name: "liveRoom",
    path: '/liveRoom',
    component: liveRoom
  }
]
export default new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueRouter)
