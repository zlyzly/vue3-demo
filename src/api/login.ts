import request from '@/utils/request'

// 登录
export function login(data: object) {
  return request({
    url: '/backend/admins/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(token: any) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/backend/admins/logout',
    method: 'delete'
  })
}

export function getRoles() {
  return request({
    url: '/backend/admins/get_rule_list',
    method: 'get'
  })
}
// 审核sidebar上角标
export function getCheckBadges() {
  return request({
    url: '/backend/check/overview',
    method: 'get'
  })
}