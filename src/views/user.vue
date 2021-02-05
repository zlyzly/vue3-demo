<template>
  <div class="home">
    <strong>User: {{ id }}</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'User',
  components: {},
  setup () {
    const router = useRouter()
    // console.log(router)
    const id = ref<string | string[]>('')
    id.value = router.currentRoute.value.params.id
    return { id }
  }
})
</script>