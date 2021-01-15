<template>
  <a-table
    bordered
    :columns="columns"
    :data-source="list"
    :pagination="pagination"
    :rowKey="(row) => row[dataIndex]"
    @change="handleTableChange"
  >
    <!-- <template #name="{ text }">
      <a>{{ text }}</a>
    </template> -->
    <template #avatar="{ text }">
      <a-avatar :src="text" />
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, toRaw } from 'vue'
export default defineComponent({
  name: 'TableList',
  props: {
    columns: {
      type: Object,
      default: []
    },
    list: {
      type: Object,
      default: []
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    dataIndex: {
      type: String,
      default: 'key'
    },
    pageSize: {
      type: Number,
      default: () => 1
    }
  },
  setup(props) {
    const paginations = {
      defaultPageSize: 1,
      pageSizeOptions: ['10', '30', '50', '90'],
      current: 1,
      showQuickJumper: true,
      showSizeChanger: true
    }
    const { pagination } = toRaw(props)
    const handleTableChange = async (page: number) => {
      // console.log('page', page)
      pagination.current = page
    }
    return { paginations, handleTableChange }
  }
})
</script>
<style>
/* th.column-money,
td.column-money {
  text-align: right !important;
} */
</style>