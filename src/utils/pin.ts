import { createApp } from 'vue'
const app = createApp({})

// 注册
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'absolute'
    el.style.right = binding.value + 'px'
  }
})
// app.mount('#dynamic-arguments-example')