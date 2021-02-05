<template>
  <div class="home">
    <strong>多级路由</strong>
    <p>query: {{ query }}</p>
    <a-list item-layout="vertical" size="large" :data-source="listData">
      <a-skeleton
        active
        :loading="loading && !listData.length"
        :avatar="skeletonAvatarProps"
        :paragraph="skeletonParagraphProps"
      />
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template v-if="!loading" #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component v-bind:is="type" style="margin-right: 8px"></component>
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
              v-if="!loading"
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar
              ><a-avatar shape="square" size="large" :src="item.avatar"
            /></template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
    <a-switch :checked="!loading" @change="onChange" />
    <a-list item-layout="vertical" size="large" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template v-if="!loading" #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component v-bind:is="type" style="margin-right: 8px"></component>
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
              v-if="!loading"
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.href">{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
            {{ item.content }}
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { getLista } from '@/api/list'
export default defineComponent({
  name: 'Router',
  components: {},
  // beforeRouteEnter(to, from) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log('beforeRouteEnter', to, from)
  // },
  setup() {
    const query = useRoute().query
    const loading = ref(true)
    const data = reactive({
      listData: [],
      actions: [
        { type: 'star-outlined', text: '156' },
        { type: 'like-outlined', text: '156' },
        { type: 'message-outlined', text: '2' },
      ],
      skeletonParagraphProps: {
        rows: 2,
        width: ['100%']
      },
      skeletonAvatarProps: {
        size: 'large',
        shape: 'square'
      }
    })
    setTimeout(() => {
      loading.value = false
    }, 1000)
    // console.log(query)
    onBeforeRouteUpdate((to, from) => {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      // console.log('beforeRouteUpdate', to, from)
    }),
      onBeforeRouteLeave((to, from) => {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // console.log('beforeRouteLeave', to, from)
      })
    const getList = () => {
      getLista().then(res => {
        loading.value = false
        data.listData = res.data.list
      }).catch((err) => console.log(err))
    }
    getList()
    const onChange = (checked) => {
      loading.value = !checked
    }
    return { query, loading, ...toRefs(data), getList, onChange }
  }
})
</script>
