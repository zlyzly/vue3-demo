<template>
  <!-- 新增片段 -->
  <div>
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

    <!-- 函数式组件 -->
    <strong>函数式组件--通过函数创建组件</strong>
    <br />
    <!--setup将接收两个参数：props 和 context。context 参数是一个对象，包含组件的 attrs，slots，和 emit property。
    现在不是在 render 函数中隐式提供 h，而是全局导入 h。 -->
    <component v-bind:is="`h${$props.level}`" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, h } from 'vue'
import Components from './component.vue'

export default defineComponent({
  props: ['level'],
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
    //  渲染函数
    
    const DynamicHeading = (props, context) => {
      return h(`h${props.level}`, context.attrs, context.slots)
    }

    DynamicHeading.props = ['level']

    return { post, changeText, changeIds, DynamicHeading }
  },
  // render(h) {
  //   return h('div')
  // }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
