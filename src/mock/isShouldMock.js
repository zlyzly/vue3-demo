const methods = [ 'get', 'post', 'put', 'delete' ]

const apis = [
  // '/\\/Pantomath\\/admin\\/get_rule',
  // '/\\/Pantomath\\/admin\\/login',
  // '/\\/Pantomath\\/admin\\/logout',
  // '/\\/Pantomath\\/app\\/index',
  // '/\\/Pantomath\\/app\\/type',
  // '/\\/Pantomath\\/admin\\/rule',
  // '/\\/Pantomath\\/admin\\/index',
  // '/\\/Pantomath\\/data\\/day_active_retain',
  // '/\\/Pantomath\\/data\\/count_data',
  // '/\\/Pantomath\\/data\\/user_active_retain',
  // '/\\/Pantomath\\/data\\/pie_chart',
  // '/\\/Pantomath\\/data\\/custom_index',
  // '/\\/Pantomath\\/channel\\/index',
  // '/\\/Pantomath\\/funnel\\/index',
  // '/\\/Pantomath\\/retain\\/details',
  // '/\\/Pantomath\\/user\\/event',
  // '/\\/Pantomath\\/user\\/group',
  // '/\\/Pantomath\\/user\\/remarks',
  // '/\\/Pantomath\\/user\\/get_base_user_info',
  // '/\\/Pantomath\\/user\\/user_list',
  // '/\\/Pantomath\\/user\\/get_user_active_info',
  // '/\\/Pantomath\\/user\\/user_event_list',
  // '/\\/Pantomath\\/user\\/user_event_info',
  // '/\\/Pantomath\\/user\\/behavior_event_remark',
  // '/\\/Pantomath\\/user\\/event_info_list_total',
  // '/\\/Pantomath\\/ltv\\/total',
  // '/\\/Pantomath\\/ltv\\/info',
  // '/\\/Pantomath\\/ltv\\/add'
  // '/\\/Pantomath\\/user\\/event',
  // '/\\/Pantomath\\/index\\/list',
  // '/\\/Pantomath\\/index\\/add_index',
  // '/\\/Pantomath\\/index\\/update_index',
  // '/\\/Pantomath\\/index\\/index_info',
  // '/\\/Pantomath\\/index\\/delete_index',
  // '/\\/Pantomath\\/seeboard\\/preview_event_analyse',
  // '/\\/Pantomath\\/seeboard\\/list',
  // '/\\/Pantomath\\/seeboard\\/add',
  // '/\\/Pantomath\\/seeboard\\/info',
  // '/\\/Pantomath\\/seeboard\\/option_list',
  // '/\\/Pantomath\\/funnel\\/option_list',
  // '/\\/Pantomath\\/seeboard\\/add_remarks',
  // '/\\/Pantomath\\/seeboard\\/delete_remarks',
  // '/\\/Pantomath\\/seeboard\\/chart_data',
  // '/\\/Pantomath\\/seeboard\\/add_chart',
  // '/\\/Pantomath\\/seeboard\\/delete_chart'
    // '/\\/Pantomath\\/user\\/event'
    // '/\\/Pantomath\\/index\\/list',
  // '/\\/Pantomath\\/index\\/add_index'
]

const res = []
apis.forEach(api => {
  res.push(...methods.map(method => `${api}/${method}`))
})

export default res
