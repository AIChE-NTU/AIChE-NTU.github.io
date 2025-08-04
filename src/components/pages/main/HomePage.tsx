
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import ProjectCard from '../../cards/ProjectCard';
import ActivityCard from '../../cards/ActivityCard';
import WorkshopCard from '../../cards/WorkshopCard';
import ArticleCard from '../../cards/ArticleCard';
import type { Project, Workshop, Activity, Article } from '../../../constants';
import { getDataUrl } from '../../../constants';

const HomePage: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([]);
    const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
    const [latestArticles, setLatestArticles] = useState<Article[]>([]);
    const [pastCompetitions, setPastCompetitions] = useState<Activity[]>([]);
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSeason, setCurrentSeason] = useState<'winter' | 'summer'>('winter');
    const [projectConfig, setProjectConfig] = useState<any>({ showCurrentProjects: true, showComingSoon: false });
    const [comingSoonData, setComingSoonData] = useState<any>(null);
    const [homepageConfig, setHomepageConfig] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [projectsRes, workshopsRes, activitiesRes, articlesRes, competitionsRes, logoRes, heroImagesRes, homepageRes] = await Promise.all([
                    fetch(getDataUrl('projects.json')).then(res => res.json()),
                    fetch(getDataUrl('workshops.json')).then(res => res.json()),
                    fetch(getDataUrl('activities.json')).then(res => res.json()),
                    fetch(getDataUrl('articles.json')).then(res => res.json()),
                    fetch(getDataUrl('competitions.json')).then(res => res.json()),
                    fetch(getDataUrl('logo.json')).then(res => res.json()),
                    fetch('/images/heroimages/heroimages.json').then(res => res.json()).catch(() => []),
                    fetch(getDataUrl('homepage.json')).then(res => res.json()).catch(() => null)
                ]);

                // Set homepage configuration
                setHomepageConfig(homepageRes);

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Process data
                const pastActivities = activitiesRes
                    .filter((activity: Activity) => new Date(activity.date) < today)
                    .sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime());

                const pastCompetitionsFiltered = competitionsRes
                    .filter((competition: Activity) => new Date(competition.date) < today)
                    .sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime());

                const upcomingWorkshopsFiltered = workshopsRes
                    .filter((w: Workshop) => w.status === 'Upcoming' && new Date(w.date) >= today)
                    .sort((a: Workshop, b: Workshop) => new Date(a.date).getTime() - new Date(b.date).getTime());

                const sortedArticles = articlesRes.sort((a: Article, b: Article) => {
                    if (a.publicationDate && b.publicationDate) {
                        return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
                    }
                    return 0;
                });

                // Load projects with visibility controls
                const expandedProjects: any[] = [];
                
                // Check configuration for visibility controls
                const config = projectsRes.config || { showCurrentProjects: true, showComingSoon: false };
                
                // Add winter projects from chember (if visible)
                if (projectsRes.chember?.projects && projectsRes.chember.visible && config.showCurrentProjects) {
                    projectsRes.chember.projects.forEach((project: any) => {
                        expandedProjects.push({...project, season: 'winter', duration: projectsRes.chember.duration});
                    });
                }
                
                // Add summer projects from checlipse (if visible)
                if (projectsRes.checlipse?.projects && projectsRes.checlipse.visible && config.showCurrentProjects) {
                    projectsRes.checlipse.projects.forEach((project: any) => {
                        expandedProjects.push({...project, season: 'summer', duration: projectsRes.checlipse.duration});
                    });
                }
                
                // Don't add "Coming Soon" projects as cards - we'll show a message instead
                
                setFeaturedProjects(expandedProjects);
                setProjectConfig(config);
                setComingSoonData(projectsRes.comingSoon);
                
                // Use homepage config to determine how many items to show
                const itemsToShow = homepageRes?.sections || {};
                setRecentActivities(pastActivities.slice(0, itemsToShow.activities?.itemsToShow || 3));
                setUpcomingWorkshops(upcomingWorkshopsFiltered.slice(0, itemsToShow.workshops?.itemsToShow || 3));
                setLatestArticles(sortedArticles.slice(0, itemsToShow.articles?.itemsToShow || 3));
                setPastCompetitions(pastCompetitionsFiltered.slice(0, itemsToShow.competitions?.itemsToShow || 3));
                
                // Load hero images with priority: homepage config > heroimages directory > logo.json
                if (homepageRes?.hero?.backgroundImages?.length > 0) {
                    setHeroImages(homepageRes.hero.backgroundImages);
                } else if (heroImagesRes && heroImagesRes.length > 0) {
                    setHeroImages(heroImagesRes);
                } else if (logoRes.homePageHeroImages) {
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
            const interval = homepageConfig?.hero?.imageTransitionInterval || 5000;
            const timer = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
            }, interval);
            return () => clearInterval(timer);
        }
    }, [heroImages.length, homepageConfig?.hero?.imageTransitionInterval]);

    useEffect(() => {
        const interval = homepageConfig?.sections?.projects?.seasonTransitionInterval || 8000;
        const seasonTimer = setInterval(() => {
            setCurrentSeason((prevSeason) => prevSeason === 'winter' ? 'summer' : 'winter');
        }, interval);
        return () => clearInterval(seasonTimer);
    }, [homepageConfig?.sections?.projects?.seasonTransitionInterval]);

    // Reusable section component
    const Section = ({ title, description, children, bgClass = "", isProjects = false }: any) => {
        const projectsConfig = homepageConfig?.sections?.projects;
        const currentSeasonConfig = projectsConfig?.[currentSeason];
        const winterBg = projectsConfig?.winter?.backgroundImages?.main;
        const summerBg = projectsConfig?.summer?.backgroundImages?.main;
        const winterOverlay = projectsConfig?.winter?.backgroundImages?.overlay;
        const summerOverlay = projectsConfig?.summer?.backgroundImages?.overlay;
        
        return (
            <section className={`py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center ${bgClass} ${isProjects ? 'relative overflow-hidden' : ''}`} style={{minHeight: 'calc(100vh - 120px)'}}>
                {isProjects && (
                    <div className="absolute inset-0 transition-all duration-2000 ease-in-out">
                        <div className={`absolute inset-0 transition-opacity duration-2000 bg-cover bg-center ${currentSeason === 'winter' ? 'opacity-100' : 'opacity-0'}`}
                            style={{backgroundImage: `url(${winterBg || 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`}} />
                        <div className={`absolute inset-0 transition-opacity duration-2000 bg-cover bg-center ${currentSeason === 'summer' ? 'opacity-100' : 'opacity-0'}`}
                            style={{backgroundImage: `url(${summerBg || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`}} />
                        <div className="absolute inset-0 transition-all duration-2000"
                            style={{ backgroundColor: currentSeason === 'winter' ? (winterOverlay || 'rgba(59, 130, 246, 0.7)') : (summerOverlay || 'rgba(251, 146, 60, 0.7)') }} />
                    </div>
                )}
                <div className={`w-full h-full flex flex-col ${isProjects ? 'relative z-10' : ''}`}>
                    <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 ${isProjects ? 'text-white' : ''}`}>
                        {isProjects ? (currentSeasonConfig?.title || (currentSeason === 'winter' ? 'ChEmber' : 'ChEclipse')) : title}
                    </h2>
                    <p className={`text-lg text-center ${isProjects ? 'mb-12' : 'mb-16'} max-w-3xl mx-auto ${isProjects ? 'text-white/80' : 'text-text-muted'}`}>
                        {isProjects ? (currentSeasonConfig?.subtitle || `Explore innovative ${currentSeason} projects that showcase cutting-edge chemical engineering solutions`) : description}
                    </p>
                    {children}
                </div>
            </section>
        );
    };

    // Responsive grid component with "View More" functionality - THEMED VERSION
    const ResponsiveGrid = ({ items, CardComponent, basePath = "", viewMorePath = "", sectionTitle = "", themeColor = "primary", sectionKey = "" }: any) => {
        const sectionConfig = homepageConfig?.sections?.[sectionKey];
        const itemsToShow = sectionConfig?.itemsToShow || 3;
        const emptyMessage = homepageConfig?.emptyStateMessages?.[sectionKey] || `No ${sectionTitle.toLowerCase()} to show right now.`;
        
        const displayItems = items.slice(0, itemsToShow);
        const hasMore = items.length > itemsToShow;

        // Theme color classes for buttons
        const getButtonClasses = () => {
            switch (themeColor) {
                case "blue":
                    return "bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600";
                case "teal":
                    return "bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600";
                case "purple":
                    return "bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600";
                case "orange":
                    return "bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600";
                default:
                    return "bg-primary hover:bg-primary-focus";
            }
        };

        return isLoading ? (
            <div className="flex justify-center"><Spinner /></div>
        ) : (
            <div className="w-full">
                {/* Full-Width Responsive Flex Layout - Cards always centered */}
                <div className="w-full flex flex-wrap justify-center gap-8 mb-12">
                    {displayItems.length > 0 ? displayItems.map((item: any) => (
                        <div key={item.id || item.link} className="w-full max-w-sm lg:max-w-md xl:max-w-lg flex-shrink-0">
                            <CardComponent {...{[CardComponent === ActivityCard ? 'activity' : CardComponent === ArticleCard ? 'article' : 'workshop']: item}} basePath={basePath} />
                        </div>
                    )) : (
                        <div className="w-full flex justify-center items-center py-16">
                            <p className="text-center text-text-muted text-lg">{emptyMessage}</p>
                        </div>
                    )}
                </div>
                
                {/* Themed View More Button */}
                {hasMore && viewMorePath && (
                    <div className="text-center mt-8">
                        <Link 
                            to={viewMorePath} 
                            className={`inline-flex items-center px-8 py-4 ${getButtonClasses()} text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg`}
                        >
                            <span>{sectionConfig?.viewMoreText || `View More ${sectionTitle}`}</span>
                            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Hero Section - Full Width */}
            <section className="relative text-center overflow-hidden flex flex-col items-center justify-center" style={{minHeight: 'calc(100vh - 120px)'}}>
                <div className="absolute inset-0 w-full h-full">
                    {heroImages.map((image, index) => (
                        <div key={image} className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                            style={{backgroundImage: `url(${image})`, opacity: index === currentImageIndex ? 1 : 0}} />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 p-4 sm:p-8 w-full">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold text-white leading-tight mb-6 animate-fade-in-up hero-text-shadow">
                            {homepageConfig?.hero?.title?.words ? (
                                homepageConfig.hero.title.words.map((word: string, index: number) => (
                                    <span 
                                        key={index}
                                        className={`inline-block ${
                                            index === 0 ? 'animate-slide-in-left' :
                                            index === 1 ? 'animate-slide-in-down' :
                                            'animate-slide-in-right'
                                        } ${index === (homepageConfig.hero.title.highlightedWordIndex || 2) ? 'text-primary' : ''}`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        {word}
                                    </span>
                                ))
                            ) : (
                                <>
                                    <span className="inline-block animate-slide-in-left">Excel.</span> 
                                    <span className="inline-block animate-slide-in-down" style={{ animationDelay: '0.2s' }}>Lead.</span> 
                                    <span className="inline-block text-primary animate-slide-in-right" style={{ animationDelay: '0.4s' }}>Inspire.</span>
                                </>
                            )}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-200 max-w-5xl mx-auto mb-10 leading-relaxed animate-fade-in-up hero-text-shadow" style={{ animationDelay: '0.6s' }}>
                            {homepageConfig?.hero?.subtitle || "Welcome to the AIChE Student Chapter at NTU, the premier hub for chemical engineering students. Join us to engage in innovative projects, gain industry insights, and build your professional network."}
                        </p>
                        <div className="flex justify-center flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                            {homepageConfig?.hero?.buttons ? (
                                homepageConfig.hero.buttons.map((button: any, index: number) => (
                                    <Link 
                                        key={index}
                                        to={button.link} 
                                        className={`font-bold py-4 px-8 sm:px-10 text-lg sm:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-lg ${
                                            button.type === 'primary' 
                                                ? `bg-primary text-white hover:bg-primary-focus ${button.animation ? `animate-${button.animation}` : ''}` 
                                                : 'bg-white/90 text-slate-800 hover:bg-white'
                                        }`}
                                    >
                                        {button.text}
                                    </Link>
                                ))
                            ) : (
                                <>
                                    <Link to="/join" className="bg-primary text-white font-bold py-4 px-8 sm:px-10 text-lg sm:text-xl rounded-full hover:bg-primary-focus transition-all duration-300 hover:scale-105 shadow-lg animate-bounce-gentle">Join Us!</Link>
                                    <Link to="/activities" className="bg-white/90 text-slate-800 font-bold py-4 px-8 sm:px-10 text-lg sm:text-xl rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg">View Activities</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Recent Activities - BLUE BACKGROUND - Full Width & Height */}
            <section className={`relative w-full ${homepageConfig?.sections?.activities?.backgroundColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-900/20'} overflow-hidden flex flex-col items-center justify-center`} style={{minHeight: 'calc(100vh - 120px)'}}>
                {/* Navigation Button */}
                <Link 
                    to="/activities" 
                    className="absolute top-8 right-8 z-20 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-700 rounded-full p-3 hover:bg-blue-600 hover:dark:bg-blue-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    title="View All Activities"
                >
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-900 dark:text-blue-100">
                            {homepageConfig?.sections?.activities?.title || "Recent Activities"}
                        </h2>
                        <p className="text-lg md:text-xl max-w-4xl mx-auto text-blue-700 dark:text-blue-200 leading-relaxed">
                            {homepageConfig?.sections?.activities?.subtitle || "Discover the latest events and activities from our vibrant AIChE community"}
                        </p>
                    </div>
                    <ResponsiveGrid 
                        items={recentActivities} 
                        CardComponent={ActivityCard} 
                        basePath="activities" 
                        viewMorePath="/activities" 
                        sectionTitle="Activities" 
                        themeColor="blue"
                        sectionKey="activities"
                    />
                </div>
            </section>

            {/* Section Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Latest Articles - TEAL BACKGROUND - Full Width & Height */}
            <section className={`relative w-full ${homepageConfig?.sections?.articles?.backgroundColor === 'teal' ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-gray-50 dark:bg-gray-900/20'} overflow-hidden flex flex-col items-center justify-center`} style={{minHeight: 'calc(100vh - 80px)'}}>
                {/* Navigation Button */}
                <Link 
                    to="/articles" 
                    className="absolute top-8 right-8 z-20 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-teal-200 dark:border-teal-700 rounded-full p-3 hover:bg-teal-600 hover:dark:bg-teal-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    title="View All Articles"
                >
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-teal-900 dark:text-teal-100">
                            {homepageConfig?.sections?.articles?.title || "Latest Articles"}
                        </h2>
                        <p className="text-lg md:text-xl max-w-4xl mx-auto text-teal-700 dark:text-teal-200 leading-relaxed">
                            {homepageConfig?.sections?.articles?.subtitle || "Stay informed with the latest insights and knowledge from the chemical engineering world"}
                        </p>
                    </div>
                    <ResponsiveGrid 
                        items={latestArticles} 
                        CardComponent={ArticleCard} 
                        viewMorePath="/articles" 
                        sectionTitle="Articles" 
                        themeColor="teal"
                        sectionKey="articles"
                    />
                </div>
            </section>

            {/* Section Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Upcoming Workshops - PURPLE BACKGROUND - Full Width & Height */}
            <section className={`relative w-full ${homepageConfig?.sections?.workshops?.backgroundColor === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-900/20'} overflow-hidden flex flex-col items-center justify-center`} style={{minHeight: 'calc(100vh - 80px)'}}>
                {/* Navigation Button */}
                <Link 
                    to="/workshops" 
                    className="absolute top-8 right-8 z-20 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-700 rounded-full p-3 hover:bg-purple-600 hover:dark:bg-purple-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    title="View All Workshops"
                >
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-purple-900 dark:text-purple-100">
                            {homepageConfig?.sections?.workshops?.title || "Upcoming Workshops"}
                        </h2>
                        <p className="text-lg md:text-xl max-w-4xl mx-auto text-purple-700 dark:text-purple-200 leading-relaxed">
                            {homepageConfig?.sections?.workshops?.subtitle || "Enhance your skills with hands-on workshops led by industry experts"}
                        </p>
                    </div>
                    <ResponsiveGrid 
                        items={upcomingWorkshops} 
                        CardComponent={WorkshopCard} 
                        viewMorePath="/workshops" 
                        sectionTitle="Workshops" 
                        themeColor="purple"
                        sectionKey="workshops"
                    />
                </div>
            </section>

            {/* Section Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>

            {/* Past Competitions - ORANGE BACKGROUND - Full Width & Height */}
            <section className={`relative w-full ${homepageConfig?.sections?.competitions?.backgroundColor === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-900/20'} overflow-hidden flex flex-col items-center justify-center`} style={{minHeight: 'calc(100vh - 80px)'}}>
                {/* Navigation Button */}
                <Link 
                    to="/competitions" 
                    className="absolute top-8 right-8 z-20 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-orange-200 dark:border-orange-700 rounded-full p-3 hover:bg-orange-600 hover:dark:bg-orange-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                    title="View All Competitions"
                >
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
                
                <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-orange-900 dark:text-orange-100">
                            {homepageConfig?.sections?.competitions?.title || "Past Competitions"}
                        </h2>
                        <p className="text-lg md:text-xl max-w-4xl mx-auto text-orange-700 dark:text-orange-200 leading-relaxed">
                            {homepageConfig?.sections?.competitions?.subtitle || "Explore the exciting competitions we've hosted and the achievements of our participants"}
                        </p>
                    </div>
                    <ResponsiveGrid 
                        items={pastCompetitions} 
                        CardComponent={ActivityCard} 
                        basePath="competitions" 
                        viewMorePath="/competitions" 
                        sectionTitle="Competitions" 
                        themeColor="orange"
                        sectionKey="competitions"
                    />
                </div>
            </section>

            {/* Section Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            
            {/* Projects Section - MOVED TO BOTTOM */}
            <Section title="" description="" bgClass="bg-surface-alt" isProjects={true}>
                {isLoading ? <div className="flex justify-center"><Spinner /></div> : (
                    // Show "Coming Soon" message when only coming soon is enabled and no current projects
                    projectConfig.showComingSoon && !projectConfig.showCurrentProjects && featuredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-2xl mx-auto">
                                <div className="text-6xl mb-6">🔮</div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {currentSeason === 'winter' 
                                        ? comingSoonData?.winter?.title || 'Winter Projects Coming Soon'
                                        : comingSoonData?.summer?.title || 'Summer Projects Coming Soon'
                                    }
                                </h2>
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                    {currentSeason === 'winter' 
                                        ? comingSoonData?.winter?.description || 'Stay tuned for our upcoming winter project initiatives.'
                                        : comingSoonData?.summer?.description || 'Get ready for our next summer research initiatives.'
                                    }
                                </p>
                                <div className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white bg-gray-500 opacity-70 cursor-not-allowed">
                                    <span className="mr-2">⏰</span>
                                    Stay Tuned
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="space-y-1">
                                {featuredProjects.slice(0, homepageConfig?.sections?.projects?.itemsToShow || 10).map(project => (
                                    <div key={project.id} className="w-full">
                                        <ProjectCard project={project} currentSeason={currentSeason} allProjects={featuredProjects} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </Section>
        </div>
    );
};

export default HomePage;
