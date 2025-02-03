import React from "react";
import Wave from 'react-wavify'

const WaveSection = ({fillcolor,bgColor}) => {
  return (
    <div className={`${bgColor} `}>
      <Wave
        fill={ fillcolor || "var(--color-border)"} // Color of the wave
        paused={false} // Keep the wave moving
        options={{
          height: 20, // Height of the wave
          amplitude: 40, // Wave amplitude
          speed: 0.2, // Speed of the wave movement
          points: 4, // Number of wave points
        }}
      />
    </div>
  );
};

export default WaveSection;