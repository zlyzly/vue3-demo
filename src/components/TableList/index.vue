<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TableList',
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        slots: { customRender: 'name' },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 80,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true,
      },
    ]

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park, London No. 2 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ]
    return {
      data,
      columns
    }
  }
})
</script>
<style>
/* th.column-money,
td.column-money {
  text-align: right !important;
} */
</style>