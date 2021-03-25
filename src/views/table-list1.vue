<template>
  <div>
    <a-form layout="inline" :model="data.formState" @finish="serach">
      <a-form-item>
        <a-input v-model:value="data.formState.id" placeholder="id" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="data.formState.name" placeholder="name" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 查询 </a-button>
      </a-form-item>
    </a-form>
    <table-list
      data-index="id"
      :loading="data.loading"
      :columns="data.columns"
      :list="data.list"
      :pagination="data.pagination"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, inject, onMounted, createVNode } from 'vue'
import TableList from '../components/TableList/index2.vue'
import { getLists } from '../api/list'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    TableList
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
      // pagination: false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        isNext: false
      },
      formState: {
        name: '',
        id: ''
      }
    })
    const params: object = reactive({
      pos: computed(() => (data.pagination.current - 1) * data.pagination.pageSize),
      limit: computed(() => data.pagination.pageSize),
      name: computed(() => data.formState.name),
      id: computed(() => data.formState.id)
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
        data.list = res.data.list
        // data.pagination.total = res.data.total || 0
        // data.pagination.isNext = res.data.isNext || false

        data.pagination.total = 0
        if (data.pagination.current === 3) {
          data.pagination.isNext = false
        } else data.pagination.isNext = true
      }).catch(() => {
        messages.error('请求失败')
      }).finally(() => data.loading = false)
    }
    const serach = () => {
      data.pagination.current = 1
      getlist()
    }
    const handleTableChange = (pagination) => {
      data.pagination.current = pagination.current
      data.pagination.pageSize = pagination.pageSize
      getlist()
    }
    const handleDel = (val) => {
      console.log(val)
      const modal = Modal
      modal.confirm({
        title: '删除提示',
        content: `确认删除${val}吗？`,
        icon: createVNode(ExclamationCircleOutlined),
        cancelText: 'Cancel',
        okText: 'Confirm',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {
          modal.destroyAll()
        }
      })
    }
    serach()
    return { data, getlist, handleTableChange, params, messages, handleDel, serach }
  }
})
</script>
<style lang="less" scoped>
div {
  margin: 10px 0;
}
</style>
