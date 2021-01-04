<template>
  <div class="welcome-container">
    <div class="welcomeword"><h2>欢迎页</h2></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Welcome',
  components: {},
  // watch: {
  //   $route: {
  //     handler: function (router) {
  //       console.log(router)
  //       // route.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // }
})
</script>
<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$black: #000;
.welcome-container {
  background-color: $bg;
  .welcomeword {
    position: absolute;
    left: 0;
    right: 0;
    margin: 200px auto;
    text-align: center;
  }
}
</style>
