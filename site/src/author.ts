export const AUTHOR = {
	name: 'Bùi Khương Duy', // tên gốc; tên hiển thị theo ngôn ngữ nằm ở STRINGS.authorName
	url: 'https://kd.io.vn/',
	github: 'https://github.com/001123',
	x: 'https://x.com/khuongduy1897',
	xHandle: '@khuongduy1897',
};
export const SITE_NAME = 'My Awesome';

// Chuỗi giao diện tự thêm (ngoài chuỗi có sẵn của Starlight). Thêm ngôn ngữ mới: thêm một khoá.
export const STRINGS = {
	en: {
		authorName: 'Bui Khuong Duy',
		homeTitle: 'Great repos & websites on tech and AI',
		ogHeadline: 'Great repos & sites on tech, AI, web dev, UI',
		author: 'Author',
		authorLinks: "Author's links",
		toggleTheme: 'Toggle light/dark theme',
	},
	vi: {
		authorName: 'Bùi Khương Duy',
		homeTitle: 'Repo & website hay về tech, AI',
		ogHeadline: 'Repo & website hay về tech, AI, web dev, UI',
		author: 'Tác giả',
		authorLinks: 'Liên kết của tác giả',
		toggleTheme: 'Đổi giao diện sáng/tối',
	},
} as const;

export type Lang = keyof typeof STRINGS;
export const t = (lang: string | undefined) => STRINGS[(lang ?? 'en') in STRINGS ? (lang as Lang) : 'en'];
// id nội dung -> ngôn ngữ: 'vi/categories/x' hoặc 'vi' -> 'vi'; 'categories/x' -> 'en'
export const langOfId = (id: string): Lang => {
	const first = id.split('/')[0];
	return first in STRINGS ? (first as Lang) : 'en';
};
