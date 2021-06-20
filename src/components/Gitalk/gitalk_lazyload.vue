<template lang="pug">
.gitalk-vue-async(:key="id")
  .gitalk-vue-placeholder
</template>

<script lang="ts">
  // don't use this file diretly. You should use index.vue
  import { defineComponent, nextTick } from 'vue'
  import 'gitalk/dist/gitalk.css'
  import Gitalk from 'gitalk'

  export default defineComponent({
    // components: {},
    props: {
      // config ================
      // clientID: '',
      // clientSecret: '',
      // repo: 'he-blog',
      // owner: 'phphe',
      // admin: ['phphe'],
      // distractionFreeMode: false, // Facebook-like distraction free mode
      config: {},
      // config end ================
      id: {},
    },
    // data() {
    //   return {}
    // },
    // computed: {},
    watch: {
      id() {
        nextTick(() => {
          setTimeout(() => {
            this.renderComments()
          }, 500)
        })
      },
    },
    // created() {},
    mounted() {
      if (this.id) {
        this.renderComments()
      }
    },
    methods: {
      renderComments() {
        const gitalk = new Gitalk({
          ...this.config,
          id: this.id, // Ensure uniqueness and length less than 50
        })
        gitalk.render(this.$el.querySelector('.gitalk-vue-placeholder'))
      },
    },
  })
</script>

<style lang="scss"></style>
