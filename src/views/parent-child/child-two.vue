<template>
  <div class="home">
    <strong>---two-child---</strong>
    <p>非响应性：{{ location1 }}</p>
    <p>ref：{{ location }}</p>
    <p>reactive：{{ geolocation.longitude }}---{{ geolocation.latitude }}</p>
    <a-button type="primary" @click="addCount">修改</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, reactive, watch } from 'vue'
export default defineComponent({
  name: 'two-child',
  props: {
    modal: {
      type: Object,
      default: () => {
        return {
          longitude: 90,
          latitude: 135
        }
      }
    }
  },
  setup(props) {
    const location = ref(inject('location') as string)
    let location1 = inject('location1')
    const strMap: string[] = ['北京', '天津', '合肥', '石家庄', '上海']
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })
    const addCount = () => {
      location.value = strMap[Math.floor((Math.random() * strMap.length))]
      location1 = strMap[Math.floor((Math.random() * strMap.length))]
      geolocation.longitude = (Math.random() * 100)
      geolocation.latitude = (Math.random() * 80)
      console.log(location, location1, geolocation)
    }
    watch(props.modal, (newV) => {
      console.log('newV', newV)
    })
    return {
      location1,
      location,
      geolocation,
      strMap,
      addCount
    }
  }
})
</script>
