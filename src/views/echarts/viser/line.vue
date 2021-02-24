<template>
  暂未适配vue3 报错 createElement is not a function
  <!-- <div class="charts">
    <v-chart :forceFit="true" :height="height" :data="datas.dv" :scale="scale">
      <v-tooltip :showTitle="false" data-key="item*percent" />
      <v-axis />
      <v-legend data-key="item" />
      <v-pie
        position="percent"
        color="item"
        :vStyle="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
    </v-chart>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, computed, watch } from 'vue'
import DataSet from '@antv/data-set'

export default defineComponent({
  name: 'LineComponent',
  props: {
    data: {
      type: Array,
      defalut: (() => [])
    }
  },
  setup(props) {
    // const datas: any = reactive({
    //   list: computed(() => props.data)
    // })
    const sourceData = [
      { item: "学习", count: 40 },
      { item: "听歌", count: 21 },
      { item: "锻炼", count: 17 },
      { item: "游戏", count: 13 },
      { item: "发呆", count: 9 }
    ]
    const scale = [
      {
        dataKey: 'percent',
        min: 0,
        formatter: '.0%'
      }
    ]
    const pieStyle = {
      stroke: '#fff',
      lineWidth: 1
    }
    const labelConfig = [
      'percent',
      {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        }
      }
    ]
    const datas = reactive({
      dv: {}
    })
    onMounted(() => {
      console.log(sourceData)
      const dv = new DataSet.View().source(sourceData)
      console.log(dv)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      datas.dv = dv.rows
    })
    watch([props.data], (newV) => {
      console.log(newV)
    })
    return {
      datas,
      scale,
      pieStyle,
      labelConfig,
      height: 500
    }
  }
})
</script>
<style lang="less" scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
