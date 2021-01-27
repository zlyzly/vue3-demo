const methods = [ 'get', 'post', 'put', 'delete' ]

const apis = [
  '/\\/list\\/table/',
  // '/\\/Pantomath\\/admin\\/login',
  // '/\\/Pantomath\\/admin\\/logout',
  // '/\\/Pantomath\\/app\\/index',
  // '/\\/Pantomath\\/app\\/type',
  // '/\\/Pantomath\\/admin\\/rule',
  // '/\\/Pantomath\\/admin\\/index',
  // '/\\/Pantomath\\/data\\/day_active_retain'
]

const res= []
apis.forEach((api) => {
  res.push(...methods.map(method => `${api}/${method}`))
})
// console.log(res)
export default res
