# ARCHITECTURE.md — Le Charme Beauté Boutique

> **Tech Lead note** — Tài liệu này được viết với mục đích: 1 năm sau đọc lại vẫn hiểu ngay hệ thống đang làm gì, tại sao được thiết kế như vậy, và những điểm cần chú ý khi mở rộng.
>
> **Last updated**: 2026-09-25

---

## 1. Bức Tranh Tổng Thể (Business Overview)

**Le Charme Beauté Boutique** là website đặt lịch & thanh toán cho dịch vụ makeup/beauty tại Huntington Beach, CA.

Khách hàng chọn dịch vụ → thêm vào giỏ → điền thông tin đặt lịch → thanh toán deposit (50%) qua Stripe → nhận email xác nhận. Phía biz chủ tiệm nhận thông báo lịch tự động lên Google Calendar.

**Đây là trang web vận hành thực tế cho một tiệm beauty nhỏ, không phải MVP thử nghiệm.**

---

## 2. Kiến Trúc Hệ Thống

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                      │
│                                                             │
│   React 19 + Vite + TypeScript + TailwindCSS (CDN)         │
│   ├── React Router v7  (SPA, client-side routing)          │
│   ├── Stripe.js        (payment UI elements)               │
│   ├── Framer Motion    (animations)                        │
│   ├── Lenis            (smooth scroll)                     │
│   ├── Recharts         (admin charts)                      │
│   └── @google/genai    (Gemini AI — chatbot, disabled)     │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS REST
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   RENDER.COM (Backend)                      │
│                                                             │
│   Express 5 (Node.js, ES modules) — single file server.js  │
│   ├── POST /create-checkout-session   → Stripe API         │
│   ├── POST /api/stripe/webhook        ← Stripe webhook     │
│   ├── POST /api/calculate-distance    → Nominatim + ORS    │
│   ├── POST /api/send-inquiry          → Gmail SMTP         │
│   └── POST /api/calendar/create-event → Google Calendar    │
└──────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
   Stripe API          Google Calendar       Resend / Gmail
   (Payments)          (Booking records)     (Email notifications)
```

> **Không có database.** Đây là quyết định có chủ ý cho một tiệm nhỏ — không cần infra phức tạp. Dữ liệu booking tồn tại trong Google Calendar; dữ liệu dịch vụ là TypeScript constants.

---

## 3. Các Entity Chính

### 3.1 `Service` — Dịch Vụ

```typescript
interface Service {
  id: string;
  category: 'Bridal' | 'PartyEvent' | 'Photoshoot' | 'Education' | 'Makeup' | 'Fee' | 'Products' | 'Photography';
  name: string;
  description: string;
  price: number;   // USD
  image: string;   // path to /public/images/
}
```

**22 dịch vụ** được hardcode trong `data/services.data.ts`:

| Category | Số lượng | Giá |
|---|---|---|
| Bridal (cô dâu) | 8 | $130 – $1,350 |
| PartyEvent (tiệc) | 6 | $95 – $205 |
| Photoshoot (chụp ảnh) | 2 | $235 – $400 |
| Education (dạy) | 2 | $495 – $595 |
| Fee / Products | 3 | $0 – $100 |

> **Quan trọng**: Dịch vụ `Bridal` có luồng riêng — không cho phép add-to-cart, thay vào đó redirect sang `/inquiry` để khách điền form liên hệ chi tiết.

### 3.2 `Booking` — Lịch Đặt

```typescript
interface Booking {
  id: string;
  customerName: string;
  date: string;
  time: string;
  serviceIds: string[];
  depositPaid: boolean;
  totalAmount: number;
}
```

**Booking không được lưu vào database.** Lifecycle của một booking:
1. Tồn tại trong `localStorage` (key: `pendingBooking`) trong lúc thanh toán
2. Sau khi Stripe webhook kích hoạt → ghi vào Google Calendar
3. `localStorage` được xóa sau khi trang `/payment-success` load xong

### 3.3 `Cart` — Giỏ Hàng

Cart là `Service[]` array — state thuần React (`useState` trong `App.tsx`). **Không persist** — refresh trang là mất. Đây là khoản nợ kỹ thuật cần giải quyết nếu tỉ lệ abandoned cart trở thành vấn đề.

### 3.4 `Translation` — Đa Ngôn Ngữ

```typescript
enum Language { EN, VI, FR, ZH, KO, ES }
```

Custom i18n không dùng thư viện ngoài. Toàn bộ string UI nằm trong `data/translations.data.ts` dưới dạng `Record<Language, Translation>`. Language state sống ở `App.tsx`, truyền xuống qua props.

---

## 4. Luồng Dữ Liệu Cốt Lõi

### 4.1 Luồng Thanh Toán (Happy Path)

```
[Khách] Chọn dịch vụ → Add to Cart (App.tsx state)
           │
           ▼
