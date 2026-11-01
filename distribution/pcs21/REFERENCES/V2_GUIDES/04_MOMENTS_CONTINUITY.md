# 04. PCS Moments: ghi điểm dừng, không nhân đôi backlog

## Nguồn chuẩn
- Local: `pcs/tasks.json` + project/feature/flow/release files; generated Markdown không sửa tay.
- External: Issues/Projects là nguồn live; local file chỉ projection và phải đối soát qua connector/provider trước thao tác nhạy cảm.
- Source code, CI, cloud deployment, QA run, signature approvals vẫn có nguồn chứng cứ riêng. Snapshot không thể chứng nhận chúng.

## Checkpoint đầy đủ
Moment chứa **toàn bộ state** tại thời điểm ghi, hash SHA-256 cho state/moment và liên kết previous hash. Có thể `restore-preview` read-only để xem lịch sử. Không được “restore” tự động ghi đè thay đổi đang có. Dấu thời gian UTC có UUID; tránh trùng ID trong cùng giây.

## Bảo vệ concurrent writes
Dùng base_revision đã quan sát trước batch; `checkpoint --expect=<base_revision>` so với last-moment, lock filesystem, mỗi ghi dùng temp+rename. Nếu chỉnh trực tiếp JSON ngoài cơ chế lock vẫn có thể race: với nhiều agent dùng **isolated Git worktrees/branches và PR integration**, không để hai agent edit cùng một state file shared. Conflict phải dừng và reconcile, không dùng force overwrite.

## Giới hạn
Local hash-chain **không chống** người có quyền sửa toàn bộ chain và current pointer. Muốn chống giả mạo: external append-only store, signed release/CI provenance hoặc protected Git permissions. Remote evidence declared/attested khác remote evidence được kiểm chứng bằng API thực.

## Moment cadence
Mốc có ý nghĩa: blocked/unblocked, hoàn thành bounded step, merge, E2E result, staging release, handoff. Không buộc snapshot mọi 2 phút hay sau mỗi câu trả lời. Phần mềm không chạy nền tự động nếu không có automation được triển khai.
