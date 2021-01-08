<template>
  <strong>表格组件使用</strong>
  <br />
  <!-- 在组件上使用 v-model -->
  <!-- <table-list /> -->
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import TableList from '../components/TableList/index.vue'

export default defineComponent({
  components: {
    // TableList
  },
  setup() {
    const data = reactive({
      commentIds: [234, 266, 273]
    })
    return { data }
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
