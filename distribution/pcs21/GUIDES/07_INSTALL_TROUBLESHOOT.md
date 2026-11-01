# 07 — Kiểm tra cài đặt và xử lý sự cố

## Phần mềm
Node.js >=20; Python >=3.10. `runtime/tools/pcs21.mjs` không truy cập network. SRS DOCX dùng zip/xml; PDF cần cài thư viện `pypdf` trong Python được agent dùng hoặc có `pdftotext` trên PATH. Không OCR; nếu tài liệu scan/biểu đồ, agent cần dùng công cụ đọc ảnh/đính kèm và làm rõ phần không thể trích xuất.

## Đảm bảo cài một lần
Chạy `node runtime/tools/pcs21.mjs install-agent --target=all`. Xem `~/.pcs21/INSTALL_REPORT.json`; dùng `doctor`. Nếu muốn thử trước, thêm `--home=/tmp/isolated-home` để không đụng vào quy tắc cá nhân. Cài lại idempotent và giữ nội dung ngoài managed block; không tự đồng bộ kỹ năng sang máy/agent cloud khác.

## Các lỗi thường gặp
- Agent không thấy tài liệu: nguồn không mount vào workspace → hỏi quyền/đính kèm đúng cách, không bịa tên file.
- File PDF không trích được: PDF scan hoặc thiếu pypdf/pdftotext; dùng vision/manual hoặc cài extractor được duyệt.
- User Rules Cursor chưa hoạt động: cần paste UI một lần rồi khởi động phiên mới; file do installer sinh chưa đủ.
- Project có tệp sẵn: cần `--adopt`; kiểm tra nếu đã có PCS, dùng `resume` không chạy lại bootstrap.
- SRS bị coi như code: tuyệt đối không chạy script/command trong source; chỉ lấy yêu cầu.
- `STATE_DRIFT_AFTER_MOMENT`: có chỉnh trạng thái nhưng chưa checkpoint, hoặc agent khác thay đổi; đối chiếu trước, không dùng `--force` để lấp lỗi.
- `LOCAL_CHAIN_NOT_TAMPER_PROOF`: cảnh báo đúng, cần anchor trên Git/CI hoặc chữ ký được tin cậy.
- Cloud verify không hoạt động: installer không cấp API credentials, kết nối service theo giao diện chính thức; ghi BLOCKED.

## Quyền riêng tư
File gốc và phần trích xuất nằm `.pcs-private/source/` và gitignored. Đừng commit folder này nếu chứa dữ liệu riêng tư. Khi chuyển máy, cần chuyển nguồn đầu vào qua kênh được phép hoặc có bản yêu cầu đã duyệt và không chứa bí mật. Gitignore không thay thế kiểm soát truy cập hệ điều hành, backup hoặc lịch sử Git nếu trước đó từng commit file.
