<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, provide, ref, nextTick  } from 'vue'
export default defineComponent({
  setup() {
    const isRouterAlive = ref(false)
    // 把 ref 数据通过 provide 提供的子组件使用
    const reload = async () => {
      isRouterAlive.value = false
      await nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload()) 
    return { reload, isRouterAlive }
  }
})
</script>

<style>
</style>