[/booking] Điền form: tên, email, phone, ngày giờ, địa chỉ
           │  POST /api/calculate-distance (Nominatim → ORS)
           │  → Travel fee tính theo khoảng cách thực tế
           │
           ▼
[Frontend] POST /create-checkout-session
           Body: { items, customerInfo, depositAmount }
           Deposit = 50% tổng + 2.9% + $0.30 phí thẻ (nếu dùng card)
           │
           ▼
[Backend]  Tạo Stripe Checkout Session → trả về { url }
           Đồng thời lưu metadata: tên, email, phone, ngày giờ, dịch vụ
           │
           ▼
[Frontend] Redirect sang Stripe-hosted checkout page
           Lưu pendingBooking vào localStorage trước khi redirect
           │
           ├── Khách thanh toán thành công
           │     ▼
           │   Stripe gọi webhook → POST /api/stripe/webhook
           │     Backend verify signature → respond 200 ngay lập tức
           │     Background async:
           │       ├── Tạo Google Calendar event (googleapis)
           │       └── Gửi confirmation email (Resend API)
           │     Stripe redirect → /payment-success
           │     Frontend đọc localStorage.pendingBooking → hiển thị chi tiết
           │     Xóa localStorage.pendingBooking
           │
           └── Khách hủy → /payment-canceled
               Lỗi kỹ thuật → /payment-error
```

### 4.2 Luồng Inquiry (Bridal Services)

```
[Khách] Xem ServiceDetail → category === 'Bridal'
           → Button "Book Now" redirect sang /inquiry (không qua cart)
           │
           ▼
[/inquiry] Form: tên, email, phone, travel fee, ngày giờ, serviceName, message
           │ POST /api/send-inquiry  ← CẢNH BÁO: đang trỏ localhost:3001!
           │
           ▼
[Backend]  Gửi email qua Gmail SMTP (Nodemailer)
           Người nhận: lecharme.beauteboutique@gmail.com
           Template: backend/templates/inquiry_email.html
```

### 4.3 Luồng Dữ Liệu Tĩnh (Static Data)

```
data/services.data.ts  ──► constants.ts (re-export) ──► App.tsx (state init)
                                                              │
                                                              ▼
                                                    Truyền xuống qua props
                                                    → ServiceCard, ServiceDetail,
                                                      BookingPage, AdminDashboard
```

---

## 5. Cấu Trúc Thư Mục (Annotated)

```
beauty-store-website-project/
├── App.tsx                  ← Global router + state (cart, language, theme)
├── index.tsx                ← ReactDOM entry point
├── index.html               ← Vite shell; Tailwind CDN + importmap (dev)
├── types.ts                 ← Single source of truth cho TypeScript types
├── constants.ts             ← Legacy barrel, giữ lại cho backward compat
│
├── config/
│   ├── app.config.ts        ← Feature flags, API base URL, env vars
│   └── theme.config.ts      ← Design tokens → CSS custom properties
│
├── data/                    ← Toàn bộ "database" của app (static TS)
│   ├── services.data.ts     ← 22 dịch vụ (source of truth)
│   ├── content.data.ts      ← Team, testimonials, company info
│   ├── homepage.data.ts     ← Stats, feature blocks
│   └── translations.data.ts ← Toàn bộ i18n strings (EN/VI/FR/ZH/KO/ES)
│
├── components/              ← React components (feature-based, flat)
│   ├── Layout.tsx           ← Navbar + Footer wrapper
│   ├── BookingPage.tsx      ← Multi-step booking form + Stripe initiation
│   ├── ServiceDetail.tsx    ← Service info, gallery, add-to-cart
│   ├── InquiryPage.tsx      ← Bridal contact form (⚠️ localhost bug)
│   ├── AdminDashboard.tsx   ← Bảng quản trị nội bộ (không có auth thật)
│   ├── Chatbot.tsx          ← Gemini AI chatbot (currently disabled)
│   └── Payment*.tsx         ← Các trang kết quả thanh toán
│
├── services/
│   ├── geminiService.ts     ← Gemini API wrapper (chatbot "Lumi")
│   └── api/                 ← Stub API layer (localStorage mock — chờ backend migration)
│       ├── servicesApi.ts
│       ├── bookingApi.ts
│       └── contentApi.ts
│
└── backend/
    ├── server.js            ← Express server đơn file — toàn bộ backend logic
    └── templates/
        ├── confirmation_email.html
        └── inquiry_email.html
