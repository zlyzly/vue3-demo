<template>
  <strong>插槽可以包含字符串，模板代码，任意组件Slot-A</strong>
  <!-- <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Slot-A',
  components: {}
})
</script>
