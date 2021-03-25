<template>
  <a-card hoverable style="width: 240px">
    <template #cover>
      <div class="img_group">
        <img
          class="img_card"
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </div>
    </template>
    <a-card-meta title="Europe Street beat">
      <template #description>www.instagram.com</template>
    </a-card-meta>
  </a-card>
  <a-row>
    <a-col
      v-for="img in list.imgArr"
      :key="img.id"
      :xs="24"
      :sm="24"
      :md="12"
      :lg="10"
      :xl="6"
    >
      <a-card hoverable style="width: 240px">
        <template #cover>
          <div class="img_group">
            <img
              v-lazy="{
                src: img.src,
                lifecycle: lazyOptions.lifecycle,
              }"
              alt="Vue logo"
              class="img_card"
            />
          </div>
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
  <div class="margin" />
  <img src="../assets/gril.jpg" width="100" />
  <img v-lazy="img.src" />
  <img
    v-lazy="{ src: lazyOptions.src, lifecycle: lazyOptions.lifecycle }"
    alt="Vue logo"
    class="image"
    width="100"
  />
  <lazy-component @show="handler">
    <img class="mini-cover" :src="img.src" width="200" height="200" />
  </lazy-component>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getImgs } from '../api/lazyload'
import { mapGetters } from 'vuex'
export default defineComponent({
  computed: {
    ...mapGetters([ 'historyParams' ])
  },
  created() {
    console.log('this.$store.getters', this.historyParams)
    if (this.historyParams.History && this.historyParams.History.History) {
      // this.pagination = this.historyParams.History.History.pagination
    }
    this.getLists()
  },
  beforeRouteLeave(to, from: any, next) {
    console.log('${this.$route.name}', this.$route.name)
    // this.$store.dispatch('history/ChangeParams', { name: `History/${from.name}`, history: { pagination: {} }}).then(() => {
    next()
    // })
  },
  setup() {
    const lazyOptions = reactive({
      src: '../assets/gril.jpg',
      lifecycle: {
        loading: () => {
          console.log('image loading')
        },
        error: () => {
          console.log('image error')
        },
        loaded: () => {
          lazyOptions.src = 'https://cdn-image.onemicroworld.com/44FAA911-2EEF-B9CD-7375-4E207A7FF204?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=gaqYz5Dvf6lyM8An%2BeAGIQpdhKg%3D&iopcmd=thumbnail&type=8&width=200&height=200'
          console.log('image loaded')
        }
      }
    })
    const img = reactive({
      src: 'https://cdn-image.onemicroworld.com/44FAA911-2EEF-B9CD-7375-4E207A7FF204?UCloudPublicKey=qgchM9CFzaKL9XWizIjY4EXmtmtDqPoFCr69qE5P&Signature=gaqYz5Dvf6lyM8An%2BeAGIQpdhKg%3D&iopcmd=thumbnail&type=8&width=200&height=200'
    })
    const handler = (component) => {
      console.log('this component is showing', component)
    }
    const list = reactive({
      imgArr: [],
      total: 0
    })
    const getLists = () => {
      getImgs({ pos: 0, limit: 30 }).then(res => {
        list.imgArr = res.data.list
        list.total = res.data.total
      }).catch((err) => console.log(err))
    }
    
    return {
      lazyOptions,
      img,
      handler,
      list,
      getLists
    }
  }
})
</script>
<style lang="less" scoped>
.margin {
  margin-top: 800px;
}
.image[lazy="loading"] {
  background: goldenrod;
}
.image[lazy="error"] {
  background: red;
}
.image[lazy="loaded"] {
  background: green;
}
.img_group {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  .img_card {
    width: 100%;
    transition: all ease-in-out 1s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
:deep(.ant-col) {
  display: inline-block;
  padding: 20px 20px 0 0;
}
</style>
