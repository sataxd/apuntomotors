import React from 'react'; // Ya no necesitamos useState aquí
import { motion } from 'framer-motion';

// Recibimos activeImage y onToggle como props
const ImageOverSection = ({ activeImage, onToggle, image1, image2, visible1, visible2 }) => {
  
  if (!visible1 && !visible2) return null;
  
  // Derivamos la lógica booleana del prop que recibimos
  // Si activeImage es 1, isFirstFront es true. Si es 2, es false.
  const isFirstFront = activeImage === 1;

  // Rutas de tus imágenes
  const img1 = image1 
  const img2 = image2 

  // --- CONFIGURACIÓN DE LA ANIMACIÓN (Se mantiene igual) ---
  const frontVariant = {
    y: 0, x: 0, scale: 1, zIndex: 20, rotate: 0,
    filter: "brightness(100%) blur(0px)",
    transition: { duration: 0.6, ease: "easeInOut" }
  };

  const backVariant = {
    y: -30, x: 20, scale: 0.9, zIndex: 10, rotate: 3,
    filter: "brightness(70%) blur(1px)",
    transition: { duration: 0.6, ease: "easeInOut" }
  };

  const jumpToBack = {
    y: [0, -150, -30],
    x: [0, 0, 20],
    scale: [1, 1.05, 0.9],
    zIndex: [20, 20, 10],
    rotate: [0, -5, 3],
    filter: "brightness(70%) blur(1px)",
    transition: { duration: 0.7, times: [0, 0.5, 1], ease: "easeInOut" }
  };

  return (
    <div className="flex flex-row justify-center xl:justify-end items-center py-10 min-h-[250px] w-full">
      
      <div className="relative w-[350px] sm:w-[600px] h-[240px] sm:h-[400px]">
        
        {/* === IMAGEN 1 === */}
        {!!visible1 && (
          <motion.img
            key={img1}
            src={img1}
            alt="Imagen Principal"
            className="absolute w-full h-full object-cover rounded-lg shadow-xl"
            animate={isFirstFront ? frontVariant : jumpToBack}
            initial={frontVariant}
          />
        )}
        {/* === IMAGEN 2 === */}
        {!!visible2 && (
          <motion.img
            key={img2}
            src={img2}
            alt="Imagen Secundaria"
            className="absolute w-full h-full object-cover rounded-lg shadow-xl"
            animate={!isFirstFront ? frontVariant : jumpToBack}
            initial={backVariant}
          />
        )}
        {/* === BOTÓN MÓVIL === */}
        {/* Usamos la función onToggle que viene del padre para cambiar la imagen */}
        <button 
          onClick={onToggle}
          className="flex absolute -bottom-12 right-0 z-50 bg-[#7c231c] text-white p-4 rounded-full shadow-lg shadow-accent/40 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.657 48.657 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default ImageOverSection;