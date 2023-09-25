<template>
  <article class="content-detail">
    <div v-if="header" class="post-header">
      <div class="post-title prose dark:prose-invert">
        <h1>{{ doc.title }}</h1>
      </div>
      <div v-if="doc.date" class="post-meta mt-5">
        <small>
          <FormattedDate :date="doc.date" />
        </small>
      </div>
    </div>
    <div class="post-body mt-8 text-gray-600">
      <div class="post-content prose dark:prose-invert">
        <ContentRenderer :value="doc" />
      </div>
    </div>
    <div v-if="doc.tags?.length > 0" class="post-tags mt-4">
      <NuxtLinkLocale v-for="tag in doc.tags" class="post-tag mr-2 " :to="'/blog/tag/' + tag">
        {{ tag }}
      </NuxtLinkLocale>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  doc: {
    type: Object,
  },
  header: {
    type: Boolean,
    default: true
  },
})
</script>

<style lang="scss">
.content-detail {
  .post-title {
    h1 {
      @apply max-sm:text-2xl;
    }
  }

  .post-tag {
    @apply text-xs inline-flex items-center px-3 py-1 rounded-md bg-white text-gray-700 border hover:bg-gray-100 hover:scale-110 ease-in duration-100;
    @apply dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    &>a:first-child {
      text-decoration: none;

      &:hover {
        @apply underline underline-offset-4;
      }
    }
  }
}
</style>