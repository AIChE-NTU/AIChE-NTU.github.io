
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import type { Activity } from '../../constants';
import SubPageLayout from './SubPageLayout';
import { XIcon } from '../../components/Icons';

const ActivityDetailPage: React.FC = () => {
    const { activityId } = useParams<{ activityId: string }>();
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchActivity = async () => {
            setIsLoading(true);
            try {
                // Fetch all possible activity types
                const [generalActivities, industryVisits, competitions] = await Promise.all([
                    fetch('/data/activities.json').then(res => res.json()),
                    fetch('/data/industry-visits.json').then(res => res.json()),
                    fetch('/data/competitions.json').then(res => res.json())
                ]);
                
                const allActivities: Activity[] = [...generalActivities, ...industryVisits, ...competitions];
                const currentActivity = allActivities.find(a => a.id === activityId);
                
                setActivity(currentActivity || null);
            } catch (error) {
                console.error("Failed to fetch activity details:", error);
                setActivity(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (activityId) {
            fetchActivity();
        }
    }, [activityId]);

    const getBackLink = () => {
        if (location.pathname.startsWith('/competitions')) return '/competitions';
        if (location.pathname.startsWith('/industry-visits')) return '/industry-visits';
        return '/activities';
    }
    
    const getBackLinkText = () => {
        if (location.pathname.startsWith('/competitions')) return 'Back to Competitions';
        if (location.pathname.startsWith('/industry-visits')) return 'Back to Industry Visits';
        return 'Back to Activities';
    }
    
    const isPastEvent = activity && new Date(activity.date) < new Date();

    const infoItems = activity ? [
        { label: 'Date', value: <span className="font-bold text-primary">{activity.date}</span> },
    ] : [];

    return (
        <>
            <SubPageLayout
                isLoading={isLoading}
                item={activity}
                infoItems={infoItems}
                notFoundMessage={{
                    title: 'Activity Not Found',
                    description: 'The activity you are looking for does not exist.',
                    backLink: getBackLink(),
                    backLinkText: getBackLinkText(),
                }}
            >
                {isPastEvent && activity && (
                    <div className="space-y-12 mt-12">
                        {/* Schedule Section */}
                        {activity.schedule && activity.schedule.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold border-b pb-4 mb-6">Schedule of Events</h2>
                                <ul className="space-y-4">
                                    {activity.schedule.map((item, index) => (
                                        <li key={index} className="flex items-start p-4 rounded-lg bg-surface-alt">
                                            <div className="font-bold text-primary w-28 flex-shrink-0">{item.time}</div>
                                            <div className="text-text-main">{item.event}</div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        {/* Photo Gallery Section */}
                        {activity.galleryImages && activity.galleryImages.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold border-b pb-4 mb-6">Photo Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {activity.galleryImages.map((imgUrl, index) => (
                                        <div key={index} className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(imgUrl)}>
                                            <img 
                                                src={imgUrl} 
                                                alt={`Event gallery image ${index + 1}`} 
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </SubPageLayout>

            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 cursor-pointer" 
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-4 right-4 text-white hover:text-primary z-10"
                        aria-label="Close image viewer"
                    >
                        <XIcon className="w-8 h-8"/>
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Enlarged event" 
                        className="max-w-full max-h-full object-contain rounded-lg cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
};

export default ActivityDetailPage;