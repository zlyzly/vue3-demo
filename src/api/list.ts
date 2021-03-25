import request from '@/utils/request'
// import Mock from 'mockjs'
export function getLists(params?) {
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

export function getListB(params) {
  return request({
    url: '/list/listb',
    method: 'get',
    params
  })
}


export function getBar() {
  return request({
    url: '/list/bar',
    method: 'get'
  })
}

export function getLine() {
  return request({
    url: '/list/line',
    method: 'get'
  })
}

export function getListll(params) {
  // console.log(params)
  return request({
    url: '/list/listll',
    method: 'get',
    params
  })
}