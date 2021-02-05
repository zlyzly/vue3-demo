import Mock from 'mockjs'
import { builder, getBody, getQueryParameters } from '../util'

const getLists = ((options: any) => {
  console.log(options)
  const { limit, pos } = getQueryParameters(options)
  const obj: any = {
    total: Number,
    list: Array,
  }
  const data: any = []

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
  obj.total = 100
  obj.list = data
  return builder(obj)
})
const getLista = (() => {
  const obj: any = {
    list: Array,
  }
  const data: any = []
  // const list = Mock.mock({
  //   "array|1-10": [
  //     {
  //       "name|1": Mock.mock('@name'),
  //       "id": Mock.mock('@guid'),
  //       'title': Mock.mock('@title'),
  //       'content': Mock.Random.csentence()
  //     }
  //   ]
  // })
  // console.log(list)
  for (let i = 0; i < 2; i++) {
    data.push({
      'href': Mock.mock('@href'),
      'title': Mock.mock('@name'),
      'text': Mock.mock('@text'),
      'content': Mock.Random.csentence(),
      'description': Mock.mock('@description'),
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    })
  }
  obj.list = data
  return builder(obj)
})

Mock.mock(/\/list\/table/, 'get', getLists)
Mock.mock(/\/list\/lista/, 'get', getLista)