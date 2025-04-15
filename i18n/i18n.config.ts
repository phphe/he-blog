export default defineI18nConfig(() => ({
  legacy: false, // to use Composition API. will be removed at vue-i18n v12 https://vue-i18n.intlify.dev/api/general.html#legacy
  messages: {
    zh: {
      Home: "首页",
      Works: "作品",
      About: "关于",
      postsForTag: `关于标签"{0}"的内容`,
      notFound: "😭内容未找到",
      autoColor: "自动",
      lightColor: "浅色",
      darkColor: "暗色",
    },
    en: {
      Home: "Home",
      Works: "Works",
      About: "About",
      postsForTag: `Posts for tag "{0}"`,
      notFound: "😭Content not found",
      autoColor: "Auto",
      lightColor: "Light",
      darkColor: "Dark",
    },
  },
}));
