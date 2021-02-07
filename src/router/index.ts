// , statisticsRules, storeRules
import { reviewRules, configurationRules } from '@/utils/rules'
// , createWebHistory, RouteRecordRaw, createWebHashHistory
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import Layout from '@/components/layout/index.vue'
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined
} from '@ant-design/icons-vue'
const Layout = () => import('@/components/layout/index.vue')
const reviewRoles = reviewRules.concat([{ id: 'admin' }]).map(item => item.id)
const configurationRoles = configurationRules.concat([{ id: 'admin' }]).map(item => item.id)
// const statisticsRoles = statisticsRules.concat([{ id: 'admin' }]).map(item => item.id)
// const storeRoles = storeRules.concat([{ id: 'admin' }]).map(item => item.id)
// console.log('reviewRoles: ', reviewRoles)
// console.log('configurationRoles: ', configurationRoles)
// console.log('statisticsRoles: ', statisticsRoles)
// console.log('storeRoles: ', storeRoles)
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    hidden: true,
    children: [{
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/welcome/index.vue'),
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
    name: 'Review',
    component: Layout,
    meta: { title: '审核', roles: reviewRoles, icon: PieChartOutlined },
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/hello.vue'),
        meta: { title: '新用户账户认证', roles: ['admin', 101], activeMenu: '/review/about' },
        redirect: '/review/about/abouts',
        children: [
          {
            path: 'abouts',
            name: 'Abouts',
            hidden: true,
            component: () => import('@/views/404.vue'),
            meta: { title: '新用户账户认证11', roles: ['admin', 101], activeMenu: '/review/about' },
          }
        ]
      },
      {
        path: 'home',
        name: 'Homes',
        hidden: true,
        component: () => import('@/views/hello.vue'),
        meta: { title: '用户编辑资料审核', roles: ['admin', 102], activeMenu: '/review/home' }
      }
    ]
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: Layout,
    meta: { title: '综合配置', mainMenu: true, icon: MailOutlined, roles: configurationRoles },
    redirect: '/configuration/gifts',
    children: [
      {
        path: 'gifts',
        name: 'Gifts',
        // hidden: true,
        component: () => import('@/views/watch_computed.vue'),
        meta: { title: '礼物配置', roles: ['admin', 202], activeMenu: '/review/gifts' }
      },
      {
        path: 'hello',
        name: 'Hello',
        // hidden: true,
        component: () => import('@/views/hello.vue'),
        meta: { title: '用户编辑资料审核', roles: ['admin', 203], activeMenu: '/review/hello' }
      }
    ]
  },
  {
    path: '/config',
    name: 'Config',
    component: Layout,
    meta: { title: '基础学习', mainMenu: true, icon: DesktopOutlined, roles: configurationRoles },
    redirect: '/config/index',
    children: [
      {
        path: 'transition',
        name: 'Transition',
        component: () => import('@/views/data/transition.vue'),
        meta: { title: '过渡动画', roles: ['admin', 201] }
      },
      {
        path: 'syntax',
        name: 'Syntax',
        // hidden: true,
        component: () => import('@/views/template_syntax.vue'),
        meta: { title: '模板语法', roles: ['admin', 203] }
      },
      {
        path: 'component',
        name: 'Component',
        component: () => import('@/views/omponents_use.vue'),
        meta: { title: '组件使用', roles: ['admin', 204] }
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/data/index.vue'),
        meta: { title: '例子', roles: ['admin', 205] }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table.vue'),
        meta: { title: '表格', roles: ['admin', 211] }
      },
      {
        path: 'router',
        name: 'Router',
        // component: () => import('@/views/router/router.vue'),
        component: () => import('@/views/router/index.vue'),
        meta: { title: '路由', roles: ['admin', 210] },
        redirect: '/config/router/nested_router',
        children: [
          {
            path: 'nested_router',
            name: 'NestedRouter',
            hidden: true,
            component: () => import('@/views/router/router.vue'),
            meta: { title: '多级路由', roles: ['admin', 209], activeMenu: '/config/router' }
          },
          {
            path: 'modal',
            name: 'Modal',
            hidden: true,
            component: () => import('@/views/router/router1.vue'),
            meta: { title: '模态框', roles: ['admin', 209], activeMenu: '/config/router' }
          },
          {
            path: 'canvas',
            name: 'Canvas',
            hidden: true,
            component: () => import('@/views/router/canvas.vue'),
            meta: { title: '模态框', roles: ['admin', 209], activeMenu: '/config/router' }
          }
        ]
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '组件式API', icon: DesktopOutlined },
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main.vue'),
    meta: { title: '适配手机', icon: DesktopOutlined },
  },
  {
    path: '/users/:id',
    component: () => import('@/views/user.vue'),
    meta: { title: '路由', icon: DesktopOutlined }
  }
]
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 区别于vue2的mode，vue3中将使用history属性来决定采用哪种路由模式
  history: createWebHashHistory(), // 默认为Hash模式，可设置createWebHistory模式
  // 区别于vue2的base，vue3中的基础路由路径将作为createWebHashHistory或者createWebHistory的唯一参数配置到路由中。
  routes: constantRouterMap
})
export function resetRouter() {
  // const newRouter = createRouter({})
  // console.log(router)
  // router.matcher = newRouter.matcher // reset router
}
export default router

