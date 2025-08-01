# AIChE NTU Student Chapter Website - Maintenance Guide

Welcome to the official guide for maintaining and updating the AIChE NTU Student Chapter website. This guide is designed for all executive board members, even those with no coding experience. You can update almost everything on the site by editing files directly in your GitHub repository.

## Table of Contents
1.  [How It Works: Dynamic Content](#how-it-works-dynamic-content)
2.  [Deploying Changes](#deploying-changes)
3.  [Content Management Cheatsheet](#content-management-cheatsheet)
4.  [Detailed Guides](#detailed-guides)
    *   [Updating the Executive Board & Other Teams](#updating-the-executive-board--other-teams)
    *   [Updating Faculty Advisors](#updating-faculty-advisors)
    *   [Adding a New Project](#adding-a-new-project)
    *   [Adding a New Workshop](#adding-a-new-workshop)
    *   [Adding Other Activities (Industry Visits, Competitions)](#adding-other-activities-industry-visits-competitions)
    *   [Adding a Photo Gallery to a Past Event](#adding-a-photo-gallery-to-a-past-event)
    *   [Updating Collaborator Logos](#updating-collaborator-logos)
    *   [Changing Major Site Images (Logo, Banners)](#changing-major-site-images-logo-banners)
    *   [Updating the 'Join Us' Page](#updating-the-join-us-page)

---

## 1. How It Works: Dynamic Content
The website is designed to be **dynamic**. This means the site's pages (the code) are built to automatically read all their content—like text, images, and links—from simple text files in the `data/` folder. These files use a format called **JSON**.

When you edit a JSON file, the page that uses that file automatically shows the new information when it loads. You don't need to touch any of the website's code. For example, the "Our Projects" page is programmed to fetch and display every project listed in `data/projects.json`. If you add a new project to that file, the page will automatically show it.

**Key Concept: JSON Structure**
JSON uses key-value pairs. For example: `"title": "My Awesome Project"`.
*   The `key` is always in double quotes (e.g., `"title"`).
*   The `value` can be text (in double quotes), a number, a link, etc.
*   Lists of items are enclosed in square brackets `[]`.
*   Each item in a list is a set of key-value pairs enclosed in curly braces `{}` and separated by commas.

---

## 2. Deploying Changes
GitHub Pages automatically updates your live website every time you save a change (a "commit") to your repository's `main` branch. The process is:
1.  Navigate to the file you want to edit on GitHub.
2.  Click the pencil icon (✏️) to edit it.
3.  Make your changes.
4.  Scroll down, write a brief description of your change (e.g., "Added new Summer project"), and click "Commit changes".
5.  Wait 1-2 minutes for the changes to appear on your live website.

---

## 3. Content Management Cheatsheet

This table shows you which file to edit to update a specific part of the website.

| To Update...                                 | Edit This File...                             | Which Page(s) Will Update?                                |
| -------------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| **Team Members & Chapter Structure**         | `data/team.json`                              | The "About Us" page.                                      |
| **Faculty Advisors**                         | `data/professors.json`                        | The "About Us" page.                                      |
| **Projects**                                 | `data/projects.json`                          | The "Projects" page and "Featured Projects" on the Homepage. |
| **Workshops**                                | `data/workshops.json`                         | The "Workshops" page and "Upcoming Workshops" on the Homepage. |
| **General Activities**                       | `data/activities.json`                        | The "General Activities" page and "Recent Activities" on the Homepage. |
| **Industry Visits**                          | `data/industry-visits.json`                   | The "Industry Visits" page.                               |
| **Competitions**                             | `data/competitions.json`                      | The "Competitions" page.                                  |
| **Chapter-Written Articles**                 | `data/articles.json`                          | The "Articles" page and "Latest Articles" on the Homepage. |
| **Site Logo & Collaborator Logos**           | `data/logo.json`                              | The Header (logo) and Footer (collaborators) on all pages. |
| **Homepage Banners & Key Page Images**       | `data/logo.json`                              | The Homepage and About Us page banners.                   |
| **'Join Us' Page Steps & Links**             | `data/assets.json`                            | The "Join Us" page.                                       |

---

## 4. Detailed Guides

### Updating the Executive Board & Other Teams
*   **File:** `data/team.json`
*   **How it Works:** The "About Us" page dynamically reads this file to build the sections for the Executive Board, Course Representatives, and Student Advisors. When you add or change a person here, their card will automatically appear in the correct section on the page.
*   **To Add a Member:** Copy an existing member's block (from `{` to `}`), paste it into the correct team's list, and update the details. Remember to add a comma after the preceding member's block.
*   **Fields:**
    *   `name`, `role`, `bio`: Self-explanatory text.
    *   `imageUrl`: A direct link to a professional photo (e.g., from LinkedIn, or upload an image to your repository and use its link).
    *   `linkedinUrl`: The full URL to the member's LinkedIn profile.

### Updating Faculty Advisors
*   **File:** `data/professors.json`
*   **How it Works:** The "About Us" page reads this file to generate the list of faculty advisors at the bottom of the page.
*   **Process:** Same as adding a team member. Copy an existing professor block and edit the details.
*   **Fields:** `name`, `title`, `research`, `imageUrl`.

### Adding a New Project
*   **File:** `data/projects.json`
*   **How it Works:** The "Projects" page reads this file to display all projects. The code automatically sorts projects into the "Summer" or "Winter" tabs based on the `season` field. The tags you add become clickable links for filtering. The two most recent projects may also appear on the Homepage.
*   **Process:** Copy an existing project block and edit the details.
*   **Key Fields:**
    *   `id`: A **unique**, URL-friendly identifier. Use lowercase and hyphens (e.g., `"my-new-project-2025"`).
    *   `title`, `description`, `imageUrl`: The main content for the project card.
    *   `details`: The **full, detailed description** that will appear on the project's dedicated page. You can write several paragraphs here.
    *   `season`: Must be either `"Summer"` or `"Winter"` (case-sensitive).
    *   `tags`: A list of skills or topics, e.g., `["Sustainability", "Aspen HYSYS"]`. These tags are now clickable!
    *   `releaseDate`: The project's date for the calendar, format `"Month Day, Year"` (e.g., "December 1, 2025").
    *   `registrationUrl`: (Optional) The full link to a Microsoft Form. If `""`, the button won't appear.

### Adding a New Workshop
*   **File:** `data/workshops.json`
*   **How it Works:** The "Workshops" page reads this file and automatically sorts workshops into "Upcoming" and "Past" sections based on the `status` field. The `category` you set becomes a clickable filter. Upcoming workshops may also feature on the Homepage.
*   **Process:** Similar to adding a project.
*   **Key Fields:**
    *   `id`: A unique, URL-friendly identifier.
    *   `category`: The workshop's topic (e.g., `"Software Simulation"`). This is a clickable filter.
    *   `details`: The full description for the workshop's dedicated page.
    *   `status`: Must be either `"Upcoming"` or `"Past"`.
    *   `registrationUrl`: (Optional) The link to the registration form.

### Adding Other Activities (Industry Visits, Competitions)
*   **Files:** `data/industry-visits.json`, `data/competitions.json`, `data/activities.json`
*   **How it Works:** Each of these files populates its own page. The code is smart: it reads the `date` field and automatically sorts every event into "Upcoming" and "Past" sections. For upcoming events, it will even create monthly groupings (e.g., "September 2025") to keep the page organized.
*   **Process:** All these files follow the same structure. Pick the correct file for the type of event you're adding.
*   **Key Fields:**
    *   `id`: A unique, URL-friendly identifier.
    *   `details`: The full description for the event's dedicated page.
    *   `date`: The date of the event, format: `"Month Day, Year"`.
    *   `registrationUrl`: (Optional) The link to the registration form.

### Adding a Photo Gallery to a Past Event
*   **How it Works:** Once an event is in the past, you can enhance its page. By adding a `schedule` or `galleryImages` to its entry in the JSON file, you tell the website's code to dynamically build and display the schedule and photo gallery sections. If these fields are not present, the sections won't appear.

*   **Step 1: Upload Your Photos**
    *   In the project, navigate to the `public/images/` directory.
    *   Create a **new folder** and name it with the exact `id` of your event (e.g., for an event with `id: "my-cool-event-2024"`, create a folder named `my-cool-event-2024`).
    *   Upload all your event photos into this new folder.

*   **Step 2: Update the Event Data**
    *   Open the data file where the event is located (e.g., `data/activities.json`).
    *   Find the specific event entry by its `id`.
    *   To add a gallery, add a `galleryImages` list. The paths must start with `/images/` followed by your folder name and the photo's filename.
    *   You can also add a `schedule` for the event.

**Example:**
```json
{
    "id": "cider-making-workshop-zymurgy-2024",
    "title": "Cider Making Workshop",
    "date": "October 26, 2024",
    "imageUrl": "/images/cider-making-workshop-zymurgy-2024/01.jpg",
    "details": "A full description of your event...",
    "schedule": [
        { "time": "2:00 PM", "event": "Introduction" },
        { "time": "2:30 PM", "event": "Main Activity" }
    ],
    "galleryImages": [
        "/images/cider-making-workshop-zymurgy-2024/01.jpg",
        "/images/cider-making-workshop-zymurgy-2024/02.jpg",
        "/images/cider-making-workshop-zymurgy-2024/03.jpg"
    ]
}
```

### Updating Collaborator Logos
*   **File:** `data/logo.json`
*   **How it Works:** The footer component, which appears on every page, dynamically reads the `partners` list from this file and displays each company's logo.
*   **Find:** The `partners` list.
*   **Process:** To add a new partner, copy an existing block and update the `name`, `logoUrl` (a direct link to a high-quality logo), and `website` (the company's homepage).

### Changing Major Site Images (Logo, Banners)
*   **File:** `data/logo.json`
*   **How it Works:** The main pages of the website look to this file to find which images to display. Changing a link here will instantly change the image on the site.
*   **To Change The Main Site Logo:** Update the `siteLogoUrl` link.
*   **To Change Homepage Banner Images:** Edit the list of links in the `homePageHeroImages` section.
*   **To Change About Page Images:** Update `aboutPageTeamPhoto` and `missionImageUrl`.

### Updating the 'Join Us' Page
*   **File:** `data/assets.json`
*   **How it Works:** The "Join Us" page is built entirely from the content of this file. This makes it easy to change instructions, links, or titles without touching any code.
*   **Process:** All text and links for the step-by-step "Join Us" page are in this file. You can easily update the description for each step or change the Microsoft Form link (`membershipProofFormUrl`) here.
