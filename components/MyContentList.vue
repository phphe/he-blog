<template>
  <div class="my-content-list">
    <div v-for="doc in list" :key="doc._path" class="post mb-8">
      <div class="doc-header flex items-center flex-wrap">
        <span v-if="doc.tags && doc.tags[0]" class="doc-title-tag mr-3">{{ doc.tags[0] }}</span>
        <NuxtLink class="doc-title text-2xl" :to="doc._path">
          {{ doc.title }}
        </NuxtLink>
      </div>
      <div class="doc-meta mt-1">
        <span class="doc-date mr-2">
          <FormattedDate :date="doc.date" />
        </span>
        <span class="doc-description">
          {{ doc.description || doc.excerpt }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: Array,
})
</script>

<style lang="scss">
.my-content-list {
  .doc-title-tag {
    @apply inline-block text-white rounded-md text-sm bg-gray-800;
    padding: 3px 6px;
  }

  .doc-title {
    &:hover {
      @apply underline underline-offset-4;
    }
  }

  .doc-date {
    @apply text-sm text-gray-500;
  }

  .doc-description {
    @apply text-gray-600;
  }
}
</style>