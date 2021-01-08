<template>
  <div class="home">静态值：{{ title }}</div>
  <div class="home">动态赋予一个变量的值：{{ text }}</div>

  <div>
    <a-button type="primary" @click="pushCommentIds">向数组添加一个值</a-button>
  </div>
  <ul>
    <li v-for="id in commentIds" :key="id">{{ id }}</li>
  </ul>
  <div>
    <input
      type="text"
      :value="firstName"
      @input="$emit('update:firstName', $event.target.value)"
    />

    <input
      type="text"
      :value="lastName"
      @input="$emit('update:lastName', $event.target.value)"
    />
    <a-button type="primary" @click="login">Log in</a-button>
  </div>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue'
export default defineComponent({
  emits: ['changeIds'],
  props: {
    title: String,
    text: Number,
    commentIds: Array,
    firstName: String,
    lastName: String
  },
  components: {

  },
  setup(props, context) {
    console.log(toRaw(props.commentIds))
    const pushCommentIds = () => {
      // props.commentIds.push(500)
      context.emit('changeIds')
    }
    const login = () => {
      console.log(props)
    }
    return { pushCommentIds, login }
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
