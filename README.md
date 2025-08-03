# AIChE NTU Student Chapter Website

[![Maintenance Status](https://img.shields.io/badge/Maintenance-Active-green.svg)](https://github.com/AIChE-NTU/aiche-ntu.github.io)
[![Website Status](https://img.shields.io/badge/Website-Live-blue.svg)](https://aiche-ntu.github.io)
[![Documentation](https://img.shields.io/badge/Documentation-Complete-brightgreen.svg)](MAINTENANCE_SUMMARY.md)

## 🎯 For Content Managers

**→ [Start Here: Maintenance Summary](MAINTENANCE_SUMMARY.md)**

This website is designed to be fully maintainable through JSON files. No coding knowledge required!

### Quick Navigation
- **[📖 Complete Maintenance Guide](WEBSITE_MAINTENANCE_GUIDE.md)** - Step-by-step instructions
- **[⚡ Quick Reference](QUICK_REFERENCE.md)** - One-page cheat sheet  
- **[🔧 Data Structure Guide](DATA_STRUCTURE.md)** - JSON file documentation

## 🏗️ For Developers

### Tech Stack
- **Frontend:** React 19 + TypeScript + Tailwind CSS
- **Routing:** React Router (Hash routing for GitHub Pages)
- **Build Tool:** Vite
- **Deployment:** GitHub Pages

### Development Setup
```bash
# Clone the repository
git clone https://github.com/AIChE-NTU/aiche-ntu.github.io.git
cd aiche-ntu.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Project Structure
```
src/
├── components/          # Reusable React components
├── pages/              # Page components
├── constants.ts        # Type definitions and constants
├── App.tsx            # Main app component
└── index.tsx          # Entry point

public/
├── data/              # JSON content files (EDITABLE)
└── images/           # Static images
```

### Key Features
- **JSON-Driven Content:** All content managed through `public/data/` files
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **SEO Optimized:** Proper meta tags and semantic HTML
- **Performance Optimized:** Code splitting and lazy loading
- **Accessibility:** WCAG 2.1 compliant

## 📝 Contributing

1. **Content Updates:** Edit JSON files in `public/data/`
2. **Feature Requests:** Create GitHub issues
3. **Bug Reports:** Include screenshots and steps to reproduce
4. **Code Contributions:** Fork → Feature Branch → Pull Request

## 🚀 Deployment

Website automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

**Live URL:** [https://aiche-ntu.github.io](https://aiche-ntu.github.io)

## 📊 Maintenance

- **Content Updates:** Through JSON files (non-technical)
- **Design Updates:** Requires React/CSS knowledge
- **Feature Additions:** Requires React/TypeScript knowledge

## 📞 Support

- **Content Issues:** Contact current executive committee
- **Technical Issues:** Create GitHub issue or contact technical team
- **Emergency:** Refer to [Maintenance Summary](MAINTENANCE_SUMMARY.md)

---

**Built with ❤️ by the AIChE NTU Student Chapter Technical Team**
