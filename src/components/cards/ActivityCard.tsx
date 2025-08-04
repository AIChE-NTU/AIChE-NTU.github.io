import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import type { Activity } from '../../constants';

interface ActivityCardProps {
    activity: Activity;
    basePath: 'activities' | 'industry-visits' | 'competitions';
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, basePath }) => (
  <Card className="flex flex-col h-full min-h-[500px]">
    <Link to={`/${basePath}/${activity.id}`}>
      <img src={activity.imageUrl} alt={activity.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300" />
    </Link>
    <div className="p-8 flex flex-col flex-grow">
      <p className="text-sm font-semibold text-primary mb-2">{activity.date}</p>
      <h3 className="text-2xl font-bold mb-4 text-text-main hover:text-primary transition-colors">
        <Link to={`/${basePath}/${activity.id}`}>{activity.title}</Link>
      </h3>
      <p className="text-text-muted flex-grow mb-6 text-lg leading-relaxed">{activity.description}</p>
      <Link to={`/${basePath}/${activity.id}`} className="mt-auto font-semibold text-primary hover:text-primary-focus transition-colors self-start text-lg">
        Learn More &rarr;
      </Link>
    </div>
  </Card>
);

export default ActivityCard;
