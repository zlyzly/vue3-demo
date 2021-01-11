<template>
  <strong>组件式API</strong>
  <br />
  <div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  components: {
  },
  setup() {
    console.log(this)
    const post = reactive({
      text: 0,
      commentIds: [234, 266, 273],
      firstName: 'zhang',
      lastName: 'ly'
    })
    const changeText = () => {
      post.text++
    }
    // console.log(post.commentIds)
    // watch(() => post.commentIds, (newV, oldV) => {
    //   console.log('新值：', newV, '旧值：', oldV)
    // })
    watch([post.text], (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    // // 接收子组件传的值
    // const changeIds = () => {
    //   // console.log('11111')
    //   post.commentIds.push(Math.floor(Math.random() * 1000))
    // }
    return { post, changeText }
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
