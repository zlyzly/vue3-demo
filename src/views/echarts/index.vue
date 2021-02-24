<template>
  <a-tabs
    type="card"
    :active-key="active.activekey"
    @tabClick="tabClick"
  >
    <a-tab-pane key="AntvG2" tab="antv-g2" />
    <a-tab-pane key="Viser" tab="viser" />
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
    const active = reactive({
      activekey: route.name ? route.name : 'AntvG2'
    })
    const tabClick = (key) => {
      router.push({ name: key })
    }
    watch(() => route.name, newV => {
      active.activekey = newV ? newV : 'AntvG2'
    })
    return { active, tabClick }
  }
})
</script>
