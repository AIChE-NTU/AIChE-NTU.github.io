import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getTagColor } from '../constants';
import type { Project } from '../constants';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="flex flex-col">
    <Link to={`/projects/${project.id}`}>
      <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
    </Link>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold mb-2 text-text-main">
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </h3>
      <p className="text-text-muted flex-grow mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <Link key={tag} to={`/projects/tag/${encodeURIComponent(tag)}`}>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/50 ${getTagColor(tag)}`}>
                {tag}
            </span>
          </Link>
        ))}
      </div>
      <Link to={`/projects/${project.id}`} className="mt-auto font-semibold text-primary hover:text-primary-focus transition-colors self-start">
        View Details &rarr;
      </Link>
    </div>
  </Card>
);

export default ProjectCard;
