import Mock from 'mockjs'
import { builder, getBody, getQueryParameters } from '../util'

const getImgs = ((options: any) => {
  console.log(options)
  const { limit, pos } = getQueryParameters(options)
  const obj: any = {
    total: Number,
    list: Array,
  }
  const data: any = []

  for (let i = 0; i < limit; i++) {
    data.push({
      'id': Mock.mock('@guid'),
      'src': 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    })
  }
  obj.total = 100
  obj.list = data
  return builder(obj)
})

Mock.mock(/\/list\/img/, 'get', getImgs)