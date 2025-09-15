# 🍕 Marf Pizza - Restaurant Menu Application

### Desktop Experience  
![Desktop Demo](desktopdemo.gif)


  ### Mobile Experience
<img src="phonedemo.gif" alt="Mobile Demo" width="300">


A comprehensive, modern restaurant menu application with both **customer-facing menu** and **admin management panel**. Built with React 19, TypeScript, and Vite, featuring a beautiful pizza-focused interface with full cart functionality, checkout process, and multi-language support.

## 🎯 Project Overview

This is a full-stack restaurant menu solution consisting of:
- **Frontend Client** (This repository): Customer menu interface + Admin panel
- **Backend Server**: Node.js/Express API with TypeORM and PostgreSQL

## ✨ Key Features

### 🍕 Customer Experience
- **Dynamic Menu Display**: Beautiful pizza cards with high-quality images from Pexels
- **Category Filtering**: Filter by pizza types (Classic, Gourmet, Appetizers, etc.)
- **Smart Shopping Cart**: Add/remove items, adjust quantities, persistent storage
- **Responsive Checkout**: Two-column desktop layout, mobile-optimized forms
- **WhatsApp Integration**: Direct order submission via WhatsApp API
- **Multi-language Support**: Full Arabic and English translations
- **Theme Switching**: Dark/Light mode with system preference detection
- **Loading Animations**: Lottie animations and smooth transitions

### 👨‍💼 Admin Panel
- **Secure Authentication**: JWT-based admin login system
- **Category Management**: Create, update, and delete menu categories
- **Item Management**: Add new pizzas with image uploads via Cloudinary
- **Real-time Updates**: Instant menu updates without page refresh
- **Image Upload**: Drag-and-drop image uploads with preview
- **Bulk Operations**: Delete multiple items and categories

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety and better DX
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI primitives
- **Framer Motion** - Smooth animations and transitions
- **React Router 7** - Client-side routing
- **Axios** - HTTP client for API communication

### UI/UX Libraries
- **Lucide React** - Beautiful, customizable icons
- **Lottie React** - Smooth loading animations
- **next-themes** - Theme management
- **react-i18next** - Internationalization
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Conditional Tailwind classes

### Development Tools
- **ESLint** - Code linting and quality
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Backend Server** running (see server repository)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd RestaurauntMenu-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file
VITE_API_BASE_URL=http://localhost:3008
```

4. **Start development server**
```bash
npm run dev
```

🌐 **Application will be available at:** `http://localhost:3000`

## 📁 Project Architecture

```
src/
├── components/
│   ├── adminComponents/          # Admin panel components
│   │   ├── CategoryForm.tsx     # Category creation/editing
│   │   ├── ItemForm.tsx         # Pizza item management
│   │   ├── LoginForm.tsx        # Admin authentication
│   │   └── DeleteForms.tsx      # Bulk delete operations
│   ├── generalComponents/        # Customer-facing components
│   │   ├── cart-provider.tsx    # Global cart state management
│   │   ├── cart.tsx             # Shopping cart UI
│   │   ├── checkout.tsx         # Checkout process
│   │   ├── pizza-menu.tsx       # Main menu display
│   │   ├── pizza-card.tsx       # Individual pizza cards
│   │   ├── menu-header.tsx      # Navigation header
│   │   ├── theme-toggle.tsx     # Dark/light mode switch
│   │   └── language-switcher.tsx # Language selection
│   └── ui/                       # Reusable UI components
│       ├── button.tsx           # Custom button component
│       ├── card.tsx             # Card layout component
│       ├── input.tsx            # Form input component
│       ├── dialog.tsx           # Modal dialogs
│       └── sheet.tsx            # Slide-out panels
├── hooks/                        # Custom React hooks
│   ├── use-admin.ts             # Admin panel logic
│   ├── use-media-query.tsx      # Responsive breakpoints
│   └── use-mobile.tsx           # Mobile detection
├── pages/                        # Route components
│   ├── menu/                    # Customer menu page
│   └── admin/                   # Admin panel page
├── lib/                          # Utilities and services
│   ├── services.ts              # API communication
│   └── utils.ts                 # Helper functions
├── languages/                    # Internationalization
│   ├── ar.json                  # Arabic translations
│   └── en.json                  # English translations
├── types/                        # TypeScript definitions
│   └── index.ts                 # Interface definitions
└── assets/                       # Static assets
    └── loadingLottieAsset.json  # Animation files
```

