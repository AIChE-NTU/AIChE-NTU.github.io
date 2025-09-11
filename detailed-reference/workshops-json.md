# 🎓 Workshops (`workshops.json`)

## 🎯 What This File Controls
- Technical training sessions
- Educational workshops
- Skill-building events
- Guest lectures and seminars

## 📂 File Location
`public/data/workshops.json`

## 🔧 Structure Overview
```json
[
  {
    "id": "workshop-id",
    "title": "Workshop Title",
    "description": "Brief description",
    "date": "YYYY-MM-DD",
    "instructor": "Instructor name",
    "status": "Upcoming/Completed",
    "details": "Detailed description",
    "learningOutcomes": ["Outcome 1", "Outcome 2"],
    "prerequisites": "Requirements (optional)",
    "duration": "Duration (optional)",
    "location": "Venue",
    "registrationUrl": "Registration link (optional)",
    "gallery": ["image1.jpg", "image2.jpg"]
  }
]
```

## ✏️ How to Add New Workshop

### Step 1: Copy this basic template
```json
{
  "id": "workshop-name-2025",
  "title": "Workshop Title",
  "description": "Brief description of what this workshop covers",
  "date": "2025-04-20",
  "instructor": "Dr. Instructor Name",
  "status": "Upcoming"
}
```

### Step 2: Add detailed information
```json
{
  "id": "matlab-basics-2025",
  "title": "MATLAB Fundamentals for Chemical Engineers",
  "description": "Learn essential MATLAB skills for process simulation and data analysis",
  "date": "2025-04-20",
  "instructor": "Dr. Sarah Lim",
  "status": "Upcoming",
  "details": "This hands-on workshop will introduce you to MATLAB programming with a focus on chemical engineering applications. You'll learn to solve material and energy balances, create process simulations, and analyze experimental data.",
  "learningOutcomes": [
    "Basic MATLAB programming and syntax",
    "Solving linear and nonlinear equations",
    "Data visualization and plotting",
    "Process simulation techniques"
  ],
  "prerequisites": "Basic mathematics and chemistry knowledge",
  "duration": "4 hours (2 sessions)",
  "location": "Computer Lab 2, CCEB",
  "registrationUrl": "https://forms.office.com/r/MATLAB2025"
}
```

### Step 3: Add gallery photos (after the workshop)
```json
{
  "gallery": [
    "/images/workshops/matlab-2025/session1.jpg",
    "/images/workshops/matlab-2025/participants.jpg",
    "/images/workshops/matlab-2025/lab-work.jpg"
  ]
}
```

## 📸 Workshop Gallery
- **Location:** `public/images/workshops/[workshop-name]/`
- **Format:** `.jpg`, `.jpeg`, `.png`
- **Naming:** Descriptive names (e.g., `participants.jpg`, `demo.jpg`)
- **Size:** Under 2MB each
- **Organization:** Create subfolder for each workshop

## 📅 Status Values
- **"Upcoming"** - Workshop scheduled but not yet conducted
- **"Completed"** - Workshop finished (can include gallery and feedback)
- **"Cancelled"** - Workshop was cancelled

## 🎯 Learning Outcomes Tips
Use action verbs and be specific:
- ✅ "Solve material balance problems using MATLAB"
- ✅ "Create process flow diagrams"
- ❌ "Learn about processes"
- ❌ "Understand MATLAB"

## ⚠️ Important Notes
- Keep workshop IDs unique and descriptive
- Update status to "Completed" after the workshop
- Add gallery photos within a week after completion
- Include registration URLs for upcoming workshops

## 🛠️ Troubleshooting
- **Gallery not showing:** Check image paths and file existence
- **Registration link broken:** Verify URL is correct and accessible
- **Workshop not appearing:** Check status and date fields
- **Formatting issues:** Validate JSON syntax

## 📝 Complete Example
```json
[
  {
    "id": "process-safety-fundamentals-2025",
    "title": "Process Safety Fundamentals",
    "description": "Essential process safety concepts and hazard identification techniques",
    "date": "2025-03-15",
    "instructor": "Eng. Michael Tan (Industry Expert)",
    "status": "Upcoming",
    "details": "This workshop covers fundamental concepts in process safety management, including hazard identification, risk assessment, and safety system design. Participants will work through real industrial case studies.",
    "learningOutcomes": [
      "Identify common process hazards in chemical plants",
      "Conduct basic hazard and operability (HAZOP) studies",
      "Understand safety instrumented systems (SIS)",
      "Apply process safety management principles"
    ],
    "prerequisites": "Basic chemical engineering knowledge",
    "duration": "Full day (8 hours)",
    "location": "CCEB Seminar Room 1",
    "registrationUrl": "https://forms.office.com/r/SafetyWorkshop2025"
  },
  {
    "id": "python-data-analysis-2024",
    "title": "Python for Data Analysis in Chemical Engineering",
    "description": "Learn Python programming for analyzing experimental and process data",
    "date": "2024-11-20",
    "instructor": "Dr. Lisa Chen",
    "status": "Completed",
    "details": "Participants learned to use Python libraries like pandas, numpy, and matplotlib for data manipulation, statistical analysis, and visualization of chemical engineering datasets.",
    "learningOutcomes": [
      "Python programming basics for data science",
      "Data cleaning and preprocessing techniques",
      "Statistical analysis and visualization",
      "Real-world data analysis case studies"
    ],
    "duration": "6 hours (2 sessions)",
    "location": "Computer Lab 1, CCEB",
    "gallery": [
      "/images/workshops/python-2024/coding-session.jpg",
      "/images/workshops/python-2024/participants-group.jpg",
      "/images/workshops/python-2024/data-visualization.jpg"
    ]
  }
]
```
