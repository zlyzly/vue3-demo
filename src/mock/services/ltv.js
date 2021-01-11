import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'
/**
 * ltv列表
 */
let cacheAppList = []
const appList = options => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  // const { id } = queryParameters
  const data = []
  const num = []
  for (let index = 0; index < Random.natural(10, 100); index++) {
    num.push(Random.natural(10, 100))
  }
  const newApp = () => {
    return {
       user_group_id: Random.id(), // 分群id
       group_name: Random.name(),
       ltv: num
    }
  }

  for (let i = 0; i < 4; i++) {
    data.push(newApp())
  }
  cacheAppList = data
  return builder({
    totalCount: 4,
    pageSize: 10,
    pageNo: 1,
    totalPage: 40,
    data
  })
}
// 创建应用
const createApp = options => {
  cacheAppList.unshift(options)
  return builder({})
}
// 详情
const appListDetail = options => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  const data = []
  const num = []
  for (let index = 0; index < Random.natural(10, 100); index++) {
    num.push(Random.natural(10, 100))
  }
  const newApp = () => {
    return {
       date: Random.date(),
       ltv: num
    }
  }

  for (let i = 0; i < 4; i++) {
    data.push(newApp())
  }
  return builder({
    totalCount: 4,
    pageSize: 10,
    pageNo: 1,
    totalPage: 40,
    data
  })
}
Mock.mock(/\/Pantomath\/ltv\/total/, 'get', appList)
Mock.mock(/\/Pantomath\/ltv\/add/, 'post', createApp)
Mock.mock(/\/Pantomath\/ltv\/info/, 'get', appListDetail)
