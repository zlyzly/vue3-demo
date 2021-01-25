<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-button type="primary" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="data.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <div class="user">
      <span>{{ name }}</span>
      <a-button type="primary" title="登出" @click="logout">
        <LogoutOutlined style="fontsize: 20px" />
      </a-button>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { useStore, mapGetters } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  props: {},
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
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
    }
    const data: Data = reactive({
      collapsed: store.getters.sidebar.opened,
      device: store.getters.device
    })
    const toggleCollapsed = () => {
      store.dispatch('app/toggleSideBar')
    }
    async function logout(): Promise<void> {
      await store.dispatch('user/logout')
      router.push(`/login`)
    }
    return { data, toggleCollapsed, logout }
  }
})
</script>
<style lang="scss">
.ant-btn-primary {
  margin-left: 20px;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
.ant-layout-header {
  position: relative;
  line-height: 64px;
  .user {
    position: absolute;
    right: 20px;
    top: 0;
    width: 150px;
    text-align: right;
  }
}
.ant-dropdown-link span {
  margin-left: 10px;
}
</style>