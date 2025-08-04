import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import type { Workshop } from '../constants';

const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-primary/10">
        <div className="relative">
            {/* Main Content */}
            <div className="p-8">
                {/* Status and Level Badges */}
                <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        workshop.status === 'Upcoming' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-500 text-white'
                    }`}>
                        {workshop.status}
                    </span>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        workshop.level === 'Beginner' 
                            ? 'bg-green-500 text-white' 
                            : workshop.level === 'Intermediate' 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-red-500 text-white'
                    }`}>
                        {workshop.level}
                    </span>
                </div>

                {/* Header Section */}
                <div className="mb-6">
                    <Link to={`/workshops/category/${encodeURIComponent(workshop.category)}`}>
                        <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-4 hover:bg-primary/20 transition-colors cursor-pointer">
                            {workshop.category}
                        </span>
                    </Link>
                    
                    <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors leading-tight">
                        <Link to={`/workshops/${workshop.id}`}>{workshop.title}</Link>
                    </h3>
                    
                    <p className="text-text-muted text-base leading-relaxed line-clamp-3">
                        {workshop.description}
                    </p>
                </div>

                {/* Details Section */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-text-muted">
                            <span className="font-semibold text-text-main">Date:</span> {workshop.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-text-muted">
                            <span className="font-semibold text-text-main">Instructor:</span> {workshop.instructor}
                        </span>
                    </div>
                </div>

                {/* Action Section */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Link 
                        to={`/workshops/${workshop.id}`} 
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-focus transition-all duration-300 group-hover:gap-3"
                    >
                        <span>Explore Workshop</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    </Card>
);

export default WorkshopCard;
