import Mock, { Random } from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'
import moment from 'moment'

// 用户列表
const consumer = (options) => {
  const { limit = 10 } = getQueryParameters(options)

  const data = []

  for (let i = 0; i < limit; i++) {
    data.push({
      id: Random.id(), // 用户id
      mobile: Random.integer(10000000000, 18888888888), // 手机号
      city: Random.city(), // 城市
      model: '华为', // 机型
      created_date: Random.date('yyyy-MM-dd'), // 创建时间
      updated_date: Random.date('yyyy-MM-dd'), // 更新时间
      last_date: Random.date('yyyy-MM-dd'), // 最后操作时间
      last_account: Random.first() // 最后操作账户
    })
  }

  return builder({
    total: 504,
    list: data
  })
}

const userEventList = () => {
  return builder({
    total: 2,
    data: [{
      id: 1,
      name: '测试版看是否是否还能会发生覅是否会看是否合理和方法是否就是积极上进',
      num: 2,
      create_date: Mock.mock('@datetime'),
      update_date: Mock.mock('@datetime'),
      created_account: 'summer'
    },
    {
      id: 2,
      name: 'summerwang',
      num: 2,
      create_date: Mock.mock('@datetime'),
      update_date: Mock.mock('@datetime'),
      created_account: 'summerwang'
    }]
  })
}

const deleteEvent = () => {
  return builder({
    total: 1,
    data: [{
      id: 1,
      name: '测试版看是否是否还能会发生覅是否会看是否合理和方法是否就是积极上进',
      num: 2,
      create_date: Mock.mock('@datetime'),
      update_date: Mock.mock('@datetime'),
      created_account: 'summer'
    }]
  })
}

Mock.mock(/\/Pantomath\/user\/user_list/, 'get', consumer)
Mock.mock(/\/Pantomath\/user\/user_event_list/, 'get', userEventList)
Mock.mock(/\/Pantomath\/user\/user_event_list/, 'delete', deleteEvent)
const consumerBasicInfo = (options) => {
  const { id } = getQueryParameters(options)
  const res = {
    id, // number 用户id
    device: Random.id(), // string 设备号
    area_code: '+86', // string 区号,例:+86
    mobile: 18799998888, // number 手机号
    city: Random.city(), // string 城市
    model: Math.random() > 0.5 ? 'Android' : 'IOS', // string 机型
    date: Mock.mock('@datetime'), // string 接入日期
    other_info: Random.csentence(4, 20) // string 其他信息
  }
  return builder(res)
}

const consumerActiveInfo = (options) => {
  const res = {
    avg_single_use_time: Random.natural(1, 20), // number 平均单次使用时长
    avg_day_use_time: Random.natural(1, 40), // number 平均日使用时长
    active_day_num: Random.natural(1, 20), // number 活跃天数
    open_num: Random.natural(1, 5) // number 启动次数
  }
  return builder(res)
}

const behaviorLogs = (options) => {
  const res = getQueryParameters(options)
  const startDate = getQueryParameters(options).start_date
  const endDate = getQueryParameters(options).end_date
  const [ sDate, eDate ] = [ moment(startDate), moment(endDate) ]
  const days = eDate.diff(sDate, 'day')
  console.log(res)
  const data = []
  for (let i = 0; i < days; i++) {
    data.push({
      id: Random.id(), // 事件id
      name: `事件${i}`, // 事件名称
      num: Random.natural(10, 1000), // 次数
      created_date: moment(startDate).add(i, 'day').format('YYYY-MM-DD'), // 创建时间
      update_date: Mock.mock('@date'), // 修改时间
      created_account: Random.first() // 创建人
    })
  }
  return builder({
    list: data
  })
}

const behaviorRemarks = (options) => {
  const sDate = moment(getQueryParameters(options).start_date)
  const eDate = moment(getQueryParameters(options).end_date)
  const days = eDate.diff(sDate, 'day')
  const list = []
  for (let i = 0; i < days; i++) {
    list.push({
      id: Random.id(),
      content: Random.csentence(4, 10),
      created_at: eDate.add(1, 'days').format('YYYY-MM-DD'),
      account: Random.first()
    })
  }
  return builder({
    list
  })
}

const allCustomEvents = (options) => {
  const list = []
  for (const k in '012345') {
    list.push({
      id: k,
      event_code: Random.id(),
      name: '事件' + Random.first(),
      tpe: 1,
      status: 1
    })
  }
  return builder({
    total: 6,
    list
  })
}

const userRemarks = (options) => {
  const params = getQueryParameters(options)
  const startDate = params.start_date
  const endDate = params.end_date
  if (!params.device) {
    return builder(null, '参数有误', 400)
  }
  const list = []
  let limit = params.limit || 5
  if (startDate && endDate) {
    limit = moment(endDate).diff(moment(startDate), 'day')
  }
  while (limit--) {
    list.push({
      id: Random.id(), // integer 记录id
      content: Random.csentence(4, 10), // string 备注内容
      created_date: Random.date('yyyy-MM-dd'), // string 创建时间
      update_date: Random.date('yyyy-MM-dd'), // string 修改时间
      account: Random.first() // string 操作人账号
    })
  }
  return builder({
    list
  })
}

