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
        :class="pagination.current <= 1 ? 'ant-pagination-disabled' : ''"
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
        <a>{{ current }}</a>
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
  name: 'TableLists',
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
  data() {
    return {
      current: 1
    }
  },
  created() {
    console.log(this.pagination, this.columns, this.list, this.loading)
  },
  setup(props) {
    const data = reactive({
      columnsCustom: computed(() => {
        return props.columns.filter((item: any) => {
          return item.slots
        }).map((item: any) => item.slots)
      })
    })
    return { data }
  },
  methods: {
    onChange(current: number, pageSize: number) {
      this.$emit('change', { current, pageSize })
    },
    showSizeChange(current: number, pageSize: number) {
      current = 1
      this.$emit('change', { current, pageSize })
    },
    handleTableChange(type) {
      if (this.loading) return
      if (type === 'next') {
        if (this.pagination.isNext) {
          this.current++
        } else return
      } else {
        if (this.current > 1) {
          this.current--
        } else return
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.pagination.current = this.current
      this.$emit('change', { current: this.pagination.current, pageSize: this.pagination.pageSize })
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

// .ant-pagination-item {
//   margin-left: 8px;
// }
// .ant-pagination .ant-pagination-simple-pager {
//   height: 33px;
// }
// .ant-pagination .ant-pagination-simple-pager input {
//   margin-right: 0;
//   padding: 0;
// }
// .ant-pagination-prev {
//   margin-right: 0;
// }
#components-pagination-demo {
  float: right;
  right: 0;
}
</style>