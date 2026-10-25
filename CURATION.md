# Quy tắc tổng hợp

File này là "luật chơi" cho mỗi lần cập nhật tự động (mỗi 12 giờ). Giữ file này ổn định để các lần chạy cho ra định dạng giống nhau.

## Cấu trúc

- `README.md` — giới thiệu, bảng danh mục (kèm số mục), mục "🆕 Mới cập nhật" chỉ chứa các mục của **lần chạy gần nhất**.
- `categories/<slug>.md` — mỗi danh mục một file, chia thành các nhóm `##`.
- `CHANGELOG.md` — mỗi lần chạy thêm một mục ở đầu: ngày giờ (UTC), số mục mới theo danh mục.

## Định dạng một mục

```
- [owner/repo](https://github.com/owner/repo) — Mô tả tiếng Việt, 1 câu, nói nó làm gì và vì sao hay. ⭐ 12k · Ngôn ngữ · _thêm YYYY-MM-DD_
```

Website (không phải repo): `- [Tên](https://url) — Mô tả. _thêm YYYY-MM-DD_`

Số sao làm tròn (1.2k, 45k), lấy tại thời điểm thêm, không cần cập nhật lại.

## Tiêu chí chọn

- Hữu ích thực tế cho dev/designer: tech, AI, web dev, UI design, dev tools, self-hosted, học tập.
- Repo: còn được maintain (có commit trong ~3 tháng), thường ≥ 1k sao; repo mới nổi tăng sao nhanh cũng được.
- Ưu tiên chất lượng hơn số lượng: mỗi lần chạy thêm khoảng **5–15 mục mới**.
- Bỏ qua: repo bị archive, meme/spam, nội dung leak, công cụ crack/vi phạm, link không truy cập được.

## Chống trùng

Trước khi thêm, so URL (không phân biệt hoa thường, bỏ `/` cuối) với tất cả link trong `categories/*.md`. Đã có thì bỏ qua.

## Danh mục mới

Chỉ tạo file danh mục mới khi có ít nhất 3 mục phù hợp không thuộc danh mục nào hiện có. Nhớ thêm dòng vào bảng trong README.

## Website

Thư mục `site/` là site [Astro Starlight](https://starlight.astro.build/) đọc trực tiếp các file Markdown ở trên và tự deploy lên GitHub Pages mỗi khi push lên `main` (workflow `.github/workflows/deploy-site.yml`). Để site không lỗi:

- Mỗi file `.md` (README, CHANGELOG, `categories/*.md`) phải có đúng **một** tiêu đề `# ` ở đầu file; nó được dùng làm tiêu đề trang và tên trong sidebar.
- Link nội bộ dùng đường dẫn tương đối tới file `.md` (vd. `categories/ai-llm.md`, `../README.md`); script `site/scripts/sync-content.mjs` tự đổi sang URL của site.
- Tên file danh mục mới: chữ thường, gạch ngang (`ten-danh-muc.md`). Sidebar tự thêm, không cần sửa `site/`.
- Không sửa thư mục `site/` khi cập nhật danh sách.
