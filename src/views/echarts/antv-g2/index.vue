<template>
  <a-row>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable :loading="data.loading">
        <BarComponent :data="data.list" />
      </a-card>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable>
        <a-spin size="large" :delay="300" :spinning="data.loading">
          <BarComponent v-if="data.list.length" :data="data.list" />
          <a-empty v-else />
        </a-spin>
      </a-card>
    </a-col>
    <!-- <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable>
        <LineComponent />
      </a-card>
    </a-col> -->
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import BarComponent from './bar.vue'
// import LineComponent from './line.vue'
import { getBar } from '@/api/list'
export default defineComponent({
  components: { BarComponent },
  setup() {
    const data = reactive({
      list: [],
      loading: false
    })
    const getBars = () => {
      data.loading = true
      getBar().then(res => {
        data.list = res.data.list
      })
      .catch(() => { data.list = [] })
      .finally(() => {
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
:deep(.ant-col) {
  width: 100%;
  display: inline-block;
  padding: 20px 20px 0 0;
  .ant-card {
    min-height: 200px;
  }
}
</style>
