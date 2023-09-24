<template>
  <main class="page-blog-post pt-14 sm:px-10">
    <ContentDoc v-slot="{ doc }">
      <MyContentDetail :doc="doc" />
      <div class="post-comments mt-10">
        <!-- <Disqus /> -->
      </div>
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
