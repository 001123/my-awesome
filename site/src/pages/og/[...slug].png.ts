// Ảnh Open Graph 1200×630 cho từng trang, vẽ bằng satori rồi chuyển sang PNG bằng sharp.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { AUTHOR, SITE_NAME, langOfId, t } from '../../author';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => fs.readFileSync(require.resolve(`${pkg}/files/${file}`));
const fonts = [
	// mỗi subset một tên riêng để satori fallback sang bộ tiếng Việt
	...['latin', 'latin-ext', 'vietnamese'].flatMap((s) => [
		{ name: `Serif-${s}`, weight: 600 as const, data: font('@fontsource/source-serif-4', `source-serif-4-${s}-600-normal.woff`) },
		{ name: `Sans-${s}`, weight: 400 as const, data: font('@fontsource/inter', `inter-${s}-400-normal.woff`) },
		{ name: `Sans-${s}`, weight: 500 as const, data: font('@fontsource/inter', `inter-${s}-500-normal.woff`) },
	]),
];
const SANS = 'Sans-latin, Sans-vietnamese, Sans-latin-ext';
const SERIF = 'Serif-latin, Serif-vietnamese, Serif-latin-ext';
const logo = `data:image/svg+xml;base64,${fs.readFileSync(new URL('../../../public/favicon.svg', import.meta.url)).toString('base64')}`;

export const getStaticPaths = (async () => {
	const docs = await getCollection('docs');
	return docs.map((entry) => {
		const lang = langOfId(entry.id);
		const isHome = ['', 'index', lang].includes(entry.id);
		return {
			params: { slug: entry.id || 'index' },
			props: {
				title: isHome ? t(lang).ogHeadline : entry.data.title.replace(/^[^\p{L}\p{N}]+/u, '').trim(),
				description: entry.data.description ?? '',
				url: `001123.github.io/my-awesome${lang === 'en' ? '' : '/' + lang}`,
			},
		};
	});
}) satisfies GetStaticPaths;

type El = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra = {}): El => ({
	type,
	props: { style, children, ...extra },
});

export const GET: APIRoute = async ({ props }) => {
	const p = props as { title: string; description: string; url: string };
	const title = p.title.normalize('NFC');
	const description = p.description.normalize('NFC');
	const tree = h(
		'div',
		{ width: '100%', height: '100%', display: 'flex', padding: 48, background: '#F3F1EA', fontFamily: SANS },
		h(
			'div',
			{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: 976,
				height: 430,
				padding: '52px 64px',
				background: '#FFFEFB',
				borderRadius: 32,
				border: '1px solid rgba(20,20,19,0.08)',
				boxShadow: '0 10px 30px rgba(60,50,30,0.08)',
			},
			[
				h('div', { display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 500, color: '#5E5D59' }, [
					h('img', { width: 56, height: 56 }, undefined, { src: logo, width: 56, height: 56 }),
					SITE_NAME,
				]),
				h('div', { display: 'flex', flexDirection: 'column', gap: 22 }, [
					h(
						'div',
						{ fontFamily: SERIF, fontWeight: 600, fontSize: title.length > 28 ? 66 : 80, lineHeight: 1.08, color: '#141413', letterSpacing: -1 },
						title,
					),
					h(
						'div',
						{ fontSize: 30, lineHeight: 1.4, color: '#5E5D59', display: 'flex' },
						description.length > 110 ? description.slice(0, 107).replace(/\s+\S*$/, '') + '…' : description,
					),
				]),
				h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: '#87867F' }, [
					h('div', { display: 'flex', alignItems: 'center', gap: 14 }, [
						h('div', { width: 14, height: 14, borderRadius: 999, background: '#D97757' }),
						AUTHOR.name,
					]),
					p.url,
				]),
			],
		),
	);
	const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
