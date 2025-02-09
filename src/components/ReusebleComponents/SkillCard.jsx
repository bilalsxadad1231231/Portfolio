import React from "react";

const SkillCard = ({ skill }) => {
  return (

    <div className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.10] cursor-pointer"
   >
    <div
      className=" relative bg-white/10 text-border 
                           backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg 
                           p-6 w-full h-full  flex flex-col items-center justify-center gap-y-2  
                           transform transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
    >
      <div className="w-10 h-10  flex justify-center items-center ">
        <img
          src={skill.skillicon}
          alt="dockeriimage"
          className="w-auto h-full rounded-lg object-contain"
        />
      </div>
      <p className="font-semibold text-center text-sm">{skill.name}</p>
    </div>
    </div>
  );
};

export default SkillCard;
