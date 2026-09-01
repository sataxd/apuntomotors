import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import HtmlContent from '../../../Utils/HtmlContent';
import GeneralRest from '../../../actions/GeneralRest';
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

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
            
        <AnimatePresence mode="wait">
          <motion.div
            key={servicios.id}
            className="flex flex-col lg:flex-row gap-10 lg:gap-16 w-full justify-center"
          >

            <div className="w-full lg:w-1/2">
                <div className="relative z-0 px-2">
                    <h1 
                      className="max-w-lg font-sora text-[#131e2e] text-3xl sm:text-4xl 2xl:text-[42px] 4xl:text-5xl font-semibold tracking-tight !leading-tight"
                      delay={0.3}  
                    >
                      {servicios.name} 
                    </h1>
                  
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
                              className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl"
                              html={servicios?.description}
                          />
                      </motion.div>
                    </div>
                </div>
            </div>


            <div className="w-full lg:w-1/2 flex flex-row items-end">
              <div className="relative w-full h-[250px] sm:h-[450px] 4xl:h-[600px] overflow-hidden rounded-2xl bg-gray-100">
                <motion.img 
                  variants={jumpImageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  src={`/api/services/media/${servicios.image}`}
                  alt={servicios.name} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>
            
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TabPanel;