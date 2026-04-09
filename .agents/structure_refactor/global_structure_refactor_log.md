# Nhật ký Tái cấu trúc Hệ thống Component (Global Shared Structure)

> **Thời gian**: 2026-03-04
> **Mục tiêu**: Phân loại và tổ chức lại hệ thống component từ cấp độ cục bộ (Local) sang dùng chung (Global) để phục vụ kiến trúc ERP đa vai trò (Student, Teacher, Admin, Office).

## 1. Phân loại Thư mục Mới (English Naming Convention)

Hệ thống được tổ chức lại theo chức năng (Function-based) thay vì loại file (Type-based) để dễ dàng tìm kiếm và tái sử dụng.

### Thư mục `frontend/components/`

- **`layout/`**: Chứa các khung giao diện chính (Sidebar, TopNav, MobileNav).
- **`data-display/`**: Các thành phần hiển thị dữ liệu (Tables, Cards, Carousel).
- **`dashboard/`**: Các thành phần thống kê và tiêu đề bảng điều khiển.
- **`feedback/`**: Các thành phần phản hồi người dùng (Toast, Modals).
- **`forms/`**: Các mẫu Form nghiệp vụ dùng chung.
- **`profile/core/`**: Các thành phần lõi của hệ thống Profile (ProfileCard, ProfileCardItem).
- **`auth/`**: Tổ chức lại thành `header/`, `form/`, `footer/`.

### Thư mục `frontend/components/ui/` (Atomic UI)

- **`visuals/`**: Avatar, Skeletons, Images.
- **`inputs/`**: SearchBar, Dropdowns.
- **`navigation/`**: PageTitle, BackButton.
- **`overlays/`**: Portals, Tooltips.

## 2. Danh sách Di chuyển & Tái cấu trúc

### Từ `(student)/_components/` ra `components/shared/`

| Component             | Vị trí cũ                        | Vị trí mới                 |
| :-------------------- | :------------------------------- | :------------------------- |
| **ProfileCard**       | `_components/profile/main/core/` | `components/profile/core/` |
| **ProfileCardItem**   | `_components/profile/main/core/` | `components/profile/core/` |
| **StatisticsCard**    | `_components/dashboard/`         | `components/dashboard/`    |
| **ComingSoonSection** | `_components/dashboard/`         | `components/dashboard/`    |

### Sắp xếp lại `components/common/` (Đã xóa bỏ để thay thế bằng cấu trúc chuyên nghiệp hơn)

| Component                            | Vị trí cũ | Vị trí mới                 |
| :----------------------------------- | :-------- | :------------------------- |
| **Sidebar**, **TopNav**, **Layouts** | `common/` | `components/layout/`       |
| **DataTable**, **StatusTable**       | `common/` | `components/data-display/` |
| **StatCard**, **DashboardTitle**     | `common/` | `components/dashboard/`    |
| **ServiceForm**                      | `common/` | `components/forms/`        |

## 3. Cải tiến Kỹ thuật

1. **Hợp nhất Export**: Tạo file `frontend/components/index.ts` để quản lý tập trung tất cả các Shared Components. Việc import giờ đây cực kỳ gọn gàng:
   ```tsx
   import { Sidebar, ProfileCard, DataTable } from "@/components";
   ```
2. **Cấu trúc UI Atomic**: Thư mục `components/ui/` được chia nhỏ giúp nhanh chóng tìm thấy các component nguyên tử (như Avatar trong `visuals` thay vì phải lướt qua một danh sách dài).
3. **Sửa lỗi Path**: Đã cập nhật lại toàn bộ Path import trong `app/(student)/profile/page.tsx` và `app/(student)/calendar/page.tsx` theo cấu trúc mới.

## 4. Đánh giá Sau khi Thực hiện

- **Khả năng mở rộng**: Cấu trúc này sẵn sàng cho việc thêm 3 Role mới (Teacher, Admin, Office) mà không cần viết lại giao diện nền tảng.
- **Độ sạch**: Loại bỏ hoàn toàn folder `common` mang tính chất "chứa rác", thay bằng các nhóm có tên tiếng Anh chuẩn mực.

---

_Người thực hiện: Antigravity AI Assistant_
