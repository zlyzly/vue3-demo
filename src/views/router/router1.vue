<template>
  <div class="home">
    <strong
      ><p>路由query: {{ query }}</p></strong
    >
    <a-button type="primary" @click="openModal">添加数据</a-button>
    <table-list
      data-index="id"
      :loading="loading"
      :columns="columns"
      :list="list"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #type="{ text }">
        <a-tag color="#2db7f5" v-for="tag in text.split(',')" :key="tag">{{
          types[tag - 1]
        }}</a-tag>
      </template>
      <template #action="scope">
        <a-button type="link" @click="handleEdit(scope.tableRow)"
          >编辑</a-button
        >
      </template>
    </table-list>
    <ModalComponent
      :title="data.title"
      :visible="data.visible"
      :info="info"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ModalComponent from './component/modal.vue'
import TableList from '@/components/TableList/index.vue'
import { getListB } from '@/api/list'
export default defineComponent({
  name: 'Router',
  components: { ModalComponent, TableList },
  setup() {
    interface Info {
      id?: string;
      name: string;
      region: string;
      type: Array<string>;
    }
    const types = ['Online', 'Promotion', 'Offline']
    const query = useRoute().query
    const data = reactive({
      title: '添加',
      visible: false,
      confirmLoading: false,
    })
    const info: Info = reactive({
      id: '',
      name: '',
      region: '',
      type: []
    })

    const columns = Object.freeze([
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '地区',
        dataIndex: 'region',
        key: 'region',
        align: 'center'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: '30%',
        slots: { customRender: 'type' }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 100,
        slots: { customRender: 'action' }
      }
    ])
    const params = reactive({
      columns: columns,
      list: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 5,
        total: 0
      }
    })
    const obj: object = reactive({
      pos: computed(() => (params.pagination.current - 1) * params.pagination.pageSize),
      limit: computed(() => params.pagination.pageSize)
    })
    const getList = async () => {
      params.loading = true
      await getListB(obj).then(res => {
        params.loading = false
        params.list = res.data.list
        params.pagination.total = res.data.total
      }).catch((err) => {
        console.log(err)
      })
    }
    getList()
    console.log(getList())
    const handleTableChange = (page) => {
      console.log(page)
      params.pagination.current = page
      getList()
    }
    const id = ref('')
    const handleEdit = (row) => {
      console.log(row)
      data.visible = true
      data.title = '编辑'
      id.value = row.id
      // info = Object.assign({}, row)
      info.id = row.id
      info.name = row.name
      info.region = row.region
      info.type = row.type.split(',')
    }
    const openModal = () => {
      data.visible = true
    }
    const handleOk = (value) => {
      console.log(value)
      data.confirmLoading = true
      setTimeout(() => {
        if (data.title === '添加') {
          console.log(params.list)
          // params.list[0].id = ''
          // params.list[0].name = value.name
          // params.list[0].region = value.region
          // params.list[0].type = value.type.join()
        } else {
          // const index = params.list.findIndex(() => id.value === value.id)
          const row: any = params.list.find(() => id.value === value.id)
          row.name = value.name
          row.region = value.region
          row.type = value.type.join()
          // params.list[index].name = value.name
          // params.list[index].region = value.region
          // params.list[index].type = value.type.join()
        }
        data.confirmLoading = false
        data.visible = false
      }, 1000)
    }
    const handleCancel = () => {
      data.visible = false
    }
    return { data, info, types, query, openModal, handleOk, handleCancel, ...toRefs(params), getList, handleTableChange, handleEdit }
  }
})
</script>
<style lang="less" scoped>
.ant-table-wrapper {
  margin-top: 20px;
}
</style>
