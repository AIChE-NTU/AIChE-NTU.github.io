import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import type { Activity } from '../constants';

interface ActivityCardProps {
    activity: Activity;
    basePath: 'activities' | 'industry-visits' | 'competitions';
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, basePath }) => (
  <Card className="flex flex-col">
    <Link to={`/${basePath}/${activity.id}`}>
      <img src={activity.imageUrl} alt={activity.title} className="w-full h-56 object-cover" />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-primary mb-1">{activity.date}</p>
      <h3 className="text-2xl font-bold mb-2 text-text-main">
        <Link to={`/${basePath}/${activity.id}`}>{activity.title}</Link>
      </h3>
      <p className="text-text-muted flex-grow mb-4">{activity.description}</p>
      <Link to={`/${basePath}/${activity.id}`} className="mt-auto font-semibold text-primary hover:text-primary-focus transition-colors self-start">
        Learn More &rarr;
      </Link>
    </div>
  </Card>
);

export default ActivityCard;
