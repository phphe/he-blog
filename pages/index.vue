<template>
  <main class="page-home pt-20 sm:px-10">
    <ContentList path="/blog" v-slot="{ list }">
      <MyContentList :list="list" />
    </ContentList>
  </main>
</template>