<template>
  <main class="page-tags pt-20 sm:px-10">
    <h1 class="text-3xl mb-8 font-medium">{{ title }}</h1>
    <template v-if="data">
      <MyContentList :list="data" />
    </template>
    <template v-else>
      <p class="text-xl">{{ $t("notFound") }}</p>
    </template>
  </main>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const route = useRoute();
const i18n = useI18n();
const tag = computed(() => {
  let m = route.path.match(/\/tag\/([^.\/?#]+)/);
  return m![1]!;
});
const title = computed(() => i18n.t("postsForTag", [tag.value]));

useSeoMeta({
  title: title,
  description: "",
});

const dataID = route.path; // for static site generation, so don't use fullpath. 针对静态站点所以不使用fullpath
const { data } = await useAsyncData(dataID, () =>
  queryContent(localePath("/blog"))
    .where({ tags: { $in: [tag.value] } })
    .find()
);
</script>
