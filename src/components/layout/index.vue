<template>
  <div :class="data.device">
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
        >
          <template v-for="item in data.routes">
            <template v-if="!item.hidden">
              <!-- 这里是一级 -->
              <a-menu-item
                v-if="hasOnlyChildren(item.children, item)"
                :key="resolvePath(data.onlyOneChild.path || item.path)"
              >
                <router-link :to="data.onlyOneChild.path || item.path">
                  <span class="anticon">
                    <component :is="data.onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></component>
                    <span>{{ data.onlyOneChild.meta.title }}</span>
                  </span>
                </router-link>
              </a-menu-item>
              <!-- 有子菜单 -->
              <sub-menu
                v-else
                :menu-info="item"
                :key="item.path"
                :base-path="item.path"
              />
            </template>
          </template>
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
          <template v-for="item in data.routes">
            <template v-if="!item.hidden">
              <!-- 这里是一级 -->
              <a-menu-item
                v-if="hasOnlyChildren(item.children, item)"
                :key="resolvePath(data.onlyOneChild.path || item.path)"
              >
                <router-link :to="data.onlyOneChild.path || item.path">
                  <span class="anticon">
                    <component :is="data.onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></component>
                    <span>{{ data.onlyOneChild.meta.title }}</span>
                  </span>
                </router-link>
              </a-menu-item>
              <!-- 有子菜单 -->
              <sub-menu
                v-else
                :menu-info="item"
                :key="item.path"
                :base-path="item.path"
              />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from 'vue'
import SubMenu from './sub-menu.vue'
import Navbar from './navbar.vue'
import AppMain from './main.vue'
import Breadcrumb from './breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ResizeMixin from '../../utils/resizeHandler.js'
export default defineComponent({
  name: 'Main',
  mixins: [ResizeMixin],
  components: {
    SubMenu,
    Navbar,
    Breadcrumb,
    AppMain,
    // Menus
  },
  // setup 函数会在 beforeCreate 之后、created 之前执行
  setup() {
    const store = useStore()
    const route = useRoute()
    console.log('store', store.getters, route)
    const data: any = reactive({
      theme: 'dark',
      opened: computed(() => store.getters.sidebar.opened),
      device: computed(() => store.getters.device),
      routes: computed(() => store.getters.addRouters),
      openKeys: [],
      selectedKeys: [],
      preOpenKeys: [],
      basePath: '',
      onlyOneChild: []
    })
    console.log(data.opened, data.device)
    onMounted(() => {
      data.routes = store.getters.addRouters
      data.device = store.getters.device
      console.log(data.device)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.path)
      data.openKeys.push(route.matched[0].path)
    })
    // 监听device变化
    // watch(() => data.device, (nVal) => {
    //   data.device = nVal
    // })
    // 监听菜单栏是否打开
    // watch(() => data.opened, (nVal) => {
    //   // console.log(nVal, oVal)
    //   data.opened = nVal
    // })
    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }
    const onClose = () => {
      store.dispatch('app/toggleSideBar')
    }
    const onOpenChange = (openKeys: any) => {
      // console.log('openKeys', openKeys)
      data.openKeys = openKeys
    }
    const selectMenu = (item: any) => {
      data.selectedKeys = item.key
      data.openKeys = item.keyPath.length? [item.keyPath[1]] : []
    }
    const hasOnlyChildren = (children = [], parent: any) => {
      const showingChildren = children.length ? children.filter((item: any) => {
        if (item.hidden) {
          return false
        } else {
          // 只有一个显示子元素时
          data.onlyOneChild = item
          return true
        }
      }) : []
      // 只有一个子路由器时，默认显示该子路由器
      if (showingChildren.length === 1) {
        return true
      }
      // 没有子路由
      if (showingChildren.length === 0) {
        data.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
    const resolvePath = (routePath: string) => {
      return `${data.basePath}/${routePath}`
    }
    return { data, toggleCollapsed, onClose, onOpenChange, selectMenu, hasOnlyChildren, handleClickOutside, resolvePath }
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
  padding: 0 !important;
}
.ant-drawer-content {
  background: #001529;
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
</style>