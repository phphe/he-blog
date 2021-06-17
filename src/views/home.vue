<template lang="pug">
.home-view.pt-20
  .article.mb-6(v-for="item in articles")
    .article-head
      Anchor.article-title.text-2xl(:to="{name: 'article', params: {category: item.category.slug, slug: item.slug}}") {{item.title}}
    //- .article-body.mt-10.text-gray-600.text
    //-   .article-content(v-html="item.content")
    //- .article-foot
  Pagination.mt-10(v-model:page="page" :total="total" :pageSize="pageSize" useLink)
</template>

<script>
  import { api } from '../http'
  import { useTitle } from '../HTMLHead'
  import Pagination from '../components/Pagination.vue'

  export default {
    setup() {
      useTitle('Home')
    },
    components: { Pagination },
    // props: {},
    data() {
      return {
        articles: [],
        total: 0,
        page: 1,
        pageSize: 5,
      }
    },
    // computed: {},
    watch: {
      $route: {
        handler(route) {
          if (route.name.match(/^home/)) {
            this.pullData()
          }
        },
        immediate: true,
      },
    },
    created() {},
    methods: {
      async pullData() {
        const t = await api.get(`/articles/${this.$route.query.page || 1}`)
        this.articles = t.data
        this.total = t.total
        this.pageSize = t.pageSize
      },
    },
    // mounted() {}
  }
</script>

<style lang="scss">
  .home-view {
  }
</style>
