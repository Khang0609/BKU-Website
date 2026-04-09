# Phân tích Dự án Quản lý Sinh viên ERP

Với vai trò là một Senior Architect, dưới đây là bảng phân tích tổng quan về cấu trúc, luồng dữ liệu cũng như đánh giá tiến độ của dự án hệ thống Quản lý Sinh viên (ERP).

## 1. Cấu trúc Thư mục (Folder Structure)

Dự án áp dụng mô hình kiến trúc Monorepo (hoặc tương tự) tách biệt rõ ràng Frontend và Backend. Cấu trúc được thiết kế theo hướng module hóa (Module-driven design) và Feature-sliced design.

### Frontend (Next.js App Router)

Nằm trong thư mục `frontend/`, sử dụng Next.js (chế độ App Router).

- **`app/(student)/` & `app/(admin)/`**: Áp dụng tính năng Route Groups của Next.js để định tuyến riêng biệt layout cho module sinh viên và module quản trị.
- **Cấu trúc Module (`(student)`)**: Áp dụng mô hình Feature-based bao gồm các thư mục `_components`, `_constants`, `_context`, `_hooks`, `_types`. Việc gom nhóm này giúp dễ bảo trì và phân tách logic rành mạch thay vì dùng một thư mục global khổng lồ.
- **Các Module chính dành cho Sinh viên**: `course`, `calendar`, `dashboard`, `message`, `profile`, `student-service`.

### Backend (FastAPI)

Nằm trong thư mục `backend/app/`, được xây dựng bằng Python (FastAPI) và tổ chức theo kiến trúc Controller-Service-Repository tinh gọn.

- **`models/`**: Định nghĩa SQLAlchemy ORM. Được chia nhỏ rất tốt thành vùng nghiệp vụ như `adminstrative` (chuyện hành chính) và `profile` (hồ sơ, cá nhân).
- **`routes/`**: Nơi khai báo các API endpoint. Được phân rã ra `auth.py`, `location.py` và gói `profile` (trong đó có phân chia `student`, `shared`).
- **`schemas/`**: Các Contract bằng Pydantic dùng để validate dữ liệu đầu vào và serialize dữ liệu trả ra cho client.
- **`service/`**: Xử lý logic nghiệp vụ và Orchestrator (các file như `generic_get`).
- **Đánh giá**: Kiến trúc Backend có tính mở rộng (scalable) rất tốt nhờ việc phân tách Models theo Domain (Domain-driven design cơ bản).

---

## 2. Các Route Chính (Main Routes)

### Client (Web UI)

- **`/dashboard`**: Trung tâm điều khiển chính của sinh viên (Quick Access, Statistics, Recent services).
- **`/profile`**: Hồ sơ toàn diện bao gồm thông tin cá nhân (`/info`), điểm rèn luyện (`/training-point`), hoạt động ngoại khóa (`/extra-curricular`), quyết định hành chính (`/decision`), hồ sơ kỷ luật/khen thưởng (`/records`).
- **`/calendar`**: Lịch học và các sự kiện học vụ.
- **`/course`**: Nơi quản lý danh sách môn học.
- **`/message`**: Kênh liên lạc cá nhân / hỗ trợ.
- **`/student-service`**: Tổ hợp các form yêu cầu (rút môn học, in thẻ, thi tiếng anh, hoãn thi, v.v).

### Server (API)

- **`GET /profile/student/me`**: API lõi để lấy toàn bộ thông tin cá nhân của người dùng, sử dụng kỹ thuật join nâng cao (`joinedload`) của SQLAlchemy và Hydration object.
- **`GET /profile/student/decision`**, **`/training-points`**, **`/extra-curriculars`**: Endpoint chuyên biệt cho các nghiệp vụ con.
- **Các API `update.py`**: Xử lý cập nhật thông tin tương ứng.

---

## 3. Luồng dữ liệu (Data Flow)

Hệ thống có dòng chảy dữ liệu (Data flow) chuẩn xác, phân cấp qua các Layer như sau:

