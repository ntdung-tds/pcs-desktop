# 02 — Tương thích Claude Code, Codex, Cursor, Antigravity

Các cấu hình bên dưới là cách **kích hoạt lại quy trình PCS** sau cài một lần, không mở thêm quyền truy cập. Chúng có thể khác nhau giữa bản desktop/cloud/CLI của nhà cung cấp; xác nhận môi trường cụ thể trước khi nhận là tự động.

| Agent | Bootstrap cấp người dùng | Trạng thái cài đặt PCS 2.1 |
|---|---|---|
| Claude Code | `~/.claude/CLAUDE.md` + `~/.claude/skills/pcs-autoproject/SKILL.md` | Installer tự thêm managed block và Skill, giữ nguyên hướng dẫn cũ |
| Codex CLI/app | `~/.codex/AGENTS.md` + `~/.agents/skills/pcs-autoproject/SKILL.md` | Installer ghi vào thư mục user; kiểm tra giao diện/phiên có nạp instruction |
| Antigravity | `~/.gemini/GEMINI.md` + `~/.gemini/config/skills/pcs-autoproject/SKILL.md` | Theo Google codelabs, installer cài cấp user |
| Cursor | User Rules ở Settings; Project Rules `.cursor/rules` | Installer **chỉ sinh** `~/.pcs21/cursor-user-rule.txt`; người dùng dán vào UI một lần. Project Rules sẽ do bootstrap tạo khi làm dự án |

## Không nhầm lẫn các khả năng
- Tập tin cấu hình nằm trên máy A không đảm bảo phiên agent trên cloud B đọc được nó. Cần kiểm tra môi trường/đồng bộ/cài ở cloud environment tương ứng.
- `AGENTS.md` không tự đồng nghĩa Claude Code nạp nó. Có `CLAUDE.md` adapter; không phụ thuộc một mẹo không được hỗ trợ.
- Không cài đặt thành công chỉ vì một file xuất hiện. Kiểm tra bằng câu hỏi agent: “Bạn có nhận được PCS AutoProject skill/hướng dẫn nào?”; yêu cầu chạy `doctor` trước dự án thí điểm.
- Codex/Claude/Cursor/Antigravity còn tuân theo chính sách tool/sandbox của phiên làm việc; hướng dẫn PCS không nâng quyền.

## Nguồn chính thức để xem lại khi nền tảng thay đổi
- Claude Code memory: https://code.claude.com/docs/en/memory
- Claude Code skills: https://code.claude.com/docs/en/skills
- Codex agent instructions: https://developers.openai.com/codex/guides/agents-md
- Cursor rules: https://docs.cursor.com/context/rules-for-ai
- Antigravity rules/workflows: https://codelabs.developers.google.com/getting-started-agy-ide
- Antigravity skills: https://codelabs.developers.google.com/getting-started-with-antigravity-skills

## Cài không gây hại
Installer dùng managed block, không viết lại cả tệp hướng dẫn. Nếu managed block bị vỡ, nó dừng và báo để người dùng kiểm tra. Không tự đặt credentials, không bật dangerous/allow-all, không tự sửa cấu hình privacy hay quyền production. Chạy thử với `--home=/sandbox` trước khi cài thật nếu cần. `doctor` chỉ xác minh tài nguyên và tệp, không xác minh quyền kết nối ngoài.
