<template>
  <strong>我是child1</strong>
  <input type="text" v-focus>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
  },
  // 自定义指令默认focus
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus()
      }
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
</style>
