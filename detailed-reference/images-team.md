# 👥 Team Photos (`public/images/team/`)

## 🎯 What This Directory Controls
- Executive committee member photos
- Leadership headshots
- Course representative photos
- Student advisor images

## 📂 Directory Location
`public/images/team/`

## 📸 Photo Requirements

### File Format
- **Supported:** `.jpg`, `.jpeg`, `.png`
- **Recommended:** `.jpg` for smaller file sizes
- **Avoid:** `.gif`, `.bmp`, `.webp`

### File Naming
- **Format:** `FirstName_LastName.jpg`
- **Examples:** 
  - `John_Doe.jpg`
  - `Sarah_Johnson.jpg`
  - `Chong_Kok_Yang.jpg`
- **Rules:**
  - Use underscores between names
  - No spaces or special characters
  - Consistent capitalization

### Image Specifications
- **Size:** Under 2MB per file
- **Dimensions:** Square aspect ratio preferred (1:1)
- **Recommended:** 400x400 to 800x800 pixels
- **Quality:** Professional headshot style
- **Background:** Clean, professional background

## 📋 Photo Guidelines

### Composition
- **Framing:** Head and shoulders visible
- **Focus:** Clear, sharp focus on face
- **Lighting:** Even, professional lighting
- **Expression:** Professional, friendly smile

### Technical Quality
- **Resolution:** High enough for web display
- **Compression:** Balanced quality vs file size
- **Color:** Natural color balance
- **Orientation:** Properly oriented (not rotated)

### Professional Standards
- **Dress:** Professional or business casual attire
- **Background:** Neutral, non-distracting
- **Consistency:** Similar style across all team photos
- **Currency:** Recent photos (within 1-2 years)

## 📁 File Organization

### Current Structure
```
public/images/team/
├── Chong_Kok_Yang.JPG
├── Sarah_Johnson.jpg
├── Michael_Chen.jpg
└── [other team member photos]
```

### Naming Examples
```
President: John_Smith.jpg
VP Events: Sarah_Lee.jpg
Treasurer: Michael_Wong.jpg
Course Rep: Alex_Tan.jpg
```

## 🔧 How to Add New Photos

### Step 1: Prepare the Photo
1. Crop to square aspect ratio
2. Resize to 400-600 pixels wide
3. Compress to under 2MB
4. Save as high-quality JPEG

### Step 2: Name the File
1. Use format: `FirstName_LastName.jpg`
2. Match the name exactly as it appears in `team.json`
3. Use consistent capitalization

### Step 3: Upload to Directory
1. Navigate to `public/images/team/`
2. Upload the new photo file
3. Verify the filename matches exactly

### Step 4: Update team.json
1. Open `public/data/team.json`
2. Find the team member entry
3. Update `imageUrl` field:
   ```json
   "imageUrl": "/images/team/FirstName_LastName.jpg"
   ```

## ⚠️ Important Notes
- **File names must match exactly** with what's referenced in `team.json`
- **Case sensitivity matters** - `John_Doe.jpg` ≠ `john_doe.jpg`
- **No spaces in filenames** - use underscores instead
- **Keep file sizes reasonable** - large files slow down page loading

## 🛠️ Troubleshooting

### Photo Not Showing
1. **Check filename:** Ensure exact match with `team.json`
2. **Check file path:** Verify photo is in correct directory
3. **Check file size:** Must be under 2MB
4. **Check file format:** Use supported formats only

### Poor Quality Display
1. **Resolution too low:** Use higher resolution source
2. **Over-compressed:** Reduce compression level
3. **Wrong aspect ratio:** Crop to square format
4. **Blurry source:** Use sharper original photo

### File Management Issues
1. **File not uploading:** Check file size and format
2. **Wrong location:** Ensure uploading to correct directory
3. **Permission issues:** Verify write access to directory
4. **Caching:** Clear browser cache to see updates

## 🔄 Maintenance Tasks

### Regular Updates
- **New members:** Add photos within 1 week of joining
- **Role changes:** Update photos if position changes
- **Photo refresh:** Update photos every 1-2 years
- **Departing members:** Remove or archive old photos

### Quality Checks
- **Monthly:** Review all photos display correctly
- **Semester:** Check for missing or broken images
- **Annually:** Assess overall photo quality and consistency
- **As needed:** Update photos that look outdated

## 📝 Example File Structure
```
public/images/team/
├── Executive Board/
│   ├── Leadership/
│   │   ├── Sarah_Johnson.jpg (President)
│   │   └── Michael_Chen.jpg (VP)
│   ├── Events_Team/
│   │   ├── Diana_Miller.jpg (Director)
│   │   └── Kevin_Durant.jpg (Committee)
│   └── [other sub-teams]/
├── Course_Representatives/
│   ├── Eileen_Paw.jpg
│   └── Jason_Liau.jpg
└── Student_Advisors/
    ├── Alex_Chen.jpg
    └── Samantha_Lee.jpg
```

## 🎨 Photo Editing Tips
- Use consistent lighting and background across all photos
- Maintain similar head positioning and sizing
- Apply subtle color correction for consistency
- Consider using the same photographer for uniformity
- Keep backup copies of original high-resolution photos
