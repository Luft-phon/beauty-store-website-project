<h1 align="center"> Lumière Beauty & Wedding </h1>
<p align="center">A premium beauty salon and wedding services website with modern e-commerce features, AI chatbot, and multi-language support.</p>
 <div  align="center" >
   <!-- <img alt="Beauty Store Preview" src="./preview.gif"/> -->
 </div>

## ✨ What is this website?

A **fully-featured beauty salon website** built with React + TypeScript. Perfect for beauty businesses, wedding services, or any service-based business looking for an elegant online presence.

### 🎯 Key Features

- 🛍️ **Service Showcase** - Beautiful service catalog with detailed pages
- 🛒 **Shopping Cart** - Add multiple services to cart
- 📅 **Booking System** - Integrated appointment scheduling
- 🤖 **AI Chatbot** - Google Gemini-powered customer support
- 🌍 **5 Languages** - English, Vietnamese, French, Chinese, Korean
- 📱 **Responsive Design** - Perfect on all devices
- � **Modern UI** - Elegant design with Tailwind CSS
- 👨‍💼 **Admin Dashboard** - Manage services and bookings
- 📊 **Analytics** - Track bookings and revenue

### 🔥 What Makes This Special?

✅ **No Backend Required** - Runs entirely in the browser  
✅ **Easy Content Management** - Update data in simple files  
✅ **Backend-Ready** - Structured for easy API integration  
✅ **Production-Ready** - Deploy immediately  
✅ **Well-Documented** - Comprehensive guides included

## ⚝ Technology Stack
- React 19.2.0 + TypeScript 5.8.2
- Vite 6.2.0 (Build Tool)
- React Router DOM 7.9.6 (Navigation)
- Tailwind CSS (UI Styling via CDN)
- Lucide React (Icons)
- Recharts (Analytics Charts)
- Google Gemini AI (Chatbot Integration)
- Responsive Design (Mobile-First)

## 📌 Prerequisite
- Node.js (v18 or higher)
- npm (version 8.0.0 or higher)
- VS Code (recommended)
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Luft-phon/beauty-store-website.git
cd beauty-store-website-project
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment (Optional)
```bash
cp .env.example .env
# Edit .env and add your Google Gemini API key for chatbot
```

### 4️⃣ Start Development Server
```bash
npm run dev
```

### 5️⃣ Open in Browser
Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎨 Customize Your Content

### Quick Start
All content can be easily updated without touching component code!

1. **Update Services & Prices**
   - Edit: `data/services.data.ts`
   - Add/remove/modify services instantly

2. **Change Gallery Images**
   - Edit: `data/content.data.ts`
   - Update team members, testimonials, company info

3. **Modify Translations**
   - Edit: `data/translations.data.ts`
   - All UI text in 5 languages

4. **Toggle Features**
   - Edit: `config/app.config.ts`
   - Enable/disable chat, admin panel, etc.

### 📚 Documentation

| Guide | Purpose |
|-------|---------|
| **[QUICK_START.md](./QUICK_START.md)** | Start here! Quick overview |
| **[DATA_MANAGEMENT_GUIDE.md](./DATA_MANAGEMENT_GUIDE.md)** | How to update all content |
| **[BACKEND_MIGRATION_GUIDE.md](./BACKEND_MIGRATION_GUIDE.md)** | Add backend when ready |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Project structure details |
| **[SETUP_SUMMARY.md](./SETUP_SUMMARY.md)** | What was set up and why |

## 📁 Project Structure

```
beauty-store-website-project/
├── 📂 data/                    # ← Edit this for content!
│   ├── services.data.ts       # Services, prices, details
│   ├── content.data.ts        # Gallery, team, testimonials
│   └── translations.data.ts   # Multi-language text
│
├── 📂 services/api/            # API abstraction layer
│   ├── servicesApi.ts         # Service operations
│   ├── bookingApi.ts          # Booking operations
│   └── contentApi.ts          # Content operations
│
├── 📂 config/                  # Configuration
│   └── app.config.ts          # Feature flags & settings
│
├── 📂 components/              # React components
│   ├── AdminDashboard.tsx     # Admin panel
│   ├── Chatbot.tsx            # AI chatbot
│   ├── Layout.tsx             # Page layout
│   └── ServiceDetail.tsx      # Service detail page
│
├── App.tsx                     # Main application
├── types.ts                    # TypeScript types
└── constants.ts                # Legacy exports
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Option 3: GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Features Breakdown

### For Customers
- Browse services by category
- View detailed service information
- Add services to cart
- Book appointments
- Multi-language support
- AI chatbot assistance

### For Business Owners
- Admin dashboard
- Manage services
- View bookings
- Analytics & charts
- Easy content updates

## 💡 Use Cases

Perfect for:
- 💄 Beauty Salons
- 💅 Nail Studios
- 💒 Wedding Services
- 📸 Photography Studios
- 💆 Spa & Wellness Centers
- 🎨 Any Service-Based Business

## 🔮 Roadmap

### Current Version (Frontend-Only)
✅ All features working with mock data  
✅ Can deploy and use immediately  
✅ Easy content management

### Future (Backend Integration)
- [ ] Connect to real database
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] File upload for images
- [ ] Advanced booking management

**Migration Guide Included!** See `BACKEND_MIGRATION_GUIDE.md`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Key Features
- **Multi-Language Support**: English, Vietnamese, French, Chinese, Korean
- **Service Catalog**: Browse makeup, nails, tattooing, and photography services
- **Service Detail Pages**: View comprehensive information for each service
- **Shopping Cart**: Add services, view cart, manage bookings
- **Booking System**: Schedule appointments with date/time selection
- **AI Chatbot**: Lumi assistant powered by Google Gemini AI
- **Admin Dashboard**: Manage service pricing and view analytics
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Gallery**: Masonry-style image gallery showcasing work
- **No Backend Required**: Fully client-side application

## 📱 Pages
- `/` - Home page with hero and service categories
- `/about` - About us, team, and philosophy
- `/services` - Service catalog grid
- `/services/:id` - Individual service detail page (NEW!)
- `/gallery` - Image gallery
- `/cart` - Shopping cart
- `/booking` - Appointment booking form
- `/contact` - Contact information
- `/admin` - Admin dashboard (password: admin)

## 🎨 Design Features
- Elegant luxury aesthetic with gold accents
- Serif fonts (Cormorant Garamond) for elegance
- Smooth animations and transitions
- Professional photography placeholders
- Consistent color scheme throughout
