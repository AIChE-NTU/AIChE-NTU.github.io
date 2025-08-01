import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import type { Workshop } from '../constants';

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => (
    <Card className="p-6 flex flex-col">
        <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-3">
                <h3 className="text-2xl font-bold text-text-main mb-2 sm:mb-0">
                  <Link to={`/workshops/${workshop.id}`}>{workshop.title}</Link>
                </h3>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ${workshop.level === 'Beginner' ? 'bg-green-500/20 text-green-400' : workshop.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {workshop.level}
                </span>
            </div>
            <Link to={`/workshops/category/${encodeURIComponent(workshop.category)}`}>
             <p className="text-sm font-medium text-indigo-400 bg-indigo-500/20 rounded-full px-3 py-1 mb-3 inline-block cursor-pointer hover:ring-2 hover:ring-primary/50">
                {workshop.category}
            </p>
            </Link>
            <p className="text-sm text-text-muted mb-1">
                <span className="font-semibold">Date:</span> {workshop.date}
            </p>
            <p className="text-sm text-text-muted mb-4">
                <span className="font-semibold">Instructor:</span> {workshop.instructor}
            </p>
            <p className="text-text-muted">{workshop.description}</p>
        </div>
        <div className="mt-4 text-right">
            <Link to={`/workshops/${workshop.id}`} className="font-semibold text-primary hover:text-primary-focus transition-colors">
                View Details &rarr;
            </Link>
        </div>
    </Card>
);

export default WorkshopCard;
