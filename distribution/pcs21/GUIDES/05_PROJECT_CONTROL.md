# 05 — Quản trị dự án trọn vòng đời, vừa đủ với quy mô

PCS không thay PM chuyên trách. Nó duy trì traceability, tiến độ và quyết định, đưa mẫu vào thực tế tùy quy mô.

| Giai đoạn | Tối thiểu phải có | Tài liệu thêm khi cần |
|---|---|---|
| Đề xuất/khởi tạo | mục tiêu, stakeholder, phạm vi dự kiến, nguồn yêu cầu, tiêu chí thành công | business case, nhà tài trợ, phân tích khả thi |
| Phân tích | SRS traceability, giả định/rủi ro, Product & Flow Maps | mô hình nghiệp vụ, use cases, NFR matrix |
| Thiết kế | Architecture Map, API/data/security contracts, ADR quan trọng | threat model, C4 chi tiết, cost/TCO, vendor evaluation |
| Thực hiện | task/owner, dependencies, DoD, source/ref, test & evidence, moment | capacity, budget, earned-value, procurement, change requests |
| Kiểm thử | test plan & cases, run ledger, defect triage, regression | load, pen-test, accessibility, privacy assessment |
| Phát hành | môi trường, exact source, release gate, rollback, approval | SRE/incident drill, canary, DR/BCP |
| Bàn giao | inventory, hướng dẫn vận hành, quyền, known issues, acceptance | hợp đồng, bảo hành, đào tạo, lưu trữ |

## Các quy tắc trạng thái
`TODO / READY / IN_PROGRESS / BLOCKED / IN_REVIEW / TECH_DONE / ACCEPTED / DEFERRED / CANCELLED` dùng cho TASK. Feature, Flow, Release có trạng thái riêng; không dùng tổng phần trăm giả cho toàn dự án. Ghi rõ ai phê duyệt, mức độ nghiệm thu và bằng chứng. SRS gốc là đầu vào; bản thay đổi có version/decision, không ghi đè không truy vết.

## Ai làm gì
Business owner quyết định giá trị và thay đổi lớn. Agent có thể làm kỹ thuật/đề xuất, không tự ký nghiệm thu thay người có thẩm quyền. Quality reviewer đánh giá test; release owner có quyền phát hành. Với dự án nhỏ một người có thể giữ nhiều vai nhưng phải ghi danh nghĩa rõ, tránh máy tự giả người duyệt.

## Tổ chức làm việc
Nhóm nhỏ các công việc có liên kết, ưu tiên vertical slice; ghi blocked với nguyên nhân và điều kiện unblock. Không áp mốc thời gian giả. Tần suất báo cáo theo ý nghĩa: thay đổi scope, checkpoint, integration, QA, release, handoff; không bắt agent viết nhật ký sau từng thao tác.
