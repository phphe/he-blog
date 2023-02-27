import { astroI18n, l } from "astro-i18n";
import { getCollection, CollectionEntry } from "astro:content";

export function postUrl(slug: string) {
  let prefix = astroI18n.langCode + "/";
  return l(`/blog/${slug.substring(prefix.length)}`);
}

export async function getCurrentPosts(
  filter?: (row: CollectionEntry<"blog">) => boolean
) {
  return (
    await getCollection("blog", (row) => {
      let r = row.slug.startsWith(`${astroI18n.langCode}/`);
      if (r && filter) {
        r = filter(row);
      }
      return r;
    })
  ).sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}
