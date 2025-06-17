import { personalData } from '../data/personalData';
import profileImage from '../assetes/myProfile.jpg';
import React, { useCallback } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDownload,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {faGithub,faLinkedin } from "@fortawesome/free-brands-svg-icons";
import GridBackground from './ReusebleComponents/GridBackground';
import { Link } from "react-scroll";

const Home = () => {
    const resumeUrl = '/resume.pdf';

    const handleDownloadResume = useCallback(() => {
        window.open(resumeUrl, '_blank');
    }, []);

    const handleGithubClick = useCallback(() => {
        window.open('https://github.com/bilalsxadad1231231', '_blank');
    }, []);

    const handleLinkedinClick = useCallback(() => {
        window.open('https://linkedin.com/in/muhammad-bilal-866750280/', '_blank');
    }, []);

    return (
        <div id='home' className='px-4 sm:px-8 md:px-16 lg:px-60 py-16 md:py-20 flex relative flex-col lg:flex-row items-center justify-center bg-bg space-y-8 lg:space-y-0 lg:space-x-8 text-white min-h-screen'>
            
            {/* Grid background class */}
            <GridBackground/>
            
            {/* Main text area */}
            <div className='relative text-center lg:text-left text-diffcolor space-y-4 md:space-y-6 lg:w-1/2 p-4 md:p-10 rounded-lg flex flex-col justify-center order-2 lg:order-1'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Hello,</h1>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>This is <span className='text-text'>{personalData.name}</span></h1>

                {/* Typewriter effect on Designation */}
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text'>
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
                
                {/* Icons and Links */}
                <div className='flex justify-center lg:justify-start space-x-4 text-gray-300'>
                    <span>
                        <button onClick={handleGithubClick}>
                            <FontAwesomeIcon icon={faGithub} size="lg" className='text-diffcolor hover:text-border transition-colors' />
                        </button>
                    </span>
                    <span>
                        <button onClick={handleLinkedinClick}>
                            <FontAwesomeIcon icon={faLinkedin} size="lg" className='text-diffcolor hover:text-border transition-colors' />
                        </button>
                    </span>
                </div>
                
                {/* Buttons */}
                <div className='flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4'>
                    <button 
                        className='duration-300 ease-in bg-none hover:bg-border hover:text-white hover:shadow-md hover:shadow-gray-200 text-text font-semibold px-4 py-2 rounded-lg border-2 border-border shadow-lg transition-all' 
                        onClick={handleDownloadResume}
                    >
                        Resume <FontAwesomeIcon icon={faDownload}/>
                    </button>
                    <Link to="contact" smooth={true} duration={500}>
                        <button className='bg-border hover:bg-[bg+100] text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-md hover:shadow-gray-200 transition-all'>
                            Contact Me <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Profile Image */}
            <div className='relative lg:w-1/2 flex justify-center items-center order-1 lg:order-2'>
                <div className='w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]'>
                    <img 
                        src={profileImage}
                        alt='Profile' 
                        className='w-full h-full rounded-full border-[4px] sm:border-[6px] border-border shadow-lg object-cover'
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
