# Quy tắc tổng hợp

File này là "luật chơi" cho mỗi lần cập nhật tự động (mỗi 12 giờ). Giữ file này ổn định để các lần chạy cho ra định dạng giống nhau. Bản tiếng Anh là [CURATION.md](../CURATION.md) ở gốc repo; nếu sửa quy tắc thì sửa cả hai.

## Ngôn ngữ

Danh sách có **hai bản song song, luôn phải đồng bộ**: tiếng Việt và tiếng Anh. Mỗi lần chạy phải cập nhật **cả hai bản trong cùng một commit**.

| Ngôn ngữ | Thư mục | Trên website |
|---|---|---|
| English (mặc định) | gốc repo | `/my-awesome/` |
| Tiếng Việt | `vi/` | `/my-awesome/vi/` |

Hai bản có cùng tên file, cùng danh mục, cùng nhóm `##`, cùng thứ tự mục và cùng số liệu (số sao, ngôn ngữ, ngày). Chỉ khác phần chữ: mô tả, tiêu đề, tên nhóm. File tiếng Anh `categories/x.md` tương ứng với `vi/categories/x.md`.

Thêm ngôn ngữ mới sau này: tạo thư mục `<mã>/` (vd. `ja/`) có cùng cấu trúc như `vi/`, rồi thêm mã đó vào `LANGS` trong `site/scripts/sync-content.mjs` `locales` trong `site/astro.config.mjs` và chuỗi giao diện vào `STRINGS` trong `site/src/author.ts`.

## Cấu trúc

Mỗi ngôn ngữ có cùng bộ file (bản tiếng Anh ở gốc repo, bản tiếng Việt trong `vi/`):

- `README.md` — giới thiệu, bảng danh mục (kèm số mục), mục "🆕 Mới cập nhật" / "🆕 Latest update" chỉ chứa các mục của **lần chạy gần nhất**, dòng "Cập nhật lần cuối" / "Last updated".
- `categories/<slug>.md` — mỗi danh mục một file, chia thành các nhóm `##`.
- `CHANGELOG.md` — mỗi lần chạy thêm một mục ở đầu: ngày giờ (UTC), số mục mới theo danh mục.
- `CURATION.md` — quy tắc này.

## Định dạng một mục

Tiếng Việt:

```
- [owner/repo](https://github.com/owner/repo) — Mô tả tiếng Việt, 1 câu, nói nó làm gì và vì sao hay. ⭐ 12k · Ngôn ngữ · _thêm YYYY-MM-DD_
```

Tiếng Anh:

```
- [owner/repo](https://github.com/owner/repo) — One-sentence English description of what it does and why it's great. ⭐ 12k · Language · _added YYYY-MM-DD_
```

Website (không phải repo): `- [Tên](https://url) — Mô tả. _thêm YYYY-MM-DD_` / `- [Name](https://url) — Description. _added YYYY-MM-DD_`

Số sao làm tròn (1.2k, 45k), lấy tại thời điểm thêm, không cần cập nhật lại. Mô tả tiếng Anh viết tự nhiên như người bản xứ, không dịch word-by-word.

## Tiêu chí chọn

- Hữu ích thực tế cho dev/designer: tech, AI, web dev, UI design, dev tools, self-hosted, học tập.
- Repo: còn được maintain (có commit trong ~3 tháng), thường ≥ 1k sao; repo mới nổi tăng sao nhanh cũng được.
- Ưu tiên chất lượng hơn số lượng: mỗi lần chạy thêm khoảng **5–15 mục mới**.
- Bỏ qua: repo bị archive, meme/spam, nội dung leak, công cụ crack/vi phạm, link không truy cập được.

## Chống trùng

Trước khi thêm, so URL (không phân biệt hoa thường, bỏ `/` cuối) với tất cả link trong `categories/*.md` (bản tiếng Anh; bản tiếng Việt có cùng URL). Đã có thì bỏ qua.

## Kiểm tra đồng bộ trước khi commit

Với mỗi danh mục, số dòng mục (`- [`) trong `categories/x.md` và `vi/categories/x.md` phải bằng nhau, và tập URL giống hệt nhau. Số mục trong bảng README, tổng số mục và mục mới nhất của CHANGELOG phải khớp ở cả hai bản.

## Danh mục mới

Chỉ tạo file danh mục mới khi có ít nhất 3 mục phù hợp không thuộc danh mục nào hiện có. Tạo ở **cả hai** thư mục với cùng tên file, và thêm dòng vào bảng trong cả hai README.

## Website

Thư mục `site/` là site [Astro Starlight](https://starlight.astro.build/) đọc trực tiếp các file Markdown ở trên và tự deploy lên GitHub Pages mỗi khi push lên `main` (workflow `.github/workflows/deploy-site.yml`). Để site không lỗi:

- Mỗi file `.md` phải có đúng **một** tiêu đề `# ` ở đầu file; nó được dùng làm tiêu đề trang và tên trong sidebar.
- Đoạn văn đầu tiên sau tiêu đề được dùng làm mô tả SEO của trang, nên viết nó gọn, có nghĩa.
- Link nội bộ dùng đường dẫn tương đối tới file `.md` (vd. `categories/ai-llm.md`, `../README.md`); script `site/scripts/sync-content.mjs` tự đổi sang URL của site đúng ngôn ngữ.
- Tên file danh mục mới: chữ thường, gạch ngang (`ten-danh-muc.md`). Sidebar tự thêm, không cần sửa `site/`.
- Không sửa thư mục `site/` khi cập nhật danh sách.
