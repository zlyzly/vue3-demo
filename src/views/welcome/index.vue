<template>
  <div class="welcome-container">
    <h2>欢迎页</h2>
    <!-- <a-config-provider :csp="{ nonce: 'YourNonceCode' }">
      <a-button>My Button</a-button>
    </a-config-provider> -->
    <a-list size="large" bordered :data-source="data">
      <template #renderItem="">
        <a-list-item>11111</a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Welcome',
  components: {},
  watch: {
    $route: {
      handler: function (router) {
        console.log(router)
        router.redirect = router.query && router.query.redirect
      },
      immediate: true
    }
  },
  setup() {
    const data: string[] = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      // 'Australian walks 100km after outback crash.',
      // 'Man charged over missing wedding girl.',
      // 'Los Angeles battles huge wildfires.',
    ]
    return { data }
  }
})
</script>
<style lang="less" scoped>
// $bg: #fff;
// $dark_gray: #889aa4;
// $black: #000;
.welcome-container {
  background-color: #fff;
  text-align: center;
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
}
</style>

