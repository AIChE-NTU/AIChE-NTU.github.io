
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../ui/Spinner';

interface InfoItem {
    label: string;
    value: React.ReactNode;
}

interface SubPageLayoutProps {
    isLoading: boolean;
    item: {
        title: string;
        imageUrl: string;
        details: string;
        registrationUrl?: string;
    } | null;
    infoItems: InfoItem[];
    children?: React.ReactNode;
    notFoundMessage: {
        title: string;
        description: string;
        backLink: string;
        backLinkText: string;
    };
}

const SubPageLayout: React.FC<SubPageLayoutProps> = ({ isLoading, item, infoItems, children, notFoundMessage }) => {
    if (isLoading) {
        return <div className="flex justify-center py-20"><Spinner /></div>;
    }

    if (!item) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-red-500">{notFoundMessage.title}</h1>
                <p className="text-text-muted mt-4">{notFoundMessage.description}</p>
                <Link to={notFoundMessage.backLink} className="mt-6 inline-block bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-focus transition-colors">
                    {notFoundMessage.backLinkText}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative h-72 md:h-96 rounded-lg -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{item.title}</h1>
                </div>
            </section>
            
            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-3xl font-bold border-b pb-4">Details</h2>
                    <div className="prose dark:prose-invert max-w-none text-text-muted space-y-4" 
                         dangerouslySetInnerHTML={{ __html: (item.details || '').replace(/\n/g, '<br />') }} />
                    {/* Render extra content here */}
                    {children}
                </div>
                
                {/* Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface p-6 rounded-lg shadow-lg sticky top-24">
                         <h3 className="text-2xl font-bold mb-6 border-b pb-4">Information</h3>
                         <div className="space-y-4">
                            {infoItems.map(info => (
                                <div key={info.label}>
                                    <h4 className="font-semibold text-text-muted">{info.label}</h4>
                                    <div className="text-lg">{info.value}</div>
                                </div>
                            ))}
                         </div>
                         {item.registrationUrl && (
                             <a href={item.registrationUrl} target="_blank" rel="noopener noreferrer" className="w-full mt-8 block text-center py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-focus transition-all duration-300">
                                Register Now
                            </a>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubPageLayout;
