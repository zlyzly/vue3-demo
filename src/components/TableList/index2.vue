<template>
  <a-table
    bordered
    showTotal
    hideOnSinglePage
    :loading="loading"
    :columns="columns"
    :data-source="list"
    :pagination="false"
    :rowKey="(row) => `$${row[dataIndex]}`"
  >
    <template
      v-for="(colCustom, i) in data.columnsCustom"
      #[colCustom.customRender]="{ text, record }"
    >
      <slot
        :name="colCustom.customRender"
        :text="text"
        :tableRow="record"
        :list="list"
        :index="i"
      />
    </template>
  </a-table>
  <div v-if="list.length" id="components-pagination-demo">
    <a-pagination
      v-if="pagination && pagination.total"
      :current="pagination.current"
      :total="pagination.total"
      show-size-changer
      show-quick-jumper
      :show-total="(total) => `共 ${total} 条`"
      @change="onChange"
      @showSizeChange="showSizeChange"
    />
    <ul v-if="pagination && !pagination.total">
      <li
        class="ant-pagination-prev"
        :class="data.current <= 1 ? 'ant-pagination-disabled' : ''"
        @click="handleTableChange('prev')"
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
        <a>{{ data.current }}</a>
      </li>
      <li
        class="ant-pagination-next"
        :class="!pagination.isNext ? 'ant-pagination-disabled' : ''"
        @click="handleTableChange('next')"
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
import { defineComponent, reactive, computed } from 'vue'
export default defineComponent({
  name: 'TableList',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: (() => [])
    },
    list: {
      type: Array,
      default: (() => [])
    },
    pagination: {
      type: Object || Boolean,
      default: false
    },
    dataIndex: {
      type: String,
      default: 'key'
    }
  },
  emits: ['change'],
  setup(props, context) {
    console.log(props, context, props.pagination.current)
    const data = reactive({
      columnsCustom: computed(() => {
        return props.columns.filter((item: any) => {
          return item.slots
        }).map((item: any) => item.slots)
      }),
      current: computed(() => props.pagination.current)
    })
    // console.log(data.columnsCustom)
    const onChange = (current: number, pageSize: number) => {
      context.emit('change', { current, pageSize })
    }
    const showSizeChange = (current: number, pageSize: number) => {
      current = 1
      context.emit('change', { current, pageSize })
    }
    const handleTableChange = (type: string) => {
      console.log(props.pagination.current, data.current)
      if (props.loading) return
      if (type === 'next') {
        if (props.pagination.isNext) {
          data.current++
        } else return
      } else {
        if (data.current > 1) {
          data.current--
        } else return
      }
      context.emit('change', { current: data.current, pageSize: props.pagination.pageSize })
    }
    return { data, handleTableChange, onChange, showSizeChange }
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