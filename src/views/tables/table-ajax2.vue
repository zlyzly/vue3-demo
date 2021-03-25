<template>
<!-- :row-key="record => record.login.uuid" -->
  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #name="{ text }">
      <a href="/config/history">{{ text }}</a>
    </template>
    <template #avatar="{ text }">
      <a-avatar :src="text" :size="30" />
    </template>
  </a-table>

  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    :filterMultiple="true"
    @change="handleTableChange"
  >
    <template #name="{ text }">
      <a href="/config/history">{{ text }}</a>
    </template>
    <template #avatar="{ text }">
      <a-avatar :src="text" :size="30" />
    </template>
  </a-table>
</template>
<script lang="ts">
import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface'
import { usePagination } from 'vue-request'
// import axios from 'axios'
import { computed, defineComponent, reactive } from 'vue'
import { getListll } from '../../api/list'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    slots: { customRender: 'name' },
  },
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true,
    width: '20%',
    slots: { customRender: 'id' },
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    sorter: true,
    width: '20%',
    slots: { customRender: 'avatar' },
  },
  // {
  //   title: 'Gender',
  //   dataIndex: 'gender',
  //   filters: [
  //     { text: 'Male', value: 'male' },
  //     { text: 'Female', value: 'female' },
  //   ],
  //   width: '20%',
  // },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  // },
]

type Pagination = TableState['pagination']

type APIParams = {
  pos: number;
  limit: number | 5;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
}
const data: any = reactive({
  list: [],
  total: 0
})
const queryData = async (params: APIParams) => {
  console.log(params)
  // return axios.get<APIResult>('https://randomuser.me/api', { params: params });
  await getListll(params).then(res => {
    console.log(res)
    data.list = res.data.list
    data.total = res.data.total
  }).catch(err => console.log(err))
}

export default defineComponent({
  setup() {
    const { data: dataSource, run, loading, current, pageSize } = usePagination(queryData, {
      formatResult: res => {
        console.log(res)
        return data.list
      },
      pagination: {
        currentKey: 'pos',
        pageSizeKey: 'limit'
      }
    })

    const pagination = computed(() => ({
      total: data.total,
      current: current.value,
      pageSize: pageSize.value
    }))

    const handleTableChange = (pag: Pagination, filters: TableStateFilters, sorter: any) => {
      console.log(pag, filters, sorter)
      run({
        pos: pag?.current as number,
        limit: pag?.pageSize!,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    }

    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange
    }
  }
})
</script>