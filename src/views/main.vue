<template>
  <div :class="data.device">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-drawer
        v-if="data.device === 'mobile'"
        class="drawer"
        width="200"
        placement="left"
        :closable="false"
        :visible="data.opened"
        @close="onClose"
      >
        <a-menu
          style="width: 200px"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          mode="inline"
          theme="dark"
          :inline-collapsed="data.opened"
        >
          <a-menu-item key="3">
            <span><PieChartOutlined />Option 3</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span><PieChartOutlined /><span>Navigation One</span></span>
            <a-menu-item key="5"> Option 5 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span><PieChartOutlined /><span>Navigation One</span></span>
            <a-menu-item key="9"> Option 9 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-drawer>
      <a-layout-sider
        v-else
        v-model:collapsed="data.opened"
        :trigger="null"
        :class="data.device === 'mobile' ? 'ant-layout-sider-collapsed ant-layout-sider-zero-width': ''">
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <span><PieChartOutlined /><span>nav 1</span></span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-button type="primary" @click="toggleCollapsed">点击</a-button>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '100vh',
          }"
        >
          1111
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import ResizeMixin from '../components/layout/mixin/resizeHandler'
import { PieChartOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Main',
  mixins: [ResizeMixin],
  components: {
    PieChartOutlined
  },
  // setup 函数会在 beforeCreate 之后、created 之前执行
  setup() {
    const store = useStore()
    console.log('store', store.getters)

    const data: any = reactive({
      opened: computed(() => store.getters.sidebar.opened),
      device: computed(() => store.getters.device),
      routes: store.getters.addRouters,
    })
    onMounted(() => {
      console.log(data.opened, data.device)
    })
    // 监听device变化
    watch(() => data.device, (nVal) => {
      data.device = nVal
    })
    // 监听菜单栏是否打开
    watch(() => data.opened, (nVal) => {
      // console.log(nVal, oVal)
      data.opened = nVal
    })
    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }
    const onClose = () => {
      store.dispatch('app/toggleSideBar')
    }
    toggleCollapsed()
    return { data, toggleCollapsed, onClose }
  }
})
</script>
<style lang="scss">
// >>> .ant-drawer-body {
//   padding: 0;
// }
// ::v-deep .ant-drawer-body {
//   padding: 0;
// }
.ant-drawer-body {
  padding: 0;
}
.ant-drawer-content {
  background: #001529;
}
</style>