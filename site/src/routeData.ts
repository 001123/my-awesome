// Bổ sung SEO cho từng trang: tiêu đề kèm tên tác giả, ảnh OG riêng, thẻ Twitter, JSON-LD.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { AUTHOR, SITE_NAME } from './author';

const stripEmoji = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, '').trim();

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { head, entry } = route;
	const isHome = entry.id === 'index';
	const pageTitle = stripEmoji(entry.data.title);
	const fullTitle = isHome
		? `${SITE_NAME}: repo & website hay về tech, AI | ${AUTHOR.name}`
		: `${pageTitle} | ${SITE_NAME} · ${AUTHOR.name}`;

	const set = (match: (t: (typeof head)[number]) => boolean, item: (typeof head)[number]) => {
		const i = head.findIndex(match);
		if (i >= 0) head[i] = item;
		else head.push(item);
	};
	const meta = (key: 'name' | 'property', id: string, content: string) =>
		set((t) => t.tag === 'meta' && t.attrs?.[key] === id, { tag: 'meta', attrs: { [key]: id, content } });

	set((t) => t.tag === 'title', { tag: 'title', content: fullTitle });
	meta('property', 'og:title', fullTitle);
	meta('property', 'og:type', isHome ? 'website' : 'article');

	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const image = new URL(`${base}/og/${entry.id}.png`, context.site).href;
	meta('property', 'og:image', image);
	meta('property', 'og:image:width', '1200');
	meta('property', 'og:image:height', '630');
	meta('property', 'og:image:alt', fullTitle);
	meta('name', 'twitter:title', fullTitle);
	meta('name', 'twitter:image', image);
	meta('name', 'twitter:creator', AUTHOR.xHandle);
	if (!isHome) meta('property', 'article:author', AUTHOR.url);

	const pageUrl = new URL(context.url.pathname, context.site).href;
	const siteUrl = new URL(`${base}/`, context.site).href;
	const description = entry.data.description;
	head.push({
		tag: 'script',
		attrs: { type: 'application/ld+json' },
		content: JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Person',
					'@id': `${AUTHOR.url}#person`,
					name: AUTHOR.name,
					url: AUTHOR.url,
					sameAs: [AUTHOR.github, AUTHOR.x],
				},
				{
					'@type': 'WebSite',
					'@id': `${siteUrl}#website`,
					name: SITE_NAME,
					url: siteUrl,
					inLanguage: 'vi',
					author: { '@id': `${AUTHOR.url}#person` },
					publisher: { '@id': `${AUTHOR.url}#person` },
				},
				{
					'@type': isHome ? 'CollectionPage' : 'WebPage',
					'@id': `${pageUrl}#webpage`,
					url: pageUrl,
					name: fullTitle,
					...(description && { description }),
					inLanguage: 'vi',
					isPartOf: { '@id': `${siteUrl}#website` },
					author: { '@id': `${AUTHOR.url}#person` },
					primaryImageOfPage: image,
				},
			],
		}),
	});
});
