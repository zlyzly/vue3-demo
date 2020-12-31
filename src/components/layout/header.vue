<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-button type="primary" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="data.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <div class="user">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          {{ name }}<DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a type="primary" @click="logout"> 退出 </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
// , onMounted, onUpdated
import { defineComponent, reactive } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LayoutHeader',
  props: {},
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined
  },
  computed: {
    ...mapGetters(['name'])
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    interface Data {
      collapsed: boolean;
      device: string;
      // name: string;
    }
    const data: Data = reactive({
      collapsed: false || store.state.app.opened,
      device: store.state.app.device
      // name: store.state.user.name
    })
    const toggleCollapsed = () => {
      data.collapsed = !data.collapsed
      console.log(data.collapsed)
      store.dispatch('app/toggleSideBar')
    }
    async function logout(): Promise<void> {
      await store.dispatch('user/logout')
      router.push(`/login`)
    }
    // onMounted(() => {
    //   console.log(data.name)
    // })
    // onUpdated(() => {
    //   console.log(data.name)
    // })
    return { data, toggleCollapsed, logout }
  }
})
</script>
<style lang="scss" scoped>
.ant-btn-primary {
  margin-left: 20px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.ant-layout-header {
  position: relative;
}
.user {
  position: absolute;
  right: 20px;
  top: 0;
  width: 100px;
  text-align: right;
}
.ant-dropdown-link span {
  margin-left: 10px;
}
</style>