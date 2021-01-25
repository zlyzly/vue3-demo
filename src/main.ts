import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'

import loadComponent from './plugins/ant'

import 'ant-design-vue/dist/antd.css'
import './permission'
import './mock'
import './utils/directive'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('en')

const app = createApp(App)

// 全局注册组件
app.component('component-a', {
  template: '<div>---可直接使用--全局注册组件!---</div>'
})

// 将应用程序的根组件挂载到指定的DOM元素上
app.use(store).use(router).use(loadComponent).mount('#app')
// 取消挂载
// setTimeout(() => app.unmount('#my-app'), 2000)
