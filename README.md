# Orbit — SaaS Admin Dashboard

Dashboard quản trị cửa hàng xây dựng bằng React + Vite + TypeScript, Tailwind CSS v4, React Router, Lucide, Recharts, Zustand và Axios.

## Yêu cầu
- Node.js 20.19+ hoặc 22.12+ (khuyến nghị Node.js 22 LTS)
- npm

## Cài đặt và chạy trên Windows

Mở Terminal/PowerShell tại thư mục project, chạy lần lượt:

```powershell
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị, thường là `http://localhost:5173`.

Kiểm tra build production:

```powershell
npm run build
npm run preview
```

## Tính năng
- 8 route: Dashboard, Products, Categories, Orders, Customers, Analytics, Messages, Settings.
- Responsive desktop/tablet/mobile; sidebar thu gọn và mobile drawer.
- Light/Dark mode; lưu theme, products và categories vào localStorage qua Zustand persist.
- Dashboard với KPI, Recharts revenue chart và bộ lọc 7 ngày / 30 ngày / 3 tháng / 12 tháng.
- Products: tìm kiếm, lọc trạng thái, sắp xếp, phân trang, thêm/sửa/xóa, validation.
- Categories: tìm kiếm, CRUD, trạng thái và số lượng sản phẩm.
- Orders: tìm kiếm, lọc trạng thái/ngày, xuất CSV, xem chi tiết.
- Customers: tìm kiếm, lọc theo số đơn, phân trang.
- Analytics: KPI, doanh thu theo danh mục, tăng trưởng khách hàng, trạng thái đơn, top products.
- Messages: chọn hội thoại và gửi tin nhắn demo.
- Settings: General, Profile, Security, Notifications, Appearance.
- Toast notifications, reusable table/modal/pagination/status components.
- Axios client tập trung tại `src/lib/api.ts`, sẵn sàng cấu hình REST API.

## Cấu trúc
```text
src/
├── components/
│   ├── common/
│   ├── dashboard/
│   └── layout/
├── data/
├── hooks/
├── lib/
├── pages/
├── store/
├── types/
├── App.tsx
├── index.css
└── main.tsx
```

## Ghi chú
- Dữ liệu nằm trong `src/data/mockData.ts`; không cần backend.
- Các thao tác CRUD cập nhật state phía client và được lưu trên trình duyệt. Dùng nút reset dữ liệu trang web nếu muốn xóa localStorage.
- Tin nhắn, export và cài đặt là mô phỏng phía client; chưa gửi dữ liệu lên server.
- Để kết nối API sau này, cấu hình `VITE_API_URL` trong file `.env` và gọi `api` từ `src/lib/api.ts`.
