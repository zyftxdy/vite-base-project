import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/layout',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (layout.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'layout' */ '@/layout/index.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/404', //404页面
    name: 'notFound',
    component: () => import(/* webpackChunkName: 'error' */ '@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes
})

export default router
