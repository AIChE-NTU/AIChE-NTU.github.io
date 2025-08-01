
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../Spinner';
import ProjectCard from '../../ProjectCard';
import type { Project } from '../../../constants';
import { XIcon } from '../../Icons';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState<'Summer' | 'Winter'>('Summer');
  const { tag } = useParams<{ tag?: string }>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);
  
  const seasonFilteredProjects = projects.filter(p => p.season === activeSeason);
  const filteredProjects = tag 
    ? projects.filter(p => p.tags.includes(decodeURIComponent(tag)))
    : seasonFilteredProjects;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">Our Projects</h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Explore the innovative chemical engineering projects led by our members, organized by season.
        </p>
      </div>
      
      {/* Season Tabs */}
      {!tag && (
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveSeason('Summer')}
            className={`px-6 py-3 font-semibold text-lg transition-all duration-300 ${
              activeSeason === 'Summer'
                ? 'border-b-2 border-primary text-primary'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Summer Projects
          </button>
          <button
            onClick={() => setActiveSeason('Winter')}
            className={`px-6 py-3 font-semibold text-lg transition-all duration-300 ${
              activeSeason === 'Winter'
                ? 'border-b-2 border-primary text-primary'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Winter Projects
          </button>
        </div>
      )}
      
      {tag && (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Filtered by Tag: <span className="text-primary">{decodeURIComponent(tag)}</span></h2>
            <Link to="/projects" className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
                <XIcon className="w-4 h-4"/> Clear Filter
            </Link>
        </div>
      )}

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        ) : (
            <p className="text-center text-text-muted py-10">No projects to display for this {tag ? 'filter' : 'season'}.</p>
        )
      )}
    </div>
  );
};

export default ProjectsPage;
