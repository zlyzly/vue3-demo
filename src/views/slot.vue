<template>
  <div class="home">
    <p>测试内容---{{ text }}</p>
    <slot>插槽字符串内容</slot>
    <p>哈哈哈哈</p>
    <header>
      <!-- 我们希望把页头放这里 -->
      <slot name="header">header----{{ text }}</slot>
    </header>
    <main>
      <!-- 我们希望把主要内容放这里 -->
      <slot-a>{{ text }}</slot-a>
    </main>
    <footer>
      <!-- 我们希望把页脚放这里 -->
      <slot name="footer">footer</slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SlotA from './slot-a.vue'
export default defineComponent({
  name: 'Slots',
  components: {
    SlotA
  },
  setup() {
    const text = ref<string>('hello')
    return { text }
  }
})
</script>
