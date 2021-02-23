<template>
  <div class="charts">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line position="year*sales" />
      <v-point position="year*sales" shape="circle" />
    </v-chart>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'LineComponent',
  setup() {
    let data: any[] = []
    let scale: any[] = []
    onMounted(() => {
      data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
      ]

      scale = [{
        dataKey: 'sales',
        min: 0,
      }, {
        dataKey: 'year',
        min: 0,
        max: 1,
      }]
    })

    return {
      data,
      scale,
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
