import {
  Menu, Layout, Form, Dropdown, 
  List, Avatar, InputNumber, Select, 
  Checkbox, Result, Table, Pagination,
  DatePicker, Icon, Breadcrumb, Button, 
  Input, Switch, Col, Radio, ConfigProvider,
  Drawer
} from 'ant-design-vue'

/*手动注册 antd-vue 组件,达到按需加载目的*/
export default function loadComponent(app: any) {
  app.use(Menu)
  app.use(Layout)
  app.use(Form)
  app.use(Dropdown)
  app.use(List)
  app.use(Avatar)
  app.use(InputNumber)
  app.use(Select)
  app.use(Checkbox)
  app.use(Result)
  app.use(Table)
  app.use(Pagination)
  app.use(DatePicker)
  app.use(Icon)
  app.use(Breadcrumb)
  app.use(Button)
  app.use(Input)
  app.use(Switch)
  app.use(Col)
  app.use(Radio)
  app.use(ConfigProvider)
  app.use(Drawer)
  
}