# Site Starlight

Nội dung lấy từ `../README.md`, `../categories/*.md`, `../CHANGELOG.md`, `../CURATION.md` (script `scripts/sync-content.mjs` chép vào `src/content/docs/` lúc build, thư mục đó không commit).

```sh
cd site
npm install
npm run dev     # cần Node >= 22.23
npm run build
```

Deploy tự động bằng `.github/workflows/deploy-site.yml` khi push lên `main`.
