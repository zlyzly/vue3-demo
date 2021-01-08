<template>
  <a-layout-content class="content">
    <div class="main">
      <transition name="fade" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>
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
  margin: 10px 0;
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