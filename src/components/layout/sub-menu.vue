<template>
  <a-sub-menu :key="menuInfo.name">
    <template #title v-if="!menuInfo.hidden">
      <span>
        <component :is="menuInfo.meta.icon"></component>
        <span>3{{ menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-if="menuInfo.children">
      <template v-for="item in menuInfo.children">
        <template v-if="!item.hidden">
          <!-- 不存在子级 -->
          <a-menu-item v-if="!item.children" :key="item.name">
            <router-link :to="resolvePath(item.path)">{{
              item.meta && item.meta.title
            }}</router-link>
          </a-menu-item>
          <!-- 存在子级 -->
          <sub-menu
            v-else
            :menu-info="item"
            :key="item.path"
            :base-path="item.path"
          />
        </template>
      </template>
    </template>
    <!-- <template v-for="item in menuInfo.children">
      <template v-if="!item.hidden">
        <a-menu-item :key="item.path">
          <span>
            <router-link :to="resolvePath(item.path)">
              <component :is="item.meta.icon"></component>
              <span>{{ item.meta.title }}</span>
            </router-link>
          </span>
        </a-menu-item>
      </template>
    </template> -->
  </a-sub-menu>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
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
    // console.log(menuInfo.value)
    const resolvePath = (routePath: string) => {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath
      }
      if (/^(https?:|mailto:|tel:)/.test(basePath.value)) {
        return basePath.value
      }
      return `${basePath.value}/${routePath}`
    }
    return { resolvePath }
  }
})
</script>

<style lang="scss" scoped>
.ant-menu-item a {
  color: #fff;
}
</style>