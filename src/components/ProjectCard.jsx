import React from 'react';
import profileImage from '../assetes/image.jpg'; 
import { faCode, faDownload, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProjectCard = ({project,index}) => {
 
  return (
<div key={index} className='bg-white/10  backdrop-blur-xl border border-white/20 shadow-lg rounded-lg p-6 w-full max-w-lg   space-y-4 
    transform transition-transform duration-300 ease-in-out  hover:cursor-pointer hover:border-white '
    >

 
{/* image display box */} 
    {/* <div className="w-full overflow-hidden rounded-lg">
    <img 
        src={profileImage} 
        alt="Project Preview" 
        className="w-full   h-60 object-contain rounded-lg"
    />
    </div> */}

<div className="w-full h-60 overflow-hidden rounded-lg">
  <img 
    src={profileImage} 
    alt="Project Preview" 
    className="w-full h-full object-contian rounded-lg"
  />
</div>
 
    {/* detail about the porject portion */}
    <div>

        <h1 className="text-lg md:text-2xl font-semibold text-white mb-2">{project.name}</h1>

        {/* detail about the porject portion (child) for explain the porjct functionality */}
        <div>
                <p className="text-sm md:text-base text-gray-200 mb-3 text-justify 
                        line-clamp-4 overflow-y-auto overflow-x-hidden custom-scrollbar"
                        >
                         {project.description}
                </p>
        </div>

        {/* detail about the porject portion (child) for Tech stack */}
        <div>
        <h1 className="text-white font-semibold mb-2">Tech Stack:</h1>
        <div className="flex flex-wrap gap-2 ">
        
        { project.tools.filter((_,index) => index<6).map((tech,index)=>(
             <span key={`${project.name}-${index}`} className="bg-white text-border px-1 py-0.5 rounded-md">{tech}</span>
        ))

        }
 
        </div>
        </div>
        
        {/* detail about the porject portion (child) buttons */}
        <div className="flex justify-center md:justify-start space-x-4 mt-4">
        <button className="duration-300 ease-in 
                    bg-none border-2 border-white text-white font-semibold 
                    px-4 py-2 rounded-lg shadow-lg
                hover:bg-white hover:text-border hover:scale-105">Source code <FontAwesomeIcon icon={faCode} className="ml-2"/>
        </button>
        
        <button className="bg-white text-border font-semibold px-4 py-2 rounded-lg shadow-lg 
                    hover:shadow-xl hover:scale-105">
            Preview <FontAwesomeIcon icon={faPaperPlane} className="ml-2"/>  
        </button>
        </div>
        

    </div>

</div>
  );
}

export default ProjectCard;
