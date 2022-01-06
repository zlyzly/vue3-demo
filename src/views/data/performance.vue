<template>
  <!-- <div>{{ heavy() }}</div> -->
  <div>{{ heavy }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // 使用计算属性js快了很多自身缓存特性，耗时的逻辑也只会在第一次渲染的时候执行
  computed: {
    heavy () {
      const n = 100000
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(42)))
      }
      return result
    },
  },
  // 下边这种方式每次渲染的时候都会执行一次，所以每次组件的渲染都会消耗较长的时间执行
  // setup() {
  //   const heavy = () => {
  //     const n = 100000
  //     let result = 0
  //     for (let i = 0; i < n; i++) {
  //       result += Math.sqrt(Math.cos(Math.sin(42)))
  //     }
  //     return result
  //   }
  //   return {
  //     heavy
  //   }
  // }
})
</script>
<style lang="less" scoped>
</style>
