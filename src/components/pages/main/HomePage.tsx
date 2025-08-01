
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import ProjectCard from '../../ProjectCard';
import ActivityCard from '../../ActivityCard';
import WorkshopCard from '../../WorkshopCard';
import ArticleCard from '../../ArticleCard';
import type { Project, Workshop, Activity, Article } from '../../../constants';

const HomePage: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([]);
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
    const [latestArticles, setLatestArticles] = useState<Article[]>([]);
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [projectsRes, workshopsRes, activitiesRes, articlesRes, logoRes] = await Promise.all([
                    fetch('/data/projects.json').then(res => res.json()),
                    fetch('/data/workshops.json').then(res => res.json()),
                    fetch('/data/activities.json').then(res => res.json()),
                    fetch('/data/articles.json').then(res => res.json()),
                    fetch('/data/logo.json').then(res => res.json())
                ]);

                setFeaturedProjects(projectsRes.slice(0, 2));
                setRecentActivities(activitiesRes.slice(0, 2));
                setUpcomingWorkshops(workshopsRes.filter((w: Workshop) => w.status === 'Upcoming').slice(0, 2));
                setLatestArticles(articlesRes.slice(0, 2));
                
                if (logoRes.homePageHeroImages) {
                    setHeroImages(logoRes.homePageHeroImages);
                }

            } catch (error) {
                console.error("Failed to fetch homepage data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (heroImages.length > 1) {
            const timer = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
            }, 5000); // Change image every 5 seconds
            return () => clearInterval(timer);
        }
    }, [heroImages.length]);

    return (
        <div className="space-y-32">
            {/* Hero Section */}
            <section className="relative text-center rounded-lg -mt-8 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
                {/* Background Image Slideshow */}
                <div className="absolute inset-0 w-full h-full">
                    {heroImages.map((image, index) => (
                        <div
                            key={image}
                            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                            style={{
                                backgroundImage: `url(${image})`,
                                opacity: index === currentImageIndex ? 1 : 0,
                            }}
                        />
                    ))}
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 p-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                        Excel. Lead. <span className="text-primary">Inspire.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-8">
                        Welcome to the AIChE Student Chapter at NTU, the premier hub for chemical engineering students. Join us to engage in innovative projects, gain industry insights, and build your professional network.
                    </p>
                    <div className="flex justify-center flex-wrap gap-4">
                        <Link to="/join" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-focus transition-transform hover:scale-105">
                            Join Us!
                        </Link>
                        <Link to="/projects" className="bg-white/90 text-slate-800 font-bold py-3 px-8 rounded-full hover:bg-white transition-transform hover:scale-105 shadow-md">
                            View Projects
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Recent Activities Section */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-16">Recent Activities</h2>
                {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {recentActivities.map(activity => (
                            <ActivityCard key={activity.id} activity={activity} basePath="activities" />
                        ))}
                    </div>
                )}
            </section>

            {/* Latest Articles Section */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-16">Latest Articles</h2>
                {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestArticles.length > 0 ? latestArticles.map(article => (
                            <ArticleCard key={article.link} article={article} />
                        )) : <p className="text-center text-text-muted md:col-span-2">No articles to show right now.</p>}
                    </div>
                )}
            </section>
            
            {/* Featured Projects Section */}
            <section>
                <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
                {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </section>

            {/* Upcoming Workshops Section */}
            <section>
                 <h2 className="text-4xl font-bold text-center mb-16">Upcoming Workshops</h2>
                 {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                     <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {upcomingWorkshops.length > 0 ? (
                            upcomingWorkshops.map(workshop => (
                               <WorkshopCard key={workshop.id} workshop={workshop} />
                            ))
                        ) : (
                            <p className="text-center text-text-muted md:col-span-2">No upcoming workshops to show right now.</p>
                        )}
                     </div>
                 )}
            </section>
        </div>
    );
};

export default HomePage;
