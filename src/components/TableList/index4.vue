<template>
  <a-table
    bordered
    showTotal
    hideOnSinglePage
    :loading="loading"
    :columns="columns"
    :data-source="tableList"
    :row-selection="filterMultiple? rowSelection: null"
    :pagination="tableList.length? pagination: false"
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
        :list="tableList"
        :index="i"
      />
    </template>
  </a-table>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'

type Key = ColumnProps['key']
interface DataType {
  key: Key;
  name: string;
  age: number;
  address: string;
}

export default defineComponent({
  name: 'TableList',
  props: {
    columns: {
      type: Array,
      default: (() => [])
    },
    dataIndex: {
      type: String,
      default: 'key'
    },
    searchParams: {
      type: Object,
      default: () => ({})
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    filterMultiple: {
      type: Boolean,
      default: false
    },
    sorts: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['change', 'selectedRows'],
  setup(props, context) {
    // console.log(context.attrs)
    const { onLoadTable }: any = context.attrs
    const data = reactive({
      loading: false,
      tableList: [],
      columns: props.columns,
      selectedRowKeys: [],
      pagination: {
        pageSize: props.pageSize || 10,
        pageSizeOptions: ['10', '30', '50'],
        current: 1,
        total: 0,
        sorter: props.sorts || {},
        showQuickJumper: true,
        showSizeChanger: true
      },
      columnsCustom: computed(() => {
        return props.columns.filter((item: any) => {
          return item.slots
        }).map((item: any) => item.slots)
      })
    })
    
    const queryData = () => {
      data.loading = true
      // console.log('pagination', data.pagination)
      // console.log(props.sorts, props.sorts[data.pagination.sorter.field])
      const param: any = {
        pos: (data.pagination.current - 1) * data.pagination.pageSize,
        limit: data.pagination.pageSize,
        ...props.searchParams,
      }
      const key = props.sorts[data.pagination.sorter.field]
      if (data.pagination.sorter.field) {
        param[key] = data.pagination.sorter.order === 'ascend'? 1: 0
      }
      // console.log('searchParams', param)
      return onLoadTable(param).then((res: any) => {
        data.tableList = res.data.list
        data.pagination.total = res.data.total || 0
        data.loading = false
      }).catch((err: any) => {
        console.log(err)
        data.loading = false
      })
    }

    const handleTableChange = (pagination: any, filters: unknown, sorter: any ) => {
      // console.log('page------', pagination, filters, 'sorter', sorter, currentDataSource)
      data.pagination.current = pagination.current
      data.pagination.pageSize = pagination.pageSize
      data.pagination.sorter = sorter
      queryData()
    }

    const search = () => {
      data.pagination.current = 1
      queryData()
    }

    const rowSelection = {
      // selectedRowKeys: Key[], selectedRows: DataType[]
      onChange: (selectedRowKeys: Key[], selectedRows: DataType[]) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        data.selectedRowKeys = selectedRows as []
        context.emit('selectedRows', selectedRows)
      },
      getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      })
    }

    const actionTable = (rows: any, key: string) => {
      if (rows.length === data.tableList.length) {
        data.tableList = []
      } else {
        data.tableList = data.tableList.filter(item => !rows.includes(item[key]))
      }
      data.pagination.total -= data.tableList.length
      if (data.tableList.length === 0 && data.pagination.current > 1) {
        data.pagination.current -= 1
        queryData()
      }
    }
    return { ...toRefs(data), handleTableChange, queryData, search, rowSelection, actionTable }
  }
})
</script>
<style>
th,
td {
  vertical-align: center !important;
}
</style>