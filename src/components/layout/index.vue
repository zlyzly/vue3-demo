<template>
  <div :class="data.device" id="main">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-drawer
        v-if="data.device === 'mobile'"
        width="200"
        placement="left"
        :closable="false"
        :visible="data.opened"
        @close="onClose"
      >
        <a-menu
          style="width: 200px"
          v-model:openKeys="data.openKeys"
          v-model:selectedKeys="data.selectedKeys"
          mode="inline"
          theme="dark"
          :inline-collapsed="false"
          @click="selectMenu"
        >
          <sidebar-item
            v-for="route in data.routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </a-menu>
      </a-drawer>
      <a-layout-sider
        v-else
        v-model:collapsed="data.opened"
        :trigger="null"
        :class="!data.opened ? 'ant-layout-sider-collapsed ant-layout-sider-zero-width': ''">
        <div class="logo">
          <h3 v-if="!data.opened">vue3-demo</h3>
          <img v-else src="../../assets/logo.png" alt="logo" class="logo_img" />
        </div>
        <a-menu
          mode="inline"
          :theme="data.theme"
          :inline-collapsed="data.opened"
          v-model:openKeys="data.openKeys"
          v-model:selectedKeys="data.selectedKeys"
          @click="selectMenu"
          @openChange="onOpenChange"
        >
          <sidebar-item
            v-for="route in data.routes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <div class="main-container">
          <navbar />
          <div class="contain">
            <div class="breadcrumb-nav">
              <breadcrumb />
            </div>
            <app-main />
          </div>
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import SidebarItem from './menu.vue'
import Navbar from './navbar.vue'
import Breadcrumb from './breadcrumb.vue'
import AppMain from './main.vue'

import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import ResizeMixin from '../../utils/resizeHandler.js'
export default defineComponent({
  name: 'Main',
  mixins: [ResizeMixin],
  components: {
    SidebarItem,
    Navbar,
    Breadcrumb,
    AppMain
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // console.log('store', store.getters)
    const data: any = reactive({
      theme: 'dark',
      opened: computed(() => store.getters.sidebar.opened),
      device: computed(() => store.getters.device),
      routes: store.getters.permission_routes,
      openKeys: [route.matched[0].path],
      selectedKeys: [route.matched[1].path],
    })
    console.log(data.opened, data.device)
    onMounted(() => {
      // 获取当前地址栏对应的菜单情况
      // console.log(data.openKeys, data.selectedKeys)
    })
    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }
    const onClose = () => {
      store.dispatch('app/toggleSideBar')
    }
    const onOpenChange = (openKeys: any) => {
      data.openKeys = openKeys
    }
    const selectMenu = (item: any) => {
      data.selectedKeys = item.item.selectedKeys
      if (data.device === 'mobile' && data.opened) store.dispatch('app/toggleSideBar')
    }
    return { data, toggleCollapsed, onClose, onOpenChange, selectMenu }
  }
})
</script>
<style lang="less" scoped>
// >>> .ant-drawer-body {
//   padding: 0;
// }
// ::v-deep .ant-drawer-body {
//   padding: 0;
// }
/deep/ .ant-drawer-body {
  padding: 0 !important;
}
/deep/ .ant-drawer-content {
  background: #001529;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center !important;
  h3 {
    color: #fff;
    font-weight: bold;
  }
  .logo_img {
    width: 28px;
    height: 28px;
  }
}
.contain {
  .breadcrumb-nav {
    width: 100%;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    background: #fff;
    border-radius: 10px 0 0 10px;
  }
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
#main,section.ant-layout {
  height: 100% !important;
}
</style>