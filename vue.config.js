// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = process.env.NODE_ENV === 'production'
const isAnalyze = process.env.VUE_APP_ANALYZE === true

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.global.prod.js',
    '//cdn.jsdelivr.net/npm/vue-router@4.0.3/dist/vue-router.global.prod.js',
    '//cdn.jsdelivr.net/npm/vuex@4.0.0-rc.2/dist/vuex.global.prod.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  ]
}
module.exports = {
  // ./ 是指用户所在的当前目录（相对路径）；
  // / 是指根目录（绝对路径，项目根目录），也就是项目根目录；
  // 历史记录HTML5模式下publicPath: 默认/ 不可以设置为空或者./ ---相对路径 ('./') 路由要配置为相对路径否则会报错
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', //在打包时添加这段代码，处理静态资源找不到问题
  runtimeCompiler: true,//在启用vue-router路由时需要配置该带码否则会报错
  outputDir: 'dist',
  assetsDir: 'static',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  lintOnSave:  process.env.NODE_ENV === 'production',
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
        target: 'https://test-api.onemicroworld.com/', //API服务器的地址
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
    if (isProd) {
      Object.assign(config, {
        externals: assetsCDN.externals
      })
    }
    if (isAnalyze) {
      config.plugins.push(
        new BundleAnalyzerPlugin()
      )
    }
    // config.plugins.push(
    //   new AntdDayjsWebpackPlugin({
    //     preset: 'antdv3'
    //   })
    // )
  },
  chainWebpack: (config) => {
    if (isProd) {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          common: {
            name: "chunk-common",
            chunks: "all",
            minSize: 0, 
            minChunks: 2,
            maxInitialRequests: 5,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            minSize: 20000, 
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'all',
            minSize: 20000, 
            priority: 3,
            reuseExistingChunk: true
          },
          default: { //默认打包模块
            priority: -20,
            minSize: 20000, 
            reuseExistingChunk: true //模块嵌套引入时，判断是否复用已经被打包的模块
          }
        }
      })
    }
    config.plugin('html').tap(args => {
      // args[0].title = title // 修改打包出来的index.html的title
      // args[0].meta = meta
      if (isProd) {
        args[0].cdn = assetsCDN
      }
      return args
    })
  }
}