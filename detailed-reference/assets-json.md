# 🖼️ Assets & Configuration (`assets.json`)

## 🎯 What This File Controls
- QR codes for forms and registration
- External form URLs and links
- Global website configuration
- Join Us page settings

## 📂 File Location
`public/data/assets.json`

## 🔧 Structure Overview
```json
{
  "joinUs": {
    "pageTitle": "Page title",
    "pageDescription": "Page description",
    "aicheMembershipUrl": "AIChE national membership URL",
    "membershipProofFormUrl": "Chapter verification form URL",
    "qrCodeImageUrl": "QR code image URL",
    "step1": { "title": "...", "description": "..." },
    "step2": { "title": "...", "description": "..." },
    "step3": { "title": "...", "description": "..." }
  }
}
```

## ✏️ Common Edits

### Update Membership Form URL
When you create a new Microsoft Forms or Google Forms for membership verification:

```json
{
  "joinUs": {
    "membershipProofFormUrl": "https://forms.office.com/r/YOUR_NEW_FORM_ID",
    "qrCodeImageUrl": "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ENCODED_FORM_URL"
  }
}
```

**Important:** When changing the form URL, you need to update TWO places:
1. `membershipProofFormUrl` - The direct link
2. `qrCodeImageUrl` - The QR code that contains the encoded form URL

### Generate QR Code URL
1. Go to [URL Encoder](https://www.urlencoder.org/)
2. Paste your new form URL
3. Copy the encoded result
4. Replace `ENCODED_FORM_URL` with the encoded version

**Example:**
- Original URL: `https://forms.office.com/r/ABC123`
- Encoded URL: `https%3A%2F%2Fforms.office.com%2Fr%2FABC123`
- QR Code URL: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fforms.office.com%2Fr%2FABC123`

### Update Step Instructions
Modify the step-by-step instructions shown on the Join Us page:

```json
{
  "step1": {
    "title": "Register with AIChE National",
    "description": "Complete your national AIChE student membership registration first."
  },
  "step2": {
    "title": "Get Your Membership ID",
    "description": "After registration, you'll receive a membership ID number via email."
  },
  "step3": {
    "title": "Submit Chapter Verification",
    "description": "Use our form below to verify your membership with our chapter."
  }
}
```

## 🔧 QR Code Settings
- **Size:** Default is 200x200 pixels
- **Service:** Uses qrserver.com API (free)
- **Format:** PNG image
- **Customization:** You can change size by modifying `size=200x200`

## ⚠️ Important Notes
- Always update both form URL and QR code URL together
- Test the QR code by scanning it with your phone
- Keep backup of old form URLs in case of issues
- QR codes update automatically when you change the URL

## 🛠️ Troubleshooting
- **QR code not working:** Check that the encoded URL is correct
- **Form not accessible:** Verify form permissions and sharing settings
- **Page not updating:** Wait 2-5 minutes for deployment
- **QR code too small/large:** Adjust the size parameter (e.g., `size=300x300`)

## 📝 Complete Example
```json
{
  "joinUs": {
    "pageTitle": "Become an AIChE Member",
    "pageDescription": "Follow these steps to join our student chapter and unlock exclusive benefits.",
    "aicheMembershipUrl": "https://www.aiche.org/students/membership",
    "membershipProofFormUrl": "https://forms.office.com/r/MembershipVerification2025",
    "qrCodeImageUrl": "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fforms.office.com%2Fr%2FMembershipVerification2025",
    "step1": {
      "title": "Register with AIChE National",
      "description": "First, navigate to the official AIChE student membership page and complete the registration process. This will give you your official membership ID."
    },
    "step2": {
      "title": "Fill Out Your Details",
      "description": "Carefully fill in all the required personal and academic information on the AIChE registration form."
    },
    "step3": {
      "title": "Submit Your Proof of Membership",
      "description": "Once you have your membership ID, come back here and submit it along with your details using our chapter's verification form. You can use the button below or scan the QR code with your mobile device."
    }
  }
}
```

## 🔗 External Resources
- [QR Code Generator](https://www.qrserver.com/) - Free QR code API
- [URL Encoder](https://www.urlencoder.org/) - Encode URLs for QR codes
- [Microsoft Forms](https://forms.office.com/) - Create membership forms
- [QR Code Tester](https://zxing.org/w/decode.jspx) - Test QR codes online
