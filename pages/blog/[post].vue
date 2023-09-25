<template>
  <main class="page-blog-post pt-14 sm:px-10">
    <ContentDoc>
      <template #default="{ doc }">
        <MyContentDetail :doc="doc" />
        <div class="post-comments mt-10">
          <DisqusComments :identifier="$route.path" />
        </div>
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t('notFound') }}</p>
      </template>
    </ContentDoc>
  </main>
</template>

<style lang="scss">
.page-blog-post {
  .prose {
    max-width: 800px;
  }
}
</style>
