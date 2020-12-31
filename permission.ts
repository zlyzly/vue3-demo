import router from './src/router/index'
import store from './src/store/index'
// import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './src/utils/auth' // get token from cookie
// import getPageTitle from './src/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to: any, from: any, next: any) => {
  // start progress bar
  // NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // console.log('hasToken', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        if (store.getters.roles.length === 0) {
          store.dispatch('user/getInfo').then((res: any) => { // 拉取用户信息
            // console.log('getInfo------', res)
            const roles = res
            store.dispatch('permission/generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoute(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
          }).catch((err: any) => {
            store.dispatch('user/resetToken').then(() => {
              // Message.error(err || 'Verification failed, please login again')
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
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
