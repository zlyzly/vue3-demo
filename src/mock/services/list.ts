import Mock from 'mockjs'
import { builder, getBody, getQueryParameters } from '../util'
const total = Math.floor(Math.random() * 500)
const getLists = ((options?: any) => {
  const limit = getQueryParameters(options).limit?  getQueryParameters(options).limit: 5
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
  obj.total = total
  obj.list = data
  return builder(obj)
})

const getListll = ((options: any) => {
  console.log(options)
  const limit = getQueryParameters(options).limit?  getQueryParameters(options).limit: 5
  const obj: any = {
    total: Number,
    list: Array,
  }
  const data: any = []
  for (let i = 0; i < limit; i++) {
    data.push({
      'id': Mock.mock('@guid'),
      'name': Mock.mock('@name'),
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
    })
  }
  obj.total = total
  obj.list = data
  obj.isNext = false
  // obj.isNext = getQueryParameters(options).pos === '20' ? false: true
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

const getListB = ((options: any) => {
  const { limit, pos } = getQueryParameters(options)
  const obj: any = {
    total: Number,
    list: Array,
  }
  const data: any = []
  const types = ['1', '2', '3', '1,2', '1,3', '2,3', '1,2,3']
  // const types = [['1'], ['2'], ['3'], ['1', '2'], ['1', '3'], ['2', '3'], ['1', '2', '3']]
  // let tips = type.sort(() => {
  //   return 0.5 - Math.random()
  // })
  for (let i = 0; i < Number(limit); i++) {
    data.push({
      'id': Mock.mock('@id'),
      'name': Mock.mock('@name'),
      'region': Mock.mock('@city'),
      'type': types[Math.floor((Math.random() * types.length))]
    })
  }
  obj.total = 100
  obj.list = data
  return builder(obj)
})
const getBar = (() => {
  const obj: any = {
    list: Array
  }
  const data: any = []
  for (let i = 0; i < 5; i++) {
    data.push({
      'time': Mock.mock('@time'),
      'value': Math.floor((Math.random() * 100))
    })
  }
  obj.list = data
  return builder(obj)
})
const getLine = (() => {
  const obj: any = {
    list: Array
  }
  const data: any = []
  for (let i = 0; i < 5; i++) {
    data.push({
      'time': Mock.mock('@time'),
      'value': Math.floor((Math.random() * 100))
    })
  }
  obj.list = data
  return builder(obj)
})
Mock.mock(/\/list\/table/, 'get', getLists)
Mock.mock(/\/list\/lista/, 'get', getLista)
Mock.mock(/\/list\/listb/, 'get', getListB)
Mock.mock(/\/list\/bar/, 'get', getBar)
Mock.mock(/\/list\/line/, 'get', getLine)

Mock.mock(/\/list\/listll/, 'get', getListll)