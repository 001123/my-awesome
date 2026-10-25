# Site Starlight

Nội dung lấy từ các file Markdown của repo: bản tiếng Anh trong `../en/` (locale gốc của site) và bản tiếng Việt ở gốc repo (`/vi/`). Script `scripts/sync-content.mjs` chép chúng vào `src/content/docs/` lúc build (thư mục đó không commit). Thêm ngôn ngữ: xem mục "Ngôn ngữ" trong `../CURATION.md`.

```sh
cd site
npm install
npm run dev     # cần Node >= 22.23
npm run build
```

Deploy tự động bằng `.github/workflows/deploy-site.yml` khi push lên `main`.
