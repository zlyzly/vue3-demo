import Mock from 'mockjs'
import { builder, getBody } from '../util'

const getList = (options: any) => {
  const body = getBody(options)
  // console.log('mock: body', body)
  
  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'deleted': 0,
    'roleId': 'admin',
    'lang': 'zh-CN',
    'type': 1,
    // 'app_rule': ['1', '2', '3'],
    // // 'app_rule': [],
    // 'rule_list': [
    //   { 'app_id': '1', 'rule': [203, 204, 301, 401, 403] },
    //   { 'app_id': '2', 'rule': [101, 102, 201, 202, 203, 204, 205, 301, 402] },
    //   { 'app_id': '3', 'rule': [101, 102, 201, 202, 203, 204, 401, 402] }
    // ],
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
const getLists = () => {
  return new Promise((resolve: any, reject: any) => {
    const list = [
      {
        'id': Mock.mock('@guid'),
        'name': Mock.mock('@name'),
        'username': 'admin',
        'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
        'deleted': 0,
        'roleId': 'admin',
        'lang': 'zh-CN',
        'type': 1
      },
      {
        'id': Mock.mock('@guid'),
        'name': Mock.mock('@name'),
        'username': 'admin',
        'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
        'deleted': 0,
        'roleId': 'admin',
        'lang': 'zh-CN',
        'type': 1
      },
    ]
    resolve(list)
  })
}
const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}


// Mock.mock(/\/list\/table/, 'get', getLists)

export default {
  getLists
}
