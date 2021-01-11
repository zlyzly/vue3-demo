import Mock from 'mockjs2'
import { builder } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '天野远子',
    'username': 'admin',
    'avatar': '/avatar2.jpg',
    'type': 1,
    'app_rule': ['1', '2', '3'],
    // 'app_rule': [],
    'rule_list': [
      { 'app_id': '1', 'rule': [203, 204, 301, 401, 403] },
      { 'app_id': '2', 'rule': [101, 102, 201, 202, 203, 204, 205, 301, 402] },
      { 'app_id': '3', 'rule': [101, 102, 201, 202, 203, 204, 401, 402] }
    ],
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }
  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)
