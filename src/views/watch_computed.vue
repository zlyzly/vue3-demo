<template>
  <div class="home">
    {{ count }} ---- {{ counts }}
    <a-button type="primary" @click="changeCount">点击</a-button>
    {{ data.count }} ---- {{ data.num }}
    <a-button type="primary" @click="stop">停止监听</a-button>

    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch, watchEffect } from 'vue'

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
    }, 500000)
    console.log(data.count)
    // 侦听一个 getter
    watch([() => data.count, () => data.num], (count, prevCount) => {
      console.log('1新值：', count, '1旧值：', prevCount)
    })
    // 监听器 count.value的值改变就会触发该函数
    // watchEffect(() => console.log(count.value))
    // 手动关闭监听后将不在监听值的变化
    const stop = watchEffect(() => {
      console.log(`侦听器：${count.value}`)
    })

    // $  ???
    const text = ref('')
    const fetchData = (): any => {
      return new Promise((resolve) => {
        resolve('请求返回值')
      })
    }
    watchEffect(async onInvalidate => {
      onInvalidate(() => {
        console.log(11111)
      }),
      // 我们在Promise解析之前注册清除函数
      console.log(await fetchData())
      text.value = await fetchData()
     },
     {
      onTrigger(e) {
        console.log(e)
        text.value = '哈哈哈'
      }
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
    
    return { count, counts, changeCount, data, stop, text, fetchData }
    /*
    对比watchEffect，watch：
    • 懒执行副作用，也就是说仅在侦听的源变更时才执行回调；
    • 更明确哪些状态的改变会触发侦听器重新运行副作用；
    • 访问侦听状态变化前后的值。

    • 清楚副作用 ?
    在执行数据请求时，副作用函数往往是一个异步函数：
    const data = ref(null)
    watchEffect(async onInvalidate => {
      onInvalidate(() => {...}) // 我们在Promise解析之前注册清除函数
      data.value = await fetchData(props.id)
    })
     */
  }
})
</script>
