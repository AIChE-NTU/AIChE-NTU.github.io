# AIChE NTU Student Chapter Website

[![Maintenance Status](https://img.shields.io/badge/Maintenance-Active-green.svg)](https://github.com/AIChE-NTU/aiche-ntu.github.io)
[![Website Status](https://img.shields.io/badge/Website-Live-blue.svg)](https://aiche-ntu.github.io)
[![Documentation](https://img.shields.io/badge/Documentation-Complete-brightgreen.svg)](QUICK_REFERENCE.md)

## 🎯 For Content Managers & Publicity Team

**→ [Start Here: Quick Reference Guide](QUICK_REFERENCE.md)**

This website is designed to be fully maintainable through simple JSON files. **No coding knowledge required!**

### ✨ What You Can Update Easily:
- 📝 Add new events, workshops, and activities
- 👥 Update team member information
- 📰 Post new articles and announcements
- 📧 Change contact information
- 🏆 Add competition results
- 🏭 Update industry visit details

### Quick Navigation
- **[⚡ Quick Reference](QUICK_REFERENCE.md)** - Essential guide for content updates  
- **[🎯 Step-by-Step Tutorial](WEBSITE_MAINTENANCE_GUIDE.md)** - Detailed instructions with screenshots
- **[📊 Data Files Guide](DATA_STRUCTURE.md)** - Understanding JSON structure

## 🚀 How to Update Content (3 Simple Steps)

1. **Find the File** - Go to `public` → `data` → choose the right JSON file
2. **Edit Content** - Click the pencil icon ✏️ and make your changes
3. **Save & Publish** - Add a commit message and click "Commit changes"

**⏰ Changes appear on the website in 2-5 minutes!**

---

## 📋 Common Tasks

| What You Want to Do | File to Edit | Guide |
|---------------------|--------------|-------|
| Add new event | `activities.json` | [Quick Reference](QUICK_REFERENCE.md) |
| Update team members | `team.json` | [Quick Reference](QUICK_REFERENCE.md) |
| Post new article | `articles.json` | [Quick Reference](QUICK_REFERENCE.md) |
| Change contact info | `socialcontacts.json` | [Quick Reference](QUICK_REFERENCE.md) |
| Add workshop | `workshops.json` | [Quick Reference](QUICK_REFERENCE.md) |

---

## � Need Help?

- **Content Questions:** Ask your current executive committee
- **Website Not Updating:** Wait 5 minutes, then refresh your browser
- **JSON Errors:** Use [JSON Validator](https://jsonlint.com/) to check your format
- **Technical Issues:** Create a GitHub issue or contact the technical team

---

## �🏗️ For Developers Only

<details>
<summary>Click to expand technical details</summary>

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

</details>

---

**✨ Ready to update content? Start with the [Quick Reference Guide](QUICK_REFERENCE.md)!**
