import request from '@/utils/request'

export function getImgs(params) {
  return request({
    url: '/list/img',
    method: 'get',
    params
  })
}
