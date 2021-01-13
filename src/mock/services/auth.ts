import Mock from 'mockjs'
import { builder, getBody } from '../util'

const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['admin', 'ant.design'] // admin, ant.design

const login = (options: any) => {
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.account) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'deleted': 0,
    'roleId': 'admin',
    'lang': 'zh-CN',
    'type': 1,
    'app_rule': ['1', '2', '3'],
    // 'app_rule': [],
    'rule_list': [
      { 'app_id': '1', 'rule': [203, 204, 301, 401, 403] },
      { 'app_id': '2', 'rule': [101, 102, 201, 202, 203, 204, 205, 301, 402] },
      { 'app_id': '3', 'rule': [101, 102, 201, 202, 203, 204, 401, 402] }
    ],
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}


Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
