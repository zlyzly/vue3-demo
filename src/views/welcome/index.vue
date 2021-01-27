<template>
  <div class="welcome-container">
    <h2>欢迎页</h2>
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
  }
})
</script>
<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$black: #000;
.welcome-container {
  background-color: $bg;
  text-align: center;
  h2 {
    font-size: 25px;
    font-weight: bold;
  }
  
}
</style>
