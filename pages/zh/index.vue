<template>
  <main>
    <ContentList path="/zh/blog" v-slot="{ list }">
      <div v-for="article in list" :key="article._path">
        <nuxt-link :to="article._path">
          <h2>{{ article.title }}</h2>
        </nuxt-link>
        <p>{{ article.description }}</p>
      </div>
    </ContentList>
  </main>
</template>