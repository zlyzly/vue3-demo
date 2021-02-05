<template>
  <div class="home">
    <strong>多级路由1</strong>
    <p>query: {{ query }}</p>
    <a-button type="primary" @click="openModal">添加数据</a-button>
    <ModalComponent :visible="flag.visible" :info="info" @handleOk="handleOk" @handleCancel="handleCancel" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import ModalComponent from './component/modal.vue' 
export default defineComponent({
  name: 'Router',
  components: { ModalComponent },
  // beforeRouteEnter(to, from) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log('beforeRouteEnter', to, from)
  // },
  setup() {
    const query = useRoute().query
    const flag = reactive({
      visible: false,
      confirmLoading: false
    })
    const info = reactive({
      name: '',
      region: undefined,
      type: []
    })
    const openModal = () => {
      flag.visible = true
    }
    const handleOk = (value) => {
      console.log(value)
      flag.confirmLoading = true
      setTimeout(() => {
        flag.confirmLoading = false
        flag.visible = false
      }, 1000)
    }
    const handleCancel = () => {
      flag.visible = false
    }
    return { flag, query, info, openModal, handleOk, handleCancel }
  }
})
</script>
