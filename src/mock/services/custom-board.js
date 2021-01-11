import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const getCustomBoards = options => {
  const perBoard = () => ({
    name: Random.name(),
    id: Random.id()
    // start_date: Random.date('yyyy-MM-dd'),
    // end_date: Random.date('yyyy-MM-dd'),
    // last_date: Random.date('yyyy-MM-dd')
  })
  let count = 5
  const list = []
  while (count--) {
    list.push(perBoard())
  }
  return builder({
    list
  })
}

const deleteBoard = options => {
  const { id } = { ...getBody(options) }
  if (!id) {
    return builder(null, '删除失败', 12345)
  }
  return builder({
    msg: '成功'
  })
}

const addBoard = options => {
  const { name } = { ...getBody(options) }
  if (!name) {
    return builder(null, '创建失败', 12345)
  }
  return builder({
    msg: '创建成功',
    id: Random.id()
  })
}

const getEventList = options => {
  let { limit = 10 } = getQueryParameters(options)
  const list = []
  while (limit--) {
    list.push({
      id: Random.id(),
      name: '事件' + Random.first(),
      created_account: Random.first(),
      created_date: Random.date('yyyy-MM-dd')
    })
  }
  return builder({
    total: Mock.mock('@integer(30, 1000)'),
    list
  })
}

const getFunnelList = options => {
  let { limit = 10 } = getQueryParameters(options)
  const list = []
  while (limit--) {
    list.push({
      id: Random.id(),
      name: '漏斗' + Random.first(),
      created_account: Random.name(),
      created_date: Random.date('yyyy-MM-dd')
    })
  }
  return builder({
    total: Mock.mock('@integer(30, 1000)'),
    list
  })
}

// const genEventList = chartType => {
//   // const type = Mock.mock({ 'n|1-5': 1 }).n
//   const complexInfo = () => (Mock.mock({
//     'list|0-30': [{
//       date: () => Random.date('yyyy-MM-dd'),
//       num: () => Mock.mock('@integer(0, 100)')
//     }]
//   }).list)
//   const nameNum = () => (Mock.mock({
//     'list|0-100': [{
//       complex_name: () => Random.csentence(4, 10),
//       num: () => Mock.mock('@integer(0, 100)')
//     }]
//   }).list)
//   const line = {
//     group_name: '分群' + Random.first(),
//     group_info: [{
//       complex_name: () => Random.csentence(4, 10),
//       complex_info: complexInfo()
//     }]
//   }
//   const transverse = {
//     group_name: '分群' + Random.first(),
//     group_info: nameNum()
//   }
//   const vertical = {
//     group_name: '分群' + Random.first(),
//     group_info: nameNum()
//   }
//   const table = {
//     group_name: '分群' + Random.first(),
//     group_info: Mock.mock({
//       'list|0-10': [{
//         complex_name: () => Random.csentence(4, 10),
//         complex_info: complexInfo()
//       }]
//     }).list
//   }
//   const numerical = {
//     num: 0,
//     than_last_week: '',
//     info: complexInfo()
//   }

//   const dataSource = [
//     line,
//     transverse,
//     vertical,
//     table,
//     numerical
//   ]
//   const keys = [
//     'line_chart',
//     'transverse_column',
//     'vertical_column',
//     'table',
//     'numerical'
//   ]
//   return {
//     [keys[chartType - 1]]: {
//       type: chartType,
//       ...dataSource[chartType - 1]
//     }
//   }
// }

const genFunnelList = () => {
  const dataType = 1
  const funnelList = {
    data_type: dataType, // 1漏斗 2趋势
    name: '漏斗',
    total_tercentage: Mock.mock({ 'number|0.2': 1 }).number,
    group_name: '分群' + Random.first(),
    data: Mock.mock({
      [dataType === 2 ? 'list|1-1' : 'list|0-30']: [{
        date: () => Random.date('yyyy-MM-dd'),
        step: Mock.mock({
          'list|0-5': [{
            id: () => Random.id(),
            name: () => Random.csentence(3, 8),
            level: () => Mock.mock('@integer(1, 4)'),
            num: () => Mock.mock('@integer(1, 1000)'),
            cvr: () => Mock.mock({ 'number|0.2': 1 }).number
          }]
        }).list
      }]
    }).list,
    step: Mock.mock({
      'list|0-5': [{
        id: () => Random.id(),
        name: () => Random.csentence(3, 8),
        num: () => Mock.mock('@integer(0, 1000)'),
        cvr: () => Mock.mock({ 'number|0.2': 1 }).number
      }]
    }).list
  }
  return funnelList
}

