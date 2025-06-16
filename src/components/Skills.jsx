import React from 'react';
import WaveSection from './WaveSection';
import dockerimg from './docker.svg'
import awsimg from '../assetes/skill/aws.svg'
import Marquee from "react-fast-marquee";
import Heading from './ReusebleComponents/Heading';
import SkillCard from './ReusebleComponents/SkillCard';
import Container from './ReusebleComponents/Container';
// import { skilldata } from '../data/Skillicon';

import skillIcons from '../data/Skillicon';
 


const Skills = () => {
  // Organize skills into categories
  const categories = {
    programming: skillIcons.filter(skill => 
      ['Python', 'JavaScript', 'Java', 'C++', 'C'].includes(skill.name)
    ),
    aiMl: skillIcons.filter(skill => 
      ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'TensorFlow', 
       'PyTorch', 'Scikit-learn', 'OpenCV', 'Image Segmentation', 'Object Detection',
       'Diffusion Models', 'Generative AI'].includes(skill.name)
    ),
    modernAI: skillIcons.filter(skill => 
      ['LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'RAG', 'LLMOps', 
       'Prompt Engineering', 'AI Agents', 'Chatbot Development', 'Hugging Face', 'Ollama'].includes(skill.name)
    ),
    dataScience: skillIcons.filter(skill => 
      ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Kaggle', 'Google Colab'].includes(skill.name)
    ),
    webDev: skillIcons.filter(skill => 
      ['React', 'React Native', 'Tailwind', 'MaterialUI', 'FastAPI', 'Flask', 
       'Postman', 'MongoDB', 'MySQL', 'PostgreSQL'].includes(skill.name)
    ),
    cloudDevOps: skillIcons.filter(skill => 
      ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD'].includes(skill.name)
    ),
    tools: skillIcons.filter(skill => 
      ['Git', 'GitHub', 'VS Code', 'Firebase', 'IoT', 'Arduino'].includes(skill.name)
    )
  };

  // Configuration for each track - all moving left
  const trackConfig = {
    programming: { direction: "left", speed: 200 },
    aiMl: { direction: "left", speed: 180 },
    modernAI: { direction: "left", speed: 160 },
    dataScience: { direction: "left", speed: 200 },
    webDev: { direction: "left", speed: 180 },
    backend: { direction: "left", speed: 160 },
    cloudDevOps: { direction: "left", speed: 200 },
    tools: { direction: "left", speed: 180 }
  };

  return (
    <div id='skills'>
        <WaveSection fillcolor="var(--color-bg)" bgColor="bg-border"/>



     

    <Container bgcolor='bg'>
      {/* Grid background div */}
         <div className="absolute inset-0 h-full w-full  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z- 0"></div>
               
               
                <div className="flex justify-center my-5 lg:py-2 ">  
                <Heading text="Skills" bgcolor="border" textcolor="white" />
                </div>


        {/* Render each category in its own track */}
        {Object.entries(categories).map(([category, skills]) => (
          <div key={category} className='py-5 flex items-center justify-center'>
            <Marquee
              gradient={false}
              speed={trackConfig[category].speed}
              pauseOnHover={true}
              pauseOnClick={true}
              delay={0}
              play={true}
              direction={trackConfig[category].direction}
            >
              <div className="flex space-x-6">
                {skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </Marquee>
          </div>
        ))}

    </Container>

    </div>
  );
}

export default Skills;
