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
const route = useRoute();

const dataID = route.path; // for static site generation, so don't use fullpath. 针对静态站点所以不使用fullpath
const { data } = await useAsyncData(dataID, () =>
  queryContent(localePath("/blog")).find()
);

useSeoMeta({
  title: null,
  description: runtimeConfig.public.appDescription,
});
</script>
