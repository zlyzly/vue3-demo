const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
plugins.push['import', {
  'libraryName': 'ant-design-vue',
  'libraryDirectory': 'es',
  'style': true // `style: true` 会加载 less 文件
  // 'style': 'css' // 会加载css 文件, main.js引入的ant-design样式是.css
}]
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  plugins
}