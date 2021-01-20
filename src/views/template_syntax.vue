<template>
  <div>
    <strong>模板语法</strong>
    <div class="home">
      <div :class="{ active: isActive }">哈哈哈哈</div>
      <div :class="[isActive ? activeClass : '', errorClass]">哈哈哈</div>
      <!-- <div :class="[{ active: isActive }, errorClass]">哈哈哈</div> -->
      <strong :style="{ color: activeColor, fontSize: fontSize + 'px' }"
        >啦啦啦</strong
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

    <!-- 表单组件 -->
    <div>
      <Forms />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Forms from './form.vue'
export default defineComponent({
  components: {
    Forms
  },
  setup() {
    const isActive = ref(false)
    const activeClass = ref('active')
    const errorClass = ref('text-danger')
    const activeColor = ref('red')
    const fontSize = ref(22)
    const rawHtml = ref('红红火火')
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
        },
        {
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'Ant Design Title 3',
          text: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
        },
      ]
    })
    const myObject = reactive({
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    })
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
    return { isActive, activeClass, errorClass, activeColor, fontSize, rawHtml, data, myObject, attributeName, url, eventName, getGo, text, nums, changelist }
  }
})
</script>
<style lang="scss" scoped>
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
</style>
