import {
  Button,
  Input,
  Steps,
  Form,
  Select,
  Row,
  Radio,
  DatePicker,
  Col,
  Icon,
  Checkbox,
  Switch,
  Layout,
  Pagination,
  Progress,
  Menu,
  Drawer
} from "ant-design-vue";

const ant = {
  install(Vue: any) {
    Vue.component(Button.name, Button);
    Vue.component(Input.name, Input);
    Vue.component(Steps.name, Steps);
    Vue.component(Form.name, Form);
    Vue.component(Select.name, Select);
    Vue.component(Row.name, Row);
    Vue.component(Radio.name, Radio);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(Col.name, Col);
    Vue.component(Icon.name, Icon);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Switch.name, Switch);
    Vue.component(Layout.name, Layout);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Progress.name, Progress);
    Vue.component(Menu.name, Menu);
  }
};
export default ant

// const components: any = {
//   Button,
//   Input,
//   Steps,
//   Form,
//   Select,
//   Row,
//   Radio,
//   DatePicker,
//   Col,
//   Icon,
//   Checkbox,
//   Switch,
//   Layout,
//   Pagination,
//   Progress,
//   Menu
// }
// export function setupAntd(app: any) {
//   console.log(components)
//   for (const key in components) {
//     if (Object.prototype.hasOwnProperty.call(components, key)) {
//       app.use(key)
//     }
//   }
//   // components.forEach((component: any) => {
//   //   app.use(component)
//   // })
// }

// import { default as ConfigProvider } from './config-provider';
// import { default as Empty } from './empty';
// import { default as Result } from './result';
// import { default as Descriptions } from './descriptions';
// import { default as PageHeader } from './page-header';
// import { default as Space } from './space';

// declare const install: (app: App) => App<any>;
// export { version, install, message, notification, Affix, Anchor, AutoComplete, Alert, Avatar, BackTop, Badge, Breadcrumb, Button, Calendar, Card, Collapse, Carousel, Cascader, Checkbox, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, InputNumber, Layout, List, LocaleProvider, Menu, Mentions, Modal, Pagination, Popconfirm, Popover, Progress, Radio, Rate, Row, Select, Slider, Spin, Statistic, Steps, Switch, Table, Transfer, Tree, TreeSelect, Tabs, Tag, TimePicker, Timeline, Tooltip, Upload, Drawer, Skeleton, Comment, ConfigProvider, Empty, Result, Descriptions, PageHeader, Space, };
// declare const ant: {
//     version: any;
//     install: (app: App<any>) => App<any>;
// };
// export default ant