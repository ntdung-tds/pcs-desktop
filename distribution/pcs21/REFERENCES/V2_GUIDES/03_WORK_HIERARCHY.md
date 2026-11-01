# 03. Task khác Feature khác Business Flow khác Release

**Task**: phần việc kỹ thuật có DoD bounded, trạng thái TODO → IN_PROGRESS → TECH_DONE → ACCEPTED khi đủ bằng chứng theo loại artifact. **Feature**: chức năng người dùng thật; cần required tasks + integration PASS + evidence + acceptance. **Flow**: luồng xuyên hệ thống; required features + E2E PASS + evidence. **Release**: nhóm flow trọng yếu, security, rollback, approval. Tầng dưới xong không auto đóng tầng trên.

## Dependencies linh hoạt
`soft` = agent cân nhắc, không tự block; `start` = prerequisite đạt TECH_DONE/ACCEPTED mới bắt đầu; `accept` = prerequisite được ACCEPTED trước khi task phụ thuộc được ACCEPTED. Không tạo vòng cứng; phụ thuộc phải có nguồn. Cross-domain dependencies ở cấp feature/flow cũng có thể biểu diễn bằng `required_tasks`/`required_features` và contract links.

## Ví dụ CMS Media
- Upload API TECH_DONE không có nghĩa CMS Media feature ACCEPTED.
- D1 metadata + R2 binding + IAM authorization + Editor UI + Newsroom consumer + negative tests có thể là các task riêng.
- Feature CMS Media chỉ accept khi trải nghiệm người dùng và tích hợp thực tế đúng trong môi trường được chỉ rõ.
- Flow “đăng bài có ảnh” chỉ accept khi upload → review → publish → public image E2E PASS; mọi missing step có chủ sở hữu.

## Không đếm % sai
Số task hoàn thành chỉ là tỷ lệ trên số task được liệt kê. Không gọi đó là 60% sản phẩm hoặc 60% giá trị khi trọng số/feature gates chưa tương ứng. Dùng flow acceptance và trạng thái blocker để báo cáo kết quả.
