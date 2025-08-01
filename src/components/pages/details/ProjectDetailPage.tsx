
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
                const projects: Project[] = await response.json();
                const currentProject = projects.find(p => p.id === projectId);
                setProject(currentProject || null);
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
                    {project.tags.map(tag => (
                        <Link key={tag} to={`/projects/tag/${encodeURIComponent(tag)}`}>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full cursor-pointer hover:ring-2 hover:ring-primary/50 ${getTagColor(tag)}`}>
                                {tag}
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

