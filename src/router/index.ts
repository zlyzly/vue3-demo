// , statisticsRules, storeRules
import { reviewRules, configurationRules } from '@/utils/rules'
// , createWebHistory, RouteRecordRaw, createWebHashHistory
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Layout from '@c/layout/index.vue'
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined
} from '@ant-design/icons-vue'
const Layout = () => import('@c/layout/index.vue')
const reviewRoles = reviewRules.concat([{ id: 'admin' }]).map(item => item.id)
const configurationRoles = configurationRules.concat([{ id: 'admin' }]).map(item => item.id)
// const statisticsRoles = statisticsRules.concat([{ id: 'admin' }]).map(item => item.id)
// const storeRoles = storeRules.concat([{ id: 'admin' }]).map(item => item.id)
// console.log('reviewRoles: ', reviewRoles)
// console.log('configurationRoles: ', configurationRoles)
// console.log('statisticsRoles: ', statisticsRoles)
// console.log('storeRoles: ', storeRoles)
export const constantRouterMap:Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@v/login/index.vue'),
    meta: { title: '登陆', icon: 'dashboard', hidden: true }
  },

  {
    path: '/404',
    component: () => import('@v/404.vue'),
    meta: { title: '404', icon: 'dashboard', hidden: true }
  },
  {
    path: '/home',
    component: () => import('@v/Home.vue'),
    meta: { title: 'Home', icon: 'dashboard', hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [{
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@v/welcome/index.vue'),
      meta: { title: '欢迎页', icon: 'dashboard', hidden: true }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRouterMap:Array<RouteRecordRaw> = [
  // {
  //   path: '/review',
  //   name: 'Review',
  //   component: Layout,
  //   meta: { title: '审核', roles: reviewRoles, icon: PieChartOutlined },
  //   children: [
  //     {
  //       path: 'about',
  //       name: 'About',
  //       component: () => import('@v/hello.vue'),
  //       meta: { title: '新用户账户认证', roles: ['admin', 101], activeMenu: '/review/about' },
  //       redirect: '/review/about/abouts',
  //       children: [
  //         {
  //           path: 'abouts',
  //           name: 'Abouts',
  //           component: () => import('@v/404.vue'),
  //           meta: { title: '新用户账户认证11', roles: ['admin', 101], activeMenu: '/review/about', hidden: true },
  //         }
  //       ]
  //     },
  //     {
  //       path: 'home',
  //       name: 'Homes',
  //       component: () => import('@v/hello.vue'),
  //       meta: { title: '用户编辑资料审核', roles: ['admin', 102], activeMenu: '/review/home', hidden: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/configuration',
  //   name: 'Configuration',
  //   component: Layout,
  //   meta: { title: '综合配置', mainMenu: true, icon: MailOutlined, roles: configurationRoles },
  //   redirect: '/configuration/gifts',
  //   children: [
  //     {
  //       path: 'gifts',
  //       name: 'Gifts',
  //       component: () => import('@v/watch_computed.vue'),
  //       meta: { title: '礼物配置', roles: ['admin', 202], activeMenu: '/review/gifts', hidden: true}
  //     },
  //     {
  //       path: 'hello',
  //       name: 'Hello',
  //       component: () => import('@v/hello.vue'),
  //       meta: { title: '用户编辑资料审核', roles: ['admin', 203], activeMenu: '/review/hello', hidden: true }
  //     }
  //   ]
  // },
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
        component: () => import('@v/data/transition.vue'),
        meta: { title: '过渡动画', roles: ['admin', 201] }
      },
      {
        path: 'syntax',
        name: 'Syntax',
        // hidden: true,
        component: () => import('@v/template_syntax.vue'),
        meta: { title: '模板语法', roles: ['admin', 203] }
      },
      {
        path: 'component',
        name: 'Component',
        component: () => import('@v/omponents_use.vue'),
        meta: { title: '组件使用', roles: ['admin', 204] }
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import('@v/data/index.vue'),
        meta: { title: '例子', roles: ['admin', 205] }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@v/table.vue'),
        meta: { title: '表格', roles: ['admin', 211] }
      },
      {
        path: 'router',
        name: 'Router',
        // component: () => import('@v/router/router.vue'),
        component: () => import('@v/router/index.vue'),
        meta: { title: '多级路由', roles: ['admin', 210] },
        redirect: '/config/router/nested_router',
        children: [
          {
            path: 'nested_router',
            name: 'NestedRouter',
            component: () => import('@v/router/router.vue'),
            meta: { title: '多级路由', roles: ['admin', 209], activeMenu: '/config/router', hidden: true }
          },
          {
            path: 'modal',
            name: 'Modal',
            component: () => import('@v/router/router1.vue'),
            meta: { title: '模态框', roles: ['admin', 209], activeMenu: '/config/router', hidden: true }
          },
          {
            path: 'canvas',
            name: 'Canvas',
            component: () => import('@v/router/canvas.vue'),
            meta: { title: '模态框', roles: ['admin', 209], activeMenu: '/config/router', hidden: true }
          }
        ]
      },
      {
        path: 'lazyload',
        name: 'Lazyload',
        component: () => import('@v/lazyload.vue'),
        meta: { title: '图片懒加载', roles: ['admin', 213] }
      },
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import('@v/echarts/index.vue'),
        meta: { title: '图表使用', roles: ['admin', 215] },
        redirect: '/config/echarts/antv-g2',
        children: [
          {
            path: 'antv-g2',
            name: 'AntvG2',
            component: () => import('@v/echarts/antv-g2/index.vue'),
            meta: { title: 'antv-g2', roles: ['admin', 215], activeMenu: '/config/echarts', hidden: true }
          },
          {
            path: 'viser',
            name: 'Viser',
            component: () => import('@v/echarts/viser/index.vue'),
            meta: { title: 'viser', roles: ['admin', 215], activeMenu: '/config/echarts', hidden: true }
          }
        ]
      },
      {
        path: 'quillEditor',
        name: 'QuillEditor',
        component: () => import('@v/quillEditor/index.vue'),
        meta: { title: '编辑器vue-quill-editor', roles: ['admin', 219] }
      },
      {
        path: 'tables',
        name: 'Tables',
        component: () => import('@v/table.vue'),
        meta: { title: 'table', roles: ['admin', 219] }
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@v/hello.vue'),
        meta: { title: 'history', roles: ['admin', 219] }
      },
      {
        path: 'table-ajax',
        name: 'TableAjax',
        component: () => import('@v/tables/table-ajax2.vue'),
        meta: { title: 'table-ajax', roles: ['admin', 219] }
      },
      {
        path: 'table-list4',
        name: 'TableList4',
        component: () => import('@v/tables/index4.vue'),
        meta: { title: 'table-index4', roles: ['admin', 219] }
      }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('@v/Home.vue'),
  //   meta: { title: '组件式API', icon: DesktopOutlined },
  // },
  // {
  //   path: '/main',
  //   name: 'Main',
  //   component: () => import('@v/main.vue'),
  //   meta: { title: '适配手机', icon: DesktopOutlined },
  // },
  // {
  //   path: '/users/:id',
  //   component: () => import('@v/user.vue'),
  //   meta: { title: '路由', icon: DesktopOutlined }
  // }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // 区别于vue2的mode，vue3中将使用history属性来决定采用哪种路由模式
  // history: createWebHashHistory(), // 默认为Hash模式，可设置createWebHistory模式
  // 区别于vue2的base，vue3中的基础路由路径将作为createWebHashHistory或者createWebHistory的唯一参数配置到路由中。
  routes: constantRouterMap
})
export function resetRouter() {
  // const newRouter = createRouter({})
  // console.log(router)
  // router.matcher = newRouter.matcher // reset router
}
export default router

