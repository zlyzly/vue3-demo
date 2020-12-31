<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <LayoutMenus />
    <a-layout>
      <LayoutHeader />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LayoutMenus from '../components/layout/menus.vue';
import LayoutHeader from '../components/layout/header.vue';
export default defineComponent({
  name: '',
  props: {},
  components: {
    LayoutMenus,
    LayoutHeader
  },
  beforeRouteEnter: (to, from, next) => {
    console.log("准备进入路由模板", to, from)
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板", to, from)
    next()
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  height: 100%;
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

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>