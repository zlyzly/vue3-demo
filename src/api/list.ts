import request from '@/utils/request'
import Mock from 'mockjs'
export function getLists() {
  // return request({
  //   url: '/backend/admins/get_rule_list',
  //   method: 'get'
  // })
  return new Promise((resolve: any, reject: any) => {
    const list = [
      {
        'id': Mock.mock('@guid'),
        'name': Mock.mock('@name'),
        'username': Mock.mock('@name'),
        'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
      },
      {
        'id': Mock.mock('@guid'),
        'name': Mock.mock('@name'),
        'username': Mock.mock('@name'),
        'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
      },
    ]
    resolve(list)
  })
}
