# TODO: Thiết kế Card Học bổng dạng Bằng khen (Certificate Style)

## Ý tưởng
Thiết kế giao diện hiển thị học bổng cho sinh viên dưới dạng một tấm **Bằng khen (Certificate)** hoặc **Thẻ vinh danh (Award Card)** sang trọng và xịn xò. Thay vì chỉ hiển thị bảng dữ liệu khô khan, mục tiêu là mang lại cảm giác được công nhận và khen thưởng trực tuyến cho sinh viên.

## Chi tiết đề xuất
- **Giao diện:** Thiết kế mang hơi hướng "Premium", có thể sử dụng các họa tiết viền (border) cổ điển hoặc hiện đại, font chữ tinh tế (Serif cho tiêu đề).
- **Nội dung trên Card:**
    - Tên sinh viên (Vinh danh).
    - Loại học bổng (ví dụ: Học bổng Khuyến khích học tập).
    - Học kỳ đạt được.
    - Một câu chúc mừng hoặc slogan truyền cảm hứng của trường.
    - Hiệu ứng: Có thể thêm hiệu ứng "lấp lánh" (shimmer/glow) hoặc đổ bóng (glassmorphism) để tăng độ cao cấp.
- **Tính năng mở rộng:** Cho phép sinh viên nhấn "Tải xuống" (Export sang PDF/Image) hoặc "Chia sẻ" lên mạng xã hội để tăng trải nghiệm người dùng.

## Trạng thái
- [ ] Lên ý tưởng layout (Figma/Mockup).
- [ ] Tìm kiếm các pattern/decoration phù hợp với thương hiệu BKU.
- [ ] Triển khai Component React/Tailwind.
- [ ] Tích hợp dữ liệu từ API Scholarship.
