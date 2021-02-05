<template>
  <a-tabs
    type="card"
    :active-key="active.activekey"
    @tabClick="tabClick"
  >
    <a-tab-pane key="NestedRouter" tab="多级路由" />
    <a-tab-pane key="Modal" tab="模态框" />
  </a-tabs>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    console.log(route, router)
    const active = reactive({
      activekey: route.name ? route.name : 'NestedRouter'
    })
    const tabClick = (key) => {
      router.push({ name: key })
    }
    watch(() => route.name, newV => {
      active.activekey = newV ? newV : 'NestedRouter'
    })
    return { active, tabClick }
  }
})
</script>
