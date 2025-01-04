<template>
  <main class="page-home pt-20 sm:px-10">
    <template v-if="data">
      <MyContentList :list="data" />
    </template>
    <template v-else>
      <p class="text-xl">{{ $t("notFound") }}</p>
    </template>
  </main>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const localePath = useLocalePath();
const { data } = await useAsyncData("home-posts", () =>
  queryContent(localePath("/blog")).sort({ _id: -1 }).find()
);

useSeoMeta({
  title: null,
  description: runtimeConfig.public.appDescription,
});
</script>
