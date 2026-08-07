import React, { useMemo } from 'react';
import { faCode, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getProjectImage } from '../data/projectImages';

const ProjectCard = React.memo(({project, index}) => {
  // Memoize the image source to prevent recalculation
  const imageSrc = useMemo(() => {
    return getProjectImage(project.id);
  }, [project.id]);

  // Memoize filtered tools to prevent recalculation
  const displayTools = useMemo(() => {
    return project.tools.filter((_, index) => index < 6);
  }, [project.tools]);

  // Memoize event handlers
  const handleSourceCodeClick = useMemo(() => () => {
    if (project.code) {
      window.open(project.code, '_blank');
    }
  }, [project.code]);

  const handlePreviewClick = useMemo(() => () => {
    if (project.demo) {
      window.open(project.demo, '_blank');
    }
  }, [project.demo]);
 
  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-lg p-4 sm:p-6 w-full space-y-3 sm:space-y-4 transform transition-transform duration-300 ease-in-out hover:cursor-pointer hover:border-white hover:scale-105'>
      
      {/* image display box with lazy loading */} 
      <div className="w-full h-48 sm:h-60 overflow-hidden rounded-lg">
        <img 
          src={imageSrc} 
          alt={`${project.name} Preview`} 
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
          decoding="async"
        />
      </div>
 
      {/* detail about the project portion */}
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">{project.name}</h1>

        {/* detail about the project portion (child) for explain the project functionality */}
        <div>
          <p className="text-sm sm:text-base text-gray-200 mb-3 text-justify line-clamp-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {project.description}
          </p>
        </div>

        {/* detail about the project portion (child) for Tech stack */}
        <div>
          <h1 className="text-white font-semibold mb-2 text-sm sm:text-base">Tech Stack:</h1>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {displayTools.map((tech, index) => (
              <span key={`${project.name}-${index}`} className="bg-white text-border px-1 py-0.5 rounded-md text-xs sm:text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* detail about the project portion (child) buttons */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
          <button 
            onClick={handleSourceCodeClick}
            className="duration-300 ease-in bg-none border-2 border-white text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:bg-white hover:text-border hover:scale-105 transition-all text-sm sm:text-base"
          >
            Source code <FontAwesomeIcon icon={faCode} className="ml-2"/>
          </button>
          
          <button 
            onClick={handlePreviewClick}
            className="bg-white text-border font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
          >
            Preview <FontAwesomeIcon icon={faPaperPlane} className="ml-2"/>  
          </button>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
