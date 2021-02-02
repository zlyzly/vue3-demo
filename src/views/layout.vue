<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- <a-layout-sider
      v-model:collapsed="data.collapsed"
      :trigger="null"
      :theme="data.theme"
      collapsible
      breakpoint="lg"
      :collapsed-width="80"
    >
      <a-menu
        theme="dark"
        mode="inline"
        :inlineCollapsed="false"
        v-model:selectedKeys="data.selectedKeys"
        v-model:openKeys="data.openKeys"
      >
        <SidebarItem
          v-for="route in data.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </a-menu>
    </a-layout-sider> -->
    <LayoutMenus />
    <a-layout>
      <LayoutHeader />
      <LayoutMain />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import LayoutMenus from './menus.vue'
// import SidebarItem from '../components/layout/side.vue'
import LayoutHeader from '../components/layout/header.vue'
import LayoutMain from '../components/layout/main.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  props: {},
  components: {
    LayoutMenus,
    LayoutHeader,
    LayoutMain,
    // SidebarItem
  },
  setup() {
    interface DataModal {
      routes: any;
      selectedKeys: any;
      openKeys: any;
      preOpenKeys: string[];
      theme: string;
    }
    const store = useStore()
    const routers = useRouter()
    const route = useRoute()
    console.log('menus', store, routers, route)
    const data: DataModal = reactive({
      theme: 'dark',
      routes: computed(() => store.state.permission.routers),
      openKeys: [],
      selectedKeys: [],
      collapsed: false || computed(() => store.state.app.sidebar.opened),
      preOpenKeys: computed(() => data.preOpenKeys),
    })
    /** 声明周期函数 */
    onMounted(() => {
      // 获取当前的全部路由
      data.routes = store.state.permission.routers
      console.log(data.routes)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name)
      data.openKeys.push(route.matched[route.matched.length - 1].name)
    })
    return { data }
  }
})
</script>
<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100% !important;
}
</style>