<template>
  <a-layout-content class="content">
    <div class="main">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppMain',
  props: {},
  components: {},
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.content {
  padding: 16px;
  background: #fff;
  min-height: calc(100vh - 90px);
  overflow: hidden;
  height: auto;
  overflow-y: auto;
  .main {
    min-height: 100%;
    padding-bottom: 60px;
  }
}
/* 可以设置不同的进入和离开动画   */
/* 设置持续时间和动画函数        */
// .slide-fade-enter-active {
//   transition: all 1s ease-in;
// }

// .slide-fade-leave-active {
//   transition: all 1s ease-in;
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//   // transform: translateX(20px);
//   opacity: 0;
// }

// .page-transition-enter-active,.page-transition-leave-active {
//   // -webkit-transform: scale(1.5);
//   // transform: scale(1.5);
//   transition: all 1s ease-in;
// }

// .page-transition-enter-from,
// .page-transition-leave-to {
//   opacity: 0.2;
// }

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  -webkit-transform: scale(1.1);
  transform: scale(1.1)
}
// slide-fade-enter-active slide-fade-enter-to
</style>