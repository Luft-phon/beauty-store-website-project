# Hệ thống đa ngôn ngữ

## `App.tsx`

```tsx
const [currentLang, setCurrentLang] = useState<Language>(Language.EN);
const t = TRANSLATIONS[currentLang];
```

- `currentLang`: lưu ngôn ngữ hiện tại đang được sử dụng.
- `setCurrentLang`: dùng để thay đổi ngôn ngữ hiện tại.
- `Language.EN`: ngôn ngữ mặc định là **English**.
- `t`: lấy nội dung bản dịch tương ứng với `currentLang` từ `TRANSLATIONS`.

---

## `types.ts`

File dùng để khai báo và định nghĩa các ngôn ngữ mà hệ thống hỗ trợ.
  

```ts
export enum Language {
  EN = 'English',
  VI = 'Tiếng Việt',
  FR = 'Français',
  ZH = '中文',
  KO = '한국어',
  ES = 'Español'
}
```

Các ngôn ngữ hiện được hỗ trợ:

- English
- Tiếng Việt
- Français
- 中文
- 한국어
- Español

---

## `constants.ts`

File chứa toàn bộ nội dung bản dịch của hệ thống.

Thông thường, `TRANSLATIONS` sẽ được khai báo trong file này và được truy xuất dựa vào ngôn ngữ hiện tại:

```ts
const t = TRANSLATIONS[currentLang];
```

Luồng hoạt động:

```text
Language
   ↓
currentLang
   ↓
TRANSLATIONS[currentLang]
   ↓
Nội dung hiển thị theo ngôn ngữ được chọn
```

## Luồng thay đổi 1 text hardcode
1. Vào /types.ts khai báo key mới trong interface
2. vào data/translations.data.ts thêm nội dung cho các ngôn ngữ
3. thay text hardcode bằng biến t
```
// ❌ Code cũ (hardcode):
<button>Confirm Payment</button>

// ✅ Code mới (đa ngôn ngữ):
// Đảm bảo component của bạn đã nhận được biến `t` từ props hoặc context
<button>{t.booking.confirmPayment}</button>
```