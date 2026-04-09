# Hỗ trợ Yêu cầu Cập nhật Thông tin Bảo hiểm (Health Insurance Update Request)

## Bối cảnh
Sinh viên cần cập nhật thông tin bảo hiểm y tế khi có thay đổi hoặc sai sót. Để đảm bảo tính chính xác, hệ thống sẽ không cho phép sửa trực tiếp mà phải thông qua quy trình: Sinh viên gửi yêu cầu -> Đính kèm minh chứng (ảnh) -> Admin duyệt.

## Yêu cầu Kỹ thuật

### 1. Database Model: `ProfileUpdateRequest`
- `id`: Integer, PK
- `anchor_id`: Integer, FK (Identity ID của sinh viên)
- `request_type`: String (Mặc định: `'HEALTH_INSURANCE'`)
- `old_data`: JSON (Lưu thông tin cũ để đối chiếu)
- `new_data`: JSON (Chứa thông tin mới: số thẻ, số sổ, v.v.)
- `evidence_url`: String (Link ảnh minh chứng đã upload)
- `status`: Enum (`PENDING`, `APPROVED`, `REJECTED`)
- `admin_note`: String (Lý do từ chối hoặc ghi chú)
- `created_at`, `updated_at`: DateTime

### 2. API Endpoints cần triển khai
- `POST /profile/student/update-requests`:
    - Payload: `{ request_type, new_data, evidence_url }`
    - Logic: Lưu yêu cầu mới vào bảng `profile_update_requests`. Trạng thái mặc định là `PENDING`.
- `GET /profile/student/update-requests`:
    - Trả về danh sách các yêu cầu của sinh viên đang đăng nhập.
- `GET /admin/profile/update-requests`:
    - (Dành cho role Admin) Lấy danh sách các yêu cầu đang ở trạng thái `PENDING`.
- `PATCH /admin/profile/update-requests/{id}`:
    - Payload: `{ status, admin_note }`
    - Logic khi `status == APPROVED`:
        1. Cập nhật trạng thái yêu cầu thành `APPROVED`.
        2. Lấy dữ liệu từ `new_data` ghi đè vào bảng `student_health_insurances` tương ứng với sinh viên đó.
        3. Đảm bảo dùng Database Transaction để tránh lỗi dữ liệu.

### 3. Upload Service
- Đảm bảo có endpoint hoặc service để upload file ảnh minh chứng và trả về URL để lưu vào `evidence_url`.

## Lưu ý cho Backend Agent
- Sử dụng mô hình Identity-Hub hiện có.
- Tuân thủ các rules trong `rules.md`.
- Cập nhật `database_schema.md` sau khi thêm Model mới.
