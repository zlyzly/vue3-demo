import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'
import Antd from './plugins/ant'
import 'ant-design-vue/dist/antd.css'
import { Menu } from "ant-design-vue";
createApp(App).use(store).use(router).use(Antd).use(Menu).mount('#app')
