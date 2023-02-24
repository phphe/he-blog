import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { astroI18n } from "astro-i18n";

const getPostLink = (slug) => {
	let t = slug.split('/')
	let locale = t.shift()
	let t2 = t.join('/')
	let path = `/${locale}/blog/${t2}/`
	path = path.replace(`/${astroI18n.defaultLangCode}/`, '/')
	return path
}

export async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			pubDate: post.data.date,
			link: getPostLink(post.slug),
		})),
	});
}
