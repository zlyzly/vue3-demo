<template>
  <a-row>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <a-card hoverable>
        <a-spin size="large" :delay="300" :spinning="data.loading">
          <LineComponent v-if="data.list.length" :data="data.list" />
          <a-empty v-else />
        </a-spin>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LineComponent from './line.vue'
import { getLine } from '@/api/list'
export default defineComponent({
  components: { LineComponent },
  setup() {
    const data = reactive({
      list: [],
      loading: false
    })
    const getLines = () => {
      data.loading = true
      getLine().then(res => {
        data.list = res.data.list
        console.log(data.list)
      })
        .catch(() => { data.list = [] })
        .finally(() => {
          data.loading = false
        })
    }
    getLines()
    return {
      getLines,
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
  .ant-card {
    min-height: 200px;
  }
}
</style>
