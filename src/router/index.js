import Vue from 'vue'
import VueRouter from 'vue-router'

// import main from '@/views/main'
// import my from '@/views/my'
// import liveList from '@/views/live/liveList'
// import liveRoom from '@/views/live/liveRoom'

const routes = [
  {
    name: 'main',
    path: '/',
    component: () => import ('@/views/main'),
  },
  {
    name: 'my',
    path: '/my',
    component:  () => import ('@/views/my'),
  },
  {
    name: 'liveList',
    path: '/liveList',
    component: () => import ('@/views/live/liveList'),
  },
  {
    name: "liveRoom",
    path: '/liveRoom',
    component: () => import ('@/views/live/liveRoom'),
  }
]
export default new VueRouter({
  mode: 'history',
  routes
})
Vue.use(VueRouter)
