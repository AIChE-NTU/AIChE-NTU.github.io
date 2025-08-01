
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import WorkshopCard from '../../WorkshopCard';
import type { Workshop } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { XIcon } from '../../Icons';

const WorkshopsPage: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { category } = useParams<{ category?: string }>();

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const response = await fetch(getDataUrl('workshops.json'));
                const data = await response.json();
                setWorkshops(data);
            } catch (error) {
                console.error("Failed to fetch workshops:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkshops();
    }, []);
    
    const filteredWorkshops = category 
        ? workshops.filter(w => w.category === decodeURIComponent(category))
        : workshops;

    const upcomingWorkshops = filteredWorkshops.filter(w => w.status === 'Upcoming');
    const pastWorkshops = filteredWorkshops.filter(w => w.status === 'Past');

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Workshops</h1>
                <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
                    Sharpen your technical skills with our hands-on workshops in process simulation, safety, and career development.
                </p>
            </div>
            
            {category && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Filtered by Category: <span className="text-primary">{decodeURIComponent(category)}</span></h2>
                    <Link to="/workshops" className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
                        <XIcon className="w-4 h-4"/> Clear Filter
                    </Link>
                </div>
            )}

            {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
                <>
                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Upcoming Workshops</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {upcomingWorkshops.length > 0 ? (
                                upcomingWorkshops.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop} />)
                            ) : (
                                <p className="text-text-muted md:col-span-2">No upcoming workshops scheduled {category ? 'for this category' : ''}. Check back soon!</p>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Past Workshops</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {pastWorkshops.length > 0 ? (
                                pastWorkshops.map(workshop => <WorkshopCard key={workshop.id} workshop={workshop} />)
                             ) : (
                                <p className="text-text-muted md:col-span-2">No past workshops to show yet.</p>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default WorkshopsPage;

