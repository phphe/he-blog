<template lang="pug">
.article-view(v-if="item")
  .article.mt-14
    .article-head
      .article-title.prose() 
        h1 {{item.title}}
      .article-meta.mt-5
        small {{created_at}}
    .article-body.mt-8.text-gray-600.text
      .article-content.prose(v-html="item.content")
    .article-foot
    Gitalk.article-comments(:id="articleKey" :config="gitalkConfig")
</template>

<script lang="ts">
  import { api } from '../http'
  import { useTitle } from '../HTMLHead'
  import { defineComponent, nextTick } from 'vue'
  import dayjs from 'dayjs'
  import { useOnAfterI18nRouteGenerated } from '../i18n'
  import Gitalk from '../components/gitalk/index.vue'

  export default defineComponent({
    components: { Gitalk },
    // props: {},
    data() {
      return {
        item: null,
        gitalkConfig: {
          clientID: '7deb5052bc5372bf9dc0',
          clientSecret: '268fd7f2f9e669c8839ed4df2cc6176af0db5017',
          repo: 'he-blog',
          owner: 'phphe',
          admin: ['phphe'],
          distractionFreeMode: false, // Facebook-like distraction free mode
        },
      }
    },
    computed: {
      created_at() {
        return dayjs(this.item.created_at).format('DD-MM YYYY')
      },
      articleKey() {
        return `${this.$i18n.locale}/${this.item.slug}`
      },
    },
    watch: {
      $route: {
        handler(route) {
          if (route.name.match(/^article/)) {
            this.pullData()
          }
        },
        immediate: true,
      },
    },
    // created() {},
    // mounted() {},
    methods: {
      async pullData(to) {
        const { slug } = (to || this.$route).params
        const t = await api.get(`/article/${slug}`)
        this.item = t
        useTitle(this.item.title, this)
        useOnAfterI18nRouteGenerated((route, to) => {
          return {
            ...route,
            params: { ...route.params, slug: this.item.alternate[to] },
          }
        }, this)
      },
    },
  })
</script>

<style lang="scss">
  .article-view {
    .prose {
      max-width: unset;
    }
  }
</style>