## 🌍 Internationalization

### Supported Languages
- **🇸🇦 Arabic (ar)** - Primary language with RTL support
- **🇺🇸 English (en)** - Secondary language with LTR support

### Language Features
- **Automatic Detection** - Browser language preference
- **RTL/LTR Support** - Proper text direction handling
- **Dynamic Switching** - Real-time language changes
- **Comprehensive Coverage** - All UI elements translated

### Adding New Languages
1. Create new language file in `src/languages/`
2. Add language option to language switcher
3. Update i18n configuration

## 🎨 Design System

### Color Palette
- **Primary**: Red (#ef4444) - Pizza brand color
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Custom CSS variables for theme consistency

### Typography
- **Arabic**: Cairo font family for proper Arabic rendering
- **English**: System font stack for optimal readability
- **Responsive**: Fluid typography scaling

### Components
- **Consistent Spacing** - 4px base unit system
- **Border Radius** - Consistent rounded corners
- **Shadows** - Subtle elevation system
- **Animations** - Smooth transitions and micro-interactions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column, bottom cart
- **Tablet**: 768px - 1024px - Adaptive grid layout
- **Desktop**: > 1024px - Multi-column, sidebar cart

### Mobile Optimizations
- **Touch-friendly** - 44px minimum touch targets
- **Bottom Navigation** - Cart footer for easy access
- **Swipe Gestures** - Category filtering
- **Fast Loading** - Optimized images and code splitting

### Desktop Features
- **Sidebar Cart** - Persistent cart access
- **Two-column Checkout** - Order summary + delivery form
- **Hover Effects** - Enhanced interactivity
- **Keyboard Navigation** - Full accessibility support

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Code Quality
npm run lint:fix     # Fix auto-fixable lint issues
```

## 🔌 API Integration

### Endpoints Used
- `GET /api/menu` - Fetch menu categories and items
- `POST /api/checkout` - Submit order for WhatsApp delivery
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/category` - Create new category
- `POST /api/admin/item` - Create new menu item
- `POST /api/upload` - Upload images to Cloudinary
- `DELETE /api/admin/category/:id` - Delete category
- `DELETE /api/admin/item/:id` - Delete menu item

### Error Handling
- **Network Errors** - Graceful fallbacks and retry logic
- **Validation Errors** - User-friendly error messages
- **Loading States** - Skeleton screens and spinners

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Output directory: dist/
# Optimized assets, code splitting, tree shaking
```

### Environment Variables
```env
# Required
VITE_API_BASE_URL=https://your-api-domain.com

# Optional
VITE_APP_NAME=Marf Pizza
VITE_APP_VERSION=1.0.0
```

### Deployment Platforms
- **Vercel** - Recommended for React apps
- **Netlify** - Alternative with good performance
- **AWS S3 + CloudFront** - For enterprise deployments
- **Docker** - Containerized deployment

## 🔒 Security Features

### Admin Panel Security
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Admin-only access control
- **Input Validation** - Server-side validation
- **XSS Protection** - Content sanitization

### Data Protection
- **HTTPS Only** - Secure communication
- **Environment Variables** - Sensitive data protection
- **CORS Configuration** - Cross-origin request security

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Menu loading and display
- [ ] Cart functionality (add/remove/update)
- [ ] Checkout process completion
- [ ] Admin login and management
- [ ] Image upload functionality
- [ ] Language switching
- [ ] Theme switching
- [ ] Responsive design across devices

### Performance Optimization
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - WebP format, lazy loading
- **Bundle Analysis** - Vite bundle analyzer
- **Caching Strategy** - Service worker implementation

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards
- **TypeScript** - Full type coverage required
- **ESLint** - Follow configured linting rules
- **Conventional Commits** - Use semantic commit messages
- **Component Structure** - Follow established patterns

### Pull Request Guidelines
- **Clear Description** - What changes and why
- **Screenshots** - Visual changes demonstration
- **Testing** - Manual testing completed
- **Documentation** - Update README if needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - High-quality food photography
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - Excellent documentation and support

---

**Built with ❤️ for Marf Pizza Restaurant**
