# Backend Testing Guide

## `setup.js`

File dùng để tạo **môi trường test giả lập**, giúp quá trình test không phụ thuộc trực tiếp vào các giá trị thật trong môi trường chạy thực tế.

Mục đích chính:

- Thiết lập environment riêng cho test.
- Tránh lấy nhầm các biến môi trường thật.
- Có thể khai báo các giá trị mock/dummy phục vụ cho quá trình test.
- Giúp test chạy ổn định và độc lập hơn.

---

## `health.test.js`

File dùng để kiểm tra các API health check của backend.

---

# Cách chạy test

Thực hiện tại **root project**.

## 1. Cài đặt package test

```bash
npm install -D vitest supertest
```

Trong đó:

- `vitest`: framework dùng để chạy test.
- `supertest`: dùng để test HTTP API của backend.

---

## 2. Chạy toàn bộ test

```bash
npm test
```

Lệnh này sẽ chạy toàn bộ các test đã được cấu hình trong project.

---

## 3. Chạy riêng một file test

Ví dụ chạy riêng `health.test.js`:

```bash
npx vitest run backend/tests/health.test.js
```

Có thể thay đường dẫn bằng file test khác nếu cần.

---

# Test Stripe Webhook

## 1. Khởi động Stripe CLI

Mở PowerShell và chạy:

```powershell
stripe listen --forward-to http://localhost:3001/api/stripe/webhook
```

Stripe CLI sẽ tạo một webhook signing secret, ví dụ:

```text
Ready! Your webhook signing secret is whsec_ABC123...
```

---

## 2. Copy webhook signing secret vào `.env`

Ví dụ:

```env
STRIPE_WEBHOOK_SECRET=whsec_ABC123...
```

> Không commit webhook secret thật lên GitHub.

---

## 3. Restart backend

Sau khi cập nhật `.env`, restart backend để server đọc lại biến môi trường mới.

---

## 4. Test create-checkout Session API

Dùng Postman gọi API tạo Stripe Checkout Session.

Ví dụ flow:

```text
Postman
   ↓
Create Checkout Session API
   ↓
Stripe tạo Checkout Session
   ↓
Backend trả về Checkout URL
```

---

## 5. Thực hiện thanh toán trên Stripe Test Mode

Copy Checkout URL được API trả về và mở trên trình duyệt.

Sau đó thực hiện thanh toán bằng Stripe **Test Mode**.

Flow đầy đủ:

```text
Postman
   ↓
Create Checkout Session
   ↓
Nhận Checkout URL
   ↓
Mở Stripe Checkout
   ↓
Thanh toán bằng test card
   ↓
Stripe gửi webhook event
   ↓
Stripe CLI forward event
   ↓
POST /api/stripe/webhook
   ↓
Backend xử lý webhook
```

## Lưu ý

Quy trình trên dùng để kiểm tra luồng thanh toán Stripe trong **Test Mode**, không charge tiền thật.

Stripe sẽ mô phỏng giao dịch thanh toán và gửi webhook event giống với luồng thực tế.
