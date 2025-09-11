# 📧 Social Contacts (`socialcontacts.json`)

## 🎯 What This File Controls
- Social media links (Instagram, LinkedIn, etc.)
- Contact email addresses
- WhatsApp group links
- External communication channels

## 📂 File Location
`public/data/socialcontacts.json`

## 🔧 Structure Overview
```json
{
  "instagram": "Instagram profile URL",
  "linkedin": "LinkedIn page URL",
  "email": "Chapter email address",
  "whatsapp": "WhatsApp group invite link",
  "telegram": "Telegram channel link (optional)",
  "youtube": "YouTube channel link (optional)"
}
```

## ✏️ Common Updates

### Update Social Media Links
```json
{
  "instagram": "https://www.instagram.com/aiche_ntu/",
  "linkedin": "https://www.linkedin.com/company/aiche-ntu-student-chapter/",
  "email": "aiche.ntu23@gmail.com"
}
```

### Add New Contact Methods
```json
{
  "instagram": "https://www.instagram.com/aiche_ntu/",
  "linkedin": "https://www.linkedin.com/company/aiche-ntu-student-chapter/",
  "email": "aiche.ntu23@gmail.com",
  "whatsapp": "https://chat.whatsapp.com/INVITE_LINK",
  "telegram": "https://t.me/aiche_ntu",
  "youtube": "https://www.youtube.com/@aiche-ntu"
}
```

### Update Email Addresses
```json
{
  "email": "contact@aichentu.org",
  "partnerships": "partnerships@aichentu.org",
  "events": "events@aichentu.org"
}
```

## 📱 Platform-Specific Guidelines

### Instagram
- **Format:** `https://www.instagram.com/username/`
- **Best Practice:** Use official chapter handle
- **Example:** `https://www.instagram.com/aiche_ntu/`

### LinkedIn
- **Format:** `https://www.linkedin.com/company/company-name/`
- **Best Practice:** Use company page, not personal profile
- **Example:** `https://www.linkedin.com/company/aiche-ntu-student-chapter/`

### WhatsApp
- **Format:** `https://chat.whatsapp.com/INVITE_CODE`
- **Best Practice:** Create group-specific invite links
- **Security:** Regularly update invite links for security

### Email
- **Format:** Standard email address
- **Best Practice:** Use professional domain if available
- **Multiple:** Can have different emails for different purposes

## 🔒 Privacy & Security

### WhatsApp Groups
- Use admin-only invite links
- Regularly rotate invitation links
- Set appropriate group permissions

### Email Addresses
- Use official chapter emails when possible
- Avoid personal email addresses for official contacts
- Keep backup access for critical accounts

### Social Media
- Ensure accounts are managed by multiple committee members
- Use strong passwords and 2FA when available
- Regular security reviews

## ⚠️ Important Notes
- Test all links before publishing
- Keep contact information current
- Remove inactive or outdated platforms
- Maintain consistency across all platforms

## 🛠️ Troubleshooting
- **Link not working:** Check URL format and accessibility
- **WhatsApp invite invalid:** Generate new invite link
- **Email bouncing:** Verify email address is active
- **Social media not loading:** Check if account is public/active

## 📝 Complete Example
```json
{
  "instagram": "https://www.instagram.com/aiche_ntu/",
  "linkedin": "https://www.linkedin.com/company/aiche-ntu-student-chapter/",
  "email": "aiche.ntu23@gmail.com",
  "whatsapp": "https://chat.whatsapp.com/BxYzABCDEF123456789",
  "telegram": "https://t.me/aiche_ntu_announcements",
  "youtube": "https://www.youtube.com/@aiche-ntu",
  "website": "https://aiche-ntu.github.io",
  "partnerships": "partnerships@aichentu.org"
}
```

## 📊 Usage in Website
This data appears in:
- **Footer:** Social media icons and links
- **Contact page:** All contact methods
- **Join Us page:** Links to community channels
- **About page:** Ways to connect with the chapter

## 🔄 Regular Maintenance
- **Monthly:** Check all links are working
- **Semester:** Update contact emails if committee changes
- **Annually:** Review and update all social media links
- **As needed:** Add new platforms or remove inactive ones
