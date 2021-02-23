// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// import UglifyPlugin from 'uglifyjs-webpack-plugin'
// import CompressionWebpackPlugin from 'webpack-bundle-analyzer'

module.exports = {
  // ./ 是指用户所在的当前目录（相对路径）；
  // / 是指根目录（绝对路径，项目根目录），也就是项目根目录；
  // 历史记录HTML5模式下publicPath: 默认/ 不可以设置为空或者./ ---相对路径 ('./') 路由要配置为相对路径否则会报错
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', //在打包时添加这段代码，处理静态资源找不到问题
  runtimeCompiler: true,//在启用vue-router路由时需要配置该带码否则会报错
  outputDir: 'dist',
  assetsDir: 'static',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave: process.env.NODE_ENV === 'production',
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾  
  productionSourceMap: false,
  css: { // 自定义主题色
    loaderOptions: {
      less: {
        // lessOptions: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
        // },
      },
    },
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    port: '8080',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://106.75.11.161:8082/', //API服务器的地址
        // ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //   '/api': '/'
        // }
      }
    },
  },
  configureWebpack: config => {
    config.resolve = { // 配置解析别名
      extensions: ['.ts', '.js', '.json', '.vue'],  // 自动添加文件名后缀
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@c': path.resolve(__dirname, './src/components'),
        '@v': path.resolve(__dirname, './src/views')
      }
    }
    // if (process.env.NODE_ENV === 'production') {
    //   // 为生产环境修改配置...
    //   config.mode = 'production'
    // } else {
    //   // 为开发环境修改配置...
    //   config.mode = 'development'
    // }
  }
}