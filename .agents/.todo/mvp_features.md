# 5 Tính năng MVP ưu tiên để hệ thống Vận hành Cơ bản

Dựa trên cấu trúc Backend (đã có models, DB relationships rất tốt) và tình trạng Frontend (còn nhiều Mock-up), đây là 5 tính năng cốt lõi nhất cần được hoàn thiện ngay để dự án đạt chuẩn **Minimum Viable Product (MVP)**:

### 1. Kết nối API & Hoàn thiện Module Môn học (Courses Management)

- **Tình trạng:** Trang danh sách môn học (`app/(student)/course/page.tsx`) đang phụ thuộc hoàn toàn vào mảng dữ liệu giả (`mockCourses`, `ongoingCourses`).
- **Nhiệm vụ:**
  - Xây dựng hệ REST API (như `GET /courses/my-courses`) móc vào cấu trúc Model `StudentAcademic` hoặc bảng đăng ký môn để lấy môn học thực tế của sinh viên.
  - Xử lý render động danh sách môn đang học, đã hoàn thành thay thế cho các Mock Hooks.

### 2. Triển khai hoàn chỉnh Cổng Dịch vụ Sinh viên (Student Services Workflow)

- **Tình trạng:** Khung thư mục đã tạo đủ nghiệp vụ (`card-printing`, `course-withdrawal`, `exam-deferral`...) nhưng bên trong là các component rỗng hoặc chỉ có UI chưa gửi dữ liệu.
- **Nhiệm vụ:**
  - **Frontend:** Thiết kế Form có validation (Zod, React Hook Form) cho sinh viên điền yêu cầu dịch vụ.
  - **Backend:** Cần viết các Model `ServiceRequest` lưu lại yêu cầu, loại hình dịch vụ và phân quyền trạng thái (`Pending`, `Processing`, `Completed`, `Rejected`). Xây API nhận submission.

### 3. Xây dựng Portal Quản trị Chức năng cơ bản (Admin Portal)

- **Tình trạng:** Thư mục Admin (`app/(admin)`) gần như chưa có logic gì đặc biệt (`features`, `monitoring`, `users`).
- **Nhiệm vụ:**
  - MVP không cần Admin quá đồ sộ, nhưng **trọng yếu phải có một phân hệ "Duyệt Yêu Cầu"**. Khi sinh viên nộp dịch vụ (từ bước 2), nhà trường/giáo vụ cần một trang Dashboard để list danh sách yêu cầu và Click "Duyệt / Từ chối", kèm tính năng note lý do.

### 4. Bơm dữ liệu thật cho Dashboard Sinh viên (Student Dashboard)

- **Tình trạng:** Dashboard (`/dashboard`) chưa có dữ liệu thật (StatisticCards hiển thị cứng, còn section `<ComingSoonSection />`).
- **Nhiệm vụ:**
  - Replace `<ComingSoonSection />` bằng hệ thống Thông báo/Nhắc việc (Ví dụ: "Bạn có 1 chứng chỉ đợi nhận", hoặc "Hạn chót học phí").
  - Tính toán số liệu thống kê (Tín chỉ tích lũy, điểm trung bình) từ Database chuyển lên Dashboard qua một API summary duy nhất.

### 5. API Hiện thực hoá Lịch biểu (Academic Calendar integration)

- **Tình trạng:** Lịch học hiện được lưu ý là "Simplified for MVP" nghĩa là có lẽ đang hard-code sự kiện hiển thị.
- **Nhiệm vụ:**
  - Thiết kế endpoint xuất thời khóa biểu dựa trên lịch học của các môn đang đăng ký hoặc sự kiện chung của trường (như đợt thi, lịch nghỉ lễ).
  - Đưa sự kiện map lên công cụ Lịch chuẩn, kèm thông báo ngày tới hạn trên UI.
