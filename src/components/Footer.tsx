import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, TelegramIcon, InstagramIcon } from './Icons';

interface Partner {
  name: string;
  logoUrl: string;
  website: string;
}

const Footer: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch('./data/logo.json');
                const data = await response.json();
                setPartners(data.partners || []);
            } catch (error) {
                console.error("Failed to fetch partners for footer:", error);
            }
        };
        fetchPartners();
    }, []);

    return (
        <footer className="bg-surface shadow-inner mt-12 border-t border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Collaborators Section */}
                {partners.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-center text-xl font-bold text-text-main mb-8">Our Collaborators</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 items-center justify-center gap-x-8 gap-y-6">
                            {partners.map(partner => (
                                <a key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" title={partner.name} className="flex justify-center transition-transform duration-300 hover:scale-110">
                                    <img 
                                        src={partner.logoUrl} 
                                        alt={`${partner.name} logo`} 
                                        className="h-8 md:h-10 max-w-full object-contain dark:bg-white dark:p-1 dark:rounded-md"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Footer Bottom */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-text-muted text-sm">&copy; {new Date().getFullYear()} AIChE NTU Student Chapter. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" aria-label="GitHub" className="text-text-muted hover:text-primary transition-colors">
                           <GithubIcon />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-text-muted hover:text-primary transition-colors">
                            <LinkedinIcon />
                        </a>
                        <a href="mailto:contact@aichentu.org" aria-label="Email" className="text-text-muted hover:text-primary transition-colors">
                            <MailIcon />
                        </a>
                        <a href="#" aria-label="Telegram" className="text-text-muted hover:text-primary transition-colors">
                            <TelegramIcon />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-text-muted hover:text-primary transition-colors">
                            <InstagramIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;