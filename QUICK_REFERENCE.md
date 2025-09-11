# 📋 Quick Reference - Website Content Updates

**For AIChE NTU Publicity Team & Content Managers**

> **💡 New to this?** Don't worry! This guide will have you updating the website like a pro in 5 minutes.

---

## 🎯 Most Common Tasks (What you'll use 90% of the time)

### 🎉 Add New Event/Activity
**When:** Planning a new event, meeting, or activity  
**File:** `public/data/activities.json`  
**What to add:**
```json
{
  "id": "event-name-2025",
  "title": "Your Event Title",
  "description": "Brief description",
  "date": "2025-03-15",
  "location": "Location name",
  "status": "Upcoming"
}
```

### 🎓 Add New Workshop
**When:** Organizing technical workshops or training sessions  
**File:** `public/data/workshops.json`  
**What to add:**
```json
{
  "id": "workshop-name-2025",
  "title": "Workshop Title",
  "description": "What this workshop covers",
  "date": "2025-04-20",
  "instructor": "Dr. Name",
  "status": "Upcoming"
}
```

### 🏠 Update Homepage Banner Text
**When:** Want to change the main message visitors see  
**File:** `public/data/homepage.json`  
**What to change:**
- Find `hero.subtitle` to change the main banner text
- Update `sections.activities.title` to rename section headings

### 📧 Update Contact Information  
**When:** Email, social media, or contact details change  
**File:** `public/data/socialcontacts.json`  
**What to change:**
- Update social media URLs
- Add new contact methods
- Change email addresses

### 👥 Add New Team Member
**When:** New executive members join or positions change  
**File:** `public/data/team.json`  
**What to add:**
```json
{
  "name": "Full Name",
  "position": "Title",
  "year": "Year 3",
  "major": "Chemical Engineering",
  "image": "/images/team/photo.jpg"
}
```

---

## �️ All Content Files Reference

| **What You Want to Update** | **File Location** | **When to Use** |
|------------------------------|-------------------|-----------------|
| **Homepage banner & text** | `public/data/homepage.json` | Change main page content |
| **Events & Activities** | `public/data/activities.json` | Add meetings, socials, events |
| **Workshops & Training** | `public/data/workshops.json` | Technical workshops, courses |
| **News & Articles** | `public/data/articles.json` | Announcements, news posts |
| **Team members** | `public/data/team.json` | Executive committee updates |
| **Contact info** | `public/data/socialcontacts.json` | Social media, email changes |
| **Projects showcase** | `public/data/projects.json` | Chapter projects, initiatives |
| **Competition results** | `public/data/competitions.json` | Contest results, achievements |
| **Industry visits** | `public/data/industry-visits.json` | Plant visits, company tours |
| **Website settings** | `public/data/assets.json` | QR codes, form links |
| **Faculty profiles** | `public/data/professors.json` | Professor information |
| **Logo settings** | `public/data/logo.json` | Website logos, branding |
| **Page configurations** | `public/data/pages.json` | Page-specific settings |
| **Team photos** | `public/images/team/` | Executive member photos |
| **Workshop galleries** | `public/images/workshops/` | Workshop event photos |
| **Hero banners** | `public/images/heroimages/` | Homepage banner images |
| **Logos & branding** | `public/images/logo/` | Chapter logos, sponsors |

---

## 📋 Detailed File Descriptions

### 🏠 `homepage.json` - Main Page Content
**Controls:** Hero banner, section titles, featured content  
**Contains:** Page headlines, subtitle text, section configurations  
**Example:** Change "Welcome to AIChE NTU" banner text

### 🎉 `activities.json` - General Events & Meetings
**Controls:** Chapter meetings, social events, general activities  
**Contains:** Event details, dates, locations, descriptions  
**Example:** Weekly meetings, networking events, study sessions

### 🎓 `workshops.json` - Technical Training Sessions
**Controls:** Educational workshops, skill-building sessions  
**Contains:** Workshop details, instructors, learning outcomes, image galleries  
**Example:** MATLAB training, process design workshops, guest lectures

### 📰 `articles.json` - News & Announcements
**Controls:** Chapter news, announcements, blog posts  
**Contains:** Article content, publication dates, featured images  
**Example:** Achievement announcements, event recaps, industry news

### 👥 `team.json` - Executive Committee & Members
**Controls:** Leadership structure, team member profiles  
**Contains:** Names, positions, bios, photos, LinkedIn profiles  
**Example:** President, VPs, committee leads, course representatives

### 📧 `socialcontacts.json` - Contact Information
**Controls:** Social media links, contact methods  
**Contains:** Instagram, LinkedIn, email addresses, contact forms  
**Example:** Chapter Instagram, official email, WhatsApp groups

### 🚀 `projects.json` - Chapter Projects & Initiatives
**Controls:** Ongoing projects, research initiatives  
**Contains:** Project descriptions, team members, progress status  
**Example:** Sustainability projects, research collaborations

### 🏆 `competitions.json` - Contest Results & Achievements
**Controls:** Competition participation, results, awards  
**Contains:** Competition details, team performance, rankings  
**Example:** AIChE regional competitions, design contests

### 🏭 `industry-visits.json` - Plant Tours & Company Visits
**Controls:** Industry site visits, company tours  
**Contains:** Visit details, companies, learning objectives  
**Example:** Chemical plant tours, pharmaceutical company visits

