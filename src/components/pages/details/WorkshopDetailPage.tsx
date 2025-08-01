
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Workshop } from '../../../constants';
import SubPageLayout from './SubPageLayout';

const WorkshopDetailPage: React.FC = () => {
    const { workshopId } = useParams<{ workshopId: string }>();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshop = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/data/workshops.json');
                const workshops: Workshop[] = await response.json();
                const currentWorkshop = workshops.find(w => w.id === workshopId);
                setWorkshop(currentWorkshop || null);
            } catch (error) {
                console.error("Failed to fetch workshop details:", error);
                setWorkshop(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (workshopId) {
            fetchWorkshop();
        }
    }, [workshopId]);

    const infoItems = workshop ? [
        { 
            label: 'Category', 
            value: (
                <Link to={`/workshops/category/${encodeURIComponent(workshop.category)}`}>
                    <span className="font-bold text-primary hover:underline">{workshop.category}</span>
                </Link>
            )
        },
        {
            label: 'Difficulty',
            value: (
                <span className={`font-bold ${workshop.level === 'Beginner' ? 'text-green-500' : workshop.level === 'Intermediate' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {workshop.level}
                </span>
            ),
        },
        { label: 'Instructor', value: <span>{workshop.instructor}</span> },
        { label: 'Date', value: <span>{workshop.date}</span> },
    ] : [];

    return (
        <SubPageLayout
            isLoading={isLoading}
            item={workshop}
            infoItems={infoItems}
            notFoundMessage={{
                title: 'Workshop Not Found',
                description: 'The workshop you are looking for does not exist.',
                backLink: '/workshops',
                backLinkText: 'Back to Workshops',
            }}
        />
    );
};

export default WorkshopDetailPage;
