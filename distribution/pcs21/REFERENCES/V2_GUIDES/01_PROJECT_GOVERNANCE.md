# 01. Quản trị dự án đầy đủ nhưng vừa đủ

## Bất biến quản trị
- **Why/What/Who:** Charter ghi mục tiêu, giá trị, scope/non-goals, người quyết định, giả định, giới hạn và success metrics.
- **How/When:** Plan có milestone, phụ thuộc, năng lực, nguồn lực, ngân sách, procurement nếu có, delivery/risk strategy. Không tự bịa ngày hoàn thành; nếu chưa được duyệt thì để `DRAFT`.
- **Work:** Issue tracker hoặc `pcs/tasks.json` là một nguồn chuẩn theo cấu hình. WBS theo **kết quả bàn giao**, tránh chia task vô nghĩa để đếm %.
- **Risk/Issue/Decision/Change:** risk là khả năng; issue là sự cố đang xảy ra; ADR là quyết định kiến trúc; change request là thay phạm vi/chi phí/schedule quan trọng. Mỗi loại ghi owner, trigger, tác động, quyết định, bằng chứng và ngày kiểm tra.
- **Stakeholders/Communications:** người duyệt thực tế; ai được xem tài liệu; lịch báo cáo theo nhịp dự án. AI không được tự đóng vai người duyệt.
- **Quality and governance:** DoR là rõ mục tiêu/nhận định/acceptance criteria/đầu vào; DoD là output có evidence; feature/flow/release gates tách biệt.
- **Closure:** nghiệm thu sản phẩm, tài liệu vận hành, dữ liệu/quyền truy cập, backup/restore, handover, retrospective và cách bảo trì. Kết thúc sprint không đồng nghĩa hoàn thành dự án.

## Profiles
- **Lite:** cá nhân/dự án nhỏ, dùng Charter ngắn, Plan, Task/Moment, test trọng yếu. Không cần mọi biểu mẫu.
- **Standard:** nhiều phân hệ, Product/Architecture Maps, feature/flow acceptance, risk/change, CI, QA và review.
- **Regulated/High-impact:** security/privacy/data-impact review, formal approvals, audit, external evidence attestation, stronger Git/CI access controls. Chỉ tuyên bố tuân thủ tiêu chuẩn khi đã được audit.

## Phân vai / authority
**Owner/Sponsor:** quyết định mục tiêu, kinh phí, production, phạm vi đặc biệt. **Product lead:** ưu tiên/phạm vi & nghiệm thu nghiệp vụ theo ủy quyền. **Engineering agent/team:** lựa chọn giải pháp, code, verify và tạo đề xuất. **QA/security:** xác nhận lớp kiểm tra, không giả mạo kết quả. Một vai trò có thể kiêm nhiệm khi phù hợp nhưng quyền phê duyệt quan trọng cần tách biệt.

## Quy trình thay đổi
Minor reversible code → tự thực hiện trong scope; interface/data contract → mô tả migration/consumer impact và test; production/sensitive/irreversible → owner approval và gate kỹ thuật trước write. Thay đổi milestone/scope lớn → change log và rebaseline, giữ lịch sử cũ.
