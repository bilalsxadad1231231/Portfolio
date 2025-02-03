
import { personalData } from '../data/personalData';

import profileImage from '../assetes/image.jpg'; // Replace with your actual image path

import React from 'react';
 
import { Typewriter } from 'react-simple-typewriter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDownload,faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import {faGithub,faLinkedin,faInstagram } from "@fortawesome/free-brands-svg-icons";
import GridBackground from './ReusebleComponents/GridBackground';
import { Link } from "react-scroll";

 

const Home = () => {
 
    const resumeUrl = '/resume.pdf';

    const handleDownloadResume = () => {
        // Open the PDF in a new tab
        window.open(resumeUrl, '_blank');
      };
  return (

    
    <div id='home' className='lg:px-60 py-20  flex relative flex-col md:flex-row items-center justify-center bg-bg space-x-2  text-white p-6'>
      
       {/* Grid background class */}

       <GridBackground/>
       
      {/* Main text area */}

      <div className=' relative text-center md:text-left text-diffcolor space-y-6 md:w-1/2   p-10 rounded-lg h-[450px] flex flex-col justify-center'>
        <h1 className='text-5xl font-bold'>Hello,</h1>
        <h1 className='text-5xl font-bold'>This is <span className='text-text'>{personalData.name}</span></h1>

        {/* insde Main: Typewriter effect on Designation */}
        <h2 className='text-4xl font-bold text-text'>
          <Typewriter
            words={[personalData.designation]}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={30}
            deleteSpeed={50}
            delaySpeed={4000}
          />
        </h2>
        
        {/* inside main: Icons and Links Placeholder */}
        <div className='flex justify-center md:justify-start space-x-4 text-gray-300'>
        <span>
            <button onClick={() => window.open('https://github.com', '_blank')}>
              <FontAwesomeIcon icon={faGithub} size="2x" className='text-diffcolor' />
            </button>
          </span>
          <span>
            <button onClick={() => window.open('https://linkedin.com', '_blank')}>
              <FontAwesomeIcon icon={faLinkedin} size="2x" className='text-diffcolor' />
            </button>
          </span>
          <span>
            <button onClick={() => window.open('https://instagram.com', '_blank')}>
              <FontAwesomeIcon icon={faInstagram} size="2x" className='text-diffcolor' />
            </button>
          </span>
        </div>
        
        {/* inside main: Buttons   hover:shadow-md hover:shadow-gray-400 */}
        <div className='flex justify-center md:justify-start space-x-4'>
           
          <button className='duration-300 ease-in bg-none hover:bg-border  hover:text-white  hover:shadow-md hover:shadow-gray-200    text-text font-semibold px-4 py-2 rounded-lg border-2 border-border shadow-lg' onClick={handleDownloadResume}>Resume  <FontAwesomeIcon icon={faDownload}/> </button>
          <Link to="contact" smooth={true} duration={500}>
          <button className='bg-border hover:bg-[bg+100] text-white font-semibold px-4 py-2 rounded-lg shadow-lg   hover:shadow-md hover:shadow-gray-200'>Contact Me <FontAwesomeIcon icon={faPaperPlane} /></button>
          </Link>
        </div>


      </div>



      {/* Profile Image */}
      <div className=' relative mt-8 md:mt-0 md:w-1/2 justify-center h-[550px] flex items-center'>
        <img 
          src= {profileImage}
          alt='Profile' 
          className='w-80 h-80 md:w-[400px] md:h-[400px] rounded-full border-[6px] border-border shadow-lg object-cover'
        />

      </div>

     

    </div>
  );
}

export default Home;
