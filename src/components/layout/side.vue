<template>
  <div v-if="!item.hidden">
    <a-menu-item
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!data.onlyOneChild.children || data.onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
      :key="item.key"
    >
      <router-link
        v-if="data.onlyOneChild.meta"
        :to="resolvePath(data.onlyOneChild.path)"
      >
        <!-- <a-icon :type="item.meta.icon" /> -->
        <span
          @click="change(data.onlyOneChild.name,resolvePath(data.onlyOneChild.path),data.onlyOneChild)"
          >{{ data.onlyOneChild.meta.title }}</span
        >
      </router-link>
    </a-menu-item>
    <a-sub-menu v-else>
      <template v-slot:title>
        <span v-if="item.meta" >
          <span @click="change(item.name, resolvePath(item.path), item)"><PieChartOutlined />{{ item.meta.title }}</span>
        </span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </a-sub-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import {
  PieChartOutlined
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  components: {
    PieChartOutlined
  },
  setup(props) {
    interface DataModal {
      collapsed: boolean;
      selectedKeys: any;
      openKeys: any;
      preOpenKeys: string[];
      theme: string;
      routes: any;
      device: string;
      onlyOneChild: null;
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
      device: store.state.app.device,
      onlyOneChild: null
    })
    console.log('collapsed-menu', data.collapsed, data.device, store.state.isMobile)
    /** 声明周期函数 */
    onMounted(() => {
      // 获取当前的全部路由
      data.routes = store.state.permission.routers
      console.log(data.routes)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name)
      data.openKeys.push(route.matched[route.matched.length - 1].name)
    })
    function change(name: string, url: string, item: any) {
      console.log('this.$route: ', route.path, url, item)
      // store.dispatch('ResetState', { name: name }).then(() => {
      //   // console.log('ResetState', route.path, url, item.redirect)
      //   if (route.path === url || route.path === item.redirect) {
      //     // window.location.reload() // 避免刷新之后丢失历史记录
      //     window.location.reload()
      //   }
      // })
    }
    function hasOneShowingChild(children = [], parent: any) {
      // console.log('parent', parent)
      const showingChildren = children.filter((item: any) => {
        if (item.hidden) {
          return false
        } else {
          data.onlyOneChild = item
          return true
        }
      })
      // console.log('index---', showingChildren)
      // if (showingChildren.length === 1) {
      //   return true
      // }
      if (showingChildren.length === 0) {
        data.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    function resolvePath(routePath: string) {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath
      }
      if (/^(https?:|mailto:|tel:)/.test(props.basePath)) {
        return props.basePath
      }
      // console.log(props.basePath, '-------', routePath)
      return `${props.basePath}/${routePath}`
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