import React from "react";

const Heading = ({text,bgcolor,textcolor}) => {
  return (
    <div className="flex  items-center">
     <span className={`w-60 h-[1px] bg-${bgcolor} `}></span>
      <span className={`bg-${bgcolor} w-fit text-${textcolor} p-2 px-5 text-xl rounded-md`}>
         {text}
      </span>
      <span className={`w-60 h-[1px] bg-${bgcolor} `}></span>
    </div>
  );
};

export default Heading;
