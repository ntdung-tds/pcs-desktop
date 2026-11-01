# 06 — Chất lượng, nghiệm thu và Moment đáng tin cậy

## Evidence
Mỗi kết luận có cấp độ và nguồn. Test run cần test ID, expected vs actual, layer (unit, integration, mock-browser, real-browser, stage/prod), role, source commit SHA, môi trường, ngày, lỗi, link screenshot Drive nếu có. Screenshot absent → NOT_CAPTURED; test chưa làm → NOT_RUN; browser quota → BLOCKED. Đừng biến PASS suite thành PASS từng case.

## Four-level gates
- TECH_DONE: output có bằng chứng kỹ thuật đúng phạm vi.
- FEATURE ACCEPTED: contract consumers và integration đã PASS, bằng chứng và approval hợp lệ.
- FLOW ACCEPTED: use case nhiều module E2E PASS, không bỏ qua đường lỗi/phân quyền liên quan.
- RELEASE: approval, security/privacy, rollback/DR, exact artifact SHA, môi trường, smoke sau deploy; không nhầm build thành deploy.

## Moment lifecycle
`resume` → verify reality → thực hiện → update state → `checkpoint --expect=<base_revision>` → `verify`. Moment lưu **full state** và liên kết SHA-256 với moment trước. `restore-preview` xem lịch sử, không tự rollback runtime. Đây là kiểm tra toàn vẹn **nội bộ**: để chống chỉnh sửa có chủ đích cần Git branch protection/CI anchor hoặc bản ký tin cậy.

## Điều phối nhiều agent
Một agent chính giữ mục tiêu và trạng thái. Agent phụ chỉ nên có phạm vi độc lập, contract rõ, worktree riêng và output có evidence. Không cho hai agent sửa đồng thời cùng state files; nếu xung đột, dùng stale/expected revision và đối chiếu, không xóa lock tùy tiện. Chỉ fan-out khi lợi ích chất lượng/tốc độ rõ.

## Hậu sự cố
Lưu symptom, reproduction, nguyên nhân, tác động, containment, thay đổi mã nguồn, regression tests, biện pháp phòng tránh, trạng thái release. Không chỉ đóng bug vì test cũ PASS.
