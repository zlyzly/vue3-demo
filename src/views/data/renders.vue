<template>
  <!-- 函数渲染 -->
  <div></div>
</template>

<script lang="ts">
import { defineComponent, reactive, h } from 'vue'

export default defineComponent({
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    const increment = () => {
      state.count++
    }

    // 返回render函数
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        state.count
      )
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
