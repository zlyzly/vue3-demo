<template>
  <div class="home">
    <strong>HelloWorld</strong>
    <!-- 第一种父子传值通讯方法 -->
    <p>1.父组件属性count：同步更新{{ count }}</p>
    <Child v-model:count="count"/>
    <p>1.父组件对象info：reactive的响应数据也会更新{{ info.count }}</p>
    <Child1 v-model:info="info"/>
    <!-- 第二种父子传值通讯方法 -->
    <p>2:父组件属性非响应式location1：不更新{{ location1 }}</p>
    <p>2:父组件属性ref(location)：更新{{ location }}</p>
    <p>2:父组件属性reactive(geolocation)：不更新{{ geolocation.longitude }}---{{ geolocation.latitude }}</p>
    <two-child :modal="geolocation"/>
    <a-button type="primary" @click="addCount">修改==</a-button>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, provide, onBeforeUpdate, onUpdated, onMounted } from 'vue'
import { mapGetters } from 'vuex'
import Child from './hello-child.vue'
import Child1 from './hello-child1.vue'
import TwoChild from './child-two.vue'
export default defineComponent({
  name: 'Hello',
  components: { Child, Child1, TwoChild },
  computed: {
    ...mapGetters(['historyParams'])
  },
  created() {
    console.log('this.$store.getters', this.historyParams)
    // if (this.historyParams.History && this.historyParams.History.History) {
    //   // this.pagination = this.historyParams.History.History.pagination
    // }
    // this.getLists()
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log(this, this.$store)
  //   // console.log('${this.$route.name}', this.$route.name, this.$store)
  //   // this.$store.dispatch('history/ChangeParams', { name: `History/${from.name}`, history: { pagination: {} } }).then(() => {
  //     next()
  //   // })
  // },
  setup(props, context) {
    console.log(context)
    // 第一种
    const count = ref<number>(0)
    const info = reactive({
      count: 0
    })
    // 第二种
    const location1 = 'North Pole'
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })
    provide('location1', location1) // 非响应性不更新父组件的值
    provide('location', location)// 响应性ref更新父组件的值
    provide('geolocation', geolocation)// 响应性reactive不更新父组件的值
    

    // 子组件不更新reactive的值的时候需要在父组件手动更新-子组件调用该方法
    const updateLocation = () => {
      location.value = 'South Pole'
    }
    provide('updateLocation', updateLocation)
    onBeforeUpdate(() => { console.log('geolocation:onBeforeUpdate', geolocation) })
    onUpdated(() => { console.log('geolocation:onUpdated', geolocation) })
    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      addCount()
    })
    const addCount = () => {
      geolocation.longitude = 10
      geolocation.latitude = 100
    }

    return {
      count,
      info,
      location,
      location1,
      geolocation,
      updateLocation,
      addCount
    }
  }
})
</script>
