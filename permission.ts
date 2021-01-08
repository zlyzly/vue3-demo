import router from './src/router'
import store from './src/store/index'
import { getToken } from './src/utils/auth' // get token from cookie
import { toRaw } from 'vue'
const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to: any, form: any, next: any) => {
  console.log(router.getRoutes())
  const hasToken = getToken()
  // console.log('hasToken', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
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
                router.addRoute(toRaw(ele)) // 动态添加可访问路由表
              })
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          }).catch((err: any) => {
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
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
