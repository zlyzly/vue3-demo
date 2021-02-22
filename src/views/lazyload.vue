<template>
  <div class="margin" />
  <img src="../assets/gril.jpg" width="100" />
  <img v-lazy="img.src" />
  <img
    v-lazy="{ src: lazyOptions.src, lifecycle: lazyOptions.lifecycle }"
    alt="Vue logo"
    class="image"
    width="100"
  />
  <lazy-component @show="handler">
    <img class="mini-cover" :src="img.src" width="200" height="200" />
  </lazy-component>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const lazyOptions = reactive({
      src: '../assets/gril.jpg',
      lifecycle: {
        loading: () => {
          console.log('image loading')
        },
        error: () => {
          console.log('image error')
        },
        loaded: () => {
          lazyOptions.src = 'https://cdn-image.onemicroworld.com/44FAA911-2EEF-B9CD-7375-4E207A7FF204?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=gaqYz5Dvf6lyM8An%2BeAGIQpdhKg%3D&iopcmd=thumbnail&type=8&width=200&height=200'
          console.log('image loaded')
        }
      }
    })
    const img = reactive({
      src: 'https://cdn-image.onemicroworld.com/44FAA911-2EEF-B9CD-7375-4E207A7FF204?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=gaqYz5Dvf6lyM8An%2BeAGIQpdhKg%3D&iopcmd=thumbnail&type=8&width=200&height=200'
    })
    const handler = (component) => {
      console.log('this component is showing', component)
    }
    return {
      lazyOptions,
      img,
      handler
    }
  }
})
</script>
<style lang="less" scoped>
.margin {
  margin-top: 800px;
}
.image[lazy="loading"] {
  background: goldenrod;
}
.image[lazy="error"] {
  background: red;
}
.image[lazy="loaded"] {
  background: green;
}
</style>
