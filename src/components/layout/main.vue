<template>
  <a-layout-content class="content">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutMain',
  props: {},
  components: {},
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.content {
  margin: 20px 16px;
  padding: 16px;
  background: #fff;
  min-height: 280px;
}
</style>