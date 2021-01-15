import { createApp } from 'vue'
const app = createApp({})

// 注册
const focus = app.directive('focus', {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的父组件挂载之前调用
  beforeMount() { },
  // 绑定元素的父组件挂载时调用
  mounted(el) {
    // Focus the element
    el.focus()
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() { },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() { },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() { },
  // 卸载绑定元素的父组件时调用
  unmounted() { }
})


// 注册
const pin = app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'absolute'
    el.style.right = binding.value + 'px'
  }
})
export default {
  focus,
  pin
}