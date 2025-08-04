import React, { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import ActivityCard from '../../cards/ActivityCard';
import type { Activity } from '../../../constants'
import { getDataUrl } from '../../../constants';

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [activitiesRes, pagesRes] = await Promise.all([
          fetch(getDataUrl('activities.json')).then(res => res.json()),
          fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
        ]);
        setActivities(activitiesRes);
        setPageConfig(pagesRes?.activities || null);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the beginning of the day

  const upcomingActivities = activities
    .filter(activity => new Date(activity.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastActivities = activities
    .filter(activity => new Date(activity.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedUpcomingActivities = upcomingActivities.reduce((acc, activity) => {
    const date = new Date(activity.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(activity);
    
    return acc;
  }, {} as Record<string, Activity[]>);


  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">
          {pageConfig?.hero?.title || "Our Activities"}
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          {pageConfig?.hero?.subtitle || "From industry talks to social gatherings, explore the events and activities that define our chapter."}
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        <>
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">
              {pageConfig?.sections?.upcoming?.title || "Upcoming Activities"}
            </h2>
            {Object.keys(groupedUpcomingActivities).length > 0 ? (
               Object.entries(groupedUpcomingActivities).map(([monthYear, activitiesInMonth]) => (
                <div key={monthYear} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-semibold text-text-main mb-6">{monthYear}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
                    {activitiesInMonth.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} basePath="activities" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted">
                {pageConfig?.sections?.upcoming?.emptyMessage || "No upcoming activities scheduled. Check back soon!"}
              </p>
            )}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">
              {pageConfig?.sections?.past?.title || "Past Activities"}
            </h2>
            {pastActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
                {pastActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} basePath="activities" />
                ))}
              </div>
            ) : (
              <p className="text-text-muted">
                {pageConfig?.sections?.past?.emptyMessage || "No past activities to show yet."}
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ActivitiesPage;

