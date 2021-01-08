import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// import "ant-design-vue/dist/antd.css";
// import './plugins/ant-design-vue.js'

// import { setupAntd } from './plugins/ant'
import Antd from './plugins/ant'
import 'ant-design-vue/dist/antd.css'
import '../permission'
import { Menu, Layout, Form, Dropdown, List, Avatar, InputNumber, Select, Checkbox, Result, Table, Pagination } from "ant-design-vue"
createApp(App).use(store).use(router).use(Antd).use(Menu).use(Layout).use(Form).use(Dropdown).use(List).use(Avatar).use(InputNumber).use(Select).use(Checkbox).use(Result).use(Table).use(Pagination).mount('#app')
