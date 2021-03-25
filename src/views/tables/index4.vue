<template>
   <div class="home">
    <a-form layout="inline" :model="formState">
      <a-form-item>
        <a-input v-model:value="formState.id" placeholder="id" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.name" placeholder="name" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="handleSerach">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <table-list
      ref="table"
      dataIndex="id"
      :columns="columns"
      :searchParams="formState"
      :filterMultiple="filterMultiple"
      :sorts="{ 'name': 'name_type', 'id': 'id_type' }"
      @loadTable="loadTable"
      @selectedRows="selectedRows"
    >
      <template #name="{ text }">
        <a href="/config/table">{{ text }}</a>
      </template>
      <template #avatar="{ tableRow }">
        <a-popover placement="top">
          <template #content>
            <a-avatar :src="tableRow.avatar" :size="200" />
          </template>
          <a-avatar :src="tableRow.avatar" />
        </a-popover>
      </template>
      <template #action="scope">
        <a-button type="link" @click="handleDel('one', scope.tableRow.id)"
          >删除</a-button
        >
      </template>
    </table-list>
    <div>
      <a-button type="link" @click="handleDel('all')">全部删除</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs, ref } from 'vue'
import TableList from '@c/TableList/index4.vue'
import { getListll } from '@/api/list'

const pos = ref(0)
const columns = Object.freeze([
  {
    title: '序号',
    align: 'center',
    dataIndex: 'num',
    customRender: ({ text, index }: any) => index + 1 + pos.value
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
    sorter: true,
    slots: { customRender: 'name' }
  },
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true,
    align: 'center'
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    align: 'center',
    slots: { customRender: 'avatar' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    align: 'center',
    slots: { customRender: 'action' }
  }
])

export default defineComponent({
  components: { TableList },
  setup() {
    const current = getCurrentInstance() as any
    const data = reactive({
      columns: columns,
      selectedRow: [], // 多选
      sorter: {},
      filterMultiple: true,
      formState: {
        id: '',
        name: ''
      }
    })
    const loadTable = (params: any) => {
      pos.value = params.pos
      return getListll({ ...params }).then(res => res).catch(err => {
        console.error('err:', err)
      })
    }
    const handleSerach = () => {
      current.ctx.$nextTick(() => {
        current.ctx.$refs.table.search()
      })
    }

    const selectedRows = (rows: any) => {
      data.selectedRow = rows.map((ele: any) => ele.id)
    }
    
    const handleDel = (type: string, id: string) => {
      let arr: any = []
      if (type === 'all') {
        // 单个删除操作
        arr = data.selectedRow
      } else arr = [id]
      // 请求操作
      current.ctx.$refs.table.actionTable(arr, 'id')
    }

    handleSerach()

    return { ...toRefs(data), loadTable, handleSerach, selectedRows, handleDel }
  }
})
</script>