const removeUserRemark = (options) => {
  const { id } = getBody(options)
  if (!id) {
    return builder({}, '参数错误', 400)
  }
  return builder({})
}

const editUserRemark = (options) => {
  const { id, content } = getBody(options)
  if (!id || !content) {
    return builder({}, '参数错误', 400)
  }
  return builder({}, '', 200)
}

const addUserRemark = (options) => {
  const { content } = getBody(options)
  if (!content) {
    return builder({}, '参数错误', 400)
  }
  return builder({})
}

const customizeEventDetail = options => {
  const params = getQueryParameters(options)
  const list = []
  const logs = Mock.mock({ 'logs|0-10': [ { event_name: Random.csentence(4, 10), created_date: Random.time('HH:mm:ss') } ] })
  let limit = params.limit || 3
  const sDate = moment(params.start_date)
  const eDate = moment(params.end_date)
  const days = eDate.diff(sDate, 'day')
  const now = moment()
  if (!params.limit) {
    limit = days
  }
  while (limit--) {
    const tmp = {
      [now.add(-1, 'day').format('YYYY-MM-DD')]: {
        date: now.format('YYYY-MM-DD'),
        event_info: logs.logs,
        remarks: [
          ...Mock.mock({
            'remarks|0-10': [{
              id: () => Random.id(),
              content: () => Random.csentence(4, 10),
              account: () => Random.first(),
              created_date: () => Random.time('HH:mm:ss')
            }]
          }).remarks
        ]
      }
    }[now.format('YYYY-MM-DD')]
    list.push(tmp)
  }
  return builder({
    list,
    total: 100
  })
}

const addCustomizeEventLogs = options => {
  const { content } = getBody(options)
  if (!content) {
    return builder({}, '没有content', 400)
  }
  return builder({})
}

const removeCustomizeEventLogs = options => {
  const { id } = getBody(options)
  if (!id) {
    return builder({}, '没有id', 400)
  }
  return builder({})
}

const editCustomizeEventLogs = options => {
  const { id, content } = getBody(options)
  if (!id || !content) {
    return builder({}, '没有id或者content', 400)
  }
  return builder({})
}

const consumerMatain = options => {
  const params = getQueryParameters(options)
  const sDate = moment(params.start_date)
  const eDate = moment(params.end_date)
  const paddingDays = 0
  let days = eDate.diff(sDate, 'day') - paddingDays
  let type = 1
  if (days >= 180) {
    type = 3
    days = Math.floor(days / 30)
  } else if (days >= 60) {
    type = 2
    days = Math.floor(days / 7)
  }
  const list = []
  list.push([
    ...Mock.mock({
      [`item|${days}`]: [{
        date: '总数据',
        value: () => (Random.natural(0, 10)) * 10,
        percentage: () => Random.natural(0, 10) / 10
      }]
    }).item
  ])
  for (let i = 0; i < days; i++) {
    const item = [
      ...Mock.mock({
        [`item|${days}`]: [{
          value: () => (Random.natural(0, 10)) * 10,
          percentage: () => Random.natural(0, 10) / 10
        }]
      }).item
    ]
    list.push(item)
  }
  return builder({
    type, // week day
    startDate: sDate.add(paddingDays, 'day').format('YYYY-MM-DD'),
    endDate: eDate.format('YYYY-MM-DD'),
    list
  })
}

Mock.mock(/\/Pantomath\/user\/user_list/, 'get', consumer)
Mock.mock(/\/Pantomath\/user\/get_base_user_info/, 'get', consumerBasicInfo)
Mock.mock(/\/Pantomath\/user\/get_user_active_info/, 'get', consumerActiveInfo)
Mock.mock(/\/Pantomath\/user\/event_info_list_total/, 'get', behaviorLogs)
Mock.mock(/\/Pantomath\/user\/user_event_remarks_info/, 'get', behaviorRemarks)
Mock.mock(/\/Pantomath\/user\/event/, 'get', allCustomEvents)
Mock.mock(/\/Pantomath\/user\/remarks/, 'get', userRemarks)
Mock.mock(/\/Pantomath\/user\/remarks/, 'post', addUserRemark)
Mock.mock(/\/Pantomath\/user\/remarks/, 'put', editUserRemark)
Mock.mock(/\/Pantomath\/user\/remarks/, 'delete', removeUserRemark)
Mock.mock(/\/Pantomath\/user\/user_event_info/, 'get', customizeEventDetail)
Mock.mock(/\/Pantomath\/user\/behavior_event_remark/, 'post', addCustomizeEventLogs)
Mock.mock(/\/Pantomath\/user\/behavior_event_remark/, 'put', editCustomizeEventLogs)
Mock.mock(/\/Pantomath\/user\/behavior_event_remark/, 'delete', removeCustomizeEventLogs)
Mock.mock(/\/Pantomath\/retain\/details/, 'get', consumerMatain)
