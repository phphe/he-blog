<template>
  <main class="page-home pt-20 sm:px-10">
    <ContentList :path="$localeContentPath('/blog')">
      <template v-slot="{ list }">
        <MyContentList :list="list" />
      </template>
      <template #not-found>
        <p class="text-xl">{{ $t("notFound") }}</p>
      </template>
    </ContentList>
  </main>
</template>

<script setup lang="ts">
const config = useAppConfig();

useSeoMeta({
  title: null,
  description: config.appDescription,
});
</script>
