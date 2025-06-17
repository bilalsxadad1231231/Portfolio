import React from "react";

const Heading = ({text,bgcolor,textcolor}) => {
  return (
    <div className="flex items-center">
     <span className={`w-16 sm:w-32 md:w-60 h-[1px] bg-${bgcolor}`}></span>
      <span className={`bg-${bgcolor} w-fit text-${textcolor} p-2 px-3 sm:px-5 text-lg sm:text-xl rounded-md`}>
         {text}
      </span>
      <span className={`w-16 sm:w-32 md:w-60 h-[1px] bg-${bgcolor}`}></span>
    </div>
  );
};

export default Heading;
