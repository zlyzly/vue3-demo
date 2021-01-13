<template>
  <a-breadcrumb class="breadcrumb">
    <!-- <transition-group name="breadcrumb"> -->
    <a-breadcrumb-item v-for="item in data.breadList" :key="item.name">
      <router-link v-if="item.name != data.name" :to="item.path">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
    <!-- </transition-group> -->
  </a-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    interface Data {
      breadList: any[];
      name: string;
    }
    const data: Data = reactive({
      breadList: [],
      name: ''
    })
    const route = useRoute()
    // console.log('route', route['name'])
    const getBreadcrumb = async () => {
      data.breadList = []
      data.name = String(route['name'])
      route.matched.forEach((item: any) => {
        if (item.meta && item.meta.title) data.breadList.push(item)
      })
      // console.log(data.breadList)
    }
    watch(() => route.name, () => {
      // console.log('新值：', newV, '旧值：', oldV)
      getBreadcrumb()
    })
    getBreadcrumb()
    return { data, getBreadcrumb }
  }
})
</script>
<style lang="scss" scoped>
.breadcrumb {
  line-height: 30px;
  margin-left: 16px;
}
</style>