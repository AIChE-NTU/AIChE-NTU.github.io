import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import ActivityCard from '../../components/ActivityCard';
import type { Activity } from '../../constants';

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/data/activities.json');
        const data = await response.json();
        setActivities(data);
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Our Activities</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          From industry talks to social gatherings, explore the events and activities that define our chapter.
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        <>
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Upcoming Activities</h2>
            {Object.keys(groupedUpcomingActivities).length > 0 ? (
               Object.entries(groupedUpcomingActivities).map(([monthYear, activitiesInMonth]) => (
                <div key={monthYear} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-semibold text-text-main mb-6">{monthYear}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activitiesInMonth.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} basePath="activities" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted">No upcoming activities scheduled. Check back soon!</p>
            )}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Past Activities</h2>
            {pastActivities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} basePath="activities" />
                ))}
              </div>
            ) : (
              <p className="text-text-muted">No past activities to show yet.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ActivitiesPage;