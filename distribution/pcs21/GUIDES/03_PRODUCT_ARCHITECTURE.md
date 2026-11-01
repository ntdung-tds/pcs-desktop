# 03 — Product Intelligence & Architecture Intelligence

## Tối thiểu đủ để agent có bản đồ tổng thể
1. **Product Map:** mục tiêu, nhóm người dùng, kịch bản chính, danh sách capability, phạm vi không làm, tình trạng CURRENT/TARGET/PROPOSED, KPI và chuẩn nghiệm thu.
2. **System Context:** các actor, hệ thống bên ngoài, dữ liệu và ranh giới tin cậy; bảo đảm agent không vô tình gộp tài khoản CRM với danh tính đăng nhập.
3. **Architecture Map:** service/container/module, vai trò, dependency, API/events, nguồn chuẩn dữ liệu, security boundaries, triển khai/quan trắc/khôi phục.
4. **Contract Map:** service produces/consumes endpoints/events/schemas; version và compatibility policy. Có thể dùng OpenAPI/JSON Schema hay contract tests khi cần.
5. **Flow Map:** luồng người dùng đi qua nhiều module và tiêu chí E2E; module hoàn thành không đồng nghĩa luồng hoàn thành.

Tài liệu là **bản đồ ngắn và đường dẫn tới nguồn sâu hơn**, không phải prompt toàn bộ codebase. Cho agent tự tìm các file và đường đi phụ thuộc, mở rộng context theo thay đổi thực tế.

## Cấp nghiệm thu
- TASK TECH_DONE: phần kỹ thuật cụ thể xong và có evidence.
- TASK ACCEPTED: DoD đúng loại output và chủ sở hữu theo chính sách đã duyệt.
- FEATURE ACCEPTED: các task cần thiết, API/consumer, bảo mật và integration PASS.
- FLOW ACCEPTED: journey end-to-end thật PASS trên môi trường xác định.
- RELEASE APPROVED/DEPLOYED: luồng bắt buộc, bảo mật, rollback, môi trường, owner approval. Production là quyết định riêng.

## Phân tích tác động không làm agent cứng nhắc
Phân loại thay đổi: local, contract-facing, data, security, operations. Với thay đổi local nhỏ, tìm đúng code/test liên quan. Khi thay đổi API/schema/auth, tìm provider + consumer, dữ liệu, migrations, audit, rollback, negative tests, downstream journey. Viết ADR khi có phương án kiến trúc thay đổi đáng kể. Nếu sơ đồ cũ trái code, kiểm chứng code/runtime, ghi drift, không làm theo sơ đồ sai.

## Tư duy ưu tiên end-to-end
Phân tích, thiết kế, triển khai theo **vertical slice** cung cấp kết quả nhìn thấy được, không tách cứng toàn bộ frontend rồi backend rồi test nếu sẽ tăng rủi ro tích hợp. Có thể thử nghiệm hoặc tách nghiên cứu song song khi độc lập. Agent chọn chiến lược, PCS chỉ kiểm soát đầu ra và sự thật đã được kiểm chứng.
