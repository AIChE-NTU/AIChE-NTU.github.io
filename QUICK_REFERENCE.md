# Quick Reference Card - Website Updates

## 🚀 Most Common Tasks (90% of what you'll need)

### 1. Add New Event/Activity
**File**: `public/data/activities.json`
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

### 2. Add New Workshop
**File**: `public/data/workshops.json`
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

### 3. Update Homepage Text
**File**: `public/data/homepage.json`
- Change `hero.subtitle` for main banner text
- Change section titles under `sections.activities.title`, etc.


### 4. Update Contact Info
**File**: `public/data/socialcontacts.json`
- Update URLs for social media
- Add new contact methods

---

## 📁 File Locations Quick Reference

| What to Update | File Location |
|---|---|
| **Homepage content** | `public/data/homepage.json` |
| **Events & Activities** | `public/data/activities.json` |
| **Workshops** | `public/data/workshops.json` |
| **Articles** | `public/data/articles.json` |
| **Team members** | `public/data/team.json` |

### Example Team Member Entry
```json
{
  "name": "Full Name",
  "position": "Title",
  "year": "Year 3",
  "major": "Chemical Engineering",
  "image": "/images/team/photo.jpg"
}
```
| **Contact info** | `public/data/socialcontacts.json` |
| **Projects** | `public/data/projects.json` |
| **Images** | `public/images/[category]/` |

---

## ⚠️ Critical Rules

1. **JSON Format**: Always keep commas, quotes, and brackets correct
2. **Image Paths**: Must start with `/images/` 
3. **Dates**: Use format `YYYY-MM-DD` (e.g., `2025-03-15`)
4. **IDs**: Use lowercase letters and hyphens only
5. **File Size**: Images must be under 2MB

---

## 🔧 How to Edit (3 Steps)

1. **Find File**: Go to repository → `public` → `data` → choose file
2. **Edit**: Click pencil icon (✏️) → make changes
3. **Save**: Add commit message → "Commit changes"

**Wait 2-5 minutes for changes to appear on website**

---

## 🆘 Emergency Contacts

- **Technical Issues**: [Current Webmaster]
- **Content Questions**: [Chapter President]
- **JSON Validator**: https://jsonlint.com/

---

## 📝 Common Status Values

**Activities/Workshops/Competitions:**
- `"Upcoming"` - Event hasn't happened
- `"Completed"` - Event is finished  
- `"Cancelled"` - Event was cancelled

**Projects:**
- `"Active"` - Currently working
- `"Completed"` - Project finished
- `"On Hold"` - Temporarily paused

---

*Keep this card handy for quick reference!*
