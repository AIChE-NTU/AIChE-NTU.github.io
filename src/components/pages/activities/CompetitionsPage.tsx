import React, { useState, useEffect } from 'react';
import Spinner from '../../ui/Spinner';
import ActivityCard from '../../cards/ActivityCard';
import type { Activity } from '../../../constants'
import { getDataUrl } from '../../../constants';

const CompetitionsPage: React.FC = () => {
  const [competitions, setCompetitions] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageConfig, setPageConfig] = useState<any>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const [competitionsRes, pagesRes] = await Promise.all([
          fetch(getDataUrl('competitions.json')).then(res => res.json()),
          fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
        ]);
        setCompetitions(competitionsRes);
        setPageConfig(pagesRes?.competitions || null);
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">
          {pageConfig?.title || 'Competitions'}
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          {pageConfig?.description || 'Test your skills, challenge your peers, and win prizes in our exciting chemical engineering competitions.'}
        </p>
      </div>

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
         <>
          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">
              {pageConfig?.upcomingTitle || 'Upcoming Competitions'}
            </h2>
            {Object.keys(groupedUpcomingCompetitions).length > 0 ? (
               Object.entries(groupedUpcomingCompetitions).map(([monthYear, competitionsInMonth]) => (
                <div key={monthYear} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-semibold text-text-main mb-6">{monthYear}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {competitionsInMonth.map(activity => (
                      <ActivityCard key={activity.id} activity={activity} basePath="competitions" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-muted">
                {pageConfig?.noUpcomingMessage || 'No upcoming competitions scheduled. Check back soon!'}
              </p>
            )}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4">
              {pageConfig?.pastTitle || 'Past Competitions'}
            </h2>
            {pastCompetitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {pastCompetitions.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} basePath="competitions" />
                ))}
              </div>
            ) : (
              <p className="text-text-muted">
                {pageConfig?.noPastMessage || 'No past competitions to show yet.'}
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CompetitionsPage;

