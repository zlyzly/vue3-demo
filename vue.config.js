const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/', //在打包时添加这段代码，处理静态资源找不到问题
  runtimeCompiler: true,//在启用vue-router路由时需要配置该带码否则会报错
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '9528',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://106.75.11.161:8082/', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '/api': '/'
        }
      }
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}