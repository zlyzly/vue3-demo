<template>
  <a-sub-menu :key="menuInfo.path" v-bind="$attrs">
    <template #title v-if="menuInfo.meta && !menuInfo.hidden">
      <span
        ><component :is="menuInfo.meta.icon" />{{ menuInfo.meta.title }}</span
      >
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <template v-if="item.meta">
            <router-link :to="resolvePath(item.path)">
              <span>{{ item.meta.title }}</span>
            </router-link>
          </template>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :base-path="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
    basePath: {
      type: String,
      default: '',
    }
  },
  components: {
  },
  setup(props) {
    // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
    // 但是，因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 props 的响应性。
    const { menuInfo, basePath } = toRefs(props)
    menuInfo.value = menuInfo
    // console.log(props, menuInfo.value, basePath)
    const store = useStore()
    const route = useRoute()
    function change(name: string, url: string, item: any) {
      // console.log('this.$route: ', route.path, url, item)
      store.dispatch('ResetState', { name: name }).then(() => {
        if (route.path === url || route.path === item.redirect) {
          window.location.reload() // 避免刷新之后丢失历史记录
        }
      })
    }
    function resolvePath(routePath: string) {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath
      }
      if (/^(https?:|mailto:|tel:)/.test(basePath.value)) {
        return basePath.value
      }
      return `${basePath.value}/${routePath}`
    }
    return { resolvePath, change }
  }
})
</script>

<style lang="scss" scoped>
</style>