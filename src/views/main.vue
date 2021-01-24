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
          <img v-else src="../assets/logo.png" alt="logo" class="logo_img" />
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
          <strong>{{ data.counts }}</strong>
          <strong>{{ data.opened }} ---- {{ data.opened1 }}</strong>
          <strong>{{ data.device }} ---- {{ data.device1 }}</strong>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { PieChartOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import SidebarItem from '../components/layout/menu.vue'
export default defineComponent({
  name: 'Main',
  components: {
    PieChartOutlined,
    SidebarItem
  },
  // setup 函数会在 beforeCreate 之后、created 之前执行
  setup() {
    const store = useStore()
    const { options } = useRouter()
    console.log('store', store.getters)
   
    const count = ref(0)
    const data: any = reactive({
      opened: computed(() => store.getters.sidebar.opened), // store.getters.sidebar.opened值改变data.opened的值就改变
      device: computed(() => store.getters.device),
      opened1: store.getters.sidebar.opened, // store.getters.sidebar.opened值改变data.opened的值就改变
      device1: store.getters.device,
      routes: store.getters.permission_routes,
      // counts:  computed(() => count.value), //可以使用计算属性或者watch监听count值的变化
      counts: count.value
    })

    setInterval(() => {
      count.value++
    }, 100000)

    onMounted(() => {
      console.log(data.opened, data.device, data.routes)
    })

    // 使用computed获取store的值可不使用watch监听 
    // 监听device变化
    // watch(() => data.device, (nVal) => {
    //   data.device = nVal
    // })
    // 监听菜单栏是否打开
    // watch(() => data.opened, (nVal) => {
    //   // console.log(nVal, oVal)
    //   data.opened = nVal
    // })

    watch(count, (nVal, oldV) => {
      console.log(nVal, oldV)
      data.counts = nVal
    })

    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }

    const onClose = () => {
      store.dispatch('app/toggleSideBar')
    }
    return { data, toggleCollapsed, onClose, count }
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