<template>
  <!-- 新增片段 -->
  <div>
    <h3>#组件注册</h3>
    <component-a />
    <p>局部注册是在根组件的componets组件</p>
    <p>常用的是在模块系统中引入的局部注册</p>
    <h3>#props</h3>
    <div>
      <a-button type="primary" @click="changeText">点击改变text的值</a-button>
    </div>
    <Components
      title="My journey with Vue"
      :text="post.text"
      :comment-ids="post.commentIds"
      v-model:first-name="post.firstName"
      v-model:last-name="post.lastName"
      @changeIds="changeIds"
    />
    
    <h3>#自定义事件</h3>
    <h3>#插槽</h3>
    <!-- vue2 具名插槽(多个插槽-控制输入到子组件的不同位置)
    在child双标签下写入对应的内容，在标签上加个属性（<p slot=xxx,>)（xxx为子组件中的 name值<slot name=xxx>）在标签中加上想插入的内容
      vue3 !具名插槽只能写在template上或者组件上! v-slot:top/缩写#bottom -->
    <slots>
      <div>{{ post.firstName }}{{ post.lastName }}</div>

      <!-- 这种写法不对 -->
      <p slot:header>哈哈哈哈</p>

      <!-- 对应slots组件内 name=top ,bottom的插槽， 并且替换了后备内容bottom没有内容 使用后备内容显示
      vue2 slot='top' slot-scope='props'
      vue3 合起来 v-slot:top="obj"
       -->
      <!-- 作用域插槽 父子组件有各自的作用域，子组件可以带值 （插槽 prop）obj 可定义任意名 -->
      <!-- <template v-slot:top="obj">
        插入子组件的内容——top
        <div class="sign">获取具名插槽传参--{{ obj.scope.a }}---{{ obj.scope.b }}</div>
         <div class="sign">获取具名插槽传参---{{ obj.text }}</div>
      </template> -->
       <!-- 解构时不可任意指定名 需要用子组件定义的:scope :text -->
      <template v-slot:top="{ scope, text }">
        插入子组件的内容——top
        <div class="sign">获取具名插槽传参--{{ scope.a }}---{{ scope.b }}</div>
         <div class="sign">获取具名插槽传参---{{ text }}</div>
      </template>
      <template #bottom></template>

      <!-- 插入多段内容 -->
      <template #more>
        <p v-for="el in 5" :key="el"> 插入多段内容---{{ el }} </p>
      </template>
    </slots>
    <h3>#提供/注入</h3>
    <div class="home">
      <injectc msg="Welcome to Your Vue.js + TypeScript App" user="zahra" />

      <!-- 点击按钮，切换子组件中文字的颜色 -->
      <p>点击按钮，切换子组件中文字的颜色</p>
      <a-button @click="themeColor = 'red'">红色</a-button>
      <a-button @click="themeColor = 'blue'">蓝色</a-button>
      <a-button @click="themeColor = 'orange'">橘黄色</a-button>

      <p>location:{{ location }}</p>
      <a-button type="danger" @click="changeLocation"
        >点击改变location的值并不改变子组件的值</a-button
      >
      
      <!-- vue2特殊attribute .ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。用在dom上指向dom元素，用在子组件指向组件实例 -->
      <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }" :key="item">
        {{ item }}
      </div>
    </div>
    <h3>#函数式组件--通过函数创建组件</h3>
    <!--setup将接收两个参数：props 和 context。context 参数是一个对象，包含组件的 attrs，slots，和 emit property。
    现在不是在 render 函数中隐式提供 h，而是全局导入 h。 -->
    <component v-bind:is="`h${$props.level}`" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, h, provide, ref, onMounted, readonly } from 'vue'
import Components from './component.vue'
import Injectc from './inject.vue'
import Slots from './slot.vue'
export default defineComponent({
  props: ['level'],
  components: {
    Components,
    Injectc,
    Slots
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
    // console.log(post.commentIds)
    watch(() => post.commentIds, (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    watch([post.text], (newV, oldV) => {
      console.log('新值：', newV, '旧值：', oldV)
    })
    watch([() => post.firstName, () => post.lastName], ([foo, bar], [prevFoo, prevBar]) => {
      console.log('新值：', foo, '旧值：', prevFoo, '新值：', bar, '旧值：', prevBar)
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

    /*Provide / Inject
    如果要确保通过 provide 传递的数据不会被注入的组件更改，我们建议对提供者的 property 使用 readonly */
    // provide('globalColor', 'red')
    const themeColor = ref('red')
    const location = ref('')
    // 把 ref 数据通过 provide 提供的子组件使用
    provide('globalColor', themeColor)

    onMounted(() => {
      location.value = '上海市'
    })

    const changeLocation = () => {
      location.value = '北京市'
    }
    // provide('location', location) ???
    provide('location', readonly(location))
    provide('changeLocation', changeLocation)
    // 1.模板语法
    return { post, changeText, changeIds, DynamicHeading, themeColor, location , changeLocation }
  },
  // render(h) {
  //   return h('div')
  // }
})
</script>
<style lang="less" scoped>
div,p  {
  margin: 10px 0;
}

</style>
