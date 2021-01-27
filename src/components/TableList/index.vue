<template>
  <div>
    <a-table
      bordered
      showTotal
      hideOnSinglePage
      :loading="loading"
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      :rowKey="(row) => `$${row[dataIndex]}`"
      @change="handleTableChange"
    >
      <template
        v-for="(colCustom, i) in columnsCustom"
        #[colCustom.customRender]="{ text, record }"
      >
        <slot
          :name="colCustom.customRender"
          :text="text"
          :tableRow="record"
          :list="dataList"
          :index="i"
        />
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'TableList',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: []
    },
    list: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object || Boolean,
      default: false
    },
    dataIndex: {
      type: String,
      default: 'key'
    }
  },
  emits: ['change'],
  setup(props, context) {
    const data = reactive({
      dataList: computed(() => props.list),
      columns: props.columns,
      pagination: !props.pagination ? false : {
        defaultPageSize: computed(() => props.pagination.pageSize) || 30,
        pageSizeOptions: ['10', '30', '50'],
        current: computed(() => props.pagination.current),
        total: computed(() => props.pagination.total),
        showQuickJumper: true,
        showSizeChanger: true
      },
      columnsCustom: computed(() => {
        return props.columns.filter((item: any) => {
          return item.slots
        }).map((item: any)=> item.slots)
      })
    })
    console.log(data.columnsCustom)
    // , filters, sorter, { currentDataSource }
    const handleTableChange = (pagination) => {
      // console.log('page', pagination)
      data.pagination = pagination
      const maxPage = Math.floor(pagination.total / pagination.pageSize)
      if (pagination.current <= maxPage) context.emit('change', pagination)
      else return
    }
    console.log(data.pagination)
    return { ...toRefs(data), handleTableChange }
  }
})
</script>
<style>
/* th.column-money,
td.column-money {
  text-align: right !important;
} */
th, td {
  vertical-align: center !important;
}
</style>