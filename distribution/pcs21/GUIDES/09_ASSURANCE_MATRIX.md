# 09 — Ma trận kiểm định và giới hạn

| Khía cạnh | Bằng chứng cần có | Không được suy ra |
|---|---|---|
| Installer | đường dẫn cấp user đúng, managed blocks idempotent, giữ rule cũ | phiên IDE thực sự đã nạp rule/skill |
| SRS ingestion | hash đúng, đủ text, cảnh báo non-text, nguồn riêng tư | agent đã hiểu toàn bộ biểu đồ hoặc SRS đã được phê duyệt |
| Bootstrap | trạng thái project, task active, moment đầy đủ, verify PASS | mã ứng dụng hoặc CI đã tồn tại |
| Autonomous development | feature, contract, source code, test run, UI/flows | chỉ có plan/checklist = app hoàn thành |
| Existing project | không thay file app/docs cũ, ghi assessment | trạng thái ứng dụng đã được đánh giá toàn diện |
| Dependency management | providers/consumers + failed/changed tests | module unit pass = flow pass |
| Security | least privilege, no secrets, approval for high risk | prompt hoặc YAML tự cấp quyền production |
| Vendor compatibility | cấu hình đúng tên và đường dẫn theo docs | bốn ứng dụng thực sự đã thực thi end-to-end |
| Restore | snapshot state đầy đủ + hash chain | rollback database, cloud hay tamper-proof external |
| Efficiency | correctness, regressions, test quality, time-to-accept | giảm token là điều kiện bắt buộc |

## Test của người thật đề xuất
Chạy ít nhất 3 dự án SRS thật với Claude Code, Codex, Cursor và Antigravity (nếu có quyền truy cập). Mỗi bài đánh giá: khả năng thấy file; nạp skill; chất lượng requirements; ranh giới module; kết quả end-to-end; test chất lượng; QA negative; tiếp tục sau reset chat; sai lệch doc/code; các decision approvals. Ghi kết quả độc lập; **không tuyên bố tương thích đã được kiểm định thực tế** chỉ dựa vào bộ test cục bộ.
