import React from "react";

const Container = ({ children,bgcolor, ...props }) => {
  return (
    <div className={`md:px-48 h-full relative bg-${bgcolor} top-0 space-y-0 -mt-10 pb-8`}
        {...props}
    >
      {children}
    </div>
  );
};

export default Container;