<template>
  <div class="default-layout fixed w-full h-full flex">
    <div v-if="sidebarVisible && !sm" @click="sidebarVisible = false"
      class="fixed top-0 left-0 w-full h-full bg-black opacity-20">
    </div>
    <Transition name="main-sidebar-slide-fade">
      <div class="main-sidebar flex-shrink-0 w-72 h-full overflow-hidden font-title flex flex-col"
        :class="{ 'fixed z-10': sm }" v-show="!sm || sidebarVisible">
        <Icon :path="mdiClose" v-if="sm" @click="sidebarVisible = false" class="absolute right-2 top-2" :size="25" />
        <div class="flex-grow overflow-auto">
          <div class="main-title text-2xl text-gray-700 mt-32 ml-16">
            <NuxtLinkLocale to="/">{{ name }}</NuxtLinkLocale>
          </div>
          <div class="main-menu mt-6 text-gray-600 ml-16">
            <NuxtLinkLocale to="/" class="main-menu-item">{{ $t('Home') }}</NuxtLinkLocale>
            <NuxtLinkLocale to="/works" class="main-menu-item">{{ $t('Works') }}</NuxtLinkLocale>
            <NuxtLinkLocale to="/about" class="main-menu-item">{{ $t('About') }}</NuxtLinkLocale>
            <a class="main-menu-item cursor-pointer select-none" @click="$colorMode.preference = colorModeInfo.next">
              {{ colorModeInfo.curText }}
              <Icon :path="mdiWhiteBalanceSunny" />
            </a>
            <NuxtLinkLocale to="/" :locale="i18n.locale.value === 'en' ? 'zh' : 'en'" class="main-menu-item">{{
              i18n.locale.value === 'en'
              ?
              '中文' : 'English' }}</NuxtLinkLocale>
          </div>
        </div>
      </div>
    </Transition>
    <div class="main-right flex-grow overflow-auto max-sm:pt-8">
      <div class="px-4 main-body">
        <slot />
      </div>
      <div class="py-10 text-center text-sm text-gray-500 dark:text-gray-300">Copyright © {{ name }} {{ year }}. All
        rights reserved.</div>
    </div>
    <div v-if="sm" class="sm-top-menu flex justify-between fixed w-full top-0 left-0 px-4 py-3 border-b">
      <NuxtLinkLocale to="/">{{ name }}</NuxtLinkLocale>
      <Icon :path="mdiMenu" @click="sidebarVisible
        = !sidebarVisible" :size="23" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { mdiMenu, mdiClose, mdiWhiteBalanceSunny } from '@mdi/js'

const i18n = useI18n()

useHead({
  htmlAttrs: {
    lang: i18n.locale,
  },
})

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

// color mode
const mapping = {
  system: 'autoColor',
  dark: 'darkColor',
  light: 'lightColor',
}
const colorMode = useColorMode()
const colorModeInfo = computed(() => {
  const cur = colorMode.preference
  // @ts-ignore
  const curText = i18n.t(mapping[cur])
  const keys = Object.keys(mapping)
  let i = keys.indexOf(cur)
  const next = keys[i + 1] || keys[0]
  return {
    curText,
    next
  }
})

</script>
  
<style lang="scss">
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

.dark {
  @apply bg-black;

  &,
  & a {
    color: #fff;
  }

  .main-sidebar {
    background-image: url('/assets/img/bg-night.jpg');

  }
}

// transition
.main-sidebar-slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.main-sidebar-slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.main-sidebar-slide-fade-enter-from,
.main-sidebar-slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
  