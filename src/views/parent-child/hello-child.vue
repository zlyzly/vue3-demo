<template>
  <div class="home">
    <strong>---child---</strong>
    <p>{{ count }}</p>
    <a-button type="primary" @click="addCount">+</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'child',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:count'],
  setup(props, { emit }: any) {
    const counts = ref<number>(props.count)
    const addCount = () => {
      counts.value++
      emit('update:count', counts.value)
    }
    return {
      addCount
    }
  }
})
</script>
