<template>
  <main class="page-home pt-20 sm:px-10">
    <ContentList :path="localePath('/blog')">
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
const runtimeConfig = useRuntimeConfig();
const localePath = useLocalePath();

useSeoMeta({
  title: null,
  description: runtimeConfig.public.appDescription,
});
</script>
