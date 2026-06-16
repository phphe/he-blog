<template>
  <main class="page-blog-post pt-14 sm:px-10">
    <ContentDoc>
      <template #default="{ doc }">
        <MyContentDetail :doc="doc" />
        <!-- cancel disquscomment because ad -->
        <!-- <div class="post-comments mt-10">
          <DisqusComments :identifier="$route.path" />
        </div> -->
        <div class="post-comments mt-10">
          <GiscusComment :identifier="$route.path.replace(/\/$/, '')" />
        </div>
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t("notFound") }}</p>
      </template>
    </ContentDoc>
  </main>
</template>

<style lang="scss">
.page-blog-post {
  .prose {
    max-width: 900px;
  }
}
</style>
