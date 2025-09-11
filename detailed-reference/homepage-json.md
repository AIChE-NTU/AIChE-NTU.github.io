# 📄 Homepage Content (`homepage.json`)

## 🎯 What This File Controls
- Main homepage banner text
- Section titles and descriptions
- Featured content configuration
- Page layout settings

## 📂 File Location
`public/data/homepage.json`

## 🔧 Structure Overview
```json
{
  "hero": {
    "title": "Main banner title",
    "subtitle": "Banner description text"
  },
  "sections": {
    "activities": {
      "title": "Section heading",
      "description": "Section description",
      "itemsToShow": 3
    }
  }
}
```

## ✏️ Common Edits

### Change Main Banner Text
**Location:** `hero.subtitle`
**Example:**
```json
"hero": {
  "subtitle": "Welcome to AIChE NTU Student Chapter - Your gateway to chemical engineering excellence"
}
```

### Update Section Titles
**Location:** `sections.[section_name].title`
**Example:**
```json
"sections": {
  "activities": {
    "title": "Upcoming Events",
    "description": "Join our exciting chapter activities"
  }
}
```

### Control Number of Items Displayed
**Location:** `sections.[section_name].itemsToShow`
**Example:**
```json
"sections": {
  "activities": {
    "itemsToShow": 6
  }
}
```

## ⚠️ Important Notes
- Keep all quotes and commas intact
- Don't change the structure, only the values
- Test changes on a staging environment first

## 🛠️ Troubleshooting
- **Page looks broken:** Check JSON syntax at [jsonlint.com](https://jsonlint.com/)
- **Changes not showing:** Wait 2-5 minutes for deployment
- **Section missing:** Verify the section name matches exactly

## 📝 Full Example
```json
{
  "hero": {
    "title": "AIChE NTU Student Chapter",
    "subtitle": "Advancing chemical engineering through innovation, education, and community"
  },
  "sections": {
    "activities": {
      "title": "Recent Activities",
      "description": "Stay updated with our latest events and workshops",
      "itemsToShow": 4
    },
    "workshops": {
      "title": "Technical Workshops",
      "description": "Enhance your skills with hands-on learning",
      "itemsToShow": 3
    }
  }
}
```
