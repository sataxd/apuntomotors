import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Agregamos EffectFade o EffectCreative si quieres una transición bonita cuando hay videos
import { Pagination, Autoplay, Navigation, EffectFade } from 'swiper/modules'; 
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/effect-fade'; // Importamos CSS de fade por si acaso
import { motion } from 'framer-motion';

import SwiperGL from '../../lib/swiper-gl.esm.js';
import '../../lib/swiper-gl.css';

// --- COMPONENTES DE ANIMACIÓN (Sin cambios) ---
const SplitText = ({ text, isActive, delay = 0, className = '' }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  // Separamos por palabras para evitar cortes de línea a mitad de palabra
  const words = text.split(" ");

  return (
    <motion.h2
      style={{ display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"} 
      className={className}
    >
      {words.map((word, wordIndex) => (
        // Cada palabra se envuelve en un span con whitespace-nowrap
        <span 
          key={wordIndex} 
          style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          className="mr-[0.25em]" // Espacio manual entre palabras
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span 
              variants={child} 
              key={letterIndex} 
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
};

const AnimatedButton = ({ text, link, isActive, delay = 0.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
      <a
        href={link}
        className="group relative overflow-hidden bg-white text-black transition-all duration-300 font-dmsans border-[2px] border-white flex flex-row items-center px-3 md:px-6 py-2 text-base xl:text-lg 4xl:text-xl rounded-xl font-medium"
      >
        <span className="relative z-10">{text}</span>
      </a>
    </motion.div>
  );
};

// --- ICONOS (Sin cambios) ---
const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 4xl:w-8 4xl:h-8 duration-300 ease-out transition-transform group-hover/circle:-translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 4xl:w-8 4xl:h-8 duration-300 ease-out transition-transform group-hover/circle:translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);


const Slider = ({ items }) => {

  if (!items || items.length === 0) {
    return (
      <div className="w-full h-[520px] lg:h-[95vh] 2xl:h-[90vh] bg-neutral-900 animate-pulse flex items-center justify-center"></div>
    );
  }

  const validItems = items.filter(item => item && (item.image || item.video));

  const hasMultipleSlides = validItems.length > 1;

  if (validItems.length === 0) return null;

  // 1. Verificamos si TODOS los items son imágenes
  const areAllImages = validItems.every(item => item.esimagen == 1);

  // 2. Definimos los módulos base
  const swiperModules = [Pagination, Autoplay, Navigation, EffectFade];

  // 3. Si son todas imágenes, agregamos SwiperGL
  if (areAllImages) {
    swiperModules.push(SwiperGL);
  }
  
  return (
    <div className="relative group mt-[70px] h-[520px] lg:h-[70vh] 2xl:h-[85vh]">
      <Swiper
        className="slider relative"
        modules={swiperModules}
        speed={4000}
        slidesPerView={1}
        loop={true}
        autoplay={{
            delay: 8000, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true,
        }}
        grabCursor={true}
        navigation={{
          nextEl: ".custom-next-button",
          prevEl: ".custom-prev-button",
        }}
        pagination={{
          el: ".swiper-pagination-slider",
          clickable: true,
          type: 'bullets',
        }}
      >
        {
          validItems.map((slider, index) => {
            const uniqueKey = slider.id || index;

            return (
                <SwiperSlide key={uniqueKey} className='relative overflow-hidden'>
                    {({ isActive }) => (
                        <>
                            {slider.esimagen == 1 ? (
                                <img
                                    // La clase swiper-gl-image es necesaria para el efecto GL, 
                                    // pero no estorba si el efecto está en 'slide' swiper-gl-image
                                    className=' absolute top-0 left-0 w-full h-full object-cover object-center z-0 block'
                                    src={`/api/sliders/media/${slider.image || 'undefined'}`}
                                    alt={slider.name}
                                    onError={(e) => (e.target.src = '/api/cover/thumbnail/null')}
                                />
                            ) : (
                                <video
                                    className={`absolute top-0 left-0 w-full h-full object-cover object-center z-0 block`}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    disablePictureInPicture
                                    disableRemotePlayback
                                >
                                    <source src={`/api/sliders/media/${slider?.video}`} type="video/mp4" />
                                </video>
                            )}

                            <div style={{ background: "linear-gradient(180deg, rgba(20,20,20,1) 0%, rgba(0,0,0,0.1) 100%)" }} className="relative grid grid-cols-1 lg:grid-cols-2 w-full px-[5%] lg:px-[8%] p-4 h-[520px] lg:h-[70vh] 2xl:h-[85vh]">
                                <div className="flex flex-col col-span-1 lg:col-span-1 gap-5 2xl:gap-7 4xl:gap-10 items-start justify-center text-start">
                                    
                                    <SplitText 
                                        text={slider?.name || ""}
                                        isActive={isActive}
                                        delay={1}
                                        className='font-sora text-white text-3xl sm:text-5xl 4xl:text-6xl tracking-normal font-semibold !leading-tight'
                                    />
                                    
                                    <motion.p 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                        transition={{ duration: 1.8, delay: 1 }}
                                        className="font-dmsans text-white text-lg xl:text-xl 4xl:text-2xl tracking-wide font-light"
                                    >
                                        {slider?.description}
                                    </motion.p>
                                    
                                    <div className="flex flex-row mt-2">
                                        <AnimatedButton 
                                            text={slider?.button_text || "Ver más"} 
                                            link={slider?.button_link} 
                                            isActive={isActive}
                                            delay={0.6}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </SwiperSlide>
            );
          })
        }
      </Swiper>
        
      {hasMultipleSlides && (
        <>
          {/* Paginación móvil */}
          <div className="swiper-pagination-slider md:hidden !bottom-4 flex justify-center w-full z-30 absolute"></div>

          {/* Flechas Desktop */}
          <div className="custom-prev-button absolute hidden md:flex md:left-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer text-white hover:text-accent transition-colors duration-300">
            <div className="group/circle w-12 h-12 md:w-14 md:h-14 4xl:w-16 4xl:h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <ArrowLeft />
            </div>
          </div>
          
          <div className="custom-next-button absolute hidden md:flex md:right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer text-white hover:text-accent transition-colors duration-300">
            <div className="group/circle w-12 h-12 md:w-14 md:h-14 4xl:w-16 4xl:h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <ArrowRight />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;