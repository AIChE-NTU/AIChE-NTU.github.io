# 🎓 Workshop Galleries (`public/images/workshops/`)

## 🎯 What This Directory Controls
- Workshop event photos and documentation
- Training session images
- Behind-the-scenes content
- Participant group photos

## 📂 Directory Location
`public/images/workshops/`

## 📁 Organization Structure

### Folder Structure
```
public/images/workshops/
├── workshop-name-2025/
│   ├── setup.jpg
│   ├── participants.jpg
│   ├── instructor-demo.jpg
│   ├── hands-on-session.jpg
│   └── group-photo.jpg
├── matlab-training-2024/
│   ├── coding-session.jpg
│   ├── lab-work.jpg
│   └── final-presentation.jpg
└── process-safety-2025/
    ├── theory-session.jpg
    ├── case-study-work.jpg
    └── certificate-ceremony.jpg
```

### Naming Convention
- **Folder:** `workshop-name-year` (matches workshop ID in JSON)
- **Photos:** Descriptive names with hyphens
- **Examples:**
  - `participants-working.jpg`
  - `instructor-presentation.jpg`
  - `final-group-photo.jpg`
  - `demo-setup.jpg`

## 📸 Photo Requirements

### Technical Specifications
- **Format:** `.jpg`, `.jpeg`, `.png`
- **Size:** Under 2MB per image
- **Resolution:** 1200-2000 pixels wide recommended
- **Quality:** High quality, sharp focus
- **Orientation:** Landscape preferred for galleries

### Content Guidelines
- **Include:** Participants actively engaged
- **Show:** Workshop activities and learning
- **Capture:** Key moments and interactions
- **Document:** Setup, process, and outcomes

## 📷 Photo Types to Include

### Essential Shots
1. **Setup/Venue:** Room setup before participants arrive
2. **Instructor Action:** Presenter explaining concepts
3. **Participant Engagement:** Students actively learning
4. **Hands-on Activities:** Practical work sessions
5. **Group Photo:** Final group picture with certificates

### Optional Shots
- **Equipment/Materials:** Specialized tools or materials used
- **Break Time:** Networking during breaks
- **Q&A Sessions:** Interactive discussions
- **Individual Work:** Students working on exercises
- **Awards/Certificates:** Recognition ceremony

## 🔧 How to Add Workshop Gallery

### Step 1: Create Workshop Folder
1. Navigate to `public/images/workshops/`
2. Create folder: `workshop-name-2025`
3. Use same name as workshop `id` in `workshops.json`

### Step 2: Prepare Photos
1. Sort and select best 5-10 photos
2. Resize to web-appropriate dimensions
3. Compress to under 2MB each
4. Name descriptively with hyphens

### Step 3: Upload Photos
1. Upload all selected photos to the workshop folder
2. Verify filenames are descriptive and consistent
3. Check all images display properly

### Step 4: Update workshops.json
1. Open `public/data/workshops.json`
2. Find the workshop entry
3. Add `gallery` array:
   ```json
   "gallery": [
     "/images/workshops/workshop-name-2025/setup.jpg",
     "/images/workshops/workshop-name-2025/participants.jpg",
     "/images/workshops/workshop-name-2025/demo.jpg",
     "/images/workshops/workshop-name-2025/group-photo.jpg"
   ]
   ```

## 📋 Gallery Best Practices

### Photo Selection
- **Quality over quantity:** 5-8 great photos better than 20 mediocre ones
- **Tell a story:** Show progression from start to finish
- **Include variety:** Different angles, activities, and moments
- **Highlight engagement:** Focus on active participation

### Privacy Considerations
- **Get consent:** Ensure participants agree to photography
- **Be respectful:** Avoid unflattering or compromising shots
- **Consider anonymity:** Some participants may prefer not to be identified
- **Professional context:** Keep all photos appropriate and professional

### Technical Tips
- **Good lighting:** Use venue lighting effectively
- **Steady shots:** Avoid blurry or shaky images
- **Composition:** Follow basic photography composition rules
- **Background:** Keep backgrounds clean and relevant

## ⚠️ Important Notes
- **Folder names must match workshop IDs** in `workshops.json`
- **Photo paths in JSON must be exact** - case sensitive
- **Keep file sizes reasonable** for fast loading
- **Maintain consistent naming** across all workshops

## 🛠️ Troubleshooting

### Gallery Not Displaying
1. **Check folder name:** Must match workshop ID exactly
2. **Verify file paths:** Ensure paths in JSON are correct
3. **Confirm file existence:** All referenced photos must exist
4. **Check file permissions:** Ensure files are publicly accessible

### Poor Performance
1. **Large file sizes:** Compress images to reduce load time
2. **Too many images:** Limit to 8-10 photos per workshop
3. **High resolution:** Resize to web-appropriate dimensions
4. **Wrong format:** Use JPEG for photos, PNG for graphics

### Organization Issues
1. **Mixed naming:** Use consistent naming convention
2. **Wrong location:** Ensure photos are in correct workshop folder
3. **Missing photos:** Add any referenced images that are missing
4. **Outdated content:** Remove photos from cancelled workshops

## 📝 Example Gallery Configuration

### In workshops.json:
```json
{
  "id": "python-data-analysis-2024",
  "title": "Python for Data Analysis in Chemical Engineering",
  "status": "Completed",
  "gallery": [
    "/images/workshops/python-data-analysis-2024/welcome-session.jpg",
    "/images/workshops/python-data-analysis-2024/coding-tutorial.jpg",
    "/images/workshops/python-data-analysis-2024/students-working.jpg",
    "/images/workshops/python-data-analysis-2024/data-visualization.jpg",
    "/images/workshops/python-data-analysis-2024/final-presentations.jpg",
    "/images/workshops/python-data-analysis-2024/group-photo.jpg"
  ]
}
```

### File Structure:
```
public/images/workshops/python-data-analysis-2024/
├── welcome-session.jpg
├── coding-tutorial.jpg
├── students-working.jpg
├── data-visualization.jpg
├── final-presentations.jpg
└── group-photo.jpg
```

## 🔄 Maintenance Tasks
- **Post-workshop:** Upload gallery within 1 week
- **Monthly:** Check all galleries display correctly
- **Semester:** Review and archive old workshop photos
- **Annually:** Clean up unused or outdated galleries
