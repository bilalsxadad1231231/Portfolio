import React from 'react';

const SkillCard = ({iconPath,skillName}) => {
  return (
       <div className='relative bg-white/10 text-border 
                           backdrop-blur-xl border border-white/20 shadow-xl rounded-lg 
                           p-6 w-full max-w-48  flex flex-col items-center justify-center gap-y-4  
                           transform transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer'>
                   
                       <img src= {iconPath} alt="docker iimage" />
                       <h1 className=' '>{skillName}</h1>
   
        </div>
  );
}

export default SkillCard;
