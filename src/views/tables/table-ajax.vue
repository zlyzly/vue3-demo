<template>
  <div class="home">
    <a-form layout="inline" :model="data.formState">
      <a-form-item>
        <a-input v-model:value="data.formState.id" placeholder="id" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="data.formState.name" placeholder="name" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="serach">
          查询
        </a-button>
      </a-form-item>
    </a-form>
    <table-list
      ref="table"
      dataIndex="id"
      :columns="data.columns"
      :searchParams="data.formState"
      @loadTable="loadTable"
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
        <a-button type="link" @click="handleDel(scope.tableRow.id)"
          >删除</a-button
        >
      </template>
    </table-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { mapGetters } from 'vuex'
import TableList from '@c/TableList/index3.vue'
import { getListll } from '@/api/list'
const columns = Object.freeze([
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
    width: '20%',
    slots: { customRender: 'name' }
  },
  {
    title: 'Id',
    dataIndex: 'id',
    // sorter: true,
    width: '20%',
    slots: { customRender: 'id' },
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    // sorter: true,
    width: '20%',
    slots: { customRender: 'avatar' },
  }
])
export default defineComponent({
  name: 'Hello',
  components: { TableList },
  computed: {
    ...mapGetters(['historyParams'])
  },
  created() {
    console.log('this.$store.getters', this.historyParams)
  },
  setup() {
    const table = ref()
    const data = reactive({
      columns: columns,
      formState: {
        id: '',
        name: ''
      }
    })
    const loadTable = (params) => {
      // console.log('params', params)
      return getListll(params)
    }
    const serach = () => {
      table.value.search({ ...data.formState })
    }
    return { data, loadTable, table, serach }
  },
  // methods: {
    // serach() {
    //   this.$refs.table.search({ ...this.data.formState })
    // }
  // }
})
</script>
