const methods = [ 'get', 'post', 'put', 'delete' ]

const apis: any = [
  '/\/list\/table/',
  // '/\\/Pantomath\\/admin\\/login',
  // '/\\/Pantomath\\/admin\\/logout',
  // '/\\/Pantomath\\/app\\/index',
  // '/\\/Pantomath\\/app\\/type',
  // '/\\/Pantomath\\/admin\\/rule',
  // '/\\/Pantomath\\/admin\\/index',
  // '/\\/Pantomath\\/data\\/day_active_retain'
]

const res: any = []
apis.forEach((api: string) => {
  res.push(...methods.map(method => `${api}/${method}`))
})
// console.log(res)
export default res
