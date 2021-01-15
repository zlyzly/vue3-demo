<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" user="zahra" />

    <!-- 10.2 点击按钮，切换子组件中文字的颜色 -->
    <button @click="themeColor = 'red'">红色</button>
    <button @click="themeColor = 'blue'">蓝色</button>
    <button @click="themeColor = 'orange'">橘黄色</button>
    <hr />
    <!-- 模板语法 -->
    <a :href="url">链接</a> <a :[key]="url">链接</a>
    <br />
    <!-- 动态参数的缩写 -->
    <a @[event]="doSometing"> ...链接 </a>
    <hr />
    location:{{ location }}
    <a-button type="danger" @click="changeLocation"
      >点击改变location的值并不改变子组件的值</a-button
    >
    <hr />
    <!-- vue2特殊attribute .ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。用在dom上指向dom元素，用在子组件指向组件实例 -->
    <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }" :key="item">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
// 10.provide & inject
// provide() 和 inject() 可以实现嵌套组件之间的数据传递。这两个函数只能在 setup() 函数中使用。父级组件中使用 provide() 函数向下传递数据；子级组件中使用 inject() 获取上层传递过来的数据。
// 10.1.共享普通数据  1.按需导入 provide
// 10.2.共享ref 响应式数据
import { defineComponent, provide, ref, readonly, onMounted, onBeforeUpdate, reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  // setup 函数会在 beforeCreate 之后、created 之前执行
  setup() {
    // 10.1
    // provide('globalColor', 'red')

    // 10.2 
    // 定义 ref 响应式数据
    const themeColor = ref('red')
    const location = ref('')
    // 把 ref 数据通过 provide 提供的子组件使用
    provide('globalColor', themeColor)
    // 1.模板语法
    const url = ref('http://baidu.com')
    const key = 'href'
    const event = 'click'
    const doSometing = () => {
      window.location.href = 'http://baidu.com'
    }
    onMounted(() => {
      location.value = '上海市'
    })
    // watch用法
    const store = useStore()
    console.log(store.state.user.name)
    const changeLocation = () => {
      location.value = '北京市'
    }
    provide('location', readonly(location))

    const list = reactive([1, 2, 3])
    const divs = ref([])

    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      divs.value = []
    })

    return { themeColor, url, key, event, doSometing, location, changeLocation, list,
        divs }
  }
});
</script>
