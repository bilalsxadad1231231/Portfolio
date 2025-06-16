import React from 'react';
import WaveSection from './WaveSection';
import Form from './Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Heading from './ReusebleComponents/Heading';
import Container from './ReusebleComponents/Container';
const Contect = () => {
  return (
    <div id='contact'>
        <WaveSection fillcolor="var(--color-bg)" bgColor="bg-border"/>

        
        
        <Container bgcolor="bg" >

        <div className="flex justify-center my-5 lg:py-2 ">

                    <Heading text="Contect me" bgcolor="border" textcolor="white" />
         </div>

        <div  className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 ">
      

         <div className='w-full  md:w-1/2 flex flex-col    items-center gap-y-6'>
            


                <div className=' w-1/2 p-4 flex flex-col items-center gap-y-2 '>
                    <h1 className='text-border text-2xl  lg:text-4xl font-bold items-center'>Let's Chat</h1>
                    <p className='text-diffcolor md:text-lg font-semibold text-justify '>Whatever you have a question, want to start a project or simply want to connect</p>
                    <p className='text-diffcolor md:text-lg font-semibold text-justify '>Feel free to send me a message in the contact form</p>
                </div>

            <div className='flex flex-col  justify-start gap-y-4 '>

            <h1 className='text-border text-xl font-bold'>Connect with me</h1>
                 <div className='flex justify-center md:justify-center space-x-4 text-gray-300 space-x-5'>
                        <span>
                            <button onClick={() => window.open('https://github.com/bilalsxadad1231231', '_blank')}>
                              <FontAwesomeIcon icon={faGithub} size="2x" className='text-diffcolor' />
                            </button>
                          </span>
                          <span>
                            <button onClick={() => window.open('https://linkedin.com/in/muhammad-bilal-866750280/', '_blank')}>
                              <FontAwesomeIcon icon={faLinkedin} size="2x" className='text-diffcolor' />
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
