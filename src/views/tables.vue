<template>
<!-- :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
  <a-table :columns="columns" :data-source="data" bordered :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onChange }">
    <!-- 插槽解构 -->
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="data.length"
        title="Sure to delete?"
        @confirm="onDelete(record.key)"
      >
        <a>Delete</a>
      </a-popconfirm>
    </template>
  </a-table>
  <a-pagination
    simple
    v-model:current="current"
    :total="50"
    :show-total="(total) => `Total ${total} items`"
    :page-size="10"
  />
  <a-button type="primary" @click="selectd">全选</a-button>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, getCurrentInstance, ref, reactive, toRefs } from 'vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'

type Key = ColumnProps['key']
interface DataType {
  key: Key;
  name: string;
  age: number;
  address: string;
}
export default defineComponent({
  name: 'Tables',
  components: {},
  setup() {
    const current = ref<number>(2);
    const ctx = getCurrentInstance()
    // const message = inject('$message')
    console.log(ctx, inject('$message'))
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        slots: { customRender: 'name' }
      },
      {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money'
      },
      {
        title: 'Address',
        dataIndex: 'address'
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
      }
    ]
    const data = [
      {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park'
      }
    ]

    let message: any = {}
    onMounted(() => {
      //  as object
      message = inject('$message')
    })
    const onDelete = () => {
      message.success('删除成功')
    }
    const state = reactive({
      selectedRowKeys: [] as any,
      selectedRows: []
    })


    const selectd = () => {
      console.log(state.selectedRows, data)
      const arr: string[] = []
      data.forEach((ele: any) => {
        return arr.push(ele.key)
      })
      state.selectedRowKeys = arr as []
      console.log(state.selectedRowKeys)
    }
     const onChange = (selectedRowKeys: Key[], selectedRows: DataType[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
      state.selectedRowKeys = selectedRows as []
    }

    return { data, ...toRefs(state), columns, onDelete, current, selectd, onChange }
  }
})
</script>
