# 👥 Team Members (`team.json`)

## 🎯 What This File Controls
- Executive committee structure
- Team member profiles and photos
- Leadership hierarchy
- Course representatives and advisors

## 📂 File Location
`public/data/team.json`

## 🔧 Structure Overview
```json
{
  "Team Name": {
    "description": "Team description",
    "subTeams": {
      "Sub-Team Name": [
        {
          "name": "Member Name",
          "role": "Position Title",
          "type": "lead/member",
          "bio": "Short biography",
          "imageUrl": "/images/team/photo.jpg",
          "linkedinUrl": "LinkedIn profile URL"
        }
      ]
    }
  }
}
```

## ✏️ How to Add New Team Member

### Step 1: Find the right team section
- **Executive Board** → **Leadership** (President, VPs)
- **Executive Board** → **Events Team** (Event organizers)
- **Executive Board** → **Publications & Outreach** (Communications)
- **Course Representatives** → **members** (Course reps)

### Step 2: Copy this template
```json
{
  "name": "Full Name",
  "role": "Position Title",
  "type": "lead",
  "bio": "Brief description of background and role",
  "imageUrl": "/images/team/FirstName_LastName.jpg",
  "linkedinUrl": "https://www.linkedin.com/in/profile"
}
```

### Step 3: Customize the fields
- **name:** Full name as it should appear
- **role:** Official position title
- **type:** `"lead"` for leadership positions, `"member"` for committee members
- **bio:** 1-2 sentences about background and responsibilities
- **imageUrl:** Path to photo in `/images/team/` folder
- **linkedinUrl:** LinkedIn profile (use `"#"` if no LinkedIn)

## 📸 Photo Guidelines
- **File location:** `public/images/team/`
- **Naming:** `FirstName_LastName.jpg` (e.g., `John_Doe.jpg`)
- **Format:** `.jpg`, `.jpeg`, or `.png`
- **Size:** Under 2MB, square aspect ratio recommended
- **Quality:** Professional headshot preferred

## 👥 Team Structure

### Executive Board
Contains all main executive positions organized by function:
- **Leadership:** President, VPs
- **Business & Industry Relations:** Industry connections, sponsorship
- **Events Team:** Event planning and execution
- **Publications & Outreach:** Communications, marketing
- **Web Development & Design:** Technical team
- **Membership & Engagement:** Member services
- **Alumni Relations:** Alumni connections
- **Academic & Workshops:** Educational content

### Course Representatives
Student representatives for each engineering program.

### Student Advisors
Graduate students and senior advisors providing mentorship.

## ⚠️ Important Notes
- Each team member must have a unique name
- Photos should be professional and appropriate
- LinkedIn URLs are optional but recommended
- Maintain consistent formatting across all entries

## 🛠️ Troubleshooting
- **Photo not showing:** Check file path and ensure photo exists
- **Wrong team section:** Verify you're editing the correct subTeam
- **Formatting broken:** Check all commas and quotes are correct
- **Member not appearing:** Ensure proper JSON structure

## 📝 Complete Example
```json
{
  "Executive Board": {
    "description": "The core leadership and functional teams driving the chapter's mission and activities.",
    "subTeams": {
      "Leadership": [
        {
          "name": "Sarah Johnson",
          "role": "President",
          "type": "lead",
          "bio": "Final year Chemical Engineering student passionate about sustainability and process optimization.",
          "imageUrl": "/images/team/Sarah_Johnson.jpg",
          "linkedinUrl": "https://www.linkedin.com/in/sarah-johnson-che"
        },
        {
          "name": "Michael Chen",
          "role": "Vice President",
          "type": "lead",
          "bio": "Year 3 student specializing in bioprocess engineering and member engagement.",
          "imageUrl": "/images/team/Michael_Chen.jpg",
          "linkedinUrl": "https://www.linkedin.com/in/michael-chen-ntu"
        }
      ]
    }
  },
  "Course Representatives": {
    "description": "Serving as the bridge between the student body and the AIChE student chapter.",
    "members": [
      {
        "name": "Alex Wong",
        "role": "Chemical Engineering Rep",
        "type": "lead",
        "bio": "Representing Chemical Engineering students and facilitating communication with the chapter.",
        "imageUrl": "/images/team/Alex_Wong.jpg",
        "linkedinUrl": "#"
      }
    ]
  }
}
```
