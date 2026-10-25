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
			description: 'Tổng hợp repo, website hay về tech, AI, web dev, UI design. Tự động cập nhật mỗi 12 giờ.',
			defaultLocale: 'root',
			locales: { root: { label: 'Tiếng Việt', lang: 'vi' } },
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
			},
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/source-serif-4',
				'./src/styles/custom.css',
			],
			sidebar: [
				{ label: 'Trang chủ', link: '/' },
				{ label: 'Danh mục', items: [{ autogenerate: { directory: 'categories' } }] },
				{ label: 'Lịch sử cập nhật', link: '/changelog/' },
				{ label: 'Quy tắc tổng hợp', link: '/curation/' },
			],
		}),
	],
});
