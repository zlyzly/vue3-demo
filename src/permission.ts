import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style
const whiteList = ['/login', '/404'] // no redirect whitelist
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start() // start progress bar
  // console.log(router.getRoutes(), to, from)
  const hasToken = getToken()
  // console.log('hasToken', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        if (store.getters.roles.length === 0) {
          store.dispatch('user/getInfo').then((res: any) => { // 拉取用户信息
            const roles = res
            store.dispatch('permission/generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              store.getters.addRouters.forEach((ele: any) => {
                router.addRoute(ele)
              })
              // const redirect = from.query.redirect || to.path
              // if (to.path === redirect) {
              //   next({ ...to, replace: true })
              // } else {
              //   next()
              // }
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          }).catch((err) => {
            store.dispatch('user/resetToken').then(() => {
              next({ path: '/' })
            })
          })
        } else {
          next()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})