// const getFunnelDetail = () => {
//   const funnelDetail = genFunnelList()

//   const rep = {
//     chart_list: {
//       created_account: Random.first(),
//       date: Random.date('yyyy-MM-dd'),
//       name: Random.csentence(3, 5),
//       id: Random.id(),
//       size: Math.random() > 0.5 ? 'large' : '',
//       start_date: Random.date('yyyy-MM-dd'),
//       end_date: Random.date('yyyy-MM-dd'),
//       ...previewChart({ body: JSON.stringify({ table_type: Mock.mock('@integer(1, 4)') }) }).data.chart_list,
//       funne: funnelDetail,
//       type: 1
//     }
//   }

//   return (rep)
// }

const removeChart = options => {
  const data = getBody(options)
  if (!data.type || !data.complex_id) {
    return builder(null, '', 1234)
  }
  return builder({
    msg: '删除成功'
  })
}

const addChart = options => {
  const data = getBody(options)
  if (!data.chart_list || !data.seeboard_id) {
    return builder(null, '', 1234)
  }
  return builder({
    msg: '添加成功'
  })
}

const removeComment = options => {
  const data = getBody(options)
  if (!data.id) {
    return builder(null, '', 1234)
  }
  return builder({
    msg: '删除成功'
  })
}

const addComment = options => {
  const data = getBody(options)
  if (!data.title || !data.seeboard_id) {
    return builder(null, '', 1234)
  }
  return builder({
    msg: '添加成功',
    id: Random.id()
  })
}

const sortBoards = options => {
  const { list } = getBody(options)
  if (!list || !list.length) {
    return builder(null, '', 12345)
  }
  return builder({
    msg: '排序成功'
  })
}

const modifyCharts = options => {
  const data = getBody(options)
  if (!data.seeboard_id || !data.chartList) {
    return builder(null, '', 12345)
  }
  return builder({
    msg: '成功'
  })
}

const previewChart = options => {
  const data = getBody(options)
  // if (!data.name || !data.last_day || !data.start_date || !data.end_date || !data.table_type) {
  //   return builder(null, '参数缺失', 123444)
  // }
  const keys = [ 'line_chart', 'transverse_column', 'vertical_column', 'table' ]
  const type = 2 // 1 漏斗 2 事件分析
  const chartType = data.table_type // 1线 2横柱 3竖柱图 4表格 5数值
  // const chartLen = type === 2 && chartLen === 1 ? 3 : 1
  let uCount = 1
  const groupList = Mock.mock({
    'list|2-4': [{
      id: () => Random.id(),
      // name: () => '用户_' + Random.first(),
      name: () => '用户_' + (uCount++),
      num: () => Mock.mock('@integer(0, 1000)')
    }]
  }).list
  const eventList = Mock.mock({
    'list|2-4': [{
      id: () => Random.id(),
      type: () => Mock.mock('@integer(1, 2)'), // 1事件 2指标
      dimension: Mock.mock('@integer(1, 3)'), //  1次 2人 3人均
      complex_id: () => Random.id(), // 事件id 或 简单指标id
      complex_name: () => '事件_' + Random.csentence(2, 4) // 事件名 或 指标名
    }]
  }).list
  const generateInfo = (len) => {
    const arr = []
    while (len--) {
      arr.push(Mock.mock('@integer(0, 1000)'))
    }
    return arr
  }
  const valueLen = groupList.length * eventList.length
  let count = 1
  const numList = Mock.mock({
    'list|4-10': [{
      date: () => `2020-06-0${count++}`,
      info: () => generateInfo(valueLen)
    }]
  }).list
  const rep = {
    type,
    group_list: groupList,
    event_analyse_conf: eventList,
    event_analyse: {
      type: chartType,
      ...keys.reduce((sum, k) => {
        sum[k] = numList
        return sum
      }, {}),
      numerical: {
        num: 1892,
        than_last_week: Math.random() > 0.5 ? 0.491111111 : -0.43565,
        info: Mock.mock({
          'list|4-10': [{
            date: () => `2020-06-0${count++}`,
            num: () => Mock.mock('@integer(3, 100)')
          }]
        }).list
      },
      funne: genFunnelList()
    }
  }

  return builder({
    chart_list: rep
  })
}