```

---

## 6. Biến Môi Trường

### Frontend (prefix `VITE_`)
| Biến | Mô tả |
|---|---|
| `VITE_API_BASE_URL` | Base URL của backend API (default: `/api`) |
| `VITE_ENABLE_MOCK_DATA` | Dùng mock data hay gọi API thật |
| `VITE_PAYMENT_PUBLIC_KEY` | Stripe publishable key |
| `VITE_GEMINI_API_KEY` | Gemini API key (cho chatbot Lumi) |

### Backend (Node.js `process.env`)
| Biến | Mô tả |
|---|---|
| `PORT` | Server port (default: 3001) |
| `CLIENT_DOMAIN` | Frontend URL (Vercel URL, dùng cho Stripe redirect) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification |
| `RESEND_API_KEY` | Resend email service |
| `GOOGLE_CREDENTIALS_JSON` | Google service account JSON (dưới dạng string) |
| `GOOGLE_CALENDAR_ID` | ID lịch Google Calendar của tiệm |
| `ORS_API_KEY` | OpenRouteService (tính khoảng cách di chuyển) |
| `SMTP_USER` / `SMTP_PASS` | Gmail SMTP (cho inquiry emails) |

---

## 7. Quyết Định Kiến Trúc & Lý Do

| Quyết định | Lý do | Trade-off |
|---|---|---|
| **Không dùng database** | Tiệm nhỏ, volume thấp, zero infra cost | Không có lịch sử booking; không thể query |
| **Google Calendar làm "database" booking** | Chủ tiệm đã dùng Google Calendar hàng ngày | Khó scale; không phải RDBMS |
| **Static TypeScript cho service data** | Deploy instant, zero latency, type-safe | Mỗi lần thêm dịch vụ phải deploy lại code |
| **Một file `server.js` cho toàn bộ backend** | Đơn giản, dễ debug, đủ dùng cho scale hiện tại | Khó mở rộng khi thêm route phức tạp |
| **Bridal → Inquiry (không qua cart)** | Dịch vụ cô dâu cần tư vấn riêng, giá custom | UX khác biệt so với dịch vụ thường |
| **Stub API layer (`services/api/`)** | Chuẩn bị cho backend migration dễ dàng | Hiện dùng localStorage — mất data khi reload |
| **Tailwind qua CDN** | Không cần build step cho CSS | CDN load delay; không tree-shake; không custom config đầy đủ |
| **Deposit 50%** | Giảm no-show, đảm bảo commitment | Cần refund policy rõ ràng khi hủy |

---

## 8. Điểm Cần Chú Ý (Known Issues & Tech Debt)

> **🔴 Bug cần fix ngay:**
> - Cart state không persist — refresh trang mất giỏ hàng

> **🟡 Bảo mật:**
> - Admin panel dùng `password === 'admin'` hardcode ở client-side — hoàn toàn không có bảo mật thật
> - Backend CORS: `app.use(cors())` không giới hạn origin — mọi domain đều gọi được
> - Price edits trong Admin chỉ tồn tại in-memory — không persist, reload là mất

> **🟢 Tính năng sẵn sàng bật:**
> - **Chatbot "Lumi"** (`Chatbot.tsx`) đã code xong với Gemini 2.5 Flash, chỉ cần uncomment trong `Layout.tsx` và cung cấp `VITE_GEMINI_API_KEY`
> - Stub API layer đã có interface đầy đủ — khi có backend thật chỉ cần thay implementation, không cần đổi calling code

---

## 9. Luồng Deploy

```
Developer pushes code
       │
       ├── Frontend (auto-deploy Vercel)
       │     npm run build → Vite bundles → Vercel CDN
       │     Domain: lecharmebeautique.com (hoặc *.vercel.app)
       │
       └── Backend (manual deploy / Render auto-deploy từ GitHub)
             npm run server → nodemon backend/server.js
             Domain: beauty-store-website-project.onrender.com
             ⚠️ Render free tier sleep sau 15 phút inactivity → cold start ~30s
```

> **Không có CI/CD pipeline**, không có test suite. Deploy bằng cách push lên GitHub rồi Vercel/Render tự pick up.

---

## 10. Roadmap Mở Rộng (Khi Cần)

Theo thứ tự ưu tiên nghiệp vụ:

1. **Fix InquiryPage localhost bug** — critical, blocking production inquiries
2. **Persist cart to localStorage** — giảm abandoned cart do refresh
3. **Thêm real database** (PlanetScale/Supabase) khi cần lịch sử booking, CRM
4. **Bật Chatbot Lumi** — code đã sẵn sàng, chỉ cần env var + uncomment
5. **Secure Admin panel** — JWT hoặc Clerk/NextAuth khi cần multi-user
6. **Migrate service data sang CMS** (Sanity/Contentful) khi chủ tiệm muốn tự edit
7. **Test suite** — ít nhất E2E test cho payment flow

---

*Tài liệu này phản ánh trạng thái hệ thống tại 2026-09-25. Cập nhật mỗi khi có thay đổi kiến trúc lớn.*
