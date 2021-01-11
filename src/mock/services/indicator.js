import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getlist = options => {
  const perBoard = () => ({
    name: Random.name(),
    id: Random.id(),
    remarks: Random.name(),
    type: [1, 2][Math.floor(Math.random() * 2)],
    created_account: Random.name(),
    date: Random.date('yyyy-MM-dd'),
    use_num: Math.floor(Math.random() * 10)
  })
  let count = 20
  const list = []
  while (count--) {
    list.push(perBoard())
  }
  return builder({
    list
  })
}

const deleteList = options => {
  const id = getQueryParameters(options)
  console.log(id)
  if (!id) {
    return builder(null, '删除失败', 12345)
  }
  return builder({
    msg: '成功'
  })
}

const addIndex = options => {
  const params = getQueryParameters(options)
  console.log(params)
  if (!params) {
    return builder(null, '创建失败', 12345)
  }
  return builder({
    msg: '创建成功'
  })
}
const eidtIndex = options => {
  const params = getQueryParameters(options)
  if (!params) {
    return builder(null, '编辑失败', 12345)
  }
  return builder({
    msg: '编辑成功'
  })
}
const indexInfo = options => {
  const id = getQueryParameters(options)
  console.log(id)
  const perBoard = {
    type: 1,
    name: '111',
    remarks: '232323',
    rule_list: [
      {
        complex_id: 426,
        complex_name: '进入游客模式埋点 (前端)',
        data_source: 1,
        dimension: 1,
        symbol: 1,
        num_type: 1,
        type: 1
      },
      {
        complex_id: 424,
        complex_name: '充值金额',
        data_source: 1,
        dimension: 1,
        symbol: 2,
        num_type: 1,
        type: 1
      },
      {
        complex_id: 6,
        complex_name: 'App启动次数',
        data_source: 1,
        dimension: 1,
        symbol: 1,
        num_type: 2,
        type: 2
      }
    ],
    data_type: 1,
    float_len: 2
  }
  return builder({ perBoard })
}
Mock.mock(/\/Pantomath\/index\/list/, 'get', getlist)
Mock.mock(/\/Pantomath\/index\/delete_index/, 'delete', deleteList)
Mock.mock(/\/Pantomath\/index\/add_index/, 'post', addIndex)
Mock.mock(/\/Pantomath\/index\/update_index/, 'put', eidtIndex)
Mock.mock(/\/Pantomath\/index\/index_info/, 'get', indexInfo)
