// import Mock, { Random } from 'mockjs2'
// import { builder, getQueryParameters } from '../util'

// const countData = options => {
//   // const queryParameters = getQueryParameters(options)
//   const data = {
//     count_user_num: Random.natural(100, 1000),
//     count_user_num_than_last_week: Random.natural(10, 100),
//     active_user_num: Random.natural(100, 1000),
//     active_user_num_than_last_week: Random.natural(10, 100),
//     use_time: Random.natural(100, 1000),
//     use_time_than_last_week: Random.natural(10, 100),
//     add_user_num: Random.natural(100, 1000),
//     add_user_num_than_last_week: Random.natural(10, 100),
//     week_active_user_num: Random.natural(100, 1000),
//     week_active_user_num_than_last_week: Random.natural(10, 100)
//   }
//   return builder(data)
// }
// /**
//  * 应用列表
//  */
// const dayActiveRetain = options => {
//   const queryParameters = getQueryParameters(options)
//   const data = []
//   for (let i = 0; i < 10; i++) {
//     data.push({
//       id: i + 1,
//       date: Random.date('yyyy-MM-dd'),
//       add_user_num: Random.natural(10, 100),
//       active_user_num: Random.natural(10, 100),
//       open_num: Random.natural(10, 100),
//       count_user_num: Random.natural(10, 100),
//       next_day_retain: Random.natural(10, 100),
//       avg_single_use_time: Random.date('HH:mm:dd'),
//       avg_day_use_time: Random.date('HH:mm:dd')
//     })
//   }
//   return builder({
//     totalCount: 40,
//     pageSize: queryParameters.limt,
//     pageNo: queryParameters ? Number(queryParameters.pageNo || 1) : 1,
//     totalPage: 4,
//     data
//   })
// }
// // Mock.mock(/\/Pantomath\/data\/count_data/, 'get', countData)
// // Mock.mock(/\/Pantomath\/data\/day_active_retain/, 'get', dayActiveRetain)
// // Mock.mock(/\/Pantomath\/data\/day_active_retain/, 'get', dayActiveRetain)
