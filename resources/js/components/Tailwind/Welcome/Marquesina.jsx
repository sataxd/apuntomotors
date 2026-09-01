import React from 'react';

const Marquesina = ({ brands, apiFolder }) => {
  if (!brands || brands.length === 0) return null;

  return (
    <section aria-label="Marcas asociadas" className="w-full py-5 bg-white flex justify-center overflow-hidden">
      <div 
        className="
          relative
          w-full px-[5%] 
          flex flex-nowrap [mask-image:linear-gradient(to_right,transparent,white_128px,white_calc(100%-128px),transparent)]
        "
      >
        <div className="flex items-center animate-infinite-scroll hover:[animation-play-state:paused]">
          
          {/* Original Track */}
          <div className="flex items-center gap-16 px-8">
            {brands.map((logo) => (
              <img 
                key={logo.id}
                className="object-contain h-20 w-24 max-w-none transition-all duration-300" 
                src={`/api/${apiFolder}/media/${logo.image}`}
                alt={logo.name} 
                loading="lazy"
              />
            ))}
          </div>

          {/* Cloned Track for Infinite Scroll */}
          <div className="flex items-center gap-16 px-8" aria-hidden="true">
             {brands.map((logo) => (
              <img 
                key={`${logo.id}-clone`}
                className="object-contain h-20 w-24 max-w-none transition-all duration-300" 
                src={`/api/${apiFolder}/media/${logo.image}`}
                alt="" 
                tabIndex={-1}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Marquesina;