<template lang="pug">
.page-view(v-if="item")
  .article.mt-14
    .article-head
      .article-title.prose() 
        h1 {{item.title}}
    .article-body.mt-8.text-gray-600.text
      .article-content.prose(v-html="item.content")
    .article-foot
</template>

<script lang="ts">
  import { api } from '../http'
  import { useTitle } from '../HTMLHead'
  import { defineComponent } from 'vue'
  import { useOnAfterI18nRouteGenerated } from '../i18n'

  export default defineComponent({
    // components: {},
    // props: {},
    data() {
      return {
        item: null,
      }
    },
    computed: {},
    watch: {
      $route: {
        handler(route) {
          if (route.name.match(/^page/)) {
            this.pullData()
          }
        },
        immediate: true,
      },
    },
    created() {},
    methods: {
      async pullData(to) {
        const { slug } = (to || this.$route).params
        this.item = await api.get(`/page/${slug}`)
        useTitle(this.item.title, this)
        useOnAfterI18nRouteGenerated((route, to) => {
          return {
            ...route,
            params: { ...route.params, slug: this.item.alternate[to] },
          }
        }, this)
      },
    },
    // mounted() {}
  })
</script>

<style lang="scss">
  .page-view {
    .prose {
      max-width: unset;
    }
  }
</style>
