# Curation rules

This file is the rulebook for every automatic update (every 12 hours). Keep it stable so every run produces the same format. The Vietnamese original is [CURATION.md](../CURATION.md); if the rules change, update both.

## Languages

The list has **two parallel versions that must always stay in sync**: Vietnamese and English. Every run updates **both versions in the same commit**.

| Language | Folder | On the website |
|---|---|---|
| English (site default) | `en/` | `/my-awesome/` |
| Vietnamese | repo root | `/my-awesome/vi/` |

Both versions share the same file names, categories, `##` groups, entry order and data (stars, language, date). Only the text differs: descriptions, titles and group names. The Vietnamese `categories/x.md` matches `en/categories/x.md`.

To add another language later, create a `<code>/` folder (e.g. `ja/`) with the same structure as `en/`, then add the code to `LANGS` in `site/scripts/sync-content.mjs` and to `locales` in `site/astro.config.mjs`.

## Structure

Each language has the same set of files (Vietnamese at the root, English in `en/`):

- `README.md` — intro, category table (with entry counts), a "🆕 Latest update" section listing only the entries from **the most recent run**, and a "Last updated" line.
- `categories/<slug>.md` — one file per category, split into `##` groups.
- `CHANGELOG.md` — every run adds an entry at the top: date and time (UTC), new entries per category.
- `CURATION.md` — this file.

## Entry format

Vietnamese:

```
- [owner/repo](https://github.com/owner/repo) — Mô tả tiếng Việt, 1 câu, nói nó làm gì và vì sao hay. ⭐ 12k · Ngôn ngữ · _thêm YYYY-MM-DD_
```

English:

```
- [owner/repo](https://github.com/owner/repo) — One-sentence English description of what it does and why it's great. ⭐ 12k · Language · _added YYYY-MM-DD_
```

Websites (not repos): `- [Name](https://url) — Description. _added YYYY-MM-DD_`

Round star counts (1.2k, 45k), taken when the entry is added; no need to refresh them. Write English descriptions naturally, not as word-for-word translations.

## Selection criteria

- Practically useful for developers and designers: tech, AI, web dev, UI design, dev tools, self-hosted, learning.
- Repos: still maintained (commits within ~3 months), usually ≥ 1k stars; fast-rising new repos are fine too.
- Quality over quantity: about **5–15 new entries** per run.
- Skip: archived repos, memes/spam, leaked content, cracking or infringing tools, unreachable links.

## Deduplication

Before adding, compare the URL (case-insensitive, trailing `/` removed) against every link in `categories/*.md`. Skip it if it already exists.

## Sync check before committing

For every category, `categories/x.md` and `en/categories/x.md` must have the same number of entry lines (`- [`) and exactly the same set of URLs. The README table counts, the total and the latest CHANGELOG entry must match in both versions.

## New categories

Only create a new category file when there are at least 3 fitting entries that don't belong to any existing category. Create it in **both** folders with the same file name and add a row to both README tables.

## Website

The `site/` folder is an [Astro Starlight](https://starlight.astro.build/) site that reads the Markdown files above directly and deploys to GitHub Pages on every push to `main` (workflow `.github/workflows/deploy-site.yml`). To keep the site working:

- Each `.md` file must have exactly **one** `# ` heading at the top; it becomes the page title and sidebar label.
- The first paragraph after the heading becomes the page's SEO description, so keep it short and meaningful.
- Internal links use relative paths to `.md` files (e.g. `categories/ai-llm.md`, `../README.md`); `site/scripts/sync-content.mjs` turns them into site URLs for the right language.
- New category file names: lowercase with hyphens (`category-name.md`). The sidebar picks them up automatically; no changes to `site/` needed.
- Don't touch `site/` when updating the list.
