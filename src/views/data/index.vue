<template>
  <div>
    <strong># v-for中ref数组</strong>
    <div v-for="item in list" :ref="setItemRef" :key="item">{{ item }}</div>
    <strong># 异步组件</strong>
    <div>
      异步组件测试点击按钮后第一个延迟300毫秒 第二个不延迟加载
      <a-button type="primary" @click="toggle">加载</a-button>
      <br />
      <template v-if="show">
        <asyncPage></asyncPage>
        <br />
        <asyncPageWithOptions></asyncPageWithOptions>
        <br />
        <asyncPage2></asyncPage2>
        <br />
        <asyncPageWithOptions2></asyncPageWithOptions2>
      </template>
    </div>
    <strong># 自定义指令,动态指令参数</strong>
    <div>
      <input v-focus />
      <div id="dynamic-arguments-example" class="demo">
        <p>Scroll down the page</p>
        <p v-pin="[0, 100]">Stick me 200px from the top of the page</p>
      </div>
    </div>
      <p v-pin="[0]">Stick me 200px from the top of the page</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, onBeforeUpdate, onUpdated, defineAsyncComponent } from 'vue'
import Child1 from './child1.vue'
import Child2 from './child2.vue'
// import pin from '../../utils/directive'
// const Child1 = defineAsyncComponent('Child1', function (resolve) {
//   setTimeout(function () {
//     require(['./child1.vue'], resolve)
//   }, 3000)
// })
// const Child2 = defineAsyncComponent('Child2', function (resolve) {
//   require(['./child2.vue'], resolve)
// })
const asyncPage = defineAsyncComponent(() => import('./child1.vue'))
const asyncPageWithOptions = defineAsyncComponent({
  delay: 200,
  timeout: 3000,
  loader: () =>
    new Promise((resolve: any, reject: any) => {
      resolve({
        component: () => import('./child1.vue'),
      })
      reject({
        component: () => import('./child1.vue'),
      })
    })
})

// 常规用法
const asyncPage2 = defineAsyncComponent(() => import('./child2.vue'))

// 高级用法
const asyncPageWithOptions2 = defineAsyncComponent({
  // 这里之前是 component，现在改叫 loader 了 
  loader: () => import('./child2.vue'),
  delay: 1000,
  timeout: 3000,
  errorComponent: Child1,
  loadingComponent: Child2,
})
export default defineComponent({
  components: {
    asyncPageWithOptions,
    asyncPage,
    asyncPage2,
    asyncPageWithOptions2,
  },
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus()
      }
    },
    pin: {
      // 指令的定义
      mounted(el, binding) {
        console.log(binding)
        el.style.position = 'absolute'
        el.style.right = binding.value[0] + 'px'
        el.style.top = binding.value[1] + 'px'
      }
    }
  },
  setup() {
    // console.log(props, context)
    const itemRefs = ref([])
    const list = ref([1, 3, 5])
    const setItemRef = (el: any) => {
      // itemRefs.value.push(el)
    }
    onBeforeUpdate(() => {
      console.log(itemRefs)
      itemRefs.value = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    // const AsyncComp = defineAsyncComponent(
    //   () =>
    //     new Promise((resolve: any, reject: any) => {
    //       resolve({
    //         template: '<div>I am async!</div>'
    //       })
    //     })
    // )
    const show = ref(false)
    const toggle = () => {
      show.value = !show.value
    }

    const message = ref('hello')
    return {
      list,
      itemRefs,
      setItemRef,
      toggle,
      show,
      asyncPageWithOptions,
      message
      // AsyncCompm,
    }
  }
})
</script>
<style lang="scss" scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.demo-tab {
  border: 1px solid #ccc;
  padding: 10px;
}
#dynamic-arguments-example {
  position: relative;
}
</style>
