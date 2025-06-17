import React from 'react';
import WaveSection from './WaveSection';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Heading from './ReusebleComponents/Heading';
import Container from './ReusebleComponents/Container';

const Contect = () => {
  return (
    <div id='contact'>
        <WaveSection fillcolor="var(--color-bg)" bgColor="bg-border"/>

        <Container bgcolor="bg">

        <div className="flex justify-center my-5 lg:py-2">
          <Heading text="Contact me" bgcolor="border" textcolor="white" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4">
      
          <div className='w-full lg:w-1/2 flex flex-col items-center gap-y-6 text-center lg:text-left'>
            
            <div className='w-full lg:w-3/4 p-4 flex flex-col items-center gap-y-2'>
              <h1 className='text-border text-2xl sm:text-3xl lg:text-4xl font-bold'>Let's Chat</h1>
              <p className='text-diffcolor text-sm sm:text-base lg:text-lg font-semibold text-center lg:text-left'>
                Whatever you have a question, want to start a project or simply want to connect
              </p>
              <p className='text-diffcolor text-sm sm:text-base lg:text-lg font-semibold text-center lg:text-left'>
                Feel free to send me a message in the contact form
              </p>
            </div>

            <div className='flex flex-col justify-start gap-y-4'>
              <h1 className='text-border text-xl font-bold'>Connect with me</h1>
              <div className='flex justify-center lg:justify-start space-x-4 text-gray-300'>
                <span>
                  <button onClick={() => window.open('https://github.com/bilalsxadad1231231', '_blank')}>
                    <FontAwesomeIcon icon={faGithub} size="lg" className='text-diffcolor hover:text-border transition-colors' />
                  </button>
                </span>
                <span>
                  <button onClick={() => window.open('https://linkedin.com/in/muhammad-bilal-866750280/', '_blank')}>
                    <FontAwesomeIcon icon={faLinkedin} size="lg" className='text-diffcolor hover:text-border transition-colors' />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <Form/>
        </div>
            
        </Container>
    </div>
  );
}

export default Contect;
