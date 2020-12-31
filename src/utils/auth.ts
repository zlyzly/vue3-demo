import Cookies from 'js-cookie'
import { reviewRules, configurationRules, statisticsRules, storeRules } from '@/utils/rules'

const TokenKey = 'smallworld-admin-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setloginRoles(roles: object) {
  return Cookies.set('login-roles', roles)
}
export function removeloginRoles() {
  return Cookies.remove('login-roles')
}
export function getloginRoles() {
  return Cookies.remove('login-roles')
}
export function setAdminName(name: string) {
  return Cookies.set('admin-name', name)
}
export function getAdminName() {
  return Cookies.get('admin-name')
}
export function removeAdminName() {
  return Cookies.remove('admin-name')
}

export const permissionMap = reviewRules.concat(configurationRules).concat(statisticsRules).concat(storeRules)

