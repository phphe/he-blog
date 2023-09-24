<template>
  <main class="page-tags pt-20 sm:px-10">
    <h1 class="text-3xl mb-8 font-medium">Posts for tag "{{ tag }}"</h1>
    <ContentList :query="query">
      <template #default="{ list }">
        <MyContentList :list="list" />
      </template>
      <template #not-found>
        <p>No posts found.</p>
      </template>
    </ContentList>
  </main>
</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

const route = useRoute()
const tag = computed(() => {
  let m = route.path.match(/\/tag\/([^.\/?#]+)/)
  return m![1]!
})

const query: QueryBuilderParams = computed(() => ({ path: '/blog', where: [{ tags: { $in: [tag.value] } }] }))
</script>