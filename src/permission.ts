import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
import { toRaw } from 'vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style
const whiteList = ['/login', '/404'] // no redirect whitelist
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to: any, form: any, next: any) => {
  NProgress.start() // start progress bar
  // console.log(router.getRoutes(), to, form)
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
              // console.log(store.getters.addRouters)
              store.getters.addRouters.forEach((ele: any) => {
                // console.log(toRaw(ele))
                router.addRoute(ele)
                // router.getRoutes().filter((r => toRaw(ele).name === r.name))
                // router.addRoute(router.getRoutes().filter((r => toRaw(ele).name === r.name))[0]) // 动态添加可访问路由表
                // if (to.name !== toRaw(ele).name) {
                // }
              })
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          }).catch((err) => {
            store.dispatch('user/resetToken').then(() => {
              next({ path: '/' })
            })
          })
          next()
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