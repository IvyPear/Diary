# PASTEL DAILY DIARY

## 1. Giới thiệu đề tài

**Pastel Daily Diary** là một web app nhật ký cá nhân online được xây dựng nhằm hỗ trợ người dùng ghi lại cảm xúc, suy nghĩ, thành tựu và các hoạt động chăm sóc bản thân hằng ngày.  
Web app hướng tới việc tạo ra một không gian riêng tư, thân thiện và nhẹ nhàng, giúp nâng cao ý thức theo dõi sức khỏe tinh thần thông qua việc viết nhật ký thường xuyên.

🔗 **Demo trực tuyến:**  
https://ivypear.github.io/Diary/

---

## 2. Mục tiêu của đề tài

- Xây dựng một ứng dụng web cho phép người dùng ghi nhật ký cá nhân hằng ngày
- Hỗ trợ theo dõi cảm xúc, thói quen và quá trình phát triển bản thân
- Áp dụng kiến thức đã học về HTML, CSS, JavaScript và các công cụ hiện đại trong phát triển web
- Tạo giao diện thân thiện, dễ sử dụng, phù hợp với nhiều thiết bị

---

## 3. Phạm vi và đối tượng sử dụng

- **Đối tượng sử dụng:** Sinh viên, học sinh và người dùng có nhu cầu ghi nhật ký cá nhân
- **Phạm vi:**  
  - Ứng dụng hoạt động trên trình duyệt web  
  - Lưu trữ dữ liệu phía client (offline) thông qua `localStorage`  
  - Không yêu cầu đăng nhập hay kết nối cơ sở dữ liệu phía server

---

## 4. Các chức năng chính

### 4.1 Diary
- Ghi nhật ký hằng ngày bao gồm:
  - Tâm trạng
  - Thành tựu trong ngày
  - Điều biết ơn
  - Checklist self-care
  - Highlight nổi bật
  - Photo journal (tối đa 3 ảnh)

### 4.2 Timeline
- Hiển thị toàn bộ nhật ký và khoảnh khắc theo dòng thời gian
- Hỗ trợ tìm kiếm và lọc theo:
  - Tâm trạng
  - Loại nội dung (nhật ký hoặc khoảnh khắc)

### 4.3 Report
- Thống kê và trực quan hóa dữ liệu người dùng:
  - Biểu đồ tâm trạng theo tuần và theo tháng
  - Số ngày viết nhật ký
  - Tỷ lệ cảm xúc tích cực
  - Checklist self-care
  - Thời gian viết nhật ký trung bình

### 4.4 Reflection
- Tổng kết cuối tháng thông qua các câu hỏi:
  - Học được điều gì trong tháng
  - Điều gì khiến bản thân tự hào
  - Điều gì muốn cải thiện trong thời gian tới

---

## 5. Giao diện và trải nghiệm người dùng

- Hỗ trợ 5 chủ đề màu pastel:
  - Mint (mặc định)
  - Pink
  - Lavender
  - Ocean
  - Night
- Theo dõi streak viết nhật ký liên tiếp
- Giao diện responsive, tương thích với desktop và thiết bị di động
- Cho phép xuất toàn bộ dữ liệu người dùng dưới dạng file JSON để sao lưu

---

## 6. Công nghệ sử dụng

- HTML5  
- CSS3  
- JavaScript (ES6 Modules)  
- Tailwind CSS  
- Vite  
- Lucide Icons  
- localStorage  
- GitHub Pages  
- GitHub Actions  

---

## 7. Hướng dẫn cài đặt và chạy dự án

### 7.1 Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- Trình duyệt web hiện đại (Chrome, Edge, Firefox)

### 7.2 Các bước chạy dự án

```bash
git clone https://github.com/IvyPear/Diary.git
cd Diary
npm install
npm run dev
 ```

### 8. Đánh giá và hướng phát triển
  ### 8.1 Kết quả đạt được

Hoàn thiện các chức năng chính theo đúng yêu cầu đề tài

Giao diện trực quan, dễ sử dụng

Ứng dụng hoạt động ổn định trên nhiều thiết bị

  ### 8.2 Hướng phát triển

Bổ sung tính năng đăng nhập và đồng bộ dữ liệu

Lưu trữ dữ liệu trên server hoặc cloud

Thêm nhắc nhở viết nhật ký hằng ngày

Tăng cường bảo mật dữ liệu người dùng

  ### 9. Nhóm thực hiện

Tên đề tài: Pastel Daily Diary
Môn học: Thiết kế Web
Lớp: 23SE – VNUK

### Thành viên nhóm:

Nguyễn Ánh Ngọc

Trương Thủy Lam

Nguyễn Thị Quỳnh Mỹ

### 10. Kết luận

Pastel Daily Diary là sản phẩm thể hiện quá trình áp dụng kiến thức đã học vào thực tế, đồng thời mang lại giá trị sử dụng thiết thực cho người dùng trong việc ghi lại, theo dõi và chăm sóc sức khỏe tinh thần hằng ngày.

Nhóm xin chân thành cảm ơn giảng viên đã hướng dẫn và hỗ trợ trong suốt quá trình thực hiện dự án.

Nhóm 4 – 23SE – VNUK
