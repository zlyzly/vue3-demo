<template>
  <div class="home">
    <strong>HelloWorld</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'Hello',
  components: {},
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
  methods: {

  }
})
</script>
