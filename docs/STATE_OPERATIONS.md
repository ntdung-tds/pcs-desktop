# PCS Desktop 2.1 — state và an toàn vận hành

Bản Desktop có hai cách dùng. **Prompt-first** dùng sẵn công cụ của coding AI và không yêu cầu cài PCS. **Native PCS 2.1** có bộ cài một lần, runtime/Node 20+ và Python theo gói gốc. Giữ nguyên 103 file legacy; không nhập schema của Solo hay Multi-Agent.

## Tiết kiệm context
Nếu đã có project PCS 2.1, đọc `pcs/current.json`, trạng thái Moment mới nhất và chỉ các task/feature/flow liên quan, cùng mã/test mới thay đổi. Agent dùng `node tools/pcs.mjs resume` và `verify` khi runtime 2.1 thực sự đã cài. Không coi `pcs/current.json` là danh sách task đầy đủ — đây là pointer/checksum tới Moment. Không tự sửa các file sinh tự động.

## Read-only inspect/diff TÙY CHỌN
Với coding AI đã có Node.js:
```bash
node tools/pcs-desktop-inspect.mjs inspect --root=/path/to/project --group=tasks --limit=12
node tools/pcs-desktop-inspect.mjs diff --before=/path/to/snapshot1 --after=/path/to/snapshot2
```
Công cụ chỉ xem `pcs/project.json`, `current.json`, `tasks.json`, `features.json`, `flows.json`, `releases.json`; in ID/trạng thái/tên trường thay đổi, tối đa 50 mục. Không tự chỉnh/ghi file và không thay thế `pcs.mjs verify` hay nghiệm thu với nguồn thật. Khi thiếu Node, agent có thể đọc các file liên quan qua quyền truy cập workspace sẵn có.

## Public hoặc Private
Owner quyết định quyền hiển thị repo. Nếu chưa lựa chọn khi cần tạo mới, phải hỏi. Repo Public cần review toàn bộ dữ liệu, mã nguồn, commit history, Issue/PR, artifact. Không cho credential, dữ liệu INTERNAL/CONFIDENTIAL/RESTRICTED vào Public; repo Private cũng không phải secret manager. Backup và mã hóa khi cần phải dùng khả năng thật của nền tảng đã được cấp quyền; **PCS Desktop 2.1 không có KMS/rotation service**.

## Rủi ro còn lại
- Không có bằng chứng toàn bộ installer hoạt động ở mọi hệ điều hành/IDE.
- Không có xác nhận E2E nhiều phiên/connector trên máy của Owner; CI chỉ chạy source tests và file integrity.
- State diff là kiểm tra cấu trúc, không xác nhận ý nghĩa nghiệp vụ, approval, test hoặc quyền GitHub.
- Coding AI không có quyền đọc/ghi/chạy thì phải báo BLOCKED, không báo DONE.
