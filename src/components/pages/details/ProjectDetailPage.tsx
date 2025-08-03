
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Project } from '../../../constants'
import { getDataUrl } from '../../../constants';
import { getTagColor } from '../../../constants';
import SubPageLayout from './SubPageLayout';

const ProjectDetailPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(getDataUrl('projects.json'));
                const data = await response.json();
                
                let foundProject = null;
                
                // Search in chember (winter) projects
                if (data.chember && data.chember.projects) {
                    foundProject = data.chember.projects.find((p: any) => p.id === projectId);
                    if (foundProject) {
                        foundProject = {
                            ...foundProject,
                            season: 'Winter',
                            duration: data.chember.duration,
                            parentId: data.chember.id,
                            parentTitle: data.chember.title,
                            details: foundProject.description || 'No detailed information available.'
                        };
                    }
                }
                
                // Search in checlipse (summer) projects if not found in winter
                if (!foundProject && data.checlipse && data.checlipse.projects) {
                    foundProject = data.checlipse.projects.find((p: any) => p.id === projectId);
                    if (foundProject) {
                        foundProject = {
                            ...foundProject,
                            season: 'Summer',
                            duration: data.checlipse.duration,
                            parentId: data.checlipse.id,
                            parentTitle: data.checlipse.title,
                            details: foundProject.description || 'No detailed information available.'
                        };
                    }
                }
                
                setProject(foundProject || null);
            } catch (error) {
                console.error("Failed to fetch project details:", error);
                setProject(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    const infoItems = project ? [
        { label: 'Season', value: <span className="font-bold text-primary">{project.season}</span> },
        {
            label: 'Skills & Topics',
            value: (
                <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag, index) => (
                        <Link key={`${tag.name}-${index}`} to={`/projects/tag/${encodeURIComponent(tag.name)}`}>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/50 ${tag.color || getTagColor(tag.name)}`}>
                                {tag.name}
                            </span>
                        </Link>
                    ))}
                </div>
            ),
        },
        ...(project.releaseDate ? [{ label: 'Date', value: <span>{project.releaseDate}</span> }] : []),
    ] : [];

    return (
        <SubPageLayout
            isLoading={isLoading}
            item={project}
            infoItems={infoItems}
            notFoundMessage={{
                title: 'Project Not Found',
                description: 'The project you are looking for does not exist.',
                backLink: '/projects',
                backLinkText: 'Back to Projects',
            }}
        />
    );
};

export default ProjectDetailPage;

