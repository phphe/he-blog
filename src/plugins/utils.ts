import { astroI18n, l } from "astro-i18n";
import { getCollection, CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog"> & {
  slugWithoutLocale: string;
  path: string;
};

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
  )
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf())
    .map((row) => {
      const slugWithoutLocale = row.slug.replace(/^\w+\//, "");
      const newRow: BlogPost = {
        ...row,
        slugWithoutLocale,
        path: l(`/blog/${slugWithoutLocale}`),
      };
      return newRow;
    });
}
