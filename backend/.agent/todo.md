# Backend Task Tracker

## Đang thực hiện (In Progress)
- [x] Khởi tạo không gian làm việc cho Backend Agent.

## Chờ xử lý (Todo)
- [x] Triển khai hệ thống Yêu cầu cập nhật thông tin (Profile Update Request) cho BHYT.
    - [x] Tạo Model `ProfileUpdateRequest`.
    - [x] Xây dựng bộ API `POST/GET` cho sinh viên.
    - [x] Xây dựng bộ API duyệt cho Admin.
- [x] Rà soát lại toàn bộ API endpoints hiện có.
- [x] Kiểm tra tính nhất quán giữa models và database_schema.md.

## Đã hoàn thành (Done)
- [x] Tạo thư mục `.agent/`.
- [x] Thiết lập `rules.md`, `skills.md`.
- [x] Triển khai module Bảo hiểm Y tế (Health Insurance).
- [x] Refactor Health Insurance sang Shared Model liên kết Identity.
- [x] Tạo endpoint GET cho Bảo hiểm Y tế của sinh viên.
