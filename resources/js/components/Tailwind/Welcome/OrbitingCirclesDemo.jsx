import React, { useState, useEffect } from "react";
import { OrbitingCircles } from "../Components/OrbitingCircles";

export function OrbitingCirclesDemo({strengthin, strengthout}) {
  
  const [radius, setRadius] = useState({ outer: 200, inner: 100 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Móvil
        setRadius({ outer: 140, inner: 70 });
      } else if (width < 1024) {
        // Tablet
        setRadius({ outer: 180, inner: 80 });
      } else {
        // Desktop
        setRadius({ outer: 200, inner: 100 });
      }
    };

    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-[350px] 2xs:h-[375px] md:h-[400px] lg:h-[425px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      
      {/* Círculo Exterior */}
      <OrbitingCircles duration={20} radius={radius.outer}>
        {strengthout && strengthout.map((item) => (
          <h2 
            key={item?.id || item?.name} 
            className="text-center font-sora text-[#5e5e60] text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold whitespace-nowrap"
          >
            {item?.name}
          </h2>
        ))}
      </OrbitingCircles>

      {/* Círculo Interior */}
      <OrbitingCircles radius={radius.inner} reverse speed={1}>
        {strengthin && strengthin.map((item) => (
          <h2 
            key={item?.id || item?.name} 
            className="text-center font-sora text-[#5e5e60] text-xs 2xs:text-sm md:text-base 4xl:text-lg font-semibold whitespace-nowrap"
          >
            {item?.name}
          </h2>
        ))}
      </OrbitingCircles>
    </div>
  );
}