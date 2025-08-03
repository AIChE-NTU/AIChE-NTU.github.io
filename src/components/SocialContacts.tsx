import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, InstagramIcon } from './Icons';
import { getDataUrl } from '../constants';

export interface SocialContact {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
};

interface SocialContactsProps {
  variant?: 'footer' | 'sidebar';
  className?: string;
}

const SocialContacts: React.FC<SocialContactsProps> = ({ 
  variant = 'footer', 
  className = '' 
}) => {
  const [socialContacts, setSocialContacts] = useState<SocialContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialContacts = async () => {
      try {
        const response = await fetch(getDataUrl('socialcontacts.json'));
        const data = await response.json();
        setSocialContacts(data.contacts || []);
      } catch (error) {
        console.error('Failed to fetch social contacts:', error);
        // Fallback to empty array
        setSocialContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialContacts();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex flex-col space-y-3 w-full ${className}`}>
        {socialContacts.map((contact) => {
          const IconComponent = iconMap[contact.icon];
          if (!IconComponent) return null;
          
          return (
            <a
              key={contact.name}
              href={contact.url}
              {...(contact.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-600/50 transition-all duration-200 hover:scale-105 w-full flex justify-center"
              title={contact.name}
              aria-label={contact.ariaLabel}
            >
              <div className="w-5 h-5 text-gray-700 dark:text-gray-300">
                <IconComponent />
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // Footer variant - full width responsive
  return (
    <div className={`flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 w-full ${className}`}>
      {socialContacts.map((contact) => {
        const IconComponent = iconMap[contact.icon];
        if (!IconComponent) return null;
        
        return (
          <a
            key={contact.name}
            href={contact.url}
            {...(contact.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={contact.ariaLabel}
            className="text-text-muted hover:text-primary transition-colors p-2"
          >
            <IconComponent />
          </a>
        );
      })}
    </div>
  );
};

export default SocialContacts;
