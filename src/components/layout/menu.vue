<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <!-- 一级路由 -->
    <template v-for="item in routes">
      <template v-if="!item.hidden">
        <template v-if="!item.children || item.children.length < 0">
          <a-menu-item :key="item.path">
            <component :is="item.meta.icon" />
            <span>
              <router-link :to="item.path">{{ item.meta.title }}</router-link>
            </span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="item.path">
            <template #title>
              <span>
                <component :is="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
              </span>
            </template>
            <a-menu-item v-for="menuItem in item.children" :key="menuItem.path">
              <router-link :to="menuItem.path">
                {{ menuItem.meta.title }}
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </template>
      <!-- <a-menu-item v-if="!item.hidden && item.children.length < 0" :key="item.path">
        <MenuFoldOutlined />
        <span>1{{ item.meta.title }}</span>
      </a-menu-item>
      <template v-if="!item.hidden && item.children && item.children.length">
        <a-sub-menu v-for="menuItem in item.children" :key="menuItem.path">
          <template #title>
            <span><MenuFoldOutlined /><span>22{{ menuItem.meta.title }}</span></span>
          </template>
          <a-menu-item>33{{ menuItem.meta.title }}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-for="menuItem in item.children" :key="menuItem.path">
          <template #title>
            <span><MailOutlined /><span>{{ menuItem.meta.title }}</span></span>
          </template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </template> -->
    </template>
    <!-- 有子集嵌套路由 -->

    <!-- <a-sub-menu key="sub2">
      <template #title>
        <span><MenuFoldOutlined /><span>Navigation Two</span></span>
      </template>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="11"> Option 11 </a-menu-item>
        <a-menu-item key="12"> Option 12 </a-menu-item>
      </a-sub-menu>
    </a-sub-menu> -->
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, onMounted, toRefs, h } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "menu",
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
  },
  setup() {
    // const data = reactive({
    //   collapsed: false,
    //   selectedKeys: ['1'],
    //   openKeys: ['sub1'],
    //   preOpenKeys: ['sub1']
    // })
    const toggleCollapsed = () => {
      data.collapsed = !data.collapsed;
      data.openKeys = data.collapsed ? [] : data.preOpenKeys;
    };
    interface DataModal {
      collapsed: boolean;
      selectedKeys: any;
      openKeys: any;
      preOpenKeys: string[];
      theme: string;
      routes: any;
      device: string;
    }
    const store = useStore();
    const route = useRoute();
    // console.log('menus', store, route)
    const data: DataModal = reactive({
      theme: "dark",
      routes: computed(() => store.state.permission.routers),
      openKeys: [],
      selectedKeys: [],
      collapsed: false || computed(() => store.state.app.sidebar.opened),
      preOpenKeys: computed(() => data.preOpenKeys),
      device: store.state.app.device,
    });
    // console.log('collapsed-menu', data.collapsed, data.device, store.state.isMobile)
    /** 声明周期函数 */
    onMounted(() => {
      // 获取当前的全部路由
      data.routes = store.state.permission.routers;
      // console.log(data.routes)
      // 获取当前地址栏对应的菜单情况
      data.selectedKeys.push(route.name);
      data.openKeys.push(route.matched[route.matched.length - 1].name);
    });
    // const resolvePath = (routePath: string) => {
    //   if (/^(https?:|mailto:|tel:)/.test(routePath)) {
    //     return routePath
    //   }
    //   if (/^(https?:|mailto:|tel:)/.test(basePath.value)) {
    //     return basePath.value
    //   }
    //   return `${basePath.value}/${routePath}`
    // }
    console.log(data.routes);
    return { ...toRefs(data), toggleCollapsed };
  },
});
</script>