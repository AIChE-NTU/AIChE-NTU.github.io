import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import ActivityCard from '../../components/ActivityCard';
import type { Activity } from '../../constants';

const CompetitionsPage: React.FC = () => {
  const [competitions, setCompetitions] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/data/competitions.json');
        const data = await response.json();
        setCompetitions(data);
      } catch (error) {
        console.error("Failed to fetch competitions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompetitions();
  }, []);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingCompetitions = competitions
    .filter(c => new Date(c.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastCompetitions = competitions
    .filter(c => new Date(c.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const groupedUpcomingCompetitions = upcomingCompetitions.reduce((acc, competition) => {
    const date = new Date(competition.date);
    const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(competition);
    
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Competitions</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Test your skills, challenge your peers, and win prizes in our exciting chemical engineering competitions.
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
         <>
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Upcoming Competitions</h2>
            {Object.keys(groupedUpcomingCompetitions).length > 0 ? (
               Object.entries(groupedUpcomingCompetitions).map(([monthYear, competitionsInMonth]) => (
                <div key={monthYear} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-semibold text-text-main mb-6">{monthYear}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {competitionsInMonth.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} basePath="competitions" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted">No upcoming competitions scheduled. Check back soon!</p>
            )}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">Past Competitions</h2>
            {pastCompetitions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastCompetitions.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} basePath="competitions" />
                ))}
              </div>
            ) : (
              <p className="text-text-muted">No past competitions to show yet.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CompetitionsPage;