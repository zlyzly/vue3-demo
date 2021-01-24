<template>
  <div class="home">
    {{ count }} ---- {{ counts }}
    <a-button type="primary" @click="changeCount">点击</a-button>
    {{ data.count }} ---- {{ data.num }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    // watch
    const count = ref(0)
    const counts = computed(() => count.value) //1.count改变跟着变
    const changeCount = () => {
      count.value++
    }
    // 2.可以通过watch监听变化 --ref
    watch(count, (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    // reactive
    const data = reactive({ count: 0, num: 0 })
    setInterval(() => {
      data.count++
      data.num = Math.random() * 100
    }, 5000)
    console.log(data.count)
    // 侦听一个 getter
    watch([() => data.count, () => data.num], (count, prevCount) => {
      console.log('1新值：', count, '1旧值：', prevCount)
    })
    // 监听多个数据源
    // watch(
    //   [() => state.count, () => state.name], // Object.values(toRefs(state)),
    //   ([count, name], [prevCount, prevName]) => {
    //     console.log(count) // 新的 count 值
    //     console.log(name) // 新的 name 值
    //     console.log('------------')
    //     console.log(prevCount) // 旧的 count 值
    //     console.log(prevName) // 新的 name 值
    //   },
    //   {
    //     lazy: true // 在 watch 被创建的时候，不执行回调函数中的代码
    //   }
    // )

    // -------清除watch监视-------
    // 创建监视，并得到 停止函数
    // const stop = watch(() => {})
    // 调用停止函数，清除对应的监视
    // stop()
    return { count, counts, changeCount, data }
  }
})
</script>
