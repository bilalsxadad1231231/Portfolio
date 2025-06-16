import React from 'react';
import profileImage from '../assetes/image.jpg'; 
import aiAssistantImage from '../assetes/project/ai-personnal-assistant.jpeg';
import smartHomeImage from '../assetes/project/smart-home-llm.jpeg';
import multiDocImage from '../assetes/project/multidocument-chatbot.jpeg';
import eyeDiseaseImage from '../assetes/project/eye-disease-detector.jpeg';
import concreteImage from '../assetes/project/concrete-optimizer.jpeg';
import spamImage from '../assetes/project/spam-detector.jpeg';
import recipeImage from '../assetes/project/recipe app.jpeg';
import transformerImage from '../assetes/project/transformer-scratch-tensorflow.jpeg';
import doctorImage from '../assetes/project/doctor-appointment-booking.jpeg';
import cicdImage from '../assetes/project/cicd.png';
import llamaImage from '../assetes/project/LLaMA-7B.png';
import diffusionImage from '../assetes/project/diffusion-model-fintune.png';
import drugDiscoveryImage from '../assetes/project/drug-discovery.jpeg';
import virtualTryOnImage from '../assetes/project/virtual-try-on.png';
import researchImage from '../assetes/project/research.jpg';
import ganImage from '../assetes/project/gan.jpg';
import objectDetectionImage from '../assetes/project/object-detection.png';
import ocrImage from '../assetes/project/OCR.jpeg';
import segmentationImage from '../assetes/project/segmentation.png';
import objectTrackingImage from '../assetes/project/object-tracking.jpeg';
import autismImage from '../assetes/project/autism.jpeg';
import { faCode, faDownload, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectCard = ({project,index}) => {
  // Map project IDs to their corresponding images
  const projectImages = {
    1: aiAssistantImage,
    2: smartHomeImage,
    3: multiDocImage,
    4: diffusionImage,
    5: researchImage,
    6: transformerImage,
    7: ganImage,
    8: virtualTryOnImage,
    9: llamaImage,
    10: drugDiscoveryImage,
    11: objectDetectionImage,
    12: ocrImage,
    13: segmentationImage,
    14: objectTrackingImage,
    15: autismImage,
    16: eyeDiseaseImage,
    17: concreteImage,
    18: spamImage,
    19: recipeImage,
    20: doctorImage,
    21: cicdImage
  };
 
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
    src={projectImages[project.id] || profileImage} 
    alt={`${project.name} Preview`} 
    className="w-full h-full object-contain rounded-lg"
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
