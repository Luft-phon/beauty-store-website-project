# Project Structure Overview

This document explains the new organized architecture for easy data management and backend integration.

## 📂 Directory Structure

```
beauty-store-website-project/
│
├── 📁 data/                        # ✨ All mock data (easy to edit!)
│   ├── services.data.ts           # Service listings, pricing, details
│   ├── content.data.ts            # Gallery, team, testimonials, company info
│   ├── translations.data.ts       # Multi-language support
│   └── index.ts                   # Central data exports
│
├── 📁 services/
│   ├── 📁 api/                    # 🔌 Backend integration layer
│   │   ├── servicesApi.ts        # Service CRUD operations
│   │   ├── bookingApi.ts         # Booking operations
│   │   ├── contentApi.ts         # Content retrieval
│   │   └── index.ts              # Centralized API exports
│   └── geminiService.ts           # Chatbot integration
│
├── 📁 components/                  # React components
│   ├── AdminDashboard.tsx         
│   ├── Chatbot.tsx                
│   ├── Layout.tsx                 
│   └── ServiceDetail.tsx          
│
├── 📁 config/                      # ⚙️ Configuration
│   └── app.config.ts              # App settings, feature flags, API config
│
├── 🔧 constants.ts                 # Legacy exports (backward compatibility)
├── 🎨 types.ts                     # TypeScript type definitions
├── 🚀 App.tsx                      # Main application
├── 📄 index.tsx                    # Entry point
├── 📋 vite.config.ts              # Vite configuration
└── 📦 package.json                # Dependencies
```

## 🎯 Key Features of This Architecture

### 1. **Separation of Concerns** ✨
- **Data** is separated from **Logic** and **UI**
- Easy to find and update content
- Clean, maintainable codebase

### 2. **Easy Data Management** 📝
```typescript
// Want to add a new service? Just edit data/services.data.ts!
export const MOCK_SERVICES: Service[] = [
  {
    id: '7',
    category: 'Makeup',
    name: 'New Service',
    price: 199,
    // ...
  }
];
```

### 3. **Backend-Ready** 🔌
```typescript
// Current: Mock data
export const getAllServices = async () => {
  return Promise.resolve(MOCK_SERVICES);
};

// Future: Real API (just update the function!)
export const getAllServices = async () => {
  const response = await fetch(`${API_URL}/services`);
  return response.json();
};
```

### 4. **Configuration Management** ⚙️
```typescript
// config/app.config.ts
export const config = {
  features: {
    enableChat: true,        // Toggle chatbot
    enableAdminPanel: true,  // Toggle admin features
    // ... more flags
  }
};
```

## 🔄 Data Flow

```
┌─────────────┐
│   User UI   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ Components  │ (App.tsx, ServiceDetail.tsx, etc.)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│ API Layer   │ (services/api/*.ts)
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  Mock Data  │ (data/*.ts) → Will become → Backend API
└─────────────┘
```

## 📖 Quick Reference Guides

### For Content Updates
👉 **See:** [DATA_MANAGEMENT_GUIDE.md](./DATA_MANAGEMENT_GUIDE.md)
- How to add/edit services
- How to update gallery images
- How to manage team members
- How to update translations

### For Backend Integration
👉 **See:** [BACKEND_MIGRATION_GUIDE.md](./BACKEND_MIGRATION_GUIDE.md)
- Database schema
- API endpoint specifications
- Step-by-step migration process
- Code examples

## 🎨 Component Architecture

### Component Imports
Components now import from organized locations:

```typescript
// ✅ Good: Import from centralized API
import { servicesApi } from '../services/api';

// ✅ Good: Import data if needed
import { MOCK_SERVICES } from '../data';

// ✅ Good: Import config
import { config } from '../config/app.config';

// ❌ Avoid: Direct imports from multiple files
```

## 🔐 Environment Variables

Create a `.env` file for configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=true

# Gemini AI (for chatbot)
VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here

# Payment (when ready)
VITE_PAYMENT_PUBLIC_KEY=your_payment_key
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Update Data
Edit files in the `/data` folder - changes appear immediately!

### 4. Toggle Features
Edit `config/app.config.ts` to enable/disable features

## 📱 Feature Flags

Control which features are enabled:

```typescript
// config/app.config.ts
features: {
  enableChat: true,          // Chatbot functionality
  enableAdminPanel: true,    // Admin dashboard
  enableMultiLanguage: true, // Language switcher
  enableBooking: true,       // Booking system
  enableCart: true,          // Shopping cart
}
```

## 🔧 Maintenance

### Adding a New Service
1. Open `data/services.data.ts`
2. Add service to `MOCK_SERVICES` array
3. Add details to `MOCK_SERVICE_DETAILS` array
4. Save and refresh browser ✨

### Updating Translations
1. Open `data/translations.data.ts`
2. Add new key to all language objects
3. Update type in `types.ts` if needed
4. Save and refresh browser ✨

### Changing Configuration
1. Open `config/app.config.ts`
2. Update settings
3. Restart dev server if needed

## 📊 Type Safety

All data structures are typed in `types.ts`:

```typescript
export interface Service {
  id: string;
  category: 'Makeup' | 'Nails' | 'Tattooing' | 'Photography';
  name: string;
  description: string;
  price: number;
  image: string;
}
```

TypeScript ensures data consistency across the app! 🎯

## 🎓 Best Practices

1. **Always use unique IDs** for services, bookings, etc.
2. **Follow existing data structures** when adding new items
3. **Test changes** in the browser after updates
4. **Keep backup** of data files before major changes
5. **Use TypeScript types** for type safety
6. **Document changes** in comments when needed

## 📝 Migration Checklist

When ready to add a backend:

- [ ] Set up backend server
- [ ] Create database tables
- [ ] Implement API endpoints
- [ ] Update `.env` with API URL
- [ ] Replace mock data in `services/api/` files
- [ ] Test each endpoint
- [ ] Deploy!

See [BACKEND_MIGRATION_GUIDE.md](./BACKEND_MIGRATION_GUIDE.md) for details.

## 🆘 Troubleshooting

### Changes Not Appearing?
1. Save the file
2. Hard refresh browser (Ctrl+Shift+R)
3. Check console for errors

### TypeScript Errors?
1. Check `types.ts` for required properties
2. Ensure all required fields are provided
3. Follow existing data structure examples

### Need Help?
- Check inline comments in data files
- Review the guide documents
- Check console for detailed error messages

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

---

**Ready to customize your application?** Start with the [DATA_MANAGEMENT_GUIDE.md](./DATA_MANAGEMENT_GUIDE.md)! 🚀
