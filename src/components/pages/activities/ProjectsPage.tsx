
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import ProjectCard from '../../cards/ProjectCard';
import type { Project } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { XIcon } from '../../ui/Icons';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSeason, setActiveSeason] = useState<'Summer' | 'Winter'>('Summer');
  const [config, setConfig] = useState<any>({ showCurrentProjects: true, showComingSoon: false });
  const [comingSoonData, setComingSoonData] = useState<any>(null);
  const [pageConfig, setPageConfig] = useState<any>(null);
  const { tag } = useParams<{ tag?: string }>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [projectsRes, pagesRes] = await Promise.all([
          fetch(getDataUrl('projects.json')).then(res => res.json()),
          fetch(getDataUrl('pages.json')).then(res => res.json()).catch(() => null)
        ]);
        
        // Extract projects from the nested structure
        const allProjects: Project[] = [];
        
        // Check configuration for visibility controls
        const config = projectsRes.config || { showCurrentProjects: true, showComingSoon: false };
        
        // Add winter projects from chember (if visible)
        if (projectsRes.chember && projectsRes.chember.projects && projectsRes.chember.visible && config.showCurrentProjects) {
          projectsRes.chember.projects.forEach((project: any) => {
            allProjects.push({
              ...project,
              season: 'Winter',
              duration: projectsRes.chember.duration,
              parentId: projectsRes.chember.id,
              parentTitle: projectsRes.chember.title
            });
          });
        }
        
        // Add summer projects from checlipse (if visible)
        if (projectsRes.checlipse && projectsRes.checlipse.projects && projectsRes.checlipse.visible && config.showCurrentProjects) {
          projectsRes.checlipse.projects.forEach((project: any) => {
            allProjects.push({
              ...project,
              season: 'Summer',
              duration: projectsRes.checlipse.duration,
              parentId: projectsRes.checlipse.id,
              parentTitle: projectsRes.checlipse.title
            });
          });
        }
        
        // Store config for rendering logic
        setProjects(allProjects);
        setConfig(config);
        setComingSoonData(projectsRes.comingSoon);
        setPageConfig(pagesRes?.projects || null);
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
    ? projects.filter(p => p.tags.some((tagObj: any) => 
        tagObj.name && tagObj.name.toLowerCase().includes(decodeURIComponent(tag).toLowerCase())
      ))
    : seasonFilteredProjects;

  return (
    <div className="space-y-12">      
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-main">
          {pageConfig?.title || 'Our Projects'}
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          {pageConfig?.description || 'Explore the innovative chemical engineering projects led by our members, organized by season.'}
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
            {pageConfig?.summerTabLabel || 'Summer Projects'}
          </button>
          <button
            onClick={() => setActiveSeason('Winter')}
            className={`px-6 py-3 font-semibold text-lg transition-all duration-300 ${
              activeSeason === 'Winter'
                ? 'border-b-2 border-primary text-primary'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            {pageConfig?.winterTabLabel || 'Winter Projects'}
          </button>
        </div>
      )}
      
      {tag && (
        <div className="text-center">
            <h2 className="text-2xl font-bold">
              {pageConfig?.filteredByLabel || 'Filtered by Tag'}: <span className="text-primary">{decodeURIComponent(tag)}</span>
            </h2>
            <Link to="/projects" className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
                <XIcon className="w-4 h-4"/> {pageConfig?.clearFilterLabel || 'Clear Filter'}
            </Link>
        </div>
      )}

      {isLoading ? <div className="flex justify-center py-10"><Spinner /></div> : (
        // Show "Coming Soon" message when only coming soon is enabled and no current projects
        config.showComingSoon && !config.showCurrentProjects && filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🔮</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {activeSeason === 'Winter' 
                  ? comingSoonData?.winter?.title || 'Winter Projects Coming Soon'
                  : comingSoonData?.summer?.title || 'Summer Projects Coming Soon'
                }
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {activeSeason === 'Winter' 
                  ? comingSoonData?.winter?.description || 'Stay tuned for our upcoming winter project initiatives.'
                  : comingSoonData?.summer?.description || 'Get ready for our next summer research initiatives.'
                }
              </p>
              <div className="inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white bg-gray-500 opacity-70 cursor-not-allowed">
                <span className="mr-2">⏰</span>
                Stay Tuned
              </div>
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {filteredProjects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        currentSeason={activeSeason.toLowerCase() as 'winter' | 'summer'}
                        allProjects={filteredProjects}
                    />
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

