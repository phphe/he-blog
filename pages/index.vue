<template>
  <main class="page-home pt-20 sm:px-10">
    <ContentList :path="$localeContentPath('/blog')">
      <template #default="{ list }">
        <MyContentList :list="list" />
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t('notFound') }}</p>
      </template>
    </ContentList>
  </main>
</template>