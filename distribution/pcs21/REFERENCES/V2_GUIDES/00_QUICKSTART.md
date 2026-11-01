# 00. Bắt đầu trong 5 phút

**PCS v2.0 là bộ quản trị + định hướng agent, không phải agent framework hoặc plugin tự deploy.** Mục tiêu: ứng dụng đúng, hoàn thiện đủ luồng, tiếp nối công việc an toàn.

1. Sao chép **toàn bộ nội dung** `STARTER/` vào root repository mới. Với repository đang tồn tại, đừng ghi đè AGENTS.md/CI; xem `REFERENCES/MIGRATION_V1.md` và review diff.
2. Mở `docs/project/PRODUCT_MAP.md`, `ARCHITECTURE_MAP.md`, `CHARTER.md`, `PLAN.md`; ghi **CURRENT / TARGET / PROPOSED**, nguồn kiểm chứng và ranh giới quyền; không tạo thành tích giả.
3. Cập nhật `pcs/project.json`, `tasks.json`, `features.json`, `flows.json`, `releases.json`. Chỉ tạo quan hệ khi có nhu cầu; không ép tất cả dự án phải có hàng chục feature.
4. Chạy `node tools/pcs.mjs resume --json` lấy `base_revision`. Sửa dữ liệu liên quan, chạy `node tools/pcs.mjs checkpoint --reason=init --expect=<base_revision>` rồi `node tools/pcs.mjs verify`.
5. Giao agent câu lệnh đơn giản: “Tiếp tục [mục tiêu], kiểm tra tác động liên phân hệ khi cần, tự chọn giải pháp, kiểm thử thực tế, cập nhật PCS và báo rõ phần chưa nghiệm thu.”
6. Sau batch lớn hoặc trước chuyển phiên: chốt Moment, ghi code SHA/test run/đường dẫn bằng chứng, kiến trúc khác biệt, **next action chính xác**. Chuyển agent không bắt đầu lại từ đầu.

Test local `node --test tools/pcs.test.mjs`. Khả năng đọc `AGENTS.md`/`CLAUDE.md`/Cursor rule/Antigravity skill cần kiểm tra trên phiên bản công cụ của bạn; **không khẳng định đã kiểm thử tích hợp thực tế** khi mới chạy test CLI.
