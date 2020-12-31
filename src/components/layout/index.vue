<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <LayoutMenus />
    <a-layout>
      <LayoutHeader />
      <LayoutMain />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LayoutMenus from './menus.vue'
import LayoutHeader from './header.vue'
import LayoutMain from './main.vue'

export default defineComponent({
  name: '',
  props: {},
  components: {
    LayoutMenus,
    LayoutHeader,
    LayoutMain
  }
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100% !important;
}
</style>