<template>
  <a-config-provider :locale="locale.locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, ref, reactive, nextTick, toRaw } from 'vue'
// import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('en')
export default defineComponent({
  setup() {
    // console.log(zhCN)
    const data = reactive({
      locale: zhCN
    })
    // console.log(data)
    const isRouterAlive = ref(false)
    // 把 ref 数据通过 provide 提供的子组件使用
    const reload = async () => {
      isRouterAlive.value = false
      await nextTick(() => {
        isRouterAlive.value = true
      })
    }
    provide('reload', reload())
    return { reload, isRouterAlive, ...toRaw(data) }
  }
})
</script>

<style>
</style>
