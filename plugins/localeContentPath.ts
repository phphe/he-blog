export default defineNuxtPlugin(() => {
  return {
    provide: {
      localeContentPath: (path: string) => {
        const i18n = useI18n();
        return i18n.defaultLocale === i18n.locale.value
          ? path
          : `/${i18n.locale.value}${path}`;
      },
    },
  };
});
