import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: any;
  currentSeason: 'winter' | 'summer';
  allProjects: any[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, currentSeason }) => {
  const winterTheme = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
    overlay: 'rgba(59, 130, 246, 0.7)',
    accent: '#3b82f6'
  };

  const summerTheme = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
    overlay: 'rgba(251, 146, 60, 0.7)',
    accent: '#fb923c'
  };

  const currentTheme = currentSeason === 'winter' ? winterTheme : summerTheme;
  
  const shouldShow = (currentSeason === 'winter' && project.season.toLowerCase() === 'winter') || 
                     (currentSeason === 'summer' && project.season.toLowerCase() === 'summer');
  
  if (!shouldShow) return null;

  // Special styling for "Coming Soon" projects
  const isComingSoon = project.comingSoon;
  const comingSoonTheme = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
    overlay: 'rgba(75, 85, 99, 0.8)',
    accent: '#6b7280'
  };

  const activeTheme = isComingSoon ? comingSoonTheme : currentTheme;

  const CardContent = () => (
    <div className="relative overflow-hidden rounded-xl shadow-lg h-64 md:h-80 w-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Animated Background */}
      <div className="absolute inset-0 transition-all duration-[5000ms] ease-in-out">
        {isComingSoon ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: comingSoonTheme.backgroundImage }}
          />
        ) : (
          <>
            <div 
              className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out bg-cover bg-center ${currentSeason === 'winter' ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: winterTheme.backgroundImage }}
            />
            <div 
              className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out bg-cover bg-center ${currentSeason === 'summer' ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: summerTheme.backgroundImage }}
            />
          </>
        )}
        {/* Color Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-[5000ms] ease-in-out"
          style={{ backgroundColor: activeTheme.overlay }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex h-full text-white">
      {/* Season Badge */}
      <div className="absolute top-6 right-6">
        <span className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-bold backdrop-blur-sm border ${
          isComingSoon
            ? 'bg-gray-600/90 text-gray-50 border-gray-300/70'
            : currentSeason === 'winter' 
              ? 'bg-blue-600/90 text-blue-50 border-blue-300/70' 
              : 'bg-orange-600/90 text-orange-50 border-orange-300/70'
        }`}>
          {isComingSoon 
            ? '🔮 Coming Soon' 
            : currentSeason === 'winter' ? '❄️ Winter' : '☀️ Summer'}
        </span>
      </div>

      {/* Left Side - Main Content */}
      <div className="flex-1 flex flex-col justify-center pr-5">
        <div className="flex items-center gap-5 mb-3">
          <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>
          
          <span className={`text-base font-bold px-5 py-3 rounded-full backdrop-blur-sm border mr-4 ${
            isComingSoon
              ? 'bg-gray-500/90 text-gray-50 border-gray-300/70'
              : currentSeason === 'winter' 
                ? 'bg-blue-500/90 text-blue-50 border-blue-300/70' 
                : 'bg-orange-500/90 text-orange-50 border-orange-300/70'
          }`}>
            {project.duration}
          </span>
        </div>
        
        <p className="text-white/90 text-lg leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>
        
        <div className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white backdrop-blur-sm border transition-all duration-200 self-start text-lg ${
          isComingSoon 
            ? 'bg-gray-500/30 border-gray-300/30 cursor-not-allowed opacity-70' 
            : 'bg-white/20 border-white/30 group-hover:bg-white/30 group-hover:scale-105 cursor-pointer'
        }`}>
          {isComingSoon ? 'Stay Tuned' : 'Explore'}
          {!isComingSoon && <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>}
        </div>
      </div>

      {/* Right Side - Tags */}
      <div className="flex justify-evenly items-center min-w-[400px]">
        {project.tags.slice(0, 3).map((tag: any, index: number) => (
          <span key={index} className={`text-base font-semibold px-5 py-3 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 ${tag.color} backdrop-blur-sm border hover:shadow-lg`}>
            {tag.name}
          </span>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: activeTheme.accent }} />
      <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full opacity-10" style={{ backgroundColor: activeTheme.accent }} />
    </div>
    </div>
  );

  return isComingSoon ? (
    <div className="block group cursor-default">
      <CardContent />
    </div>
  ) : (
    <Link to={`/projects/${project.id}`} className="block group">
      <CardContent />
    </Link>
  );
};

export default ProjectCard;
