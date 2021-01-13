<template>
  <a-menu
    mode="inline"
    :theme="theme"
    :inline-collapsed="collapsed"
    :default-open-keys="openKeys"
    :default-selected-keys="selectedKeys"
  >
    <template v-for="item in routes" :key="item.path">
      <template v-if="!item.hidden">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <template v-if="item.meta">
              <router-link :to="item.path">
                <span>
                  <component :is="item.meta.icon"></component>
                  {{ item.meta.title }}
                </span>
              </router-link>
            </template>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.path" :base-path="item.path" />
        </template>
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
import SubMenu from './sub-menu.vue'
import { defineComponent, reactive, computed, onMounted, toRefs, h } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SideBar',
  components: {
    SubMenu,
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
      device: store.state.app.device
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
    // const renderSubMenu = (menu: any) {
    //   const itemArr = []
    //   if (!menu.hidden) {
    //     menu.children.forEach(item => itemArr.push(renderItem(item)))
    //   }
    //   return ()
    // }
    // 此处如果直接用扩展运算符...data,则使用toRefs方法，将 data 上的每个属性，都转化为 ref 形式的响应式数据
    // console.log({ ...data })
    return { ...toRefs(data) }
  }
})
</script>