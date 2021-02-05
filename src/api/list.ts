import request from '@/utils/request'
// import Mock from 'mockjs'
export function getLists(params) {
  return request({
    url: '/list/table',
    method: 'get',
    params
  })
  
  // return new Promise((resolve: any, reject: any) => {
  //   const list = [
  //     {
  //       'id': Mock.mock('@guid'),
  //       'name': Mock.mock('@name'),
  //       'username': Mock.mock('@name'),
  //       'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
  //     },
  //     {
  //       'id': Mock.mock('@guid'),
  //       'name': Mock.mock('@name'),
  //       'username': Mock.mock('@name'),
  //       'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'
  //     },
  //   ]
  //   resolve(list)
  // })
}

export function getLista() {
  return request({
    url: '/list/lista',
    method: 'get'
  })
}

