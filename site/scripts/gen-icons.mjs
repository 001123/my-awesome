// Tạo các icon PNG từ public/favicon.svg. Chạy lại khi đổi favicon: node scripts/gen-icons.mjs
import sharp from 'sharp';
import fs from 'node:fs';

const svg = fs.readFileSync(new URL('../public/favicon.svg', import.meta.url));
const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname;
for (const [name, size] of [
	['favicon-32.png', 32],
	['apple-touch-icon.png', 180],
	['icon-192.png', 192],
	['icon-512.png', 512],
]) {
	await sharp(svg, { density: 600 }).resize(size, size).png().toFile(out(name));
}
// maskable: thêm vùng an toàn quanh logo
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#D97757' } })
	.composite([{ input: await sharp(svg, { density: 600 }).resize(360, 360).png().toBuffer(), gravity: 'center' }])
	.png()
	.toFile(out('icon-maskable-512.png'));
console.log('icons ok');
