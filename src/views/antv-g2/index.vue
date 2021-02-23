<template>
  <a-row>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable :loading="data.loading">
        <!-- <a-spin v-if="data.loading" /> -->
        <BarComponent :data="data.list" />
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable>
        <LineComponent />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BarComponent from './bar.vue'
import LineComponent from './line.vue'
import { getBar } from '@/api/list'
export default defineComponent({
  components: { BarComponent, LineComponent },
  setup() {
    const data = reactive({
      list: [],
      loading: true
    })
    const getBars = () => {
      getBar().then(res => {
        data.list = res.data.list
        data.loading = false
      })
    }
    getBars()
    return {
      getBars,
      data
    }
  }
})
</script>
<style lang="less" scoped>
/deep/ .ant-col {
  width: 100%;
  display: inline-block;
  padding: 20px 20px 0 0;
}
</style>
