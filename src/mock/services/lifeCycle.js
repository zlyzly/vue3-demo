import Mock, { Random } from 'mockjs2'
import { builder } from '../util'

const genConfig = (i) => ({
  count_data: {
    type: i,
    count: Math.floor(Math.random() * 1000),
    count_ratio: Math.random() > 0.5 ? Math.random().toFixed(2) : -Math.random().toFixed(2),
    now: Math.floor(Math.random() * 1000),
    now_ratio: Math.random() > 0.5 ? Math.random().toFixed(2) : -Math.random().toFixed(2)
  },
  list: {
    date: Random.date('yyyy-MM-dd'),
    type: i,
    num: Math.floor(Math.random() * 1000)
  }
})

const config = { count_data: [], list: [] }
let count = 4
while (count--) {
  const d = genConfig(count + 1)
  const [countData, list] = [d.count_data, d.list]
  config.count_data.push(countData)
  config.list.push({ ...list, type: 1 })
  config.list.push({ ...list, type: 2 })
  config.list.push({ ...list, type: 3 })
  config.list.push({ ...list, type: 4 })
}

const data = (params) => {
  console.log(params)
  return builder({
    count_data: [{
      type: 1,
      count: 100,
      count_ratio: 0.23,
      now: 1249,
      now_ratio: -0.1
    }, {
      type: 2,
      count: 98,
      count_ratio: 0.23,
      now: 123,
      now_ratio: -0.1
    }, {
      type: 3,
      count: 4432,
      count_ratio: 0.23,
      now: 9,
      now_ratio: -0.1
    }, {
      type: 4,
      count: 2344,
      count_ratio: 0.23,
      now: 998,
      now_ratio: -0.1
    }],
    list: [
      {
        date: '2020-11-01',
        type: 1,
        num: 132
      },
      {
        date: '2020-11-02',
        type: 1,
        num: 13
      },
      {
        date: '2020-11-03',
        type: 1,
        num: 199
      }, //
      {
        date: '2020-11-01',
        type: 2,
        num: 88
      },
      {
        date: '2020-11-02',
        type: 2,
        num: 2
      },
      {
        date: '2020-11-03',
        type: 2,
        num: 255
      }, //
      {
        date: '2020-11-01',
        type: 3,
        num: 889
      },
      {
        date: '2020-11-02',
        type: 3,
        num: 34
      },
      {
        date: '2020-11-03',
        type: 3,
        num: 778
      }, //
      {
        date: '2020-11-01',
        type: 4,
        num: 34
      },
      {
        date: '2020-11-02',
        type: 4,
        num: 776
      },
      {
        date: '2020-11-03',
        type: 4,
        num: 56
      }
    ]
  })
}

Mock.mock(/\/Pantomath\/lifeCycle\/get/, 'get', builder({
  novice: 40,
  silent: 40,
  loss: 40
}))
Mock.mock(/\/Pantomath\/lifeCycle\/update/, 'put', data)
Mock.mock(/\/Pantomath\/lifeCycle\/data/, 'get', data)
