import React from 'react';
import WaveSection from './WaveSection';
import Heading from './ReusebleComponents/Heading';
import Container from './ReusebleComponents/Container';
 

const About = () => {
  return (
     <div id='about'>
    <WaveSection fillcolor="var(--color-border)" bgColor="bg-bg"/>
    

    <Container bgcolor='border'>
 
        {/* about me section to box  */}
      <div className="flex justify-center my-5 lg:py-2 ">
        <Heading text="About me" bgcolor="white" textcolor="border" />
      </div>
 
       <div className='py-10  flex items-center justify-center gap-x-32'>
        <div className='bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-lg p-6 w-full max-w-3xl '>
          <h3 className='text-2xl font-semibold  text-white'>My Self Muhammd Bilal</h3>
          <p className='text-white/80 mt-2 text-lg  text-justify indent-16 line-clamp-5'>Full-Stack Software Engineer and AI Developer specializing in Generative AI, LLMs, Agentic AI and NLP, with hands-on experience in LangChain, LangGraph, and LLMOps/MLOps for scalable AI deployment. Skilled in Python, FastAPI, SQL (backend) and React, React Native (frontend), with strong expertise in Computer Vision, Diffusion Models, and AI-powered automation.</p>
          <p className='text-white/80 mt-2 text-lg text-justify'>Proficient in CI/CD, Docker, cloud infrastructure (AWS, Azure), and continuously growing through certifications in AWS, Google IT, and Deep Learning. I thrive in collaborative environments, continuously learning and adapting to new technologies to stay ahead in the ever-evolving tech landscape.</p>
          <h3 className='text-1xl font-semibold text-white'>Let's connect and create exceptional digital experiences.</h3>
        </div>

        

      </div>

      </Container>

 
    </div>
  );
}

export default About;
