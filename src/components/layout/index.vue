<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    :class="device === 'mobile' ? 'mobile' : ''"
  >
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <a-layout-sider
      v-model:collapsed="data.collapsed"
      :trigger="null"
      :theme="data.theme"
      :collapsed-width="data.device === 'mobile' ? 80 : 0"
    >
      <!-- :class="device === 'mobile' ? 'ant-layout-sider-collapsed ant-layout-sider-zero-width': ''" -->
      <div class="logo">
        <h3 v-if="!data.collapsed">vue3-demo</h3>
        <img v-else src="../../assets/logo.png" alt="logo" class="logo_img" />
      </div>
      <a-menu
        mode="inline"
        :theme="data.theme"
        :inline-collapsed="data.collapsed"
        v-model:selectedKeys="data.selectedKeys"
        v-model:openKeys="data.openKeys"
        @click="selectMenu"
        @openChange="onOpenChange"
      >
        <!-- <template v-for="item in data.routes">
          <template v-if="!item.hidden">
            这里是一级
            <a-menu-item v-if="hasOnlyChildren(item)" :key="item.name">
              <router-link :to="item.children[0].path">
                <span class="anticon">
                  <component :is="item.meta.icon"></component>
                  <span>2{{ item.children[0].meta && item.children[0].meta.title }}</span>
                </span>
              </router-link>
            </a-menu-item>
            <a-menu-item v-if="!item.children" :key="item.name">
              <router-link :to="item.path">
                <span class="anticon">
                  <component :is="item.meta.icon"></component>
                  <span>1{{ item.meta && item.meta.title }}</span>
                </span>
              </router-link>
            </a-menu-item>
            这里是子级
            <sub-menu
              v-else
              :menu-info="item"
              :key="item.name"
              :base-path="item.path"
            />
          </template>
        </template> -->
        <template v-for="item in data.routes">
          <template v-if="!item.hidden">
            <template v-if="hasOnlyChildren(item)">
              <!-- 只有一级菜单 -->
              <a-menu-item v-if="!item.children" :key="item.name">
                <span>
                  <router-link :to="item.path">
                    <component :is="item.meta.icon"></component>
                    <span>{{ item.meta.title }}</span>
                  </router-link>
                </span>
              </a-menu-item>
              <!-- 有子菜单 -->
              <sub-menu
                v-else
                :menu-info="item"
                :key="item.name"
                :base-path="item.path"
              />
            </template>
          </template>
        </template>
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
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, watch } from 'vue'
import SubMenu from './sub-menu.vue'
import Navbar from './navbar.vue'
import AppMain from './main.vue'
import Breadcrumb from './breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// import ResizeMixin from './mixin/ResizeHandler.js'
export default defineComponent({
  name: '',
  props: {},
  // mixins: [ResizeMixin],
  components: {
    SubMenu,
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
      device: string;
      collapsed: boolean;
      basePath: string;
      rootSubmenuKeys: string[];
    }
    const store = useStore()
    const route = useRoute()
    console.log('store', store)
    const data: DataModal = reactive({
      theme: 'dark',
      routes: computed(() => store.state.permission.routers),
      collapsed: false || computed(() => store.state.app.sidebar.opened),
      openKeys: [],
      selectedKeys: [],
      preOpenKeys: [],
      rootSubmenuKeys: [],
      device: store.state.app.device,
      basePath: ''
    })
    /** 声明周期函数 */
    onMounted(() => {
      // 获取当前的全部路由
      data.routes = store.state.permission.routers
      console.log('route', route)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name)
      store.getters.addRouters.forEach((key: any) => {
        data.rootSubmenuKeys.push(key.path)
      })
      const openKeys: any = []
      const latestOpenKey = openKeys.find((key: string) => data.openKeys.indexOf(key) === -1)
      if (data.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        data.openKeys = openKeys
      } else {
        data.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    })
    watch([data.openKeys], (val, oldVal) => {
      console.log('新的值旧的值', val, oldVal)
      // const { preOpenKeys } = oldVal
      // data.preOpenKeys = preOpenKeys
    })
    const onOpenChange = (openKeys: any) => {
      console.log('openKeys', openKeys)
      const latestOpenKey = openKeys.find((key: string) => data.openKeys.indexOf(key) === -1)
      if (data.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        data.openKeys = openKeys
      } else {
        data.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const selectMenu = (val: any) => {
      data.selectedKeys = val.selectedKeys
    }
    const hasOnlyChildren = (data: any) => {
      // 不存在子级的情况
      if (!data.children) { return false }
      // 过滤隐藏的子级路由
      const routers = data.children.filter((item: any) => item.hidden ? false : true)
      // 判断最终结果 
      if (routers.length === 1) { return true }
      return false
    }
    console.log(data)
    return { data, onOpenChange, selectMenu, hasOnlyChildren }
  }
})
</script>
<style lang="scss">
// @import "~@/styles/mixin.scss";
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
.ant-layout .ant-layout-has-sider .mobile {
  .ant-layout-sider {
    position: fixed !important;
    left: 0;
    z-index: 10;
  }
}
</style>