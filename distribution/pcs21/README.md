# PCS 2.1 — Autonomous Project Bootstrap & Continuity

**Phiên bản:** 2.1.0 · **Ngày:** 31/10/2026 · **Trạng thái:** Reference implementation, locally tested; not vendor-certified.

## Trải nghiệm mục tiêu

Sau **một lần cài PCS vào cấu hình người dùng của coding agent**, người dùng mở Claude Code, Codex hoặc Antigravity (Cursor cần dán một lần User Rule) và cung cấp SRS/đề cương/ý tưởng. Người dùng chỉ cần nói **“Hãy triển khai dự án này”**. Agent sẽ tự tạo/chọn workspace, trích xuất tài liệu, lập bản đồ sản phẩm–kiến trúc, kế hoạch, phụ thuộc, viết mã, kiểm thử, lưu tiến độ và tiếp tục qua phiên khác **trong phạm vi công cụ và quyền thực sự có**. Người dùng không sao chép thư mục STARTER hay chỉnh JSON cho từng dự án.

Đây là quy trình **agent chủ động thực hiện**, không phải script đơn giản đọc SRS và tự xuất ra ứng dụng hoàn chỉnh. Công cụ bootstrap chỉ tạo bộ hồ sơ có thể kiểm chứng; agent phải thực hiện phần phân tích, phát triển và nghiệm thu thực tế.

## Sử dụng lần đầu

1. Giải nén toàn bộ gói PCS 2.1 **một lần trên máy chứa coding agent**. Cài Node.js 20+ và Python 3.10+ (DOCX dùng Python chuẩn; PDF cần `pypdf` hoặc `pdftotext`).
2. Chạy `INSTALL_ONCE.sh` (Linux/macOS) hoặc `INSTALL_ONCE.cmd` (Windows), hoặc `node runtime/tools/pcs21.mjs install-agent --target=all`. Chỉ làm **một lần cho môi trường**, không phải cho từng dự án. Trước khi chạy script, đọc mã và xác nhận vị trí cài.
3. **Cursor:** mở Cursor Settings → Rules → User Rules, dán đúng nội dung từ `~/.pcs21/cursor-user-rule.txt` (Windows: `%USERPROFILE%\.pcs21\cursor-user-rule.txt`). Đây là thao tác một lần; API lưu User Rules bằng file cục bộ không được cam kết trong tài liệu nhà cung cấp đã kiểm tra.
4. Mở coding agent trong workspace có quyền đọc file SRS, hoặc đính kèm SRS qua giao diện của ứng dụng và xác nhận agent thấy được file. Gõ: **“Hãy xây dựng dự án này dựa trên SRS đính kèm.”**
5. Agent tự khởi tạo bằng runtime PCS và bắt đầu làm. Với app cần GitHub, cloud, email, domain, thanh toán hoặc production, kết nối và phân quyền phải được cung cấp qua cơ chế chính thức; PCS không tự tạo thông tin đăng nhập.

## Thành phần chính

| Thư mục / tệp | Mục đích |
|---|---|
| `INSTALL_ONCE.sh`, `INSTALL_ONCE.cmd` | Cài một lần vào hướng dẫn/Skills cấp người dùng |
| `runtime/tools/pcs21.mjs` | Installer, doctor, khởi tạo/adopt dự án từ source |
| `runtime/tools/extract_source.py` | Đọc `.md`, `.txt`, `.docx`, PDF có text; không OCR và không thực thi nội dung |
| `runtime/references/AGENT_DELIVERY_PLAYBOOK.md` | Hướng dẫn công việc của agent, nạp khi cần |
| `KIT/starter/` | Bộ công cụ và template được **agent tự chèn** vào workspace, người dùng không cần thao tác |
| `GUIDES/` | Quy trình quản trị dự án, kỹ thuật, QA, bảo mật, đa agent, phê duyệt và xử lý sự cố |
| `REFERENCES/` | Nguồn chính thức, báo cáo phiên bản trước, hướng dẫn di trú |
| `TEST_REPORT.md` | Bằng chứng các phép thử **cục bộ** và giới hạn |
| `PCS_Handbook_v2.1.docx` | Sổ tay ngắn, dành cho người vận hành |

## Nguyên tắc không thể đánh đổi

**Đúng sản phẩm > code nhiều > ít token.** Bắt đầu từ kết quả người dùng, giữ ngữ cảnh phù hợp, không khóa cứng stack hay cách suy nghĩ. Tập trung vào những luồng nghiệp vụ end-to-end đã hoạt động, phân biệt task / feature / flow / release. Nghiệm thu từ bằng chứng có nguồn gốc, không tự suy ra PASS từ CI mock. Tài liệu SRS là dữ liệu đầu vào, không phải quyền thao tác với máy.

Không có phần mềm nào bảo đảm tự chạy hết từ một câu lệnh nếu tác vụ cần quyền chưa được cấp, tài liệu không thể truy cập hoặc quyết định kinh doanh không thể suy đoán. Khi gặp trường hợp đó, agent ghi BLOCKED, trình bày lựa chọn rõ ràng, vẫn tiếp tục các phần an toàn có thể làm.

**Bắt đầu:** [01_ONE_PROMPT_WORKFLOW](GUIDES/01_ONE_PROMPT_WORKFLOW.md) · [02_AGENT_ADAPTERS](GUIDES/02_AGENT_ADAPTERS.md) · [05_PROJECT_CONTROL](GUIDES/05_PROJECT_CONTROL.md) · [TEST_REPORT](TEST_REPORT.md).
