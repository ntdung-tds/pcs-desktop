# PCS Desktop — AutoProject 2.1.0

**Bản cho coding AI trên máy tính**, dùng được theo prompt-first hoặc tích hợp bộ cài 2.1 một lần (tùy chọn). Dành cho Claude Code, Codex, Antigravity và Cursor; không chứa quản trị Multi-Agent 3.2.

## Bộ nguồn chính thức
Toàn bộ **103 tệp gốc của PCS 2.1.0**, bao gồm installer, mã runtime, test, mẫu dự án và handbook, được lưu tại [`distribution/pcs21/`](distribution/pcs21/). Nguồn được lấy nguyên bản từ archive `PCS_2.1_LEGACY_ARCHIVE.zip` thuộc commit `08dd5ea5c1abd0cba7016a1ad352b05145223da1` của `ntdung-tds/pcs-universal`, Git blob `8201829c941d32d6b1371b87b8ec01dbc1f8fd36`.

## Bắt đầu ngay, không cần cài PCS

Sao chép [PROMPT.md](PROMPT.md) vào coding AI của bạn, hoặc cho AI đọc [START_HERE.md](START_HERE.md). AI dùng workspace, GitHub connector, terminal và công cụ sẵn có. Không bắt buộc cài Python/Node.js chỉ để sử dụng hướng dẫn; khả năng chạy code phụ thuộc ứng dụng AI. Repository dự án có thể **Public hoặc Private do Owner chọn**, nếu chưa có lựa chọn khi cần tạo mới thì AI phải hỏi. Không đưa dữ liệu mật vào repo Public.

**Skill tùy chọn, không phát sinh bộ cài mới:** PCS Desktop 2.1 đã có sẵn một Skill `pcs-continuity` trong gói native. Chỉ hoạt động nếu ứng dụng AI thực sự cài và nhận diện Skill. Cách dùng **Prompt-first** vẫn không cần Skill; không tạo thêm Skill riêng cho SRS, test hoặc checklist và không chỉnh sửa 103 file gốc.

## Cài một lần (tùy chọn)
Đọc [hướng dẫn cài PCS 2.1](distribution/pcs21/README.md) và kiểm tra script trước khi chạy. [Sổ tay đầy đủ](distribution/pcs21/PCS_Handbook_v2.1.docx) chỉ cần mở khi tra cứu hoặc gặp trường hợp đặc biệt; **không phải tài liệu bắt buộc nạp vào context mỗi phiên**. Sau khi clone repo, chạy `distribution/pcs21/INSTALL_ONCE.cmd` trên Windows hoặc `distribution/pcs21/INSTALL_ONCE.sh` trên macOS/Linux **sau khi xem và kiểm tra script**, với Node 20+ và Python 3.10+ theo hướng dẫn gốc. Không cần cài lại với mỗi dự án.

## Kiểm thử
```bash
cd distribution/pcs21
python VERIFY_PACKAGE.py
node --test runtime/tools/pcs21.test.mjs
```

Bản này quản lý trạng thái PCS 2.1 theo dự án, không chuyển sang schema PCS3. Không lưu khóa truy cập hoặc dự án riêng tư trong repository công khai này.

**Giới hạn:** các bài test trên CI kiểm tra toolkit, chưa chứng nhận installer hoạt động trên từng máy Windows/macOS/Linux và từng ứng dụng coding agent.

## Tối ưu context khi AI làm việc

**Không cho coding agent đọc toàn bộ 103 tệp PCS khi nhận yêu cầu dự án.** Việc cài một lần đã tạo quy tắc ở cấp người dùng và skill `pcs-autoproject`, hướng dẫn agent tìm workspace, khởi tạo hoặc tiếp tục dự án. Khi bắt đầu: (1) kiểm tra yêu cầu, workspace và quyền; (2) nếu đã có dự án, dùng project `AGENTS.md` / `node tools/pcs.mjs resume`; (3) đọc `pcs` state/Moment và chỉ mã nguồn, thiết kế, test liên quan. Khi mới khởi tạo, chỉ dùng template thông qua bootstrap, không đưa toàn bộ nội dung `KIT/` vào cửa sổ chat.

`distribution/pcs21/REFERENCES/`, `GUIDES/`, handbook DOCX, runtime source, schemas, template và test là **tài liệu tra cứu/công cụ**; chỉ mở khi gặp vấn đề tương ứng. Không cắt bớt các tệp này khỏi gói gốc vì bộ kiểm tra toàn vẹn và chức năng cài đặt phụ thuộc chúng. Tiết kiệm token bằng cách **chọn file để đọc**, không bằng cách xóa bừa file trong bộ cài đã được kiểm chứng.

## Trạng thái và chẩn đoán

[STATE_OPERATIONS](docs/STATE_OPERATIONS.md) hướng dẫn đọc đúng phần trạng thái và công cụ inspect/diff chỉ đọc khi cần. Công cụ này nằm ngoài 103 file phân phối nguyên gốc, không can thiệp vào bộ cài và không bắt buộc với người dùng.
