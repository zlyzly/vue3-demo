<template>
  <strong>组件式API</strong>
  <br />
  <div>
    <table-list
      :columns="post.columns"
      :list="post.commentIds"
      :pagination="{
        pageSize: 1,
        current: 1,
        total: 500,
        pageSizeOptions: ['10', '20', '30', '40'],
        showQuickJumper: true,
        showSizeChanger: true, 
        showTotal
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from 'vue'
import { getLists } from '../api/list'
import TableList from '../components/TableList/index.vue'
export default defineComponent({
  components: {
    TableList
  },
  setup(props, context) {
    console.log(props, context)
    interface Post {
      text: number;
      commentIds: any;
      firstName: string;
      lastName: string;
      columns: any;
    }
    const post: Post = reactive({
      text: 0,
      commentIds: [],
      firstName: 'zhang',
      lastName: 'ly',
      columns: []
    })
    const changeText = () => {
      post.text++
    }

    watch([post.text], (newV, oldV) => {
      // console.log('新值：', newV, '旧值：', oldV)
    })
    // 请求api
    const getList = async () => {
      // console.log(await getLists())
      const arr: any = await getLists()
      // console.log(arr[0], Object.keys(arr[0]))
      const keys: any = Object.keys(arr[0])
      keys.forEach((ele: string) => {
        post.columns.push(
          {
            title: ele,
            dataIndex: ele,
            key: ele,
            slots: { customRender: ele },
            width: 80
          }
        )
      })
      post.commentIds = await getLists()
      console.log(post.commentIds)
    }
    getList()
    return { post, changeText, getList }
  }
})
</script>
<style lang="scss" scoped>
div {
  margin: 10px 0;
}
</style>
