# Data Structure Documentation

This document describes all the JSON files that control website content and their structure.

## File Overview

| File | Purpose | Used By |
|------|---------|---------|
| `homepage.json` | Homepage content and settings | Homepage |
| `activities.json` | Events and activities | Activities page, Homepage |
| `workshops.json` | Workshop information | Workshops page, Homepage |
| `articles.json` | Articles and blog posts | Articles page, Homepage |
| `competitions.json` | Competition information | Competitions page, Homepage |
| `projects.json` | Student projects | Projects page, Homepage |
| `team.json` | Team member information | About page |
| `socialcontacts.json` | Contact information | Footer, Contact page |
| `logo.json` | Logo and branding | Header, Footer |
| `pages.json` | Other page content | Various pages |

---

## Detailed Structure

### homepage.json
Controls all homepage content and behavior.

```json
{
  "hero": {
    "title": {
      "words": ["Word1", "Word2", "Word3"],
      "highlightedWordIndex": 2
    },
    "subtitle": "Main description text",
    "backgroundImages": ["/images/hero1.jpg"],
    "imageTransitionInterval": 5000,
    "buttons": [
      {
        "text": "Button Text",
        "link": "/page",
        "type": "primary|secondary",
        "animation": "bounce-gentle"
      }
    ]
  },
  "sections": {
    "activities": {
      "title": "Section Title",
      "subtitle": "Section description",
      "backgroundColor": "blue|teal|purple|orange|gray",
      "itemsToShow": 3,
      "viewMoreText": "Button text"
    }
  },
  "emptyStateMessages": {
    "activities": "Message when no content"
  }
}
```

### activities.json
List of all activities and events.

```json
[
  {
    "id": "unique-identifier",
    "title": "Event Title",
    "description": "Brief description",
    "details": "Full description",
    "date": "YYYY-MM-DD",
    "location": "Event location",
    "category": "Workshop|Competition|Visit",
    "status": "Upcoming|Completed|Cancelled",
    "images": ["/images/activities/photo.jpg"],
    "registrationInfo": {
      "required": true,
      "deadline": "YYYY-MM-DD",
      "link": "https://registration-url.com"
    }
  }
]
```

### workshops.json
Workshop-specific information.

```json
[
  {
    "id": "workshop-id",
    "title": "Workshop Title",
    "description": "What this workshop covers",
    "date": "YYYY-MM-DD",
    "time": "2:00 PM - 5:00 PM",
    "location": "Room/Building",
    "instructor": "Instructor Name",
    "category": "Technical Skills|Professional Development",
    "difficulty": "Beginner|Intermediate|Advanced",
    "maxParticipants": 30,
    "status": "Upcoming|Completed|Cancelled",
    "prerequisites": "Requirements",
    "whatYouWillLearn": ["Skill 1", "Skill 2"],
    "materials": ["Item 1", "Item 2"],
    "registrationLink": "https://signup-link.com",
    "images": ["/images/workshops/photo.jpg"]
  }
]
```

### articles.json
Articles and blog posts.

```json
[
  {
    "id": "article-id",
    "title": "Article Title",
    "summary": "Brief summary",
    "content": "Full article content",
    "author": "Author Name",
    "publicationDate": "YYYY-MM-DD",
    "category": "Industry Insights|Student Life",
    "tags": ["tag1", "tag2"],
    "readTime": "5 min read",
    "image": "/images/articles/article.jpg"
  }
]
```

### competitions.json
Competition information.

```json
[
  {
    "id": "competition-id",
    "title": "Competition Name",
    "description": "Brief description",
    "details": "Full details and rules",
    "date": "YYYY-MM-DD",
    "location": "Competition venue",
    "category": "Design Challenge|Case Study",
    "status": "Upcoming|Completed|Cancelled",
    "prizes": ["1st Place: $1000", "2nd Place: $500"],
    "eligibility": "Who can participate",
    "registrationDeadline": "YYYY-MM-DD",
    "contactEmail": "contact@email.com",
    "images": ["/images/competitions/photo.jpg"]
  }
]
```

### projects.json
Student project information with seasonal structure.

