# 🤖 AI & LLM

Mô hình, công cụ chạy model local, inference, fine-tune và framework xây ứng dụng LLM.

[← Về README](../README.md)

## Chạy model & giao diện chat

- [ollama/ollama](https://github.com/ollama/ollama) — Chạy LLM mã nguồn mở (Qwen, DeepSeek, Gemma, gpt-oss...) trên máy cá nhân chỉ với một lệnh. ⭐ 185k · Go · _thêm 2026-10-25_
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — Giao diện chat kiểu ChatGPT tự host, kết nối Ollama hoặc API OpenAI, có RAG và MCP. ⭐ 157k · Python · _thêm 2026-10-25_
- [janhq/jan](https://github.com/janhq/jan) — App desktop thay thế ChatGPT chạy 100% offline. ⭐ 45k · Rust · _thêm 2026-10-25_
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — Nền tảng AI local-first: chat với tài liệu, agent, RAG. ⭐ 68k · JavaScript · _thêm 2026-10-25_
- [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) — Engine inference LLM bằng C/C++ đứng sau hầu hết công cụ AI chạy local, chạy model GGUF nhanh trên CPU, Apple Silicon và GPU. ⭐ 132k · C++ · _thêm 2026-10-27_
- [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) — Model TTS mở không cần tokenizer, đọc đa ngôn ngữ, thiết kế giọng bằng mô tả văn bản và clone giọng rất tự nhiên. ⭐ 41k · Python · _thêm 2026-10-27_

## Inference, gateway & fine-tune

- [vllm-project/vllm](https://github.com/vllm-project/vllm) — Engine phục vụ LLM thông lượng cao, tiết kiệm bộ nhớ, chuẩn công nghiệp cho production. ⭐ 95k · Python · _thêm 2026-10-25_
- [BerriAI/litellm](https://github.com/BerriAI/litellm) — Gateway gọi 100+ API LLM theo chuẩn OpenAI, có theo dõi chi phí, load balancing. ⭐ 62k · Python · _thêm 2026-10-25_
- [unslothai/unsloth](https://github.com/unslothai/unsloth) — Fine-tune và chạy LLM nhanh hơn, ít VRAM hơn, giờ có cả UI local. ⭐ 79k · Python · _thêm 2026-10-25_
- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) — Fine-tune hơn 100 LLM/VLM với LoRA, QLoRA, RLHF qua một giao diện thống nhất. ⭐ 76k · Python · _thêm 2026-10-25_
- [huggingface/transformers](https://github.com/huggingface/transformers) — Thư viện chuẩn để dùng và huấn luyện model văn bản, hình ảnh, âm thanh. ⭐ 168k · Python · _thêm 2026-10-25_
- [deepseek-ai/DeepInfer](https://github.com/deepseek-ai/DeepInfer) — Framework inference hiệu năng cao chính chủ DeepSeek, dùng để phục vụ các model DeepSeek ở quy mô lớn. ⭐ 22k · Python · _thêm 2026-10-26_

## Framework xây ứng dụng LLM

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — Framework phổ biến nhất để xây agent và ứng dụng LLM (kèm LangGraph). ⭐ 148k · Python · _thêm 2026-10-25_
- [langgenius/dify](https://github.com/langgenius/dify) — Nền tảng low-code xây workflow agent và pipeline RAG, tự host được. ⭐ 159k · Python · _thêm 2026-10-25_
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — Lớp bộ nhớ dài hạn cho agent và ứng dụng AI. ⭐ 68k · Python · _thêm 2026-10-25_
- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) — Nén log, file, chunk RAG trước khi gửi vào LLM để giảm token mà giữ nguyên kết quả. ⭐ 78k · Python · _thêm 2026-10-25_
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — Nền tảng observability và eval cho ứng dụng LLM/agent: trace, chấm điểm, quản lý prompt, tự host được. ⭐ 36k · TypeScript · _thêm 2026-10-25_
- [qdrant/qdrant](https://github.com/qdrant/qdrant) — Vector database và engine tìm kiếm tương đồng viết bằng Rust, nhanh, làm nền tảng vững cho RAG và semantic search. ⭐ 35k · Rust · _thêm 2026-10-27_

## Thu thập dữ liệu web cho AI

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — Biến website thành Markdown/dữ liệu sạch cho agent và RAG. ⭐ 195k · TypeScript · _thêm 2026-10-25_
- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) — Crawler mã nguồn mở, xuất Markdown thân thiện với LLM, tự chạy được. ⭐ 86k · Python · _thêm 2026-10-25_
- [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) — Framework scraping thích ứng, vượt chống bot, từ một request đến crawl quy mô lớn, có sẵn MCP server. ⭐ 90k · Python · _thêm 2026-10-25_
- [firecrawl/anydoc](https://github.com/firecrawl/anydoc) — Chuyển Word, PowerPoint, Excel, EPUB, PDF… sang Markdown sạch cho LLM, lõi Rust có binding Node.js và Python. ⭐ 23k · Rust · _thêm 2026-10-25_
