import { asyncRouterMap, constantRouterMap } from '@/router'
import { reactive, toRaw } from 'vue'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any): boolean {
  if (route.meta && route.meta.roles) {
    return roles.some((role: number | string) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes: any, roles: any): object[] {
  interface Res {
    res: object[];
  }
  const data: Res = reactive({
    res: []
  })
  routes.forEach((route: any) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      // 如果有子路由，则采用递归的方式
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
        if (!tmp.redirect && tmp.children.length > 0) {
          tmp.redirect = tmp.path + '/' + tmp.children[0].path
        }
      }
      data.res.push(tmp)
    }
  })
  // console.log(data.res, toRaw(data.res))
  return toRaw(data.res)
}

const state = {
  routers: constantRouterMap,
  addRouters: []
}
const mutations = {
  SET_ROUTERS: (state: any, routers: any) => {
    // console.log('routers', routers, state.addRouters)
    state.addRouters = routers
    state.routers = constantRouterMap.concat(toRaw(state.addRouters))
    // console.log(state.routers)
  }
}
const actions = {
  generateRoutes({ commit }: any, data: any) {
    return new Promise((resolve: any) => {
      const { roles } = data
      let accessedRouters
      if (roles.includes('admin')) {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      }
      // console.log('accessedRouters', accessedRouters)
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
