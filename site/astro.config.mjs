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
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/001123/my-awesome' }],
			editLink: { baseUrl: 'https://github.com/001123/my-awesome/edit/main/' },
			components: { ThemeSelect: './src/components/ThemeSelect.astro' },
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
