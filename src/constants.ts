// Helper function to get correct data URLs for GitHub Pages
export const getDataUrl = (path: string): string => {
  // Debug: Log what URL we're trying to fetch
  let url;
  
  // For local development, use absolute URLs
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    url = `${window.location.origin}/data/${path}`;
  } else {
    // For production GitHub Pages with HashRouter
    url = `/data/${path}`;
  }
  
  console.log('Fetching data from:', url);
  return url;
};

export interface NavLink {
  name: string;
  path: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { 
    name: 'Activities', 
    path: '/activities',
    children: [
        { name: 'General Activities', path: '/activities' },
        { name: 'Projects', path: '/projects' },
        { name: 'Workshops', path: '/workshops' },
        { name: 'Industry Visits', path: '/industry-visits' },
        { name: 'Competitions', path: '/competitions' },
    ]
  },
  { name: 'Articles', path: '/articles' },
  { name: 'Calendar', path: '/calendar' },
  { name: 'Contact Us', path: '/contact' },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  imageUrl: string;
  tags: string[];
  season: 'Summer' | 'Winter';
  releaseDate?: string;
  registrationUrl?: string;
}

export interface Workshop {
    id: string;
    title: string;
    description:string;
    details: string;
    date: string;
    instructor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    status: 'Upcoming' | 'Past';
    imageUrl: string;
    registrationUrl?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    linkedinUrl?: string;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    details: string;
    imageUrl: string;
    date: string;
    registrationUrl?: string;
    galleryImages?: string[];
    schedule?: { time: string; event: string }[];
}

export interface Article {
    title: string;
    author: string;
    publicationDate: string;
    summary: string;
    imageUrl: string;
    link: string;
}

export interface Professor {
    name: string;
    title: string;
    research: string;
    imageUrl: string;
}

const tagColorClasses = [
    "bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300",
    "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300",
    "bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/30 dark:text-yellow-300",
    "bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-300",
    "bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/30 dark:text-indigo-300",
    "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-300",
    "bg-pink-500/20 text-pink-600 dark:bg-pink-500/30 dark:text-pink-300",
    "bg-teal-500/20 text-teal-600 dark:bg-teal-500/30 dark:text-teal-300",
];

export const getTagColor = (tag: string): string => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % tagColorClasses.length);
    return tagColorClasses[index];
};