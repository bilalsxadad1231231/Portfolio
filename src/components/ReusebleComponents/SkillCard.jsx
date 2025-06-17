import React from "react";

const SkillCard = React.memo(({ skill }) => {
  return (
    <div className="w-24 sm:w-32 md:w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-2 sm:m-3 md:m-5 rounded-lg group relative hover:scale-[1.10] cursor-pointer">
      <div className="relative bg-white/10 text-border backdrop-blur-xl border border-white/20 shadow-2xl rounded-lg p-3 sm:p-4 md:p-6 w-full h-full flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 transform transition-transform duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center">
          <img
            src={skill.skillicon}
            alt={`${skill.name} icon`}
            className="w-auto h-full rounded-lg object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="font-semibold text-center text-xs sm:text-sm">{skill.name}</p>
      </div>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';

export default SkillCard;
