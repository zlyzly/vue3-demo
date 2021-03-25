<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
// moment.locale('en')
export default defineComponent({
  data() {
    return {
      locale: zhCN
    }
  },
  // setup() {
  //   const data = reactive({
  //     locale: zhCN
  //   })
  //   return { data }
  // }
})
</script>

