# 02. Agent cần hiểu ứng dụng như thế nào?

## Product Map là một bản đồ, không phải tiểu thuyết
Phải thể hiện personas, business capabilities, user journey, CURRENT (code/run evidence), TARGET (đã duyệt) và PROPOSED (chưa duyệt). Một agent nhận yêu cầu “làm tiếp CRM” có thể xác định feature/flow hiện tại và những phần đang thiếu thay vì chỉ sửa một file.

## Architecture Map theo nhu cầu
1. Hệ thống/người dùng/biên tin cậy (System Context).
2. Các container/service, ownership, data authority, deploy environment (Container view).
3. Component/API/schema/event khi task ảnh hưởng logic liên phân hệ; C4 cấp sâu hơn là **tùy nhu cầu**, không bắt buộc.
4. Source links: code paths, migrations, tests, deployed SHA. Docs đã cũ phải được phát hiện chứ không được coi là truth tuyệt đối.

## Kiểm tra ảnh hưởng trước thay đổi đáng kể
- Tìm provider, consumers, data contract, API backward compatibility, permission/scope/tenant, event/retry/race, UI, background jobs, monitoring/rollback.
- Tối thiểu dùng tìm kiếm code, tests, network topology và static contract; không cần dựng dependency graph tới từng function.
- Với ranh giới provider/consumer, xem xét contract tests. Đừng tự tạo OpenAPI khi API chưa được thiết kế; không phỏng đoán route.
- Sau thay đổi: test tại component và business flow khi có ảnh hưởng; nếu E2E không thể chạy, ghi NOT_RUN/BLOCKED rõ ràng.

## Trách nhiệm đi kèm tự chủ
Agent có quyền phản biện kiến trúc, chọn phương án mới, thêm test và sửa các bên liên quan, miễn quyền thao tác hợp lệ. Material change cần ADR rõ alternatives/trade-off/rollback. Đừng khóa “luôn dùng X” nếu X chỉ là gợi ý.
