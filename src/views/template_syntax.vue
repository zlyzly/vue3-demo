<template>
  <div>
    <h3>#模板语法-ts类型，响应式api</h3>
    
    <div class="home">
      <div :class="{ active: isActive }">111111111</div>
      <div :class="[isActive ? activeClass : '', errorClass]">222222222</div>
      <!-- <div :class="[{ active: isActive }, errorClass]">哈哈哈</div> -->
      <strong :style="{ color: activeColor, fontSize: fontSize + 'px' }"
        >333333</strong
      >
    </div>

    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>

    <a-list item-layout="horizontal">
      <a-list-item v-for="item in data.list" :key="item">
        <a-list-item-meta :description="item.text">
          <template #title>
            {{ item.title }}
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>

    <a-list item-layout="horizontal">
      <a-list-item v-for="item in list" :key="item">
        <a-list-item-meta :description="item.text">
          <template #title>
            {{ item.title }}
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-button type="primary" @click="changelist">点击改变</a-button>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name) in myObject" :key="value">
        {{ name }}: {{ value }}
      </li>
    </ul>

    <div id="range" class="demo">
      <span v-for="n in 10" :key="n">{{ n }} </span>
    </div>
    <span :key="text">{{ text }}</span>
    <!-- 动态参数 -->
    <div>
      <a :[attributeName]="url" target="_black"> ...链接 </a>
      <a @[eventName]="getGo"> ...跳转链接 </a>
    </div>
    <h3>#响应式计算和监听</h3>
    <watch-computed />
    <!-- 表单组件 -->
    <h3>#表单组件</h3>
    <div>
      <forms />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, readonly } from 'vue'
import Forms from './form.vue'
import WatchComputed from './watch_computed.vue'
export default defineComponent({
  components: {
    Forms,
    WatchComputed
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  /* 组合式API都必须只能在setup中使用, 并充当合成 API 的入口点
  在 beforeCreate 钩子之前被调用*/
  setup(props, ctx) {
    console.log('setup')
    console.log(props, ctx)
    // 声明响应式状态  定义基本类型的数据
    // ref返回一个可变的响应式对象 调用变量.value
    const isActive = ref(false)
    const activeClass = ref('active')
    const errorClass = ref('text-danger')
    const activeColor = ref('red')
    const fontSize = ref(22)
    const rawHtml = ref('红红火火')
   // 响应式状态
    const data = reactive({
      list: [
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'Ant Design Title 1',
          text: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'Ant Design Title 2',
          text: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        }
      ]
    })

    const myObject = reactive({
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    })
    const copy = readonly(myObject)
    // 使用es6解构会丢失响应性，可以使用 toRefs转换成ref式的响应性数据
    // let { author, title } = myObject
    const { author, title } = toRefs(myObject)
    author.value = 'Zahra'
    console.log(author, title)
    // 只读属性的值不可以修改
    // copy.title = '改变只读属性的值' //title" failed: target is readonly. 

    const attributeName = ref('')
    const url = ref('http://baidu.com')
    const eventName = ref('click')

    setTimeout(() => {
      isActive.value = true
      attributeName.value = 'href'
    }, 1000)

    const getGo = () => {
      window.location.href = 'http://baidu.com'
    }

    const text = ref('hello')
    
    setTimeout(() => {
      text.value = ' 你好'
    }, 2000)

    const nums = ref(10)
    const changelist = () => {
      data.list.splice(2, 1)
    }
    // 把响应式对象转成普通对象直接使用 导出是...kk
    const kk = toRefs(data)
    console.log(kk)
    return { isActive, activeClass, errorClass, activeColor, fontSize, rawHtml, data, myObject, attributeName, url, eventName, getGo, text, nums, changelist, ...kk, copy }
  }
})
</script>
<style lang="less" scoped>
.home > div {
  width: 100%;
  height: 100px;
}
div {
  margin-top: 10px;
}
.home > div.active {
  background: aqua;
  font-size: 20px;
}
.home > div.text-danger {
  background: red;
  text-align: center;
}
h3:not(:first-child) {
  margin-top: 30px;
}
</style>
