<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, reactive, h } from 'vue'
import Menu from 'ant-design-vue/es/menu'
export default defineComponent({
  setup() {
    const menu = [
      {
        children: [
          {
            meta: { title: "基础学习-1", mainMenu: true, },
            name: "Config-1",
          }
        ],
        component: { name: "Main", },
        meta: { title: "基础学习", mainMenu: true, },
        name: "Config",
        path: "/config",
      },
      {
        children: [
          {
            meta: { title: "基础学习-1", mainMenu: true, },
            name: "Config-1",
          }
        ],
        component: { name: "Main", },
        meta: { title: "基础学习1", mainMenu: true, },
        name: "Config",
        path: "/config1",
      }
    ],
    render() {
      const dynamicProps = {
        props: {
          mode: 'vertical',
          theme: 'dark',
          openKeys: ['1'],
          selectedKeys: ['sub-1']
        },
        on: {
          openChange: (...args) => {
            onOpenChange(...args)
          },
          click: (...args) => {
            onSelect(...args)
          }
        }
      }

      const menuTree = menu.map(item => {
        if (item.hidden) {
          return null
        }
        return item
      })
      const onOpenChange = menu.map(item => {
        if (item.hidden) {
          return null
        }
        return item
      })
      const onSelect = menu.map(item => {
        if (item.hidden) {
          return null
        }
        return item
      })
      return (<Menu{ ...dynamicProps } > { menuTree } < /Menu>)
    }
  }
})
</script>