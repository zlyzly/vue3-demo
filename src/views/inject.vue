<template>
  <div class="hello">
    <!-- 通过属性绑定，为标签设置字体颜色 -->
    <strong :style="{ color: themeColor }"
      >{{ msg }} ---- {{ message }} ====== {{ location }}
    </strong>
    <!--  template refs:获得对模板内元素或组件实例的引用 -->
    <p ref="h3Ref">template refs</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, inject,
  // mount
  onBeforeMount,
  onMounted,
  // update
  onBeforeUpdate,
  onUpdated,
  // unmount
  onBeforeUnmount,
  onUnmounted,
  // 新增的钩子函数
  onRenderTracked,
  onRenderTriggered, } from 'vue'
export default defineComponent({
  inject: ['globalColor', 'location'], //或者
  props: {
    msg: String,
    user: {
      type: String
    }
  },
  setup(props) {
    const message = ref(props.msg)
    message.value = '改变父组件传过来的值'

    // 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
    const themeColor = inject('globalColor')
    const location = inject('location')
    const changeLocation = inject('changeLocation')

    // 创建一个 DOM 引用 取到dom元素
    const h3Ref = ref()
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // h3Ref.value 是原生DOM对象
      h3Ref.value.style.color = 'pink'
      h3Ref.value.style.fontSize = '25px'
    })
    // setTimeout(() => {
    // }, 10000)
    onBeforeMount(() => {
      // debugger
    })
    onMounted(() => {
      // debugger
    })
    onBeforeUpdate(() => {
      // debugger
    })
    onUpdated(() => {
      // debugger
    })
    onBeforeUnmount(() => {
       // debugger
    })
    onUnmounted(() => {
       // debugger
    })
    onRenderTracked((e) => {
      console.log(e)
      // debugger
    })
    onRenderTriggered((e) => {
      console.log(e)
      // debugger
    })

    return { message, themeColor, changeLocation, location, h3Ref }
  }
})
</script>