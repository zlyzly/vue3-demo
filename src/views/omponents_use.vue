<template>
  <strong>组件使用</strong>
  <br />
  <div>
    <a-button type="primary" @click="changeText">点击改变text的值</a-button>
  </div>
  <!-- 在组件上使用 v-model -->
  <Components
    title="My journey with Vue"
    :text="post.text"
    :comment-ids="post.commentIds"
    v-model:first-name="post.firstName"
    v-model:last-name="post.lastName"
    @changeIds="changeIds"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import Components from './component.vue'

export default defineComponent({
  components: {
    Components
  },
  setup() {
    const post = reactive({
      text: 0,
      commentIds: [234, 266, 273],
      firstName: 'zhang',
      lastName: 'ly'
    })
    const changeText = () => {
      post.text++
    }
    console.log(post.commentIds)
    watch(() => post.commentIds, (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    watch([post.text], (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    // 接收子组件传的值
    const changeIds = () => {
      // console.log('11111')
      post.commentIds.push(Math.floor(Math.random() * 1000))
    }
    return { post, changeText, changeIds }
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
