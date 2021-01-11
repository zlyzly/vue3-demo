import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const accounts = options => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  const { limit = 10 } = queryParameters
  const data = []

  for (let i = 0; i < limit; i++) {
    data.push({
      id: Random.id(), // string 管理员id
      account: Random.name(), // string 账号
      type: Random.natural(1, 5) + '', // string 管理员类型:1最高管理员 2管理员 3子应用管理员 4查看用户 5自定义
      date: Random.date('yyyy-MM-dd') // string 创建日
    })
  }

  const res = builder({
    total: Mock.mock('@integer(30, 1000)'),
    data
  })
  return res
}

/**
 * 应用列表
 */
let cacheAppList = []
const appList = options => {
  const queryParameters = getQueryParameters(options)
  const { id } = queryParameters
  const data = []
  console.log('queryParameters', queryParameters)
  const newApp = () => {
    return {
      id: Random.id(),
      name: Random.name(),
      app_type: '交友',
      icon: Random.image('200x100', '#00405d', '#FFF', 'Mock.js'),
      appkey: Random.guid(),
      day: Random.natural(10, 100),
      user_total: Random.natural(100, 10000),
      custom_param_total: Random.natural(0, 10),
      system_type: Random.natural(0, 3),
      created_date: Random.date('yyyy-MM-dd'),
      account: Random.id()
    }
  }

  if (id) {
    data.push(cacheAppList.find(app => app.id === id) || newApp())
  } else {
    for (let i = 0; i < 4; i++) {
      data.push(newApp())
    }
    cacheAppList = data
  }

  return builder({
    totalCount: 4,
    pageSize: 10,
    pageNo: queryParameters ? (queryParameters.pageNo || 1) : 1,
    totalPage: 40,
    data
  })
}

// 创建应用
const createApp = options => {
  cacheAppList.unshift(getQueryParameters(options))
  return builder({})
}

Mock.mock(/\/Pantomath\/admin\/index/, 'get', accounts)
Mock.mock(/\/Pantomath\/app\/index/, 'get', appList)
Mock.mock(/\/Pantomath\/app\/index/, 'post', createApp)
Mock.mock(/\/Pantomath\/app\/index/, 'delete', builder({
  result: '删除应用成功'
}))
