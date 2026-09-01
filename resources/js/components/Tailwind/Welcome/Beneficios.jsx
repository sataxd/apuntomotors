import React from 'react';

const Beneficios = ({brands, apiFolder}) => {

  if (!brands || brands.length === 0) return null;

  return (
    <div className="w-full py-10 bg-white flex justify-center overflow-hidden">
      
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center gap-x-16 gap-y-8 xl:gap-20 4xl:gap-24 px-8" aria-hidden="true">
             {brands.map((logo) => (
                  <div className='flex flex-col items-center gap-2 max-w-40 text-center h-36'>
                      <div className='w-20 h-20 4xl:w-24 4xl:h-24 rounded-full bg-[#7c231c] flex flex-col justify-center items-center'>
                        <img 
                          key={`${logo.id}-clone`}
                          className="object-contain h-12 w-16 max-w-none transition-all duration-300" 
                          src={`/api/${apiFolder}/media/${logo.image}`}
                          alt={logo.name} 
                        />
                      </div>
                      <h3 className='font-dmsans text-[#131e2e] text-base 2xl:text-lg 4xl:text-xl tracking-tight font-medium'>{logo.name}</h3>
                  </div>
            ))}
          </div>

    </div>
  );
};

export default Beneficios;