```json
{
  "config": {
    "showCurrentProjects": true,
    "showComingSoon": false
  },
  "chember": {
    "visible": true,
    "duration": "Winter 2025",
    "projects": [
      {
        "id": "project-id",
        "title": "Project Title",
        "description": "Project description",
        "members": ["Student 1", "Student 2"],
        "status": "Active|Completed|On Hold",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "supervisor": "Professor Name",
        "image": "/images/projects/project.jpg"
      }
    ]
  },
  "checlipse": {
    "visible": true,
    "duration": "Summer 2025",
    "projects": [...]
  },
  "comingSoon": {
    "winter": {
      "title": "Coming Soon Title",
      "description": "Coming soon description"
    },
    "summer": {
      "title": "Coming Soon Title",
      "description": "Coming soon description"
    }
  }
}
```

### team.json
Team member information.

```json
[
  {
    "id": "member-id",
    "name": "Full Name",
    "position": "President|Vice President|Secretary|Treasurer|Member",
    "year": "Year 1|Year 2|Year 3|Year 4|Graduate",
    "major": "Chemical Engineering|Bioengineering",
    "bio": "Brief biography",
    "image": "/images/team/photo.jpg",
    "email": "member@ntu.edu.sg",
    "linkedin": "https://linkedin.com/in/member",
    "responsibilities": ["Task 1", "Task 2"],
    "joinDate": "YYYY-MM-DD",
    "graduationYear": "YYYY"
  }
]
```

### socialcontacts.json
Contact and social media information.

```json
[
  {
    "platform": "Email|Instagram|Telegram|LinkedIn|GitHub",
    "url": "https://platform.com/account or mailto:email@domain.com",
    "icon": "mail|instagram|telegram|linkedin|github"
  }
]
```

### logo.json
Logo and branding assets.

```json
{
  "siteLogoUrl": "/images/logo/main-logo.png",
  "homePageHeroImages": [
    "/images/hero/image1.jpg",
    "/images/hero/image2.jpg"
  ],
  "collaboratorLogos": [
    {
      "name": "Partner Name",
      "logoUrl": "/images/partners/partner-logo.png",
      "websiteUrl": "https://partner-website.com"
    }
  ]
}
```

### pages.json
Content for other pages (Contact, About, etc.).

```json
{
  "contact": {
    "hero": {
      "title": "Page Title",
      "subtitle": "Page description"
    },
    "form": {
      "title": "Form Title",
      "inquiryTypes": [
        {"value": "general", "label": "General Inquiry"}
      ]
    }
  },
  "about": {
    "hero": {...},
    "mission": {
      "title": "Our Mission",
      "content": "Mission statement"
    }
  }
}
```

---

## Field Types and Validation

### Required vs Optional Fields

**Required Fields** (must be present):
- `id` - Unique identifier
- `title` - Display title
- `date` - Date in YYYY-MM-DD format

**Optional Fields** (can be omitted):
- `description` - Brief description
- `images` - Array of image paths
- `location` - Event location

### Data Types

| Type | Example | Notes |
|------|---------|-------|
| String | `"Hello World"` | Always in double quotes |
| Number | `42` or `3.14` | No quotes |
| Boolean | `true` or `false` | No quotes |
| Array | `["item1", "item2"]` | Square brackets |
| Object | `{"key": "value"}` | Curly braces |
| Date | `"2025-03-15"` | YYYY-MM-DD format |
| URL | `"https://example.com"` | Full URL or path |

### Image Paths
- Must start with `/images/`
- Use forward slashes `/` (not backslashes)
- File names should be lowercase with hyphens
- Supported formats: `.jpg`, `.png`, `.gif`
- Maximum size: 2MB per image

### Status Values
Common status values used across different content types:

**Events/Activities/Workshops/Competitions:**
- `"Upcoming"` - Event hasn't happened yet
- `"Completed"` - Event is finished
- `"Cancelled"` - Event was cancelled

**Projects:**
- `"Active"` - Currently working on
- `"Completed"` - Project finished
- `"On Hold"` - Temporarily paused

---

## Common Patterns

### Adding New Items
1. Find the appropriate JSON file
2. Locate the array `[...]` 
3. Add your new object `{...}` at the end
4. Don't forget the comma before your new item

### Image Management
1. Upload images to appropriate folder in `/public/images/`
2. Reference in JSON with full path: `"/images/category/filename.jpg"`
3. Keep consistent naming: `event-name-2025.jpg`

### Date Formatting
Always use ISO date format: `YYYY-MM-DD`
- ✅ Correct: `"2025-03-15"`
- ❌ Wrong: `"March 15, 2025"` or `"15/03/2025"`

---

*This documentation is maintained by the technical team and updated as the website evolves.*
