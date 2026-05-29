import React from 'react';
import { useEffect, useState, useRef, useContext } from "react";
import { Building2, Briefcase, Factory, Hospital, School, Landmark } from 'lucide-react';
import { OrbitingCirclesDemo } from './OrbitingCirclesDemo';
import GeneralRest from '../../../actions/GeneralRest';
import HtmlContent from '../../../Utils/HtmlContent';
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const Counter = ({ end, duration = 5000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    const endValue = parseInt(end.replace(/,/g, ''), 10) || 0; // Limpia comas si existen

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span className='text-[#324050]'>{count.toLocaleString()}</span>;
};

const SectoresClientes = ({strengthin, strengthout, indicadores}) => {
  
    const [aboutuses, setAboutuses] = useState(null);
    const { registerTask, completeTask } = useContext(LoadingContext);       

      useEffect(() => {
          registerTask("SectorSection");
          const fetchAboutuses = async () => {
              try {
                  const data = await generalRest.getAboutuses();
                  setAboutuses(data);
              } catch (error) {
                  console.error("Error fetching about:", error);
              } finally {
                completeTask("SectorSection");
            }
          };
  
          fetchAboutuses();
      }, [registerTask, completeTask]);
  
      const aboutusData = aboutuses?.aboutus || [];

      const fiveteenSection = aboutusData.find(
        (item) => item.correlative === "home-clients-section"
    );

  return (
    <div className="relative overflow-hidden">
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16">

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                            <h3 className="font-sora text-[#324050] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                {fiveteenSection?.name}
                            </h3>

                            <HtmlContent
                                className="font-dmsans text-[#324050] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                html={fiveteenSection?.description}
                            />

                            <div className='grid grid-cols-1 sm:grid-cols-3 w-full max-w-xl gap-0 sm:gap-10 mt-4'>
                                {indicadores && indicadores.map((item) => (
                                    <div className='flex flex-col gap-2 justify-center w-full h-28 sm:h-40'>
                                        <span className='text-[#7c231c] font-sora text-4xl font-bold flex flex-row justify-start items-start'>
                                            {item.symbol} <Counter end={item.name} duration={5000} />
                                        </span>
                                        <h3 className='text-xl font-dmsans text-[#324050]'>{item.description}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                              {/* <OrbitingCirclesDemo strengthin={strengthin} strengthout={strengthout} className="hidden" /> */}
                            <div className="relative h-[400px] sm:h-[500px] 4xl:h-[550px] w-full overflow-hidden rounded-xl xl:rounded-2xl 4xl:rounded-3xl group">
                                
                                {fiveteenSection?.icon && (
                                    <img 
                                        src={`/api/aboutus/media/${fiveteenSection.icon}`} 
                                        className="absolute top-0 left-0 w-full h-full object-contain object-center z-0 opacity-10 pointer-events-none" 
                                        alt="watermark"
                                    />
                                )}

                                <video
                                    key={fiveteenSection?.image}
                                    className="w-[330px] mx-auto h-full object-cover object-center z-20 block rounded-md"
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    disablePictureInPicture
                                    disableRemotePlayback
                                >
                                    <source src={`/api/aboutus/media/${fiveteenSection?.image}`} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
  );
};

export default SectoresClientes;