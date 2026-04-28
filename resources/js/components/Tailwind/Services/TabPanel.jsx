import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import HtmlContent from '../../../Utils/HtmlContent';
import GeneralRest from '../../../actions/GeneralRest';
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const SplitText = ({ text, className, delay = 0}) => {
  const letters = text.split("");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      // Hacemos el stagger más rápido (0.015s en vez de 0.03s) para acompañar la velocidad
      transition: { staggerChildren: 0.015, delayChildren: delay } 
    })
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20, 
      rotateX: -90, 
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={childVariants} key={index} style={{ position: "relative" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TabPanel = ( {servicios} ) => {
  
  if (!servicios || servicios.length === 0) return null;
  const { registerTask, completeTask } = useContext(LoadingContext);
  const [activeTab, setActiveTab] = useState(servicios[0]);

  useEffect(() => {
    setActiveTab(servicios[0]);
  }, [servicios]);


  const [aboutuses, setAboutuses] = useState(null);
                  
  useEffect(() => {
    registerTask("AboutSection");
      const fetchAboutuses = async () => {
          try {
              const data = await generalRest.getAboutuses();
              setAboutuses(data);
          } catch (error) {
              console.error("Error fetching about:", error);
          } finally {
                completeTask("AboutSection");
          }
      };

      fetchAboutuses();
  }, [registerTask, completeTask]);
  
  const aboutusData = aboutuses?.aboutus || [];

  const sixteenSection = aboutusData.find(
    (item) => item.correlative === "services-title-section"
  );

  // ANIMACIÓN DE IMAGEN MÁS RÁPIDA
  const jumpImageVariants = {
    initial: { 
      x: '120%',       
      scale: 0.6,      
      opacity: 0,
      rotate: 5        
    },
    animate: { 
      x: '0%',         
      scale: 1,        
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5, // REDUCIDO: De 1s a 0.5s        
        ease: "backOut"      
      }
    },
    exit: { 
      x: '120%',       
      scale: 0.6,      
      opacity: 0,
      rotate: 5,
      transition: {
        duration: 0.4, // REDUCIDO: Salida un poco más rápida        
        ease: "backIn"       
      }
    }
  };

  return (
    <section className="relative overflow-hidden mt-[70px]">
      <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full items-start justify-center">

            <div className="w-full xl:w-2/5 flex flex-col gap-4">
              
              <div className='flex flex-col gap-2 justify-center items-start'>
                <h3 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                    {sixteenSection?.name}
                </h3>
                <HtmlContent
                    className="font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl font-light"
                    html={sixteenSection?.description}
                />
              </div>

              <div className='flex flex-col w-full'>
                {/* AQUI AGREGAMOS EL INDEX */}
                {servicios.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service)}
                    className={`flex items-center gap-3 py-4 sm:py-6 max-w-md border-b border-gray-200 transition-all duration-300 group text-left ${
                    activeTab.id === service.id ? 'opacity-100' : 'opacity-60 hover:opacity-70'
                  }`}
                  >
                    {/* CAMBIO: Generación automática del número */}
                    <span className={`font-sora font-bold ${
                        activeTab.id === service.id ? 'text-[#5e5e60] text-xl' : 'text-[#5e5e60] text-base'
                      }`}>
                        {(index + 1).toString().padStart(2, '0')}
                    </span>

                    <h2 className={`font-sora transition-all duration-300 font-medium tracking-tight !leading-tight ${
                        activeTab.id === service.id 
                          ? 'text-xl sm:text-2xl 4xl:text-3xl font-semibold text-[#5e5e60]' 
                          : 'text-base sm:text-lg  4xl:text-2xl text-[#5e5e60]'
                        }`}>
                        {service.name}
                    </h2>
                  </button>
                ))}
              </div>
            </div>

            
            <div className="w-full xl:w-3/5 flex flex-col justify-start items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  className="w-full flex flex-col gap-5"
                >

                  <div className="relative w-full h-[250px] sm:h-[450px] 4xl:h-[600px] overflow-hidden rounded-2xl bg-gray-100">
                    <motion.img 
                      variants={jumpImageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      src={`/api/services/media/${activeTab.image}`}
                      alt={activeTab.name} 
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>

                 
                  <div className="relative z-0 px-2">
                  
                    <SplitText 
                      text={activeTab.name} 
                      className="font-sora text-[#ff9003] text-2xl sm:text-3xl 4xl:text-4xl font-semibold tracking-tight mb-4 !leading-tight"
                      // CAMBIO: Delay reducido a 0.3s (antes 0.5) para que aparezca apenas entra la imagen
                      delay={0.3}  
                    />
                  
                    <div className="mt-4">
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          // CAMBIO: Delay reducido a 0.5s y duración 0.4s
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className=""
                      >
                          <HtmlContent
                              className="font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl"
                              html={activeTab?.description}
                          />
                      </motion.div>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

      </div>
    </section>
  );
};

export default TabPanel;