const getChartDetail = options => {
  const { id, type } = getQueryParameters(options)
  if (!id || !type) {
    return builder(null, '', 124444)
  }

  return builder({
    chart_list: {
      created_account: Random.first(),
      date: Random.date('yyyy-MM-dd'),
      name: Random.csentence(3, 5),
      id: Random.id(),
      size: Math.random() > 0.5 ? 'large' : '',
      start_date: Random.date('yyyy-MM-dd'),
      end_date: Random.date('yyyy-MM-dd'),
      ...previewChart({ body: JSON.stringify({ table_type: Mock.mock('@integer(1, 4)') }) }).data.chart_list,
      funne: genFunnelList(),
      type: Number(type)
    }
  })
}

const getBoardDetail = options => {
  const params = getQueryParameters(options)
  // const keys = [ 'funnel', 'event_analyse' ]
  // const type = 2 // 1漏斗 2事件分析
  // const type = 1 // 1线图 2横柱图 3竖柱图 4表格 5数值
  if (!params.id) {
    return builder(null, 'id不能为空', 1234)
  }
  const remarks = Mock.mock({
    'remarks|0-10': [{
      id: () => params.id,
      title: () => Random.first(),
      content: () => Random.csentence(10, 20)
    }]
  }).remarks

  // const chartList = (chartType) => Mock.mock({
  //   'list|0-20': {
  //     [keys[type - 1]]: type === 1 ? genFunnelList(chartType) : genEventList(chartType)
  //     // event_analyse: []
  //   }
  // }).list

  // const types = Mock.mock({ 'list|0-20': [() => Mock.mock('@integer(1, 5)')] }).list

  // const da = types.map(t => ({
  //   type: t,
  //   created_account: Random.first(),
  //   date: Random.date('yyyy-MM-dd'),
  //   name: Random.csentence(3, 5),
  //   id: Random.id(),
  //   size: Math.random() > 0.5 ? 'large' : '',
  //   start_date: Random.date('yyyy-MM-dd'),
  //   end_date: Random.date('yyyy-MM-dd'),
  //   order_num: Mock.mock('@integer(0, 20)'),
  //   ...chartList(t)
  // }))

  // return builder({
  //   remarks,
  //   chart_list: da
  // })
  const list = []
  const genList = (chartType) => {
    return {
      type: 2, // 事件分析
      created_account: Random.first(),
      date: Random.date('yyyy-MM-dd'),
      name: Random.csentence(3, 5),
      id: Random.id(),
      size: Math.random() > 0.5 ? 'large' : '',
      start_date: Random.date('yyyy-MM-dd'),
      end_date: Random.date('yyyy-MM-dd'),
      ...previewChart({ body: JSON.stringify({ table_type: chartType }) }).data.chart_list
    }
  }
  let count = 5
  while (--count) {
    const item = genList(count % 5 + 1)
    list.push(item)
  }

  list.unshift({
    ...genList(),
    funne: genFunnelList(),
    type: 1
  })

  return builder({
    remarks,
    chart_list: list
  })
}

// 评论
Mock.mock(/\/Pantomath\/seeboard\/add_remarks/, 'post', addComment)

Mock.mock(/\/Pantomath\/seeboard\/update_chart/, 'put', modifyCharts)
Mock.mock(/\/Pantomath\/seeboard\/list/, 'get', getCustomBoards)
Mock.mock(/\/Pantomath\/seeboard\/update/, 'put', sortBoards)
// 删除单图
Mock.mock(/\/Pantomath\/seeboard\/delete_chart/, 'delete', removeChart)
Mock.mock(/\/Pantomath\/seeboard\/add_chart/, 'post', addChart)
Mock.mock(/\/Pantomath\/seeboard\/delete/, 'delete', deleteBoard)
Mock.mock(/\/Pantomath\/seeboard\/add/, 'post', addBoard)
// 事件分析列表
Mock.mock(/\/Pantomath\/seeboard\/option_list/, 'get', getEventList)
// 漏斗列表
Mock.mock(/\/Pantomath\/funnel\/option_list/, 'get', getFunnelList)
Mock.mock(/\/Pantomath\/seeboard\/info/, 'get', getBoardDetail)
Mock.mock(/\/Pantomath\/seeboard\/delete_remarks/, 'delete', removeComment)
Mock.mock(/\/Pantomath\/seeboard\/chart_data/, 'get', getChartDetail)
Mock.mock(/\/Pantomath\/seeboard\/preview_event_analyse/, 'post', previewChart)
// Mock.mock(/\/Pantomath\/funnel\/info/, 'get', getFunnelDetail)
