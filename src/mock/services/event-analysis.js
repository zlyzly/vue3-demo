import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters } from '../util'

// 事件列表
const eventList = (options) => {
  const { limit = 10 } = getQueryParameters(options)
  console.log(' >>>>>>>>>>>>>>> ')
  console.log(getQueryParameters(options))

  const data = []

  for (let i = 0; i < limit; i++) {
    data.push({
      id: Random.id(),
      name: '事件-' + Random.first(),
      created_date: Random.date('yyyy-MM-dd'),
      created_account: Random.first(),
      update_date: Random.date('yyyy-MM-dd'),
      update_account: Random.first()
    })
  }

  return builder({
    total: 53,
    list: data
  })
}

const removeAnalyse = (options) => {
  const { id } = getQueryParameters(options)
  if (!id) {
    return builder(null, '删除失败', 12345)
  }
  return builder({
    msg: '成功'
  })
}

Mock.mock(/\/Pantomath\/seeboard\/list_event_analyse/, 'get', eventList)
Mock.mock(/\/Pantomath\/seeboard\/delete_event_analyse/, 'delete', removeAnalyse)
