<template>
  <div class="home">
    <strong>---child1---</strong>
    <p>{{ info.count }}</p>
    <a-button type="primary" @click="addCount">+</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'child1',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          count: 0
        }
      }
    }
  },
  emits: ['update:info'],
  setup(props, { emit }: any) {
    const info = reactive(props.info)
    const addCount = () => {
      info.count++
      console.log('info', info)
      emit('update:info', info)
    }
    return {
      addCount
    }
  }
})
</script>
