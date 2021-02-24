import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'

// 局部导入组件
import loadComponent from './plugins/ant'
import { message } from 'ant-design-vue'

// 引入全部组件样式
import 'ant-design-vue/dist/antd.less'

import './permission'

import './mock'

// 引入viser
import Viser from 'viser-vue'

// import './utils/directive'

// import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
// moment.locale('en')

// 图片懒加载
import VueLazyloadNext from 'vue-lazyload-next'
const app = createApp(App)

// 局部导入组件
app.config.globalProperties.$message = message
app.provide('$message', message)

// 全局注册组件
app.component('component-a', {
  template: '<div>---可直接使用--全局注册组件!---</div>'
})

// 注册一个全局自定义指令 `v-focus`
app.directive('focus', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的父组件挂载之前调用
  beforeMount() { },
  // 绑定元素的父组件挂载时调用
  mounted(el) {
    // Focus the element
    el.focus()
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() { },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() { },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() { },
  // 卸载绑定元素的父组件时调用
  unmounted() { }
})

// 注册
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'absolute'
    el.style.right = binding.value + 'px'
  }
})

const loadimage = require('./assets/loading.png')
const errorimage = require('./assets/error.png')

// 将应用程序的根组件挂载到指定的DOM元素上
app.use(store).use(router).use(loadComponent).use(Viser).use(VueLazyloadNext, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
  lazyComponent: true
}).mount('#app')
// 取消挂载
// setTimeout(() => app.unmount('#my-app'), 2000)
