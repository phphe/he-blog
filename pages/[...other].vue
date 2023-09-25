<template>
  <main class="page-other-page pt-14 sm:px-10">
    <ContentDoc>
      <template #default="{ doc }">
        <MyContentDetail :doc="doc" :header="false" />
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t('notFound') }}</p>
      </template>
    </ContentDoc>
  </main>
</template>

<style lang="scss">
.page-other-page {
  .prose {
    max-width: 800px;
  }
}
</style>