1. **Client Request (React Components & Hooks)**:
   - Từ các component tại Next.js, dữ liệu được render từ custom hooks (ví dụ: `useCourse`, `useMobileNav`).
   - Hooks sẽ gọi tới API backend (thông qua fetch hoặc thư viện HTTP Client).
2. **Controller (FastAPI Router)**:
   - Request đến các function trong `routes/`. Authentication được chắn bởi Dependency Injection `Depends(get_current_active_user)`.
3. **Logic & Data Access (Service / ORM)**:
   - Các Route sẽ sử dụng Session DB được inject để truy vấn dữ liệu. Ở dự án này, Backend tận dụng `generic_get` kết hợp với Eager Loading (`joinedload` của SQLAlchemy) để truy vấn cây dữ liệu phức tạp (Identity -> Academic -> Major -> Faculty) chỉ với **1 query duy nhất tới cơ sở dữ liệu**.
4. **Data Serialization (Pydantic)**:
   - Bản ghi DB được đẩy qua Pydantic schema (như `ProfileResponse.model_validate(identity)`) để chuyển đổi thành cấu trúc JSON phẳng/lồng nhau theo chuẩn an toàn.
5. **UI Rendering**: JSON Response được client tiếp nhận và bind vào React Context hoặc state nội bộ, sau đó render ra UI tương ứng.

---

## 4. Tổng Kết Tính Năng (Tình trạng hoàn thiện)

Dựa trên việc kiểm tra kiến trúc và mã nguồn, dưới đây là ước tính về những gì đã hoàn thiện và những gì còn đang dang dở:

### ✅ Đã hoàn thiện (Completed / Khá hoàn thiện)

1. **Core Backend Framework & Database**: Models (SQLAlchemy) và Pydantic schemas được cấu trúc rất chi tiết, có phân vùng nghiệp vụ rõ ràng.
2. **Authentication / Authorization**: Luồng xác thực cơ bản, middleware, kiểm tra Role (chỉ cho phép user dạng `STUDENT` vào API của sinh viên).
3. **API Module Profile**: Việc query hồ sơ sinh viên vô cùng chặt chẽ, được thiết kế tối ưu hiệu năng cơ sở dữ liệu (smart reader / joinedload / flat contract).
4. **UI/UX Foundation**: Các Component nền tảng như `PageTitle`, Navbar, Context (MobileNavContext, MessageContext) và Routing framework của Next.js đã định hình xong thành khung chuẩn mực. UI được xây dựng Responsive.

### 🚧 Đang dang dở (In Progress / MVP Mocks)

1. **Module Môn học (Course)**: Ở phía UI (e.g., `course/page.tsx`), dữ liệu đang được lấy từ thư viện mock nội bộ (`mockCourses`, `ongoingCourses`) thay vì gọi API thực để lấy thông tin.
2. **Bảng Điều kiển (Dashboard)**: Vẫn còn các khối Placeholder UI như `<ComingSoonSection />`.
3. **Lịch biểu (Calendar)**: Được chú thích rõ là "Simplified for MVP", nghĩa là UI lấy dữ liệu ảo hoặc tính năng kéo-thả/ngữ cảnh chưa phức tạp.
4. **Cổng Dịch vụ (Student Services)**: Dù các folder đã được tạo chuẩn (`card-printing`, `course-withdrawal`, ...) nhưng có vẻ mới chỉ nằm ở bước đặt thư mục, chưa kết nối thông qua forms hoàn chỉnh.
5. **Module Quản trị (Admin)**: Thư mục `frontend/app/(admin)` khá sơ sài (`features`, `monitoring`, `users`) so với bên sinh viên, cho thấy portal quản trị cho nhà trường chưa được đầu tư mạnh trong giai đoạn hiện tại.
6. **Nhắn tin (Messages)**: Sidebar và Chat component đã lên khung với Animation khá tốt nhưng logic truyền tin real-time (WebSockets hoặc SSE) chưa rõ ràng, phần lớn mới dừng ở UI flows trong React Context.