### 🖼️ `assets.json` - Website Assets & Configuration
**Controls:** QR codes, form links, global settings  
**Contains:** Membership forms, registration links, static resources  
**Example:** Membership QR code, contact form URLs

### 👨‍🏫 `professors.json` - Faculty Profiles
**Controls:** Faculty member information and profiles  
**Contains:** Professor names, departments, research areas, contact info  
**Example:** Faculty advisor details, guest lecturer profiles

### 🎨 `logo.json` - Website Branding & Logos
**Controls:** Chapter logos, sponsor logos, branding elements  
**Contains:** Logo URLs, branding configurations, visual identity  
**Example:** AIChE chapter logo, university logo, sponsor images

### ⚙️ `pages.json` - Page Configurations
**Controls:** Individual page settings and metadata  
**Contains:** Page-specific configurations, navigation settings  
**Example:** Page titles, meta descriptions, layout options

---

## 📸 Image Directory Guide

### 👥 `/public/images/team/` - Team Member Photos
**What it contains:** Executive committee photos, member headshots  
**File format:** `.jpg`, `.jpeg`, `.png`  
**Naming:** Use member names (e.g., `John_Doe.jpg`)  
**Size limit:** Under 2MB per image

### 🎓 `/public/images/workshops/` - Workshop Event Photos
**What it contains:** Workshop photos, training session images  
**File format:** `.jpg`, `.jpeg`, `.png`  
**Organization:** Subfolders by workshop name  
**Example:** `/workshops/matlab-training/photo1.jpg`

### 🌟 `/public/images/heroimages/` - Homepage Banners
**What it contains:** Main banner images, hero backgrounds  
**File format:** `.jpg`, `.jpeg`, `.png`  
**Purpose:** Homepage visual elements, section backgrounds  
**Size:** High quality, wide aspect ratio recommended

### 🎨 `/public/images/logo/` - Logos & Branding
**What it contains:** Chapter logos, sponsor logos, partner images  
**File format:** `.png` (for transparency), `.jpg`, `.svg`  
**Usage:** Navigation, footer, partnership displays  
**Quality:** Vector formats preferred for logos

---

## ⚠️ Golden Rules (Follow these to avoid problems!)

1. **💯 JSON Format:** Always keep commas, quotes, and brackets correct - one missing comma breaks everything!
2. **📸 Image Paths:** Must start with `/images/` (e.g., `/images/events/photo.jpg`)
3. **📅 Dates:** Always use format `YYYY-MM-DD` (e.g., `2025-03-15`)
4. **🔤 IDs:** Use lowercase letters and hyphens only (e.g., `workshop-name-2025`)
5. **📦 File Size:** Images must be under 2MB or they won't load properly

> **💡 Pro Tip:** Use [JSON Validator](https://jsonlint.com/) to check your format before saving!

---

## � How to Update Content (Simple 3-Step Process)

### Step 1: Find Your File
1. Go to your GitHub repository
2. Click on `public` folder
3. Click on `data` folder  
4. Choose the right JSON file from the table above

### Step 2: Make Your Changes
1. Click the **pencil icon (✏️)** to edit
2. Add your content using the examples above
3. **Double-check your commas and quotes!**

### Step 3: Save & Publish
1. Scroll to bottom of page
2. Add a commit message (e.g., "Added new workshop")
3. Click **"Commit changes"**

**⏰ Your changes will appear on the website in 2-5 minutes!**

---

## 🆘 Need Help? We've Got You Covered!

### Common Issues & Solutions
- **Website not updating?** Wait 5 minutes, then refresh your browser
- **Error after saving?** Check your JSON format at [jsonlint.com](https://jsonlint.com/)
- **Image not showing?** Make sure path starts with `/images/` and file is under 2MB
- **Something looks weird?** Check that you didn't miss any commas or quotes

### Who to Contact
- **Content Questions:** Current executive committee
- **Technical Problems:** Create a GitHub issue or contact the webmaster
- **Urgent Issues:** Check with the current chapter president

### Useful Tools
- **JSON Validator:** [https://jsonlint.com/](https://jsonlint.com/) - Check your format before saving
- **Image Resizer:** Use any online tool to resize images under 2MB
- **Date Format:** Always use YYYY-MM-DD (Year-Month-Day)

---

## 📝 Status Values Cheat Sheet

**For Events/Workshops/Activities:**
- `"Upcoming"` - Event hasn't happened yet
- `"Completed"` - Event is finished  
- `"Cancelled"` - Event was cancelled

**For Projects:**
- `"Active"` - Currently working on it
- `"Completed"` - Project is finished
- `"On Hold"` - Temporarily paused

---

**🎉 You're all set! Bookmark this page and start updating your website like a pro!**

*Keep this guide handy - you'll be a website maintenance expert in no time! 🚀*

---

## 📚 Need More Details?

For comprehensive documentation on each file, visit our **[Detailed Reference Guide](detailed-reference/README.md)** with individual guides for:

- 📄 [Homepage Content](detailed-reference/homepage-json.md)
- 🎉 [Activities & Events](detailed-reference/activities-json.md)  
- 🎓 [Workshops](detailed-reference/workshops-json.md)
- 👥 [Team Members](detailed-reference/team-json.md)
- 🖼️ [Assets & QR Codes](detailed-reference/assets-json.md)
- 📧 [Social Contacts](detailed-reference/socialcontacts-json.md)
- 📸 [Image Directories](detailed-reference/images-team.md)

**Perfect for deep-dive editing and troubleshooting!**
