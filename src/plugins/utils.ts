import { localizePath } from "astro-i18next";
import i18n from "i18next";
import { getCollection } from "astro:content";

export function postUrl(slug: string) {
  let prefix = i18n.language + "/";
  return localizePath(`/blog/${slug.substring(prefix.length)}`);
}

export function getLocaleFromPath(path: string) {
  path = path.replace(/^\//, "");
  for (const locale of i18n.languages) {
    if (path === locale || path.startsWith(locale + "/")) {
      return locale;
    }
  }
}

export function setLocaleByPath(path: string) {
  let locale = getLocaleFromPath(path);
  console.log(locale);

  if (locale) {
    i18n.changeLanguage(locale);
    return true;
  }
  return false;
}

export async function getCurrentPosts() {
  return (
    await getCollection("blog", (row) =>
      row.slug.startsWith(`${i18n.language}/`)
    )
  ).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}
