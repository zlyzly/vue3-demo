import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'

import loadComponent from './plugins/ant'

import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './permission'
import './mock/index'
// import './utils/directive'

// import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
// moment.locale('en')
const app = createApp(App)

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
// 将应用程序的根组件挂载到指定的DOM元素上
app.use(store).use(router).use(loadComponent).mount('#app')
// 取消挂载
// setTimeout(() => app.unmount('#my-app'), 2000)
