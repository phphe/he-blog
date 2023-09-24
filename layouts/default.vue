<template>
  <div class="default-layout fixed w-full h-full flex">
    <div v-if="sidebarVisible" @click="sidebarVisible = false"
      class="fixed top-0 left-0 w-full h-full bg-black opacity-20">
    </div>
    <div class="main-sidebar flex-shrink-0 w-72 h-full overflow-hidden font-title flex flex-col"
      :class="{ 'fixed bg-white z-10 border-r-2': sm }" v-show="!sm || sidebarVisible">
      <div class="text-center p-2 bg-gray-50 pointer" v-if="sm" @click="sidebarVisible = false">
        <Icon :path="mdiArrowLeft" />
      </div>
      <div class="flex-grow overflow-auto">
        <div class="main-title text-2xl text-gray-700 mt-32 ml-16">
          <a :href="homeURL">{{ name }}</a>
        </div>
        <div class="main-menu mt-6 text-gray-600 ml-16">
          <a class="main-menu-item" href="/">Home</a>
          <NuxtLink to="/about" class="main-menu-item">Works</NuxtLink>
          <NuxtLink to="/about" class="main-menu-item">About</NuxtLink>
        </div>
      </div>
    </div>
    <div class="main-right flex-grow overflow-auto">
      <div class="px-4 main-body">
        <slot />
      </div>
      <div class="py-10 text-center text-sm text-gray-500">Copyright © {{ name }} {{ year }}. All rights reserved.</div>
    </div>
    <div v-if="sm" class="sm-top-menu flex justify-between fixed w-full top-0 left-0 px-4 py-3 border-b">
      <a class="text-xl" :href="homeURL">{{ name }}</a>
      <Icon :path="mdiMenu" click="sidebarVisible
        = !sidebarVisible" :size="23" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { mdiMenu, mdiArrowLeft } from '@mdi/js'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400&family=Open+Sans:wght@300;400;500;600;700&display=swap' },
  ],
})

const homeURL = "/"
const name = `He's Blog`
const sidebarVisible = ref(false)
const year = new Date().getFullYear()

const windowSize = ref({
  width: 1920,
  height: 900,
})
const updateWindowSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

onMounted(() => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowSize)
})

const sm = computed(() => windowSize.value.width < 760)


</script>
  
<style>
.default-layout {
  font-family: "Open Sans";
}

.main-sidebar {
  font-family: Cairo;
  background-image: url('/assets/img/bg-day.jpg');
  background-size: cover;
  background-position: center bottom;
}

.main-menu-item {
  @apply block mt-4;
}

.main-body {
  min-height: 750px;
  min-height: calc(100vh - 100px);
}
</style>
  