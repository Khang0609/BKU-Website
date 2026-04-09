# Đánh giá Điểm yếu & Đề xuất Refactor (Security & Performance)

Dựa trên cấu trúc kiến trúc hiện tại của dự án ERP, mặc dù hệ thống được tổ chức tốt, vẫn có một số điểm yếu tiềm ẩn về mặt hiệu năng (Performance) và bảo mật (Security) cần được refactor **TRƯỚC KHI** bạn tiếp tục scale team để làm thêm tính năng.

## 1. Vấn đề Hiệu năng (Performance)

### 1.1 Lạm dụng `"use client"` ở cấp độ Page (Frontend)

- **Thực trạng:** Các file như `course/page.tsx`, `dashboard/page.tsx`, `calendar/page.tsx`, `message/page.tsx` đều có dòng `"use client"` ở ngay dòng đầu tiên.
- **Điểm yếu:**
  - Đánh mất lợi ích lớn nhất của Next.js App Router là **React Server Components (RSC)**.
  - Toàn bộ component bị gói vào JavaScript bundle gửi xuống trình duyệt, làm tăng thời gian tải trang ban đầu (TTV - Time To View).
  - Data fetching đang phải diễn ra ở phía client, dẫn đến hiệu ứng ứng dụng bị "giật" (loading state / waterfall network requests)
- **Đề xuất Refactor:**
  - **Chuyển các Page thành Server Components:** Bỏ `"use client"` ở các file `page.tsx`. Hãy fetch dữ liệu trực tiếp trong Server Component, sau đó truyền dữ liệu đã fetch xuống dưới dạng `props` cho các Client Components (những component thực sự cần tương tác như `onClick`, `useState`).

### 1.2 "Cartesian Explosion" với `joinedload` (Backend)

- **Thực trạng:** API `/me` (Route Profile) dùng cực kỳ nhiều `joinedload` trên cùng 1 truy vấn:
  ```python
  joinedload(Identity.addresses),
  joinedload(Identity.student_parent),
  joinedload(Identity.student_guardian)
  ...
  ```
- **Điểm yếu:** Khi có nhiều mối quan hệ `1-N` (One-to-Many), `joinedload` tạo ra một câu lệnh `LEFT OUTER JOIN` khổng lồ. Điều này dẫn đến hiện tượng **"Cartesian Explosion"** — database trả về số lượng row trùng lặp vô cùng lớn, tiêu tốn rất nhiều RAM của cả DB và Python server để parse ngược lại thành object.
- **Đề xuất Refactor:** Thử thay thế `joinedload` bằng **`selectinload`** cho các quan hệ dạng List/Collection (Ví dụ như Addresses, Decisions). `selectinload` sẽ phát sinh thêm 1 câu query phụ nhưng lại giải quyết triệt để tình trạng bùng nổ bộ nhớ và nhanh hơn rất nhiều khi xử lý tập dữ liệu lớn.

---

## 2. Vấn đề Bảo mật (Security)

### 2.1 Tiếp xúc lộ API Endpoint trên Client

- **Thực trạng:** Vì sử dụng `"use client"` nhiều, các lệnh gọi API tới Backend sẽ xuất phát từ trình duyệt của End-user. Do đó, logic fetch, header (chứa Token) có thể dễ dàng bị soi trên tab Network của DevTools.
- **Điểm yếu:** Nếu bạn lưu access token ở dạng `localStorage` (phổ biến) thay vì `httpOnly cookie`, mô hình kết hợp client-side fetching này rất dễ bị tấn công XSS (Cross-Site Scripting).
- **Đề xuất Refactor:**
  - Dùng **Next.js API Routes / Server Actions** làm proxy (BFF - Backend for Frontend) giấu Endpoint của FastAPI, hoặc:
  - Đảm bảo JWToken được lưu vào `Cookies` với cờ `httpOnly` và `Secure` để không thể truy cập bằng Javascript trên trình duyệt.

### 2.2 Rate Limiting & DoS (Denial of Service)

- **Thực trạng:** Trong file backend, chưa thấy rõ cơ chế giới hạn tần suất gọi API.
- **Điểm yếu:** Nếu một sinh viên dùng tool auto refresh, hoặc bot scan endpoint (nhất là endpoint như `/me` tốn lượng query lớn), DB có thể bị treo (bottleneck).
- **Đề xuất Refactor:** Cài đặt cấu hình **Rate Limiter** trên FastAPI (ví dụ dùng thư viện `slowapi`) để giới hạn ví dụ tối đa 100 requests/phút/IP để tránh bị spam, đặc biệt là các public route (như Login).

### 2.3 Phân quyển cấp Data-Row (Row-level Authorization)

- **Thực trạng:** Middleware check `UserRole.STUDENT` khá tốt. Tuy nhiên trong file Get Decisions:
  ```python
  db.query(StudentDecision).filter(StudentDecision.identity_id == identity.id).all()
  ```
- **Điểm yếu:** Đoạn code trên an toàn, tuy nhiên đối với API Update (nếu có), nếu chỉ kiểm tra _"đây là sinh viên"_ mà không kiểm tra _"bản ghi này CÓ THUỘC VỀ sinh viên này không"_ (chẳng hạn tham số truyền vào là `decision_id`), thì sẽ gặp lô hổng **IDOR (Insecure Direct Object Reference)**.
- **Đề xuất Refactor:** Hãy cẩn trọng và kiểm tra chéo (Cross-check) bất cứ thao tác `UPDATE/DELETE` nào để đảm bảo data chỉ được sửa đúng bởi chủ sở hữu.

---

## 🟢 Tóm lại - Việc cần làm ngay:

1. **[Frontend]** Xóa `"use client"` khỏi các `page.tsx` lớn, bóc tách logic UI/Interactivity xuống các Component nhỏ hơn. Tính toán fetch data ngay trên Server.
2. **[Backend]** Đổi `joinedload` thành `selectinload` trong generic_get đối với các Column chứa List/Array.
3. **[Security]** Review lại cơ chế cấp phát Auth Token (phải là `httpOnly` cookie). Thêm một lớp Rate Limit cho API.
