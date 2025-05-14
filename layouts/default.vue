<template>
  <div class="default-layout">
    <div
      v-if="sidebarVisible && !sm"
      @click="sidebarVisible = false"
      class="fixed top-0 left-0 w-full h-full bg-black opacity-20"
    ></div>
    <Transition name="main-sidebar-slide-fade">
      <div
        class="main-sidebar w-72 fixed h-full overflow-hidden font-title flex flex-col"
        :class="{ 'fixed z-10': sm }"
        v-show="sidebarVisibleActual"
      >
        <Icon
          :path="mdiClose"
          v-if="sm"
          @click="sidebarVisible = false"
          class="absolute right-2 top-2"
          :size="25"
        />
        <div class="flex-grow overflow-auto">
          <div class="main-title text-2xl text-gray-700 mt-32 ml-16">
            <NuxtLinkLocale to="/">{{ appName }}</NuxtLinkLocale>
          </div>
          <div class="main-menu mt-6 text-gray-600 ml-16">
            <NuxtLinkLocale to="/" class="main-menu-item">{{
              $t("Home")
            }}</NuxtLinkLocale>
            <NuxtLinkLocale to="/works" class="main-menu-item">{{
              $t("Works")
            }}</NuxtLinkLocale>
            <NuxtLinkLocale to="/about" class="main-menu-item">{{
              $t("About")
            }}</NuxtLinkLocale>
            <a
              class="main-menu-item cursor-pointer select-none"
              @click="$colorMode.preference = colorModeInfo.next"
            >
              <client-only>{{ colorModeInfo.curText }}</client-only>
              <Icon :path="mdiWhiteBalanceSunny" />
            </a>
            <NuxtLink
              :to="$localePath('/', i18n.locale.value === 'en' ? 'zh' : 'en')"
              class="main-menu-item"
              >{{ i18n.locale.value === "en" ? "中文" : "English" }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </Transition>
    <div
      class="main-right max-sm:pt-8"
      :class="{ 'ml-72': sidebarVisibleActual && !sm }"
    >
      <div class="px-4 main-body">
        <slot />
      </div>
      <div class="py-10 text-center text-sm text-gray-500 dark:text-gray-300">
        Copyright © {{ appName }} {{ year }}. All rights reserved.
      </div>
    </div>
    <div
      v-if="sm"
      class="sm-top-menu flex justify-between fixed w-full top-0 left-0 px-4 py-3 border-b backdrop-blur"
    >
      <NuxtLinkLocale to="/">{{ appName }}</NuxtLinkLocale>
      <Icon
        :path="mdiMenu"
        @click="sidebarVisible = !sidebarVisible"
        :size="23"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/*
Use a instead of NuxtLinkLocale in home page locale switch, because it doesn't work in generated static html.
<NuxtLinkLocale
              to="/"
              :locale="i18n.locale.value === 'en' ? 'zh' : 'en'"
              class="main-menu-item"
              >{{
                i18n.locale.value === "en" ? "中文" : "English"
              }}</NuxtLinkLocale
            >
*/
import { mdiMenu, mdiClose, mdiWhiteBalanceSunny } from "@mdi/js";

const runtimeConfig = useRuntimeConfig();
const i18n = useI18n();

const appName = runtimeConfig.public.appName;
const sidebarVisible = ref(false);
const year = new Date().getFullYear();

//
useHead({
  titleTemplate: (title) => {
    return !title || title === appName ? appName : `${title} - ${appName}`;
  },
});

// seo for locale
const i18nHead = useLocaleHead();
useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

//
const windowSize = ref({
  width: 1920,
  height: 900,
});
const updateWindowSize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

onMounted(() => {
  updateWindowSize();
  window.addEventListener("resize", updateWindowSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
});

const sm = computed(() => windowSize.value.width < 760);
const sidebarVisibleActual = computed(() => !sm.value || sidebarVisible.value);

// color mode
const mapping = {
  system: "autoColor",
  dark: "darkColor",
  light: "lightColor",
};
const colorMode = useColorMode();
const colorModeInfo = computed(() => {
  const cur = colorMode.preference;
  // @ts-ignore
  const curText = i18n.t(mapping[cur]);
  const keys = Object.keys(mapping);
  let i = keys.indexOf(cur);
  const next = keys[i + 1] || keys[0];
  return {
    curText,
    next,
  };
});
</script>

<style lang="scss">
.default-layout {
  font-family: "Open Sans";
}

.main-sidebar {
  font-family: Cairo;
  background-image: url("/assets/img/bg-day.jpg");
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
    background-image: url("/assets/img/bg-night.jpg");
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

<style lang="scss">
// custom pre tag's background color
pre.shiki.shiki-themes {
  background-color: #fdf6e3 !important;
}
.dark pre.shiki.shiki-themes {
  background-color: #24292e !important;
}
// fix pre tag's text color in light mode
.light pre.shiki.shiki-themes {
  color: #000000;
}
</style>
