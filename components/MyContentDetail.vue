<template>
  <article class="content-detail">
    <div class="post-header">
      <div class="post-title prose">
        <h1>{{ doc.title }}</h1>
      </div>
      <div class="post-meta mt-5">
        <small>
          <FormattedDate :date="doc.date" />
        </small>
      </div>
    </div>
    <div class="post-body mt-8 text-gray-600">
      <div class="post-content prose">
        <ContentRenderer :value="doc" />
      </div>
    </div>
    <div v-if="doc.tags?.length > 0" class="post-tags mt-4">
      <NuxtLink v-for="tag in doc.tags" class="post-tag mr-2 " :to="'/blog/tag/' + tag">
        {{ tag }}
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  doc: {
    type: Object,
  }
})
</script>

<style lang="scss">
.post-tag {
  @apply text-xs inline-flex items-center px-3 py-1 rounded-md bg-white text-gray-700 border;
}
</style>