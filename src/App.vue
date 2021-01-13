<template>
  <a-config-provider :locale="data.locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, ref, reactive, nextTick } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default defineComponent({
  setup() {
    // console.log(zhCN)
    const data = reactive({
      locale: zhCN
    })
    console.log(data)
    const isRouterAlive = ref(false)
    // 把 ref 数据通过 provide 提供的子组件使用
    const reload = async () => {
      isRouterAlive.value = false
      await nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload())
    return { reload, isRouterAlive, data }
  }
})
</script>

<style>
</style>
