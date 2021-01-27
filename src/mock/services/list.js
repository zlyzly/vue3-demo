import Mock from 'mockjs'
import { builder, getBody, getQueryParameters } from '../util'

const getLists = (options => {
  console.log(options)
  const { limit, pos } = getQueryParameters(options)

  const data = []

  for (let i = 0; i < limit; i++) {
    data.push({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'username': Mock.mock('@name'),
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'deleted': 0,
      'roleId': Mock.mock('@guid'),
      'lang': 'zh-CN',
      'type': 1
    })
  }

  return builder({
    total: 100,
    list: data
  })
})


Mock.mock(/\/list\/table/, 'get', getLists)
