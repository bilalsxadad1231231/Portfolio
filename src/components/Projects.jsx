import React from "react";
import WaveSection from "./WaveSection";
import ProjectCard from "./ProjectCard";
import Heading from "./ReusebleComponents/Heading";
import Container from "./ReusebleComponents/Container";

import {projectsData} from '../data/projectData.js'

const Projects = () => {
  return (
    <div id="projects">
      <WaveSection fillcolor="var(--color-border)" bgColor="bg-bg" />

       
    <Container bgcolor="border"> 

      
        {/* title projects of the component */}
        <div className="flex justify-center my-5 lg:py-2">
        <Heading text="Projects" bgcolor="white" textcolor="border" />
        </div>

        {/* card containing section   */}
        <div className="relative p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projectsData && projectsData.length > 0 ? (
          projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center text-white">No projects found</div>
        )}
        </div>

    </Container>
    </div>
  );
};

export default Projects;
