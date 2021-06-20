<template lang="pug">
.gitalk-vue
  asyncComponent(v-if="visible" :id="id" :config="config")
</template>

<script lang="ts">
  import { defineComponent, nextTick, defineAsyncComponent } from 'vue'
  let loaded = false
  export default defineComponent({
    components: {
      asyncComponent: defineAsyncComponent(() => {
        const t = import('./gitalk_lazyload.vue')
        loaded = true
        return t
      }),
    },
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
    data() {
      return {
        visible: false,
      }
    },
    // computed: {},
    watch: {},
    // created() {},
    mounted() {
      setTimeout(
        () => {
          this.visible = true
        },
        loaded ? 200 : 1000
      )
    },
    methods: {},
  })
</script>

<style lang="scss"></style>
