import { reviewRules, configurationRules, statisticsRules, storeRules } from '@/utils/rules'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layouts from '../components/layout/index.vue'

const reviewRoles = reviewRules.concat([{ id: 'admin' }]).map(item => item.id)
const configurationRoles = configurationRules.concat([{ id: 'admin' }]).map(item => item.id)
const statisticsRoles = statisticsRules.concat([{ id: 'admin' }]).map(item => item.id)
const storeRoles = storeRules.concat([{ id: 'admin' }]).map(item => item.id)
// console.log('reviewRoles: ', reviewRoles)
// console.log('configurationRoles: ', configurationRoles)
// console.log('statisticsRoles: ', statisticsRoles)
// console.log('storeRoles: ', storeRoles)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('../views/404.vue'),
    hidden: true
  },

  {
    path: '/',
    component: Layouts,
    hidden: true,
    redirect: '/welcome',
    children: [{
      path: 'welcome',
      name: 'Welcome',
      component: () => import('../views/welcome/index.vue'),
      meta: { title: '欢迎页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRouterMap = [
  {
    path: '/review',
    component: Layouts,
    name: 'Review',
    hidden: false,
    meta: {
      title: '审核',
      mainMenu: true,
      // icon: 'form',
      roles: reviewRoles
    },
    children: [
      {
        path: 'about',
        name: 'About',
        hidden: false,
        component: () => import('../views/About.vue'),
        meta: { title: '新用户账户认证', roles: ['admin', 101], activeMenu: '/review/about' },
        children: []
      },
      {
        path: 'home',
        name: 'Homes',
        hidden: false,
        component: () => import('../views/Home.vue'),
        meta: { title: '用户编辑资料审核', roles: ['admin', 102], activeMenu: '/review/home' }
      }
    ]
  },
  {
    path: '/configuration',
    component: Layouts,
    name: 'Configuration',
    meta: { title: '综合配置', mainMenu: true, icon: 'example', roles: configurationRoles },
    children: [
      {
        path: 'gift_set',
        name: 'GiftSet',
        component: () => import('../views/Home.vue'),
        meta: { title: '礼物配置', roles: ['admin', 202] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: constantRouterMap
})
export function resetRouter() {
  // const newRouter = createRouter({})
  console.log(router)
  // router.matcher = newRouter.matcher // reset router
}
export default router

