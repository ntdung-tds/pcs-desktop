# PCS Desktop — Prompt-first

Sao chép và gửi cho Claude Code, Codex, Cursor, Antigravity hoặc coding AI có quyền truy cập workspace dự án:

```text
Hãy triển khai hoặc tiếp tục dự án của tôi dựa trên yêu cầu/SRS và mã nguồn thực tế.

Dùng https://github.com/ntdung-tds/pcs-desktop: trước tiên chỉ đọc START_HERE.md, rồi đọc trạng thái/Moment và mã, kiến trúc, bài test liên quan trong dự án của tôi. Không đọc toàn bộ bộ cài hoặc handbook. Tự phân tích, lập kế hoạch, triển khai, kiểm thử thực và ghi tiến độ bằng công cụ đang có; không bắt tôi cài Python hay Node.js chỉ để sử dụng hướng dẫn PCS.

Repository GitHub có thể Public hoặc Private theo lựa chọn của tôi; nếu cần tạo mới mà chưa rõ, hãy hỏi tôi. Không công khai dữ liệu nhạy cảm hoặc keys; không giả vờ có quyền, đã test, đã deploy hay checkpoint. Với dự án cũ, giữ nguyên PCS 2.1 state format và dùng đúng phiên bản code hiện tại.

Tôi nghiệm thu tính năng/mốc; bạn tự chủ xử lý việc kỹ thuật trong phạm vi quyền. Chỉ xin phê duyệt khi thay đổi production, quyền, dữ liệu, chi phí hoặc rủi ro đáng kể. Cuối mỗi chặng, báo kết quả, test/bằng chứng, GitHub commit hoặc điểm khôi phục, blocker và bước tiếp theo.
```

Bản cài PCS 2.1 chỉ dùng nếu muốn tích hợp quy tắc/skill tự động vào coding agent trên máy; xem [README](README.md).

## Lệnh tiếp tục chuẩn

```text
Tiếp tục dự án theo PCS, sử dụng trạng thái mới nhất trên GitHub.
```

Khi đã biết repository hoặc workspace dự án, AI tiếp tục từ `pcs/current.json` và Moment hiện hành, đối chiếu revision và commit nếu có GitHub, chỉ đọc mã và test liên quan, thực hiện công việc rồi checkpoint theo định dạng PCS Desktop hiện có. Không đọc lại toàn bộ hướng dẫn. Nếu chưa rõ dự án, hỏi liên kết repository hoặc workspace; nếu không có quyền GitHub, báo rõ chưa đồng bộ.
