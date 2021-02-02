<template>
  <div>
    <h3>#表格组件使用</h3>
    <br />
    <!-- 在组件上使用 v-model -->
    <table-list
      data-index="id"
      :loading="loading"
      :columns="columns"
      :list="list"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #avatar="{ tableRow }">
        <a-avatar :src="tableRow.avatar" />
      </template>
      <template #action="scope">
        <a-button type="link" @click="handleDel(scope.tableRow.id)"
          >删除</a-button
        >
      </template>
    </table-list>
    <tables />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, inject, onMounted } from 'vue'
import TableList from '../components/TableList/index.vue'
import { getLists } from '../api/list'

import Tables from './tables.vue'
export default defineComponent({
  components: {
    TableList,
    Tables
  },
  setup() {
    console.log(inject('$message'))
    const columns = Object.freeze([
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: '37%'
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        slots: { customRender: 'name' }
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'center',
        slots: { customRender: 'avatar' }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 60,
        slots: { customRender: 'action' }
      }
    ])
    const data = reactive({
      columns: columns,
      list: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    })
    const params: object = reactive({
      pos: computed(() => (data.pagination.current - 1) * data.pagination.pageSize),
      limit: computed(() => data.pagination.pageSize)
    })
    console.log({ ...toRefs(params) })
    let messages: any = {}
    // 必须在这里给message赋值否则调不到方法 ?
    onMounted(() => {
      messages = inject('$message')
    })
    const getlist = async () => {
      data.loading = true
      await getLists(params).then(res => {
        console.log(res)
        data.loading = false
        data.list = res.data.list
        data.pagination.total = res.data.total
      }).catch(() => {
        messages.error('请求失败')
        data.loading = false
      })
    }
    getlist()
    const handleTableChange = (pagination) => {
      console.log(pagination)
      data.pagination = pagination
      getlist()
    }
    const handleDel = (val) => {
      console.log(val)
      console.log('删除')
    }
    return { ...toRefs(data), getlist, handleTableChange, params, messages, handleDel }
  }
})
</script>
<style lang="less" scoped>
div {
  margin: 10px 0;
}
</style>
