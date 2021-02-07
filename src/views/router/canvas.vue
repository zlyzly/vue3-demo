<template>
  <div class="home">
    <canvas id="ball-canvas" class="ball-canvas">当前浏览器不支持canvas</canvas>
    <canvas ref="stockGraph" width="150" height="150">
      current stock price: $3.15 +0.15
    </canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { generateCanvas } from './component/canvas'
export default defineComponent({
  name: 'Canvas',
  components: {},
  setup() {
    const stockGraph = ref()
    const canvas = reactive({
      width: 100,
      height: 100,
      ctx: null
    })
    const initCanvas = () => {
      const [can, ctx] = generateCanvas({ w: canvas.width, h: canvas.height })
      console.log(can, ctx)
      // canvas.ctx.drawImage(can, 0, 0)
    }
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // stockGraph.value 是原生DOM对象
      stockGraph.value.style.background = 'pink'
      initCanvas()
    })
    
    return { stockGraph, canvas, initCanvas }
  }
})
</script>
