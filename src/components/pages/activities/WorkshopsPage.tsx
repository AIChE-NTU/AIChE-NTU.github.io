
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import WorkshopCard from '../../cards/WorkshopCard';
import type { Workshop } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { XIcon } from '../../ui/Icons';

const WorkshopsPage: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [pageConfig, setPageConfig] = useState<any>(null);
    const { category } = useParams<{ category?: string }>();

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const [workshopsRes, pagesRes] = await Promise.all([
                    fetch(getDataUrl('workshops.json')).then(res => res.json()),
                    fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
                ]);
                setWorkshops(workshopsRes);
                setPageConfig(pagesRes?.workshops || null);
                
                // Set selected category from URL parameter
                if (category) {
                    setSelectedCategory(decodeURIComponent(category));
                }
            } catch (error) {
                console.error("Failed to fetch workshops:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkshops();
    }, [category]);
    
    const filteredWorkshops = selectedCategory === 'All' || !selectedCategory
        ? workshops
        : workshops.filter(w => w.category === selectedCategory);

    const upcomingWorkshops = filteredWorkshops.filter(w => w.status === 'Upcoming');
    const pastWorkshops = filteredWorkshops.filter(w => w.status === 'Completed');

    // Get unique categories for filter buttons
    const categories = ['All', ...Array.from(new Set(workshops.map(w => w.category)))];

    return (
        <div className="min-h-screen w-full bg-background dark:bg-background">
            {/* Hero Section with Category Filter */}
            <section className="relative w-full py-20">
                <div className="relative z-10 w-full px-8">
                    <div className="text-center text-text-main max-w-6xl mx-auto mb-16">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-text-main">
                            {pageConfig?.title || 'Technical Workshops'}
                        </h1>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-text-muted mb-12 max-w-4xl mx-auto">
                            {pageConfig?.description || 'Enhance your skills with hands-on workshops led by industry experts'}
                        </p>
                    </div>
                    
                    {/* Category Filter Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold text-text-main mb-8">
                            {pageConfig?.categoryTitle || 'Explore by Category'}
                        </h2>
                        
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                        selectedCategory === cat
                                            ? 'bg-primary text-white shadow-lg scale-105'
                                            : 'bg-surface-alt text-text-muted hover:bg-primary/20 hover:text-primary hover:scale-105'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {selectedCategory !== 'All' && category && (
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
                                    <span>Filtered by: <strong>{selectedCategory}</strong></span>
                                    <button
                                        onClick={() => setSelectedCategory('All')}
                                        className="ml-2 hover:bg-primary/20 rounded-full p-1 transition-colors"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Workshop Content */}
            <div className="w-full px-8 pb-20">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Spinner />
                    </div>
                ) : (
                    <div className="space-y-20">
                        {/* Upcoming Workshops */}
                        <section>
                            <div className="text-center mb-16">
                                <h2 className="text-5xl font-bold text-text-main mb-4">Upcoming Workshops</h2>
                                <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
                                <p className="text-xl text-text-muted mt-6">Register now for these exciting learning opportunities</p>
                            </div>
                            
                            {upcomingWorkshops.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                                    {upcomingWorkshops.map(workshop => (
                                        <WorkshopCard key={workshop.id} workshop={workshop} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-surface rounded-3xl">
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">No Upcoming Workshops</h3>
                                    <p className="text-text-muted">
                                        {selectedCategory !== 'All' 
                                            ? `No upcoming workshops in the "${selectedCategory}" category. Check back soon!`
                                            : 'No upcoming workshops scheduled. Check back soon for new opportunities!'
                                        }
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Past Workshops */}
                        <section>
                            <div className="text-center mb-16">
                                <h2 className="text-5xl font-bold text-text-main mb-4">Past Workshops</h2>
                                <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
                                <p className="text-xl text-text-muted mt-6">Explore what we've accomplished together</p>
                            </div>
                            
                            {pastWorkshops.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                                    {pastWorkshops.map(workshop => (
                                        <WorkshopCard key={workshop.id} workshop={workshop} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-surface rounded-3xl">
                                    <div className="text-6xl mb-4">🎓</div>
                                    <h3 className="text-2xl font-bold text-text-main mb-2">No Past Workshops</h3>
                                    <p className="text-text-muted">
                                        {selectedCategory !== 'All' 
                                            ? `No past workshops in the "${selectedCategory}" category.`
                                            : 'No past workshops to display yet.'
                                        }
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkshopsPage;

