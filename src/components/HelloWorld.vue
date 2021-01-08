<template>
  <div class="hello">
    <!-- 4. 通过属性绑定，为标签设置字体颜色 -->
    <strong :style="{ color: themeColor }"
      >{{ msg }} ---- {{ message }} ====== {{ location }}
    </strong>
    <hr />
    <!--  11.template refs -->
    <strong ref="h3Ref">template refs</strong>
    <hr />
    <!-- watch用法 -->
    {{ str }}
    <a-button type="primary" @click="getInfo">watch用法点击</a-button>
    {{ state.count }}
    <a-button type="primary" @click="change"
      >count is: {{ state.count }}</a-button
    >
    <hr />
    <!-- <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script lang="ts">
// Provide / Inject
// 如果要确保通过 provide 传递的数据不会被注入的组件更改，我们建议对提供者的 property 使用 readonly
import { defineComponent, inject, ref, onMounted, reactive, watch } from 'vue'
// import { getUserInfo } from '../api/user'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
    user: {
      type: String
    }
  },
  inject: ['globalColor', 'location'], //或者
  setup(props, context) {
    // 可以获取props内部的值
    console.log(props, context)
    // Attribute (非响应式对象)
    // console.log(context.attrs)

    // 插槽 (非响应式对象)
    // console.log(context.slots)

    // 触发事件 (方法)
    // console.log(context.emit)

    const message = ref(props.msg)

    message.value = '改变父组件传过来的值'
    // 10.x 2. 调用 inject 函数时，通过指定的数据名称，获取到父级共享的数据
    const themeColor = inject('globalColor')
    const location = inject('location')
    // 11.创建一个 DOM 引用
    const h3Ref = ref()
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // h3Ref.value 是原生DOM对象
      h3Ref.value.style.color = 'pink'
    })

    // -----watch用法--------
    // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
    // 但是，因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 props 的响应性。
    // --------ref--------
    const str = ref('zahra1')
    const getInfo = async () => {
      // console.log(await getUserInfo())
      str.value = '11'
      // user.value = await getUserInfo()
    }
    // 在用户 prop 的响应式引用上设置一个侦听器
    watch(str, (nv: string, ov: string) => {
      // console.log('新的值：', nv, '旧的值', ov)
    })
    // --------reactive--------
    // 定义数据源 name: 'zs' 对象多个属性可连着使用
    const state = reactive({ count: 0 })
    // 监视 state.count 这个数据节点的变化
    const change = () => state.count++;
    watch(() => state.count, (oldVlaue, newValue) => {
      // console.log(oldVlaue, newValue, '改变')
    })
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
    setTimeout(() => {
      state.count++
      // state.name = 'zzzlllyyy'
    }, 1000)

    // -------清除watch监视-------
    // 创建监视，并得到 停止函数
    // const stop = watch(() => {})
    // 调用停止函数，清除对应的监视
    // stop()


    // 把接收到的共享数据 return 给 Template 使用
    return { themeColor, h3Ref, message, getInfo, str, state, change, location }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
