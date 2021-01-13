import { isIE } from '../utils/util'
// import shouldNotMockApis from './isShouldMock'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  if (isIE()) {
    console.error('[antd-pro] ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('[antd-pro] mock mounting')
  const Mock = require('mockjs')
  require('./services/auth')
  require('./services/list')
  // shouldNotMockApis.forEach((api: string) => {
  //   if (Mock._mocked[api]) {
  //     delete Mock._mocked[api]
  //   }
  // })

  Mock.setup({
    timeout: 2000 // setter delay time
  })
}
