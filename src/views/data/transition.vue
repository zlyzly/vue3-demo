<template>
  <strong>#transition</strong>
  <br />
  <div id="list-demo">
    <a-button v-on:click="add" type="primary">Add</a-button>
    <a-button v-on:click="remove" type="primary">Remove</a-button>
    <transition-group name="list" tag="p">
      <span v-for="item in post.items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
  <div id="list-demos">
    <!-- 多个元素使用v-if控制 -->
    <a-button v-on:click="show" type="primary">show</a-button>
    <a-button v-on:click="hide" type="primary">hide</a-button>
    <transition-group name="list" tag="div">
      <p v-if="post.shows">111111111111</p>
      <p v-if="post.shows">22222222222</p>
      <p v-else>33333333333</p>
    </transition-group>
  </div>
  <div id="demo">
    <a-button @click="post.show = !post.show" type="primary">Toggle show</a-button>
    <transition name="bounce">
      <p v-if="post.show">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        facilisis enim libero, at lacinia diam fermentum id. Pellentesque
        habitant morbi tristique senectus et netus.
      </p>
    </transition>
  </div>
  <div id="demo1" class="demo">
    <input v-model="post.view" type="radio" value="v-a" id="a" /><label for="a">A</label>
    <input v-model="post.view" type="radio" value="v-b" id="b" /><label for="b">B</label>
    <transition name="fade-transform" mode="out-in">
      <component :is="post.view"></component>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  },
  setup() {
    const post = reactive({
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      show: true,
      shows: false,
      view: 'v-a'
    })
    const randomIndex = () => { return Math.floor(Math.random() * post.items.length) }
    const add = () => {
      post.items.splice(randomIndex(), 0, post.nextNum++)
    }
    const remove = () => {
      post.items.splice(randomIndex(), 1)
    }
    const show = () => {
      post.shows = true
    }
    const hide = () => {
      post.shows = false
    }
    return { post, add, remove, show, hide }
  }
})
</script>
<style lang="less" scoped>
div {
  margin: 20px 0;
}
.list-item,
.list-items,
.demo {
  display: inline-block;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter-to,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.bounce-enter-active {
  animation: bounce-in 0.5s ease-out both;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse ease-in both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>