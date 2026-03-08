<template>
  <div class="giscus-container">
    <ClientOnly>
      <Giscus v-if="identifier" :key="identifier" id="comments" :repo="config.public.appRepo"
        :repoId="config.public.giscusRepoId" category="Announcements" :categoryId="config.public.giscusCategoryId"
        mapping="specific" :term="identifier" strict="1" reactionsEnabled="1" emitMetadata="0" inputPosition="top"
        :theme="giscusTheme" :lang="giscusLang" loading="lazy" crossorigin="anonymous" />
    </ClientOnly>
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue';
// mapping="specific" :term="identifier" strict="1"
// mapping="specific": 按给定字符搜索标题（部分匹配）; term: 标识字符串; strict="1": 严格匹配（完全匹配）

const props = defineProps({
  identifier: {
    type: String,
    required: true
  }
});

const config = useRuntimeConfig();
const colorMode = useColorMode();
const giscusTheme = computed(() => (colorMode.value === 'dark' ? 'dark' : 'light'));
const { locale } = useI18n();
const giscusLang = computed(() => {
  // Giscus 支持 zh-CN, zh-TW, en, fr 等
  // 如果你的 i18n locale 是 en-US，可能需要简单处理成 en（Giscus 自动兼容大部分标准格式）
  const langMap = {
    'zh': 'zh-CN',
    'en-US': 'en',
    // 如果有更多语言在此添加映射
  };
  return langMap[locale.value] || locale.value;
});
</script>