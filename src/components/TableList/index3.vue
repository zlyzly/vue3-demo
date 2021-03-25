<template>
  <!-- :pagination="data.dataSource.length ? pagination : false" -->
  <!-- :show-total="(total) => `共 ${pagination.total} 条`" -->
  <a-table
    bordered
    :columns="columns"
    :loading="data.loading"
    :isNext="data.isNext"
    :data-source="data.dataSource"
    :row-key="(record) => record.id"
    :pagination="data.dataSource.length && !data.isNext ? pagination : false"
    @change="handleTableChange"
  >
    <template
      v-for="(colCustom, i) in data.columnsCustom"
      #[colCustom.customRender]="{ text, record }"
    >
      <slot
        :name="colCustom.customRender"
        :text="text"
        :tableRow="record"
        :list="data.dataSource"
        :index="i"
      />
    </template>
  </a-table>
  <div v-if="data.dataSource.length" id="components-pagination-demo">
    <!-- <a-pagination
      v-if="pagination && pagination.total"
      :current="pagination.current"
      :total="pagination.total"
      show-size-changer
      show-quick-jumper
      :show-total="(total) => `共 ${total} 条`"
      @showSizeChange="showSizeChange"
      @change="handleTableChange"
    /> -->
    <ul v-if="pagination && !pagination.total">
      <li
        class="ant-pagination-prev"
        :class="pagination.current <= 1 ? 'ant-pagination-disabled' : ''"
        @click="handleChange('prev')"
      >
        <a class="ant-pagination-item-link"
          ><span role="img" aria-label="left" class="anticon anticon-left"
            ><svg
              class=""
              data-icon="left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
              focusable="false"
            >
              <path
                d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
              ></path></svg></span
        ></a>
      </li>
      <li class="ant-pagination-item ant-pagination-item-active">
        <a>{{ pagination.current }}</a>
      </li>
      <li
        class="ant-pagination-next"
        :class="!data.isNext ? 'ant-pagination-disabled' : ''"
        @click="handleChange('next')"
      >
        <a class="ant-pagination-item-link"
          ><span role="img" aria-label="left" class="anticon anticon-left"
            ><svg
              class=""
              data-icon="right"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="64 64 896 896"
              focusable="false"
            >
              <path
                d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"
              ></path></svg></span
        ></a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface'
import { usePagination } from 'vue-request'
import { computed, defineComponent, reactive } from 'vue'

type Pagination = TableState['pagination']

type APIParams = {
  pos: number;
  limit: number | 10;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
}

export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    dataIndex: {
      type: String,
      default: 'key'
    },
    searchParams: {
      type: Object,
      default: () => ({})
    },
    isNext: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    console.log(props, context)
    const { onLoadTable }: any = context.attrs
    const data = reactive({
      loading: false,
      dataSource: [],
      isNext: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      columnsCustom: computed(() => {
        return props.columns.filter((item: any) => {
          item.slots
        }).map((item: any) => item.slots)
      })
    })
    const queryData = (params: APIParams) => {
      data.loading = true
      // console.log(params, 'props.searchParams', props.searchParams)
      return onLoadTable({ ...props.searchParams, ...params, pos: (params.pos - 1) * params.limit | 0 }).then((res: any) => {
        console.log(res)
        data.dataSource = res.data.list
        data.pagination.total = res.data.total || 0
        // data.pagination.total = 0
        data.isNext = res.data.isNext || false
        data.loading = false
      }).catch((err) => {
        console.log(err)
        // if (!err.message || err.message.name !== 'cancel_token') {}
        data.loading = false
      })
    }

    const { run, current, pageSize } = usePagination(queryData, {
      formatResult: () => {
        return data.dataSource
      },
      pagination: {
        currentKey: 'pos',
        pageSizeKey: 'limit'
      }
    })

    const pagination = computed(() => ({
      current: current.value,
      pageSize: pageSize.value,
      total: data.pagination.total,
      showQuickJumper: true,
      showSizeChanger: true,
      showLessItems: true
    }))
    const handleTableChange = (pag: Pagination, filters: TableStateFilters, sorter: any) => {
      console.log(pag, filters, sorter)
      run({
        pos: pag?.current as number,
        limit: pag?.pageSize as number,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    }
    const search = (params: any) => {
      if (params) {
        current.value = 1
      }
      queryData({ pos: current.value, limit: pageSize.value, ...params })
    }
    const handleChange = (type: string) => {
      if (data.loading) return
      if (type === 'next') {
        if (data.isNext) {
          current.value += 1
        } else return
      } else {
        if (current.value > 1) {
          current.value -= 1
        } else return
      }
      queryData({ pos: current.value, limit: pageSize.value })
    }
    return {
      data,
      queryData,
      pagination,
      handleTableChange,
      search,
      handleChange
    }
  }
})
</script>
<style lang="less">
table {
  margin: 20px 0;
}
th,
td {
  vertical-align: center;
}

#components-pagination-demo {
  float: right;
  right: 0;
}
</style>