<template>
  <template v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!data.onlyOneChild.children||data.onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <a-menu-item :key="resolvePath(data.onlyOneChild.path)" @click="change(data.onlyOneChild.name, resolvePath(data.onlyOneChild.path), data.onlyOneChild)">
        <router-link :to="resolvePath(data.onlyOneChild.path)">
          <span>
            <component :is="data.onlyOneChild.meta.icon"></component>
            <span>{{ data.onlyOneChild.meta.title }}</span>
          </span>
        </router-link>
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="resolvePath(item.path)" @click="change(item.name, resolvePath(item.path), item)">
      <template #title>
        <span><component :is="item.meta.icon"></component><span>{{ item.meta.title }}</span></span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="resolvePath(child.path)"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </a-sub-menu>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useStore } from "vuex"
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    interface DataModal {
      onlyOneChild: string[];
    }
    const store = useStore()
    const route = useRoute()
    const data: DataModal = reactive({
      onlyOneChild: []
    })
    const hasOneShowingChild = (children = [], parent: any) => {
      const showingChildren = children.length ? children.filter((item: any) => {
        if (item.hidden) {
          return false
        } else {
          // 只有一个显示子元素时
          data.onlyOneChild = item
          return true
        }
      }) : []
      // 只有一个子路由器时，默认显示该子路由器
      if (showingChildren.length === 1) {
        return true
      }
      // 没有子路由
      if (showingChildren.length === 0) {
        data.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      // console.log(data.onlyOneChild)
      return false
    }
    const resolvePath = (routePath: string) => {
      // console.log(routePath)
      return routePath ? `${props.basePath}/${routePath}` : `${props.basePath}`
    }
    const change = (name, url, item) => {
      // console.log('this.$route: ', route.path, url, item)
      store.dispatch('ResetState', { name: name }).then(() => {
        if (route.path === url || route.path === item.redirect) {
          window.location.reload() // 避免刷新之后丢失历史记录
          // this.reload()
        }
      })
    }
    return { data, hasOneShowingChild, resolvePath, change }
  }
})
</script>