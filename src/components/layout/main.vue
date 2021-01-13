<template>
  <a-layout-content class="content">
    <div class="main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppMain',
  props: {},
  components: {},
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.content {
  padding: 16px;
  background: #fff;
  min-height: calc(100vh - 90px);
  overflow: hidden;
  height: auto;
  overflow-y: auto;
  .main {
    min-height: 100%;
    padding-bottom: 60px;
  }
}
</style>