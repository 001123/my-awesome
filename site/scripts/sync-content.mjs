// Sao chép nội dung Markdown của repo vào src/content/docs trước khi build.
// File nguồn vẫn là nguồn duy nhất; thư mục đích được tạo lại mỗi lần và không commit.
//
// Mỗi ngôn ngữ có cùng bộ file: README.md, CHANGELOG.md, CURATION.md, categories/*.md.
// Thêm ngôn ngữ mới: tạo thư mục nguồn cùng cấu trúc rồi thêm một dòng vào LANGS
// (và vào `locales` trong astro.config.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = path.resolve(siteDir, '..');
const outDir = path.join(siteDir, 'src/content/docs');
const BASE = '/my-awesome';
const REPO = 'https://github.com/001123/my-awesome';

// src: thư mục nguồn so với gốc repo; out: tiền tố URL ('' = locale gốc của site)
const LANGS = [
	{ code: 'en', src: '.', out: '' },
	{ code: 'vi', src: 'vi', out: 'vi' },
];

// Ngôn ngữ của một file nguồn: thư mục con khớp trước, gốc repo cuối cùng
function langOf(rel) {
	return (
		LANGS.find((l) => l.src !== '.' && (rel === l.src || rel.startsWith(l.src + '/'))) ??
		LANGS.find((l) => l.src === '.')
	);
}

// đường dẫn nguồn (so với gốc repo) -> route trên site
function routeFor(rel) {
	rel = rel.replace(/\\/g, '/');
	const lang = langOf(rel);
	const inner = lang.src === '.' ? rel : rel.slice(lang.src.length + 1);
	const prefix = lang.out ? `/${lang.out}` : '';
	if (inner === 'README.md') return `${prefix}/`;
	if (inner === 'CHANGELOG.md') return `${prefix}/changelog/`;
	if (inner === 'CURATION.md') return `${prefix}/curation/`;
	const m = inner.match(/^categories\/([^/]+)\.md$/);
	if (m) return `${prefix}/categories/${m[1].toLowerCase()}/`;
	return null;
}

function rewriteLinks(body, srcRel) {
	// không đụng tới code (`...` và khối ```), chỉ sửa link trong phần chữ
	return body
		.split(/(```[\s\S]*?```|`[^`\n]*`)/)
		.map((part, i) => (i % 2 ? part : rewritePart(part, srcRel)))
		.join('');
}

function rewritePart(body, srcRel) {
	return body.replace(/\]\(([^)\s]+)\)/g, (all, href) => {
		if (/^([a-z]+:|#|\/)/i.test(href)) return all;
		const [p, hash] = href.split('#');
		const target = path.posix.normalize(path.posix.join(path.posix.dirname(srcRel), p));
		const route = routeFor(target);
		if (route) return `](${BASE}${route}${hash ? '#' + hash : ''})`;
		// file khác trong repo: trỏ về GitHub
		return `](${REPO}/blob/main/${target}${hash ? '#' + hash : ''})`;
	});
}

// Đoạn văn đầu tiên làm meta description (bỏ markdown, tối đa ~160 ký tự)
function describe(body) {
	const para = body
		.split(/\n{2,}/)
		.map((p) => p.trim())
		.find((p) => p && !/^(#|>|\||-|\*|```|\[←)/.test(p));
	if (!para) return '';
	const plain = para
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[*_`]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	return plain.length > 160 ? plain.slice(0, 157).replace(/\s+\S*$/, '') + '…' : plain;
}

function convert(srcRel, destRel) {
	let text = fs.readFileSync(path.join(repoDir, srcRel), 'utf8').replace(/\r\n/g, '\n');
	let title = path.basename(srcRel, '.md');
	const h1 = text.match(/^# (.+)$/m);
	if (h1) {
		title = h1[1].trim();
		text = text.replace(h1[0], '');
	}
	// bỏ dòng "← Về README" / "← Back to README" vì site đã có sidebar
	text = text.replace(/^\[←[^\]]*\]\([^)]*README\.md\)\s*$/gm, '');
	// bỏ dòng chuyển ngôn ngữ ở đầu README (site có nút chọn ngôn ngữ riêng)
	text = text.replace(/^.*🌐 \[Website\]\([^)]*\)\s*$/gm, '');
	// bỏ dòng tác giả ở đầu README (site có khối tác giả ở footer)
	text = text.replace(/^\*\*(Author|Tác giả):\*\*.*$/gm, '');
	text = rewriteLinks(text, srcRel).replace(/^\n+/, '');
	const description = describe(text);
	const fm = { title, ...(description && { description }), editUrl: `${REPO}/edit/main/${srcRel}` };
	const yaml = Object.entries(fm)
		.map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
		.join('\n');
	const dest = path.join(outDir, destRel);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.writeFileSync(dest, `---\n${yaml}\n---\n\n${text}`);
}

fs.rmSync(outDir, { recursive: true, force: true });
for (const lang of LANGS) {
	const src = (f) => path.posix.join(lang.src, f).replace(/^\.\//, '');
	const dest = (f) => path.posix.join(lang.out, f);
	convert(src('README.md'), dest('index.md'));
	for (const f of ['CHANGELOG.md', 'CURATION.md']) {
		if (fs.existsSync(path.join(repoDir, src(f)))) convert(src(f), dest(f.toLowerCase()));
	}
	const cats = fs
		.readdirSync(path.join(repoDir, src('categories')))
		.filter((f) => f.endsWith('.md'))
		.sort();
	for (const f of cats) convert(src(`categories/${f}`), dest(`categories/${f.toLowerCase()}`));
	console.log(`sync-content [${lang.code}]: ${cats.length} danh mục + README, CHANGELOG, CURATION`);
}
