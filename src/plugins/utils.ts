import { astroI18n, l } from "astro-i18n";
import { getCollection } from "astro:content";

export function postUrl(slug: string) {
  let prefix = astroI18n.langCode + "/";
  return l(`/blog/${slug.substring(prefix.length)}`);
}

export async function getCurrentPosts() {
  return (
    await getCollection("blog", (row) =>
      row.slug.startsWith(`${astroI18n.langCode}/`)
    )
  ).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}
