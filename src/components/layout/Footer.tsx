import React, { useState, useEffect } from 'react';
import { getDataUrl } from '../../constants';
import SocialContacts from './SocialContacts';

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
                const response = await fetch(getDataUrl('logo.json'));
                const data = await response.json();
                setPartners(data.partners || []);
            } catch (error) {
                console.error("Failed to fetch partners for footer:", error);
            }
        };
        fetchPartners();
    }, []);

    return (
        <footer className="bg-surface shadow-inner mt-12 border-t border-slate-200 dark:border-slate-700 w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Collaborators Section */}
                {partners.length > 0 && (
                    <div className="mb-12 w-full">
                        <h3 className="text-center text-xl font-bold text-text-main mb-8">Our Collaborators</h3>
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 items-center justify-center gap-x-4 gap-y-6 max-w-none">
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
                <div className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 w-full">
                    <p className="text-text-muted text-sm text-center md:text-left">&copy; {new Date().getFullYear()} AIChE NTU Student Chapter. All Rights Reserved.</p>
                    <SocialContacts variant="footer" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;