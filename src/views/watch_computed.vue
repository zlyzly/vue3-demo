<template>
  <div class="home">
    <strong>watch_computed</strong>
    <div>
      {{ count }} ---- {{ counts }}
      <a-button type="primary" @click="changeCount">点击</a-button>
      {{ data.count }} ---- {{ data.num }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    // ref
    const count = ref(0)
    const counts = computed(() => count.value)
    const changeCount = () => {
      count.value++
    }
    watch(count, (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    // reactive
    const data = reactive({ count: 0, num: 0 })
    setInterval(() => {
      data.count++
      data.num = Math.random() * 100
    }, 5000)
    console.log(data.count)
    watch([() => data.count, () => data.num], (count, prevCount) => {
      console.log('1新值：', count, '1旧值：', prevCount)
    })
    return { count, counts, changeCount, data }
  }
})
</script>
