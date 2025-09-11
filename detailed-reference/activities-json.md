# 🎉 Activities & Events (`activities.json`)

## 🎯 What This File Controls
- Chapter meetings and general events
- Social gatherings and networking events
- Academic activities and study sessions
- Member engagement activities

## 📂 File Location
`public/data/activities.json`

## 🔧 Structure Overview
```json
[
  {
    "id": "unique-event-id",
    "title": "Event Name",
    "description": "Brief description",
    "date": "YYYY-MM-DD",
    "location": "Event location",
    "status": "Upcoming/Completed/Cancelled",
    "imageUrl": "/images/events/photo.jpg",
    "details": "Detailed description (optional)",
    "registrationUrl": "Registration link (optional)"
  }
]
```

## ✏️ How to Add New Event

### Step 1: Copy this template
```json
{
  "id": "event-name-2025",
  "title": "Your Event Title",
  "description": "Brief description of the event",
  "date": "2025-03-15",
  "location": "Event location",
  "status": "Upcoming"
}
```

### Step 2: Customize the fields
- **id:** Use lowercase letters and hyphens (e.g., `chapter-meeting-march-2025`)
- **title:** The event name as it appears on the website
- **description:** 1-2 sentences describing the event
- **date:** Format as YYYY-MM-DD (e.g., `2025-03-15`)
- **location:** Where the event takes place
- **status:** `"Upcoming"`, `"Completed"`, or `"Cancelled"`

### Step 3: Add optional fields (if needed)
```json
{
  "id": "workshop-advanced-2025",
  "title": "Advanced Process Design Workshop",
  "description": "Hands-on workshop covering advanced process design principles",
  "date": "2025-04-20",
  "location": "CCEB Seminar Room 1",
  "status": "Upcoming",
  "imageUrl": "/images/events/workshop-design.jpg",
  "details": "This workshop will cover advanced topics in process design including heat integration, safety analysis, and economic optimization. Participants will work on real-world case studies.",
  "registrationUrl": "https://forms.office.com/r/ABC123"
}
```

## ⚠️ Important Rules
1. **Unique IDs:** Each event must have a unique `id`
2. **Date Format:** Always use YYYY-MM-DD format
3. **Commas:** Don't forget commas between events (except the last one)
4. **Image Paths:** Must start with `/images/`

## 📅 Status Values
- **"Upcoming"** - Event hasn't happened yet (shows in upcoming events)
- **"Completed"** - Event is finished (shows in recent activities)
- **"Cancelled"** - Event was cancelled (may be hidden or marked as cancelled)

## 🛠️ Troubleshooting
- **Event not showing:** Check the status and date
- **Broken layout:** Verify JSON syntax and commas
- **Image not loading:** Check image path and file size (<2MB)

## 📝 Complete Example
```json
[
  {
    "id": "general-meeting-sept-2025",
    "title": "September General Meeting",
    "description": "Monthly chapter meeting with guest speaker and project updates",
    "date": "2025-09-15",
    "location": "CCEB Lecture Theatre",
    "status": "Upcoming",
    "details": "Join us for our monthly general meeting featuring a guest speaker from industry and updates on ongoing chapter projects."
  },
  {
    "id": "networking-night-aug-2025",
    "title": "Industry Networking Night",
    "description": "Connect with chemical engineering professionals and alumni",
    "date": "2025-08-30",
    "location": "University Town",
    "status": "Completed",
    "imageUrl": "/images/events/networking-2025.jpg",
    "details": "A successful evening of networking with over 50 industry professionals and alumni."
  }
]
```
