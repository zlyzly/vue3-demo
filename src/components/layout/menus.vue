<template>
  <a-layout-sider
    v-model:collapsed="data.collapsed"
    :trigger="null"
    :theme="data.theme"
    collapsible
    breakpoint="lg"
    :collapsed-width="80"
  >
    <!-- @collapse="onCollapse"
    @breakpoint="onBreakpoint" -->
  <!-- data.device === 'mobile'? '0px': '200px' -->
    <div class="logo">
      <h3 v-if="!data.collapsed">vue3-demo</h3>
      <img v-else src="../../assets/logo.png" alt="logo" class="logo_img" />
    </div>
    <template v-for="item in data.routes">
      <a-menu
        theme="dark"
        mode="inline"
        :key="item.name"
        v-if="!item.hidden"
        :inlineCollapsed="false"
        v-model:selectedKeys="data.selectedKeys"
        v-model:openKeys="data.openKeys"
      >
        <a-menu-item v-if="!item.children" :key="item.name">
          <router-link :to="resolvePath(item.path)">
            <span>
              <component :is="item.meta.icon" /><span>{{ item.meta.title }}</span>
            </span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-else :key="item.name">
          <template v-slot:title>
            <span>
              <component :is="item.meta.icon" /><span>{{ item.meta.title }}</span>
            </span>
          </template>
          <template v-for="subItem in item.children">
            <a-menu-item v-if="!subItem.hidden" :key="subItem.name">
              <router-link :to="resolvePath(subItem.path)">
                {{ subItem.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </a-menu>
    </template>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'LayoutMenus',
  props: {},
  components: {
  },
  setup() {
    interface DataModal {
      collapsed: boolean;
      selectedKeys: any;
      openKeys: any;
      preOpenKeys: string[];
      theme: string;
      routes: any;
      device: string;
      onlyOneChild: null;
      basePath: string;
    }
    const store = useStore()
    const route = useRoute()
    // console.log('menus', store, route)
    const data: DataModal = reactive({
      theme: 'dark',
      routes: computed(() => store.state.permission.routers),
      openKeys: [],
      selectedKeys: [],
      collapsed: false || computed(() => store.state.app.sidebar.opened),
      preOpenKeys: computed(() => data.preOpenKeys),
      device: store.state.app.device,
      onlyOneChild: null,
      basePath: ''
    })
    // console.log('collapsed-menu', data.collapsed, data.device, store.state.isMobile)
    /** 声明周期函数 */
    onMounted(() => {
      // 获取当前的全部路由
      data.routes = store.state.permission.routers
      // console.log(data.routes)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name)
      data.openKeys.push(route.matched[route.matched.length - 1].name)
    })
    function change(name: string, url: string, item: any) {
      // console.log('this.$route: ', route.path, url, item)
      store.dispatch('ResetState', { name: name }).then(() => {
        if (route.path === url || route.path === item.redirect) {
          // window.location.reload() // 避免刷新之后丢失历史记录
          window.location.reload()
        }
      })
    }
    function hasOneShowingChild(children = [], parent: any) {
      const showingChildren = children.filter((item: any) => {
        if (item.hidden) {
          return false
        } else {
          data.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        data.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    function resolvePath(routePath: string) {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath
      }
      if (/^(https?:|mailto:|tel:)/.test(data.basePath)) {
        return data.basePath
      }
      return  `${data.basePath}/${routePath}`
    }
    return { data, change, resolvePath, hasOneShowingChild }
  }
})
</script>

<style lang="scss" scoped>
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
</style>