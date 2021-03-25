<template>
  <div class="home">
    <a-form layout="inline" :model="formState" @finish="serach">
      <a-form-item>
        <a-input v-model:value="formState.id" placeholder="id" />
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.name" placeholder="name" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 查询 </a-button>
      </a-form-item>
    </a-form>
    <table-lists
      this-index="id"
      :loading="loading"
      :columns="columns"
      :list="list"
      :pagination="pagination"
      @change="handleTableChange"
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
    </table-lists>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TableLists from '../components/TableList/index1.vue'
import { getListll } from '../api/list'
import { mapGetters } from 'vuex'
import store from '../store'
// 对于纯展示的大数据，都可以使用Object.freeze提升性能
const columns = Object.freeze([
  {
    title: 'id',
    thisIndex: 'id',
    key: 'id',
    align: 'center',
    width: '30%'
  },
  {
    title: '名称',
    thisIndex: 'name',
    key: 'name',
    align: 'center',
    slots: { customRender: 'name' }
  },
  {
    title: '头像',
    thisIndex: 'avatar',
    key: 'avatar',
    align: 'center',
    slots: { customRender: 'avatar' }
  },
  {
    title: '操作',
    thisIndex: 'action',
    key: 'action',
    align: 'center',
    width: 60,
    slots: { customRender: 'action' }
  }
])

export default defineComponent({
  name: 'Hello',
  components: {
    TableLists,
  },
  data() {
    return {
      realParams: {
        pos: 0,
        limit: 10,
        name: '',
        id: ''
      },
      loading: false,
      columns: columns,
      list: [],
      // pagination: false
      pagination: {
        current: 1,
        pageSize: 3,
        total: 0,
        isNext: false
      },
      formState: {
        name: '',
        id: ''
      }
    }
  },
  computed: {
    ...mapGetters(['historyParams'])
  },
  created() {
    console.log('historyParams', this.historyParams)
    this.getlist()
  },
  beforeRouteLeave(to, from: any, next) {
    store.dispatch('history/ChangeParams', { name: 'Table/' + from.name, history: { current: 1 } }).then(() => {
      next()
    })
  },
  methods: {
    async getlist() {
      this.loading = true
      const params = {
        pos: (this.pagination.current - 1) * this.pagination.pageSize,
        limit: this.pagination.pageSize,
        name: this.formState.name,
        id: this.formState.id
      }
      const realParams = { ...params }
      console.log('realParams', realParams)
      await getListll(realParams).then(res => {
        this.list = res.data.list
        // this.pagination.total = res.this.total || 0
        // this.pagination.isNext = res.this.isNext || false
        this.pagination.total = 0
        if (this.pagination.current === 3) {
          this.pagination.isNext = false
        } else this.pagination.isNext = true
      }).catch((err) => {
        console.log(err)
      }).finally(() => this.loading = false)
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getlist()
    },
    handleDel(row) {
      if (this.pagination.total) {
        this.list = this.list.filter((ele: { id: string }) => !(ele.id === row))
        this.pagination.total -= 1
        if (this.list.length === 0) {
          const maxPage = Math.ceil(this.pagination.total / this.pagination.pageSize)
          if (this.pagination.current >= maxPage) {
            this.pagination.current = Math.max(maxPage, 1)
          }
          this.getlist()
        }
      } else {
        this.list = this.list.filter((ele: { id: string }) => !(ele.id === row))
        if (this.list.length === 0) {
          if (this.pagination.current > 1) {
            this.pagination.current--
          } else this.pagination.current = 1
          this.getlist()
        }
      }
    },
    serach() {
      this.pagination.current = 1
      this.getlist()
    }
  },
  setup(props, { attrs, slots, emit }) {
    console.log('setup props:', props, attrs, slots, emit)

    return {}
  }
})
</script>
