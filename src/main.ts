import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'
import Antd from './plugins/ant'
import 'ant-design-vue/dist/antd.css'
import '../permission'
import { Menu, Layout, Form, Dropdown } from "ant-design-vue"
createApp(App).use(store).use(router).use(Antd).use(Menu).use(Layout).use(Form).use(Dropdown).mount('#app')
