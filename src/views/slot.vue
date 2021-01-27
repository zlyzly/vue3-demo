<template>
  <div class="home">
    <p>测试内容---{{ text }}</p>
    <!-- 和下边的slot会显示slots组件双标签下匿名插槽的内容 -->
    <slot>插槽字符串内容</slot>
    <hr />
    <slot name="header">header----{{ text }}</slot>
    <!-- 组件 -->
    <slot-a>{{ text }}</slot-a>

    <!-- 父组件中没有定义v-slot:footer -->
    <slot name="footer">后备内容footer</slot>
    <br>

    <!-- 后备内容如果有就不显示，没有显示 data1? 解构???-->
    <slot name="top" :scope="data2" :text="text">后备内容</slot>
    <!-- <a-button @click="changeText">改变text值</a-button> -->
    <br>
    <slot name="bottom">后备内容2</slot>
    <hr />
    <slot>插槽字符串内容2</slot>
    <hr />
    <slot name="more"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRefs } from 'vue'
import SlotA from './slot-a.vue'
export default defineComponent({
  name: 'Slots',
  components: {
    SlotA
  },
  setup() {
    const text = ref<string>('hello')
    const changeText = () => {
      text.value = '你好'
    }
    const data = reactive({
      a: '测试1',
      b: '测试2'
    })
    const data1 = toRefs(data)
    const data2 = toRaw(data) // 响应式对象转成普通对象
    console.log(data1, data2)
    return { text, changeText, data, data2 }
  }
})
</script>
