// Sao chép nội dung Markdown ở gốc repo vào src/content/docs trước khi build.
// File nguồn (README.md, categories/*.md, CHANGELOG.md, CURATION.md) vẫn là nguồn duy nhất;
// thư mục đích được tạo lại mỗi lần và không commit.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = path.resolve(siteDir, '..');
const outDir = path.join(siteDir, 'src/content/docs');
const BASE = '/my-awesome';

// đường dẫn nguồn (so với gốc repo) -> route trên site
function routeFor(rel) {
	rel = rel.replace(/\\/g, '/');
	if (rel === 'README.md') return '/';
	if (rel === 'CHANGELOG.md') return '/changelog/';
	if (rel === 'CURATION.md') return '/curation/';
	const m = rel.match(/^categories\/([^/]+)\.md$/);
	if (m) return `/categories/${m[1].toLowerCase()}/`;
	return null;
}

function rewriteLinks(body, srcRel) {
	return body.replace(/\]\(([^)\s]+)\)/g, (all, href) => {
		if (/^([a-z]+:|#|\/)/i.test(href)) return all;
		const [p, hash] = href.split('#');
		const target = path.posix.normalize(path.posix.join(path.posix.dirname(srcRel), p));
		const route = routeFor(target);
		if (route) return `](${BASE}${route}${hash ? '#' + hash : ''})`;
		// file khác trong repo: trỏ về GitHub
		return `](https://github.com/001123/my-awesome/blob/main/${target}${hash ? '#' + hash : ''})`;
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

function convert(srcRel, destRel, extra = {}) {
	let text = fs.readFileSync(path.join(repoDir, srcRel), 'utf8').replace(/\r\n/g, '\n');
	let title = path.basename(srcRel, '.md');
	const h1 = text.match(/^# (.+)$/m);
	if (h1) {
		title = h1[1].trim();
		text = text.replace(h1[0], '');
	}
	// bỏ dòng "← Về README" vì site đã có sidebar
	text = text.replace(/^\[←[^\]]*\]\([^)]*README\.md\)\s*$/gm, '');
	text = rewriteLinks(text, srcRel).replace(/^\n+/, '');
	const description = extra.description ?? describe(text);
	const fm = { title, ...(description && { description }), editUrl: `https://github.com/001123/my-awesome/edit/main/${srcRel}`, ...extra };
	const yaml = Object.entries(fm)
		.map(([k, v]) => (typeof v === 'object' ? `${k}:\n${Object.entries(v).map(([a, b]) => `  ${a}: ${JSON.stringify(b)}`).join('\n')}` : `${k}: ${JSON.stringify(v)}`))
		.join('\n');
	const dest = path.join(outDir, destRel);
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.writeFileSync(dest, `---\n${yaml}\n---\n\n${text}`);
}

fs.rmSync(outDir, { recursive: true, force: true });
convert('README.md', 'index.md');
convert('CHANGELOG.md', 'changelog.md');
if (fs.existsSync(path.join(repoDir, 'CURATION.md'))) convert('CURATION.md', 'curation.md');

const catDir = path.join(repoDir, 'categories');
const cats = fs.readdirSync(catDir).filter((f) => f.endsWith('.md')).sort();
for (const f of cats) convert(`categories/${f}`, `categories/${f.toLowerCase()}`);
console.log(`sync-content: ${cats.length} danh mục + README, CHANGELOG, CURATION -> src/content/docs`);
