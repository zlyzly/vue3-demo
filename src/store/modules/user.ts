import { login, logout, getRoles } from '../../api/login'
import { getToken, setToken, removeToken, getAdminName, removeAdminName, permissionMap, setloginRoles, removeloginRoles } from '@/utils/auth'
import { resetRouter } from '../../router/index'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },
  SET_NAME: (state: any, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: any, avatar: string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state: any, roles: any) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }: any, userInfo: any) {
    const { account, password } = userInfo
    return new Promise((resolve: any, reject: any) => {
      login({ account: account.trim(), password: password }).then((response: any) => {
        // console.log(response)
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        setloginRoles(response.rule)
        resolve()
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }: any, state: any) {
    return new Promise((resolve, reject) => {
      getRoles().then((response: any) => {
        const roles: any = []
        response.list.forEach((element: any) => {
          const permissionMapItem = permissionMap.find(item => item.id === Number(element.id))
          if (permissionMapItem) {
            if (permissionMapItem.id === 401) {
              roles.push(permissionMapItem.id, 'admin')
            } else {
              roles.push(permissionMapItem.id)
            }
          }
        })
        commit('SET_ROLES', roles)
        const adminName = getAdminName()
        if (adminName) {
          if (!adminName) {
            commit('SET_NAME', 'admin')
          } else {
            commit('SET_NAME', adminName)
          }
        }
        resolve(roles)
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }: any) {
    return new Promise((resolve: any, reject: any) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        removeloginRoles()
        removeAdminName()
        resolve()
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }: any) {
    return new Promise((resolve: any) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
      removeAdminName()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}