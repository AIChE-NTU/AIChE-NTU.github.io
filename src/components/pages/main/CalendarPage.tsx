import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Project, Activity, Workshop } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { XIcon } from '../../ui/Icons';
import Spinner from '../../ui/Spinner';

interface CalendarEvent {
  id: string;
  day: number;
  month: number; // 0-indexed month (0 = January)
  year: number;
  title: string;
  description: string;
  color: string;
  type: 'Project' | 'Activity' | 'Workshop' | 'Visit' | 'Competition';
  path: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pageConfig, setPageConfig] = useState<any>(null);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = new Date(year, month, 1).getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const [projectsRes, activitiesRes, workshopsRes, visitsRes, competitionsRes, pagesRes] = await Promise.all([
          fetch(getDataUrl('projects.json')).then(res => res.json()),
          fetch(getDataUrl('activities.json')).then(res => res.json()),
          fetch(getDataUrl('workshops.json')).then(res => res.json()),
          fetch(getDataUrl('industry-visits.json')).then(res => res.json()),
          fetch(getDataUrl('competitions.json')).then(res => res.json()),
          fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
        ]);
        
        // Set page configuration
        setPageConfig(pagesRes?.calendar || null);
        
        // Ensure all responses are arrays
        const projects = Array.isArray(projectsRes) ? projectsRes : [];
        const activities = Array.isArray(activitiesRes) ? activitiesRes : [];
        const workshops = Array.isArray(workshopsRes) ? workshopsRes : [];
        const visits = Array.isArray(visitsRes) ? visitsRes : [];
        const competitions = Array.isArray(competitionsRes) ? competitionsRes : [];
        
        const parseDate = (dateString: string) => {
            // Add a specific time to avoid timezone issues making it the previous day
            return new Date(`${dateString} 12:00:00`);
        }

        const projectEvents: CalendarEvent[] = projects
            .filter((p: Project) => p.releaseDate)
            .map((p: Project) => {
                const date = parseDate(p.releaseDate!);
                return {
                    id: p.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                    title: p.title, description: p.description,
                    color: 'bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300',
                    type: 'Project', path: `/projects/${p.id}`
                };
            });

        const activityEvents: CalendarEvent[] = activities.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300',
                type: 'Activity', path: `/activities/${a.id}`
            };
        });
        
        const visitEvents: CalendarEvent[] = visits.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/30 dark:text-yellow-300',
                type: 'Visit', path: `/industry-visits/${a.id}`
            };
        });
        
        const competitionEvents: CalendarEvent[] = competitions.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-300',
                type: 'Competition', path: `/competitions/${a.id}`
            };
        });

        const workshopEvents: CalendarEvent[] = workshops.map((w: Workshop) => {
            const date = parseDate(w.date);
            return {
                id: w.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: w.title, description: w.description,
                color: 'bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-300',
                type: 'Workshop', path: `/workshops/${w.id}`
            };
        });
        
        setEvents([...projectEvents, ...activityEvents, ...workshopEvents, ...visitEvents, ...competitionEvents]);

      } catch (error) {
        console.error("Failed to fetch calendar events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const currentMonthEvents = events.filter(e => e.month === month && e.year === year);
  const blanks = Array(startingDayOfWeek).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const dayCells = [...blanks, ...days].map((day, index) => {
    if (day === null) {
      return <div key={`blank-${index}`} className="border-t border-r border-slate-200 dark:border-slate-700"></div>;
    }
    
    const isToday = day === todayDay && month === todayMonth && year === todayYear;
    const dayEvents = currentMonthEvents.filter(e => e.day === day);
    
    return (
      <div key={day} className="border-t border-r border-slate-200 dark:border-slate-700 p-3 min-h-[140px] flex flex-col gap-2">
        <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full self-start text-lg ${isToday ? 'bg-primary text-white shadow-lg' : ''}`}>
          {day}
        </span>
        <div className="flex-grow overflow-y-auto space-y-2">
          {dayEvents.map((event, eventIndex) => (
            <button key={eventIndex} onClick={() => setSelectedEvent(event)} className={`w-full p-2 rounded-md text-sm text-left transition-all duration-200 ${event.color} hover:ring-2 hover:ring-primary hover:scale-105`}>
              <p className="font-semibold whitespace-normal break-words">{event.title}</p>
            </button>
          ))}
        </div>
      </div>
    );
  });
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="space-y-12">
          <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">
                {pageConfig?.hero?.title || "Club Calendar"}
              </h1>
              <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
                  {pageConfig?.hero?.subtitle || "Stay up to date with all our events, workshops, and deadlines."}
              </p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center p-6 bg-surface-alt dark:bg-slate-700">
                  <h2 className="text-3xl font-bold text-text-main">{monthName}</h2>
                  <div className="flex items-center gap-4">
                      <button onClick={goToPreviousMonth} className="p-3 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors shadow-md hover:shadow-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                      </button>
                      <button onClick={goToToday} className="px-4 py-3 bg-slate-200 dark:bg-slate-600 text-text-main rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors font-medium shadow-md hover:shadow-lg">
                          Today
                      </button>
                      <button onClick={goToNextMonth} className="p-3 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors shadow-md hover:shadow-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                      </button>
                  </div>
                  {isLoading && <div className="flex items-center gap-2 text-text-muted"><Spinner /><p>Loading events...</p></div>}
              </div>
              <div className="grid grid-cols-7 border-l border-slate-200 dark:border-slate-700">
                  {weekDays.map(day => (
                      <div key={day} className="text-center font-bold p-4 bg-surface-alt dark:bg-slate-700/50 border-r border-b border-slate-200 dark:border-slate-700 text-text-muted text-lg">{day}</div>
                  ))}
                  {dayCells}
              </div>
          </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <div className="bg-surface rounded-lg shadow-2xl max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-text-muted hover:text-text-main">
                    <XIcon className="w-6 h-6" />
                </button>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${selectedEvent.color}`}>
                    {selectedEvent.type}
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4">{selectedEvent.title}</h3>
                <p className="text-text-muted mb-6">{selectedEvent.description}</p>
                <Link to={selectedEvent.path} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-focus transition-colors font-medium">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
      )}
    </>
  );
};

export default CalendarPage;
