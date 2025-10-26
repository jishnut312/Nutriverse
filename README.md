<<<<<<< HEAD
# 🍎 NutriVerse - Discover the Power of Nature

A comprehensive nutrition web application built with Next.js 15, TypeScript, and Tailwind CSS. Explore detailed nutrition information for fruits, vegetables, and herbs to make informed dietary choices.

![NutriVerse Hero](https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop)

## ✨ Features

### 🍏 Core Features (MVP)
- **Home Page** - Hero section with "Discover the Power of Nature" and Food of the Day
- **Category Pages** - Browse fruits, vegetables, and herbs with grid layouts
- **Food Detail Pages** - Comprehensive nutrition facts, health benefits, and interactive charts
- **Search Functionality** - Real-time search by food name, nutrients, or health benefits
- **Filter System** - Filter by vitamin type, health goals, categories, and seasons

### 🍓 Interactive & Visual Features
- **Nutrition Charts** - Interactive bar and radar charts using Recharts
- **Favorites System** - Save favorite foods to localStorage with dedicated favorites page
- **Animations** - Smooth Framer Motion animations for cards, hover effects, and page transitions
- **Dark/Light Mode** - Theme toggle with next-themes
- **Responsive Design** - Mobile-first design that works on all devices

### 🍍 Advanced Features
- **Food of the Day** - Daily highlighted nutrition recommendation
- **Seasonal Indicators** - Shows which foods are currently in season
- **Health Benefits Tracking** - Categorized benefits (Hair, Skin, Immunity, Heart, etc.)
- **Comprehensive Nutrition Data** - Detailed vitamins, minerals, and macronutrients
- **Fun Facts** - Educational information about each food

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├─ app/
│   ├─ page.tsx                   → Home page
│   ├─ category/
│   │   └─ [category]/
│   │       └─ page.tsx           → Category list page (fruits, vegetables, herbs)
│   ├─ food/
│   │   └─ [slug]/
│   │       └─ page.tsx           → Food detail page
│   ├─ search/
│   │   └─ page.tsx               → Search page
│   ├─ favorites/
│   │   └─ page.tsx               → Favorites page
│   ├─ api/
│   │   └─ foods/
│   │       ├─ route.ts           → Foods API endpoint
│   │       └─ [slug]/
│   │           └─ route.ts       → Individual food API
│   └─ layout.tsx                 → Root layout with Navbar & Footer
│
├─ components/
│   ├─ Navbar.tsx                 → Navigation with theme toggle
│   ├─ Footer.tsx                 → Footer with links
│   ├─ FoodCard.tsx               → Food card with animations
│   ├─ SearchBar.tsx              → Search input with debouncing
│   └─ FilterBar.tsx              → Advanced filtering system
│
├─ types/
│   └─ food.ts                    → TypeScript type definitions
│
├─ data/
│   └─ foods.json                 → Sample nutrition data (10 foods)
│
└─ styles/
    └─ globals.css                → Global styles and custom utilities
```

## 🍎 Sample Foods Included

The application includes comprehensive nutrition data for:

1. **Fruits**: Apple, Blueberry, Avocado, Banana, Strawberry
2. **Vegetables**: Spinach, Carrot, Broccoli
3. **Herbs**: Basil, Turmeric

Each food includes:
- Detailed nutritional facts (calories, macros, vitamins, minerals)
- Health benefits with categories and descriptions
- High-quality images from Unsplash
- Seasonal availability
- Fun facts and educational content
- Tags for easy searching

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nutriverse
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎨 Key Features Walkthrough

### Home Page
- Animated hero section with rotating food emojis
- Food of the Day with random selection
- Featured foods grid
- Call-to-action sections

### Category Pages
- Dynamic routing for fruits, vegetables, and herbs
- Search and filter functionality
- Statistics overview
- Responsive grid layout

### Food Detail Pages
- Comprehensive nutrition breakdown
- Interactive charts (bar chart for macros, radar chart for vitamins)
- Health benefits with icons
- Seasonal indicators
- Favorite and share functionality

### Search & Filters
- Real-time search with debouncing
- Advanced filtering by category, vitamins, health goals, and seasons
- Recent and popular searches
- Search tips and suggestions

### Favorites System
- Local storage persistence
- Favorites statistics
- Category breakdown
- Bulk management options

## 🎯 Development Roadmap

### Completed ✅
- [x] Core MVP features
- [x] Search and filtering
- [x] Nutrition charts
- [x] Favorites system
- [x] Dark/light mode
- [x] Responsive design
- [x] Animations and interactions

### Future Enhancements 🚀
- [ ] Compare Foods feature (side-by-side nutrition comparison)
- [ ] AI Nutrition Assistant with OpenAI integration
- [ ] PWA support for offline usage
- [ ] CMS integration (Sanity/Strapi)
- [ ] User accounts and cloud sync
- [ ] Meal planning features
- [ ] Nutrition tracking
- [ ] Recipe suggestions
- [ ] Social sharing features

## 🛠 Customization

### Adding New Foods
1. Add food data to `src/data/foods.json` following the existing structure
2. Ensure all required fields are included (see `src/types/food.ts`)
3. Add high-quality images (preferably from Unsplash)

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in component files

### API Integration
- Replace local JSON data with real API calls
- Update API routes in `src/app/api/foods/`
- Add authentication if needed

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## 🎨 Design System

### Colors
- Primary: Green (emerald-600)
- Secondary: Blue (blue-600)
- Accent: Various category-specific colors
- Neutral: Gray scale for text and backgrounds

### Typography
- Headings: Geist Sans (bold weights)
- Body: Geist Sans (regular/medium)
- Code: Geist Mono

### Components
- Consistent spacing (Tailwind spacing scale)
- Rounded corners (lg, xl for cards)
- Subtle shadows and hover effects
- Smooth transitions and animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- AWS Amplify
- Docker deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Recharts** - For beautiful charts
- **Unsplash** - For high-quality food images
- **Lucide** - For beautiful icons

---

**Built with ❤️ for healthy living and informed nutrition choices.**
# Nutriverse
Your comprehensive guide to understanding nutrition. Discover detailed information about natural foods, their health benefits, and make informed dietary choices for optimal wellness.
 b2e0e7fbb36dca76b15ec24baa220874014e60aa
