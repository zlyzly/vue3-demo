<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <LayoutMenus />
      <!-- <a-button type="primary" @click="goto">按钮</a-button>
      <div class="box">
        <router-view></router-view>
      </div> -->
      <!-- <img src="./assets/logo.png" />
      <div>
        <p>
          If Ant-Design-Vue is successfully added to this project, you'll see an
          <code v-text="'<a-button>'"></code>
          <code v-text="'<a-pagination>'"></code>
          below
        </p>
        <a-button type="primary">Primary</a-button>
        <a-pagination
          size="small"
          :total="50"
          showSizeChanger
          showQuickJumper
        />
      </div> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" />
      <a-button type="primary" @click="goto">按钮</a-button>
      <a-pagination
        show-size-changer
        v-model:current="current1"
        v-model:pageSize="pageSize"
        :total="500"
        @showSizeChange="onShowSizeChange"
      />
      <a-progress type="circle" :percent="75" />
      <SmileTwoTone />
      <HeartTwoTone twoToneColor="#eb2f96" />
      <CheckCircleTwoTone twoToneColor="#52c41a" /> -->
    </div>
  </a-locale-provider>
</template>

<script>
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import HelloWorld from './components/HelloWorld.vue'
// import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons-vue'
import LayoutMenus from './components/layout/menus'
export default {
  components: {
    // SmileTwoTone,
    // HeartTwoTone,
    // CheckCircleTwoTone,
    // HelloWorld
    LayoutMenus
  },
  methods: {
    goto() {
      this.$router.push({ path: '/sub/add' })
    }
  },
  setup() {
    // goto(): void {
    //   this.$router.push({ path: '/sub' })
    // }
    // return { goto }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
.box {
  width: 100%;
  height: 200px;
  border: 1px solid #2c3e50;
}
</style>
