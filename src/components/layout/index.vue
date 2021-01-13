<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <a-layout-sider
      v-model:collapsed="data.collapsed"
      :trigger="null"
      :theme="data.theme"
      collapsible
      breakpoint="lg"
      :collapsed-width="80"
    >
      <div class="logo">
        <h3 v-if="!data.collapsed">vue3-demo</h3>
        <img v-else src="../../assets/logo.png" alt="logo" class="logo_img" />
      </div>
      <side-bar />
    </a-layout-sider>
    <a-layout>
      <div class="main-container">
        <navbar />
        <!-- <div :class="{ 'fixed-header': fixedHeader }">
        </div> -->
        <div class="contain">
          <div class="breadcrumb-nav">
            <breadcrumb />
          </div>
          <app-main />
        </div>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import SideBar from './sidebar.vue'
import Navbar from './navbar.vue'
import AppMain from './main.vue'
import Breadcrumb from './breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: '',
  props: {},
  components: {
    SideBar,
    Navbar,
    Breadcrumb,
    AppMain,
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
      // console.log(data.routes)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name)
      data.openKeys.push(route.matched[route.matched.length - 1].name)
    })
    return { data }
  }
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100% !important;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
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
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>