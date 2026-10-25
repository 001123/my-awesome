// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// GitHub Pages: https://001123.github.io/my-awesome/
export default defineConfig({
	site: 'https://001123.github.io',
	base: '/my-awesome',
	integrations: [
		starlight({
			title: 'My Awesome',
			description: 'A curated list of great repos and websites on tech, AI, web dev and UI design, updated every 12 hours.',
			// English ở gốc, các ngôn ngữ khác ở /<mã>/. Thêm ngôn ngữ: thêm một khoá ở đây và trong site/scripts/sync-content.mjs
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				vi: { label: 'Tiếng Việt', lang: 'vi' },
			},
			favicon: '/favicon.svg',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/001123/my-awesome' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/khuongduy1897' },
			],
			head: [
				{ tag: 'meta', attrs: { name: 'author', content: 'Bùi Khương Duy' } },
				{ tag: 'link', attrs: { rel: 'author', href: 'https://kd.io.vn/' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/my-awesome/favicon-32.png' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/my-awesome/apple-touch-icon.png' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: '/my-awesome/site.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#F3F1EA', media: '(prefers-color-scheme: light)' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#1A1918', media: '(prefers-color-scheme: dark)' } },
				{ tag: 'meta', attrs: { name: 'robots', content: 'index, follow, max-image-preview:large' } },
			],
			routeMiddleware: './src/routeData.ts',
			editLink: { baseUrl: 'https://github.com/001123/my-awesome/edit/main/' },
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
				Footer: './src/components/Footer.astro',
				LanguageSelect: './src/components/LanguageSelect.astro',
			},
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/source-serif-4',
				'./src/styles/custom.css',
			],
			sidebar: [
				{ label: 'Home', translations: { vi: 'Trang chủ' }, link: '/' },
				{ label: 'Categories', translations: { vi: 'Danh mục' }, items: [{ autogenerate: { directory: 'categories' } }] },
				{ label: 'Changelog', translations: { vi: 'Lịch sử cập nhật' }, slug: 'changelog' },
				{ label: 'Curation rules', translations: { vi: 'Quy tắc tổng hợp' }, slug: 'curation' },
			],
		}),
	],
});
