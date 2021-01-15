import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'

// import { setupAntd } from './plugins/ant'
// import Antd from './plugins/ant'

import 'ant-design-vue/dist/antd.css'
import './permission'
import './mock'
import './utils/directive'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('en')

import { Menu, Layout, Form, Dropdown, List, Avatar, InputNumber, Select, Checkbox, Result, Table, Pagination, DatePicker, Icon, Breadcrumb, Button, Input, Switch, Col, Radio, ConfigProvider } from "ant-design-vue"

const app = createApp(App)
// 将应用程序的根组件挂载到指定的DOM元素上
app.use(store).use(router).use(Menu).use(Layout).use(Form).use(Dropdown).use(List).use(Avatar).use(InputNumber).use(Select).use(Checkbox).use(Result).use(Table).use(Pagination).use(DatePicker).use(Icon).use(Breadcrumb).use(Input).use(Button).use(Switch).use(Col).use(Radio).use(ConfigProvider).mount('#app')
// 取消挂载
// setTimeout(() => app.unmount('#my-app'), 2000)
