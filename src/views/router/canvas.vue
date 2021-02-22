<template>
  <div class="home">
    <!-- <canvas id="ball-canvas" class="ball-canvas">当前浏览器不支持canvas</canvas> -->
    <canvas ref="stockGraph" width="150" height="150">
      当前浏览器不支持canvas
    </canvas>
    <!-- <canvas ref="stockGraphs" width="300" height="300"
      >当前浏览器不支持canvas</canvas
    > -->
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
    const stockGraphs = ref()
    interface Canvas {
      width: number;
      height: number;
      ctx: any;
    }
    const canvas: Canvas = reactive({
      width: 300,
      height: 300,
      ctx: null
    })
    const initCanvas = () => {
      const { can, ctx }: any = generateCanvas({ w: canvas.width, h: canvas.height })
      console.log(can, ctx)
      const ball = {
        ctx: ctx,
        can: can// 每个小球的canvas实例
      }
      const circle = new Path2D()
      circle.moveTo(125, 35)
      circle.arc(100, 35, 25, 0, 2 * Math.PI)
      ctx.fill(circle)

      // canvas.ctx.drawImage(can, 0, 0, ball.can.width, ball.can.height)
    }
    // 在 DOM 首次加载完毕之后，才能获取到元素的引用
    onMounted(() => {
      // 为 dom 元素设置字体颜色
      // stockGraph.value 是原生DOM对象
      stockGraph.value.style.background = 'pink'
      initCanvas()
    })
    const draw = () => {
      const { ctx }: any = generateCanvas({ w: canvas.width, h: canvas.height })
      ctx.fillStyle = "pink";
      ctx.strokeStyle = "blue";
      const rectangle = new Path2D();
      rectangle.rect(10, 10, 50, 50);

      const circle = new Path2D();
      circle.moveTo(125, 35);
      circle.arc(100, 35, 25, 0, 2 * Math.PI);

      ctx.stroke(rectangle);
      ctx.fill(circle);

      ctx.fillRect(125, 125, 100, 100);
      ctx.clearRect(145, 145, 60, 60);
      ctx.strokeRect(150, 150, 50, 50);
    }
    draw()
    return { stockGraph, stockGraphs, canvas, initCanvas, draw }
  }
})
</script>
