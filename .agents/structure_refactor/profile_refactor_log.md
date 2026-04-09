# Nhật ký Refactor Cấu trúc Trang Profile Sinh viên

> **Thời gian**: 2026-03-04
> **Mục tiêu**: Tối ưu hóa mã nguồn, loại bỏ trùng lặp (DRY) và chuẩn hóa giao diện thẻ (Bento Grid).

## 1. Phân tích hiện trạng (Trước Refactor)

- **Vấn đề**: Các thẻ thông tin (`PersonalLegal`, `DynamicClusters`, `RightCol`) có cấu trúc UI (HTML/Tailwind) giống nhau đến 80% nhưng được viết lặp lại ở nhiều file.
- **Logic lặp**: Việc xử lý sự kiện click cho các liên kết chưa hoàn thiện và thông báo "Coming Soon" được viết lồng ghép thủ công trong từng component.
- **Trải nghiệm người dùng**: Từng thẻ có states loading riêng lẻ, gây hiện tượng giật hiển thị khi dữ liệu tải về không đồng bộ.

## 2. Quá trình thực hiện

### Giai đoạn 1: Xây dựng Core Components (Atomic Design)

Tạo thư mục `_components/profile/main/core/` làm nền tảng dùng chung:

- **`ProfileCard.tsx`**: Đóng gói khung card, bóng đổ, hiệu ứng hover và animation. Hỗ trợ 2 biến thể `default` và `primary` (theme xanh BKU).
- **`ProfileCardItem.tsx`**: Đóng gói logic render từng dòng link/item, bao gồm icon, text và **tập trung hóa logic xử lý "Coming Soon"**.

### Giai đoạn 2: Refactor & "Băm nhỏ" Logic

- **`DynamicClusters.tsx` & `RightCol.tsx`**: Loại bỏ hàng chục dòng code Tailwind lặp lại bằng cách map dữ liệu qua `ProfileCard` và `ProfileCardItem`.
- **`PersonalLegal.tsx`**: Chuyển đổi sang `ProfileCard` với `variant="primary"` để đồng bộ giao diện nhưng vẫn giữ được sự nổi bật của thông tin cá nhân.
- **`Action.tsx`**: Tái sử dụng `ProfileCardItem` cho các nút hành động nhanh.

### Giai đoạn 3: Tối ưu hóa Trải nghiệm (UX) & Dọn dẹp

- **`ProfileSkeleton.tsx`**: Tạo bộ khung loading toàn trang (Global Skeleton) thay thế cho các spinner lẻ tẻ.
- **`BentoGrid.tsx`**: Tách logic layout lưới ra khỏi `page.tsx`.
- **`page.tsx`**: Hiện tại chỉ còn đóng vai trò là container quản lý Context và điều phối hiển thị, cực kỳ gọn gàng.

## 3. Kết quả đạt được

| Chỉ số                | Trước Refactor                      | Sau Refactor                    |
| :-------------------- | :---------------------------------- | :------------------------------ |
| **Độ trùng lặp code** | Cao (Card UI viết ở 4 nơi)          | Thấp (Dùng chung `ProfileCard`) |
| **Bảo trì**           | Khó (Phải sửa nhiều file để đổi UI) | Dễ (Sửa tại file Core)          |
| **UX Loading**        | Spinner đơn lẻ (Giật)               | Skeleton toàn trang (Mượt)      |
| **Vị trí Component**  | Phân tán                            | Tập trung tại thư mục `core`    |

## 4. Hướng phát triển tiếp theo

- Đưa các thành phần trong thư mục `core/` ra thư mục `components/` dùng chung của Project nếu cần hiển thị Profile ở các vai trò khác (Admin, Teacher).
- Áp dụng mô hình `Atomic Card` này cho các trang Dashboard khác như Calendar hoặc Course.

---

_Người thực hiện: Antigravity AI Assistant_
