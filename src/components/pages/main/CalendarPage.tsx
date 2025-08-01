
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Project, Activity, Workshop } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { XIcon } from '../../Icons';
import Spinner from '../../Spinner';

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

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth();
  const dayOfMonth = todayDate.getDate();

  const monthName = todayDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDayOfWeek = new Date(year, month, 1).getDay();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const [projectsRes, activitiesRes, workshopsRes, visitsRes, competitionsRes] = await Promise.all([
          fetch(getDataUrl('projects.json')).then(res => res.json()),
          fetch(getDataUrl('activities.json')).then(res => res.json()),
          fetch(getDataUrl('workshops.json')).then(res => res.json()),
          fetch(getDataUrl('industry-visits.json')).then(res => res.json()),
          fetch(getDataUrl('competitions.json')).then(res => res.json())
        ]);
        
        const parseDate = (dateString: string) => {
            // Add a specific time to avoid timezone issues making it the previous day
            return new Date(`${dateString} 12:00:00`);
        }

        const projectEvents: CalendarEvent[] = projectsRes
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

        const activityEvents: CalendarEvent[] = activitiesRes.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-300',
                type: 'Activity', path: `/activities/${a.id}`
            };
        });
        
        const visitEvents: CalendarEvent[] = visitsRes.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/30 dark:text-yellow-300',
                type: 'Visit', path: `/industry-visits/${a.id}`
            };
        });
        
        const competitionEvents: CalendarEvent[] = competitionsRes.map((a: Activity) => {
            const date = parseDate(a.date);
            return {
                id: a.id, day: date.getDate(), month: date.getMonth(), year: date.getFullYear(),
                title: a.title, description: a.description,
                color: 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-300',
                type: 'Competition', path: `/competitions/${a.id}`
            };
        });

        const workshopEvents: CalendarEvent[] = workshopsRes.map((w: Workshop) => {
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
    const isToday = day === dayOfMonth;
    const dayEvents = currentMonthEvents.filter(e => e.day === day);
    
    return (
      <div key={day} className="border-t border-r border-slate-200 dark:border-slate-700 p-2 min-h-[140px] flex flex-col gap-1">
        <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-full self-start ${isToday ? 'bg-primary text-white shadow-lg' : ''}`}>
          {day}
        </span>
        <div className="flex-grow overflow-y-auto space-y-1">
          {dayEvents.map((event, eventIndex) => (
            <button key={eventIndex} onClick={() => setSelectedEvent(event)} className={`w-full p-1 rounded-md text-xs text-left ${event.color} hover:ring-2 hover:ring-primary`}>
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
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Club Calendar</h1>
              <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
                  Stay up to date with all our events, workshops, and deadlines.
              </p>
          </div>
          
          <div className="bg-surface rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center p-4 bg-surface-alt dark:bg-slate-700">
                  <h2 className="text-2xl font-bold text-text-main">{monthName}</h2>
                  {isLoading && <div className="flex items-center gap-2 text-text-muted"><Spinner /><p>Loading events...</p></div>}
              </div>
              <div className="grid grid-cols-7 border-l border-slate-200 dark:border-slate-700">
                  {weekDays.map(day => (
                      <div key={day} className="text-center font-bold p-3 bg-surface-alt dark:bg-slate-700/50 border-r border-b border-slate-200 dark:border-slate-700 text-text-muted">{day}</div>
                  ))}
                  {dayCells}
              </div>
          </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <div className="bg-surface rounded-lg shadow-2xl max-w-lg w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-text-muted hover:text-primary">
                    <XIcon className="w-6 h-6" />
                </button>
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${selectedEvent.color}`}>
                    {selectedEvent.type}
                </span>
                <h2 className="text-3xl font-bold text-text-main mb-2">{selectedEvent.title}</h2>
                <p className="text-text-muted mb-4 font-semibold">{new Date(selectedEvent.year, selectedEvent.month, selectedEvent.day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-text-muted mb-8">{selectedEvent.description}</p>
                <Link to={selectedEvent.path} onClick={() => setSelectedEvent(null)} className="w-full text-center py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-focus transition-all duration-300 block">
                    View Details
                </Link>
            </div>
        </div>
      )}
    </>
  );
};

export default CalendarPage;


