import React, { useState, useEffect } from 'react';
import Spinner from '../../Spinner';
import ActivityCard from '../../ActivityCard';
import type { Activity } from '../../../constants';

const IndustryVisitsPage: React.FC = () => {
  const [visits, setVisits] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('/data/industry-visits.json');
        const data = await response.json();
        setVisits(data);
      } catch (error) {
        console.error("Failed to fetch industry visits:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVisits();
  }, []);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingVisits = visits
    .filter(v => new Date(v.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastVisits = visits
    .filter(v => new Date(v.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedUpcomingVisits = upcomingVisits.reduce((acc, visit) => {
    const date = new Date(visit.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(visit);
    
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Industry Visits</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Gain firsthand experience and see chemical engineering in action with our guided tours of manufacturing plants and research facilities.
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        <>
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Upcoming Visits</h2>
            {Object.keys(groupedUpcomingVisits).length > 0 ? (
               Object.entries(groupedUpcomingVisits).map(([monthYear, visitsInMonth]) => (
                <div key={monthYear} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-semibold text-text-main mb-6">{monthYear}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visitsInMonth.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} basePath="industry-visits" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted">No upcoming industry visits scheduled. Check back soon!</p>
            )}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Past Visits</h2>
            {pastVisits.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastVisits.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} basePath="industry-visits" />
                ))}
              </div>
            ) : (
              <p className="text-text-muted">No past industry visits to show yet.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default IndustryVisitsPage;
