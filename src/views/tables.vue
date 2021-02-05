<template>
  <a-table :columns="columns" :data-source="data" bordered>
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
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'Tables',
  components: { },
  setup() {
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
    return { data, columns, onDelete }
  }
})
</script>
