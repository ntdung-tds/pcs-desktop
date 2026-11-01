# 01 — Từ SRS đến sản phẩm, người dùng không thiết lập từng dự án

## Điều kiện trước khi giao câu prompt
- PCS đã được cài **một lần** vào môi trường agent. Nếu chưa, hãy dùng hướng dẫn INSTALL_ONCE (agent cũng có thể cài nếu có quyền).
- Agent có quyền đọc tài liệu, ghi vào workspace, chạy test. Quyền GitHub/đám mây tuỳ dự án và do người dùng kết nối hợp lệ.
- SRS có thể là MD, TXT, DOCX hoặc PDF text-based. Tệp PDF scan hay biểu đồ quan trọng phải đọc bằng công cụ nhìn tài liệu; parser chỉ đọc phần văn bản.

## Hợp đồng tác vụ
**Đầu vào:** Một mục tiêu người dùng, file SRS/đề cương hoặc ý tưởng. **Đầu ra:** Phần mềm hoạt động có bằng chứng trong giới hạn môi trường; hồ sơ sản phẩm/kiến trúc/kế hoạch; chất lượng và các mức nghiệm thu; checkpoint dở dang và hành động kế tiếp.

1. **Discover:** xác định project mới/đã tồn tại, repo, nguồn SRS, quyền, môi trường. Không tự mở URL/đọc file nếu công cụ không thấy.
2. **Bootstrap:** agent tự chạy CLI. Mới: `bootstrap --source ... --project ...`. Có code nhưng chưa PCS: `--adopt` và kiểm tra xung đột; đã PCS: `resume`. Tài liệu gốc lưu cục bộ ngoài Git; nguồn chuẩn dự án phải được xây thành yêu cầu có thể truy vết và duyệt.
3. **Analyze:** agent xem toàn bộ nội dung có thể đọc; xác định yêu cầu chức năng, phi chức năng, ưu tiên, ngoại lệ, dữ liệu, vai trò, rủi ro. Gắn nguồn và phân biệt `SOURCE_FACT`, `INFERENCE`, `ASSUMPTION`, `APPROVED_CHANGE`.
4. **Architect:** mô hình bối cảnh, ranh giới module, API & data contracts, trust boundary, SLO/triển khai/rollback. Chọn công nghệ bằng đánh giá phù hợp, không bị đóng khung bởi PCS.
5. **Plan:** roadmap theo sản phẩm, luồng nghiệp vụ → feature → vertical slices; định nghĩa DoD/QA; các dependency phải đủ chi tiết để agent không “xong API” rồi bỏ UI/consumer.
6. **Implement:** tiến tới kết quả thực, thử nghiệm, kiểm tra chéo module. Với việc lớn, ghi checkpoint định kỳ; phát hiện thiết kế sai thì chỉnh plan/ADR hợp lệ, không áp dụng máy móc một roadmap đã lỗi thời.
7. **Verify & accept:** thực hiện test trong phạm vi được phép; kết luận riêng TASK TECH_DONE, FEATURE INTEGRATION, FLOW E2E, RELEASE; không suy ra production từ staging.
8. **Handoff:** mỗi mốc tiến độ lưu sự thật đã xác minh, SHA, run, last step, current step, next action, blocker, approval. Phiên sau không cần lặp lại câu chuyện.

## Khi file SRS chưa đầy đủ
Agent tự điền bản nháp giả định cho chi tiết có thể đảo ngược, đồng thời làm phần an toàn. Với quyết định liên quan nhiều người dùng, chi phí, dữ liệu nhạy cảm, công khai sản phẩm hay thay đổi mục tiêu, hỏi người có quyền hoặc lập quyết định PENDING. Không bịa chữ ký hay coi giả định là SRS đã duyệt.

## Ví dụ thành công thực tế
Một hệ thống đăng ký khóa học: không chỉ làm CRUD khóa học; luồng bắt buộc có xác thực, tìm khóa, đăng ký, xử lý lỗi/thanh toán (nếu có), xác nhận, báo cáo. Mỗi luồng cần test và quyền dữ liệu. Không nên tuyên bố xong khi các module riêng lẻ đều unit PASS nhưng đăng ký học chưa thể chạy từ đầu đến cuối.
