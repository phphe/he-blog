<template>
  <main class="page-home pt-20 sm:px-10">
    <ContentList :query="query">
      <template #default="{ list }">
        <MyContentList :list="list" />
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t('notFound') }}</p>
      </template>
    </ContentList>
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const app = useNuxtApp()
const route = useRoute()
const tag = computed(() => {
  let m = route.path.match(/\/tag\/([^.\/?#]+)/)
  return m![1]!
})

const query: QueryBuilderParams = computed(() => ({ path: app.$localeContentPath('/blog'), sort: [{ date: -1 }] }))
</script>