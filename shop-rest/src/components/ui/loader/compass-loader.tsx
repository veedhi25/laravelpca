import React from 'react';
import { useSpring, animated } from 'react-spring';

interface CompassLoaderProps {
  size?: number;
}

const CompassLoader: React.FC<CompassLoaderProps> = ({ size = 50 }) => {
  const outerCircleStyle = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    config: { duration: 4000 },
    reset: true,
    loop: true,
  });

  const innerCircleStyle = useSpring({
    from: { transform: 'rotate(360deg)' },
    to: { transform: 'rotate(0deg)' },
    config: { duration: 2000 },
    reset: true,
    loop: true,
  });

  return (
    <div className="flex justify-center items-center">
      <animated.div
        className="relative w-full h-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...outerCircleStyle,
        }}
      >
        <div className="bg-blue-500 w-full h-full rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <animated.div
          className="relative w-full h-full"
          style={{
            width: `${size * 0.6}px`,
            height: `${size * 0.6}px`,
            ...innerCircleStyle,
          }}
        >
          <div className="bg-red-500 w-full h-full rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default CompassLoader;
