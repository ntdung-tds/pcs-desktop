# 08 — Nâng cấp từ PCS 2.0 sang 2.1

PCS 2.1 giữ nguyên schema state v2.0 và CLI `tools/pcs.mjs`. Điểm mới là cài ở cấp agent/user và tự bootstrap từ source. **Không thay file PCS của dự án đang vận hành chỉ vì có v2.1.**

1. Sao lưu repo, xác định branch/commit hiện có. Nếu đã có PCS 2.0, chạy `node tools/pcs.mjs verify`; giữ nguyên Moments lịch sử.
2. Cài PCS 2.1 ở cấp user một lần (không copy Starter thủ công). Trong repo đang có PCS, yêu cầu agent `resume` và lập adoption assessment; không gọi bootstrap để chép đè.
3. Nếu repo chưa có PCS, gọi bootstrap với `--adopt`, giữ file application/doc/CI hiện tại. Script sẽ từ chối khi phát hiện cấu trúc PCS không nhất quán thay vì đoán.
4. Rà soát xung đột hướng dẫn AGENTS/CLAUDE/GEMINI, policy phát hành, quyền và naming. Giữ policies nghiêm ngặt hơn đã duyệt; không mở production.
5. Tạo Product Map/Architecture Map được kiểm chứng từ code, không dùng nội dung mẫu. Chuyển dần Issue/Tasks/Feature/Flow mà không xóa lịch sử.
6. Test lại unit/CI/live theo nguồn; chỉ sau đó tuyên bố migration hoàn tất.

Những thay đổi tự động được gọi là cài công cụ, **không** phải migration nghiệp vụ, không thực hiện database migration hay đổi Worker runtime.
