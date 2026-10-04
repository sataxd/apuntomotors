import React, { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from '../../../actions/GeneralRest';
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const SectionAlarmasRobos = ({ dataAbout }) => {
  const handleImageError = (e) => {
    e.currentTarget.src = '/images/imagen/noimagen.jpg';
    e.currentTarget.onerror = null; 
  };

    const aboutusData = dataAbout || [];
  
    const incendiosSection1 = aboutusData.find(
      (item) => item.correlative === "products-alarmas-1section"
    );

    const incendiosSection2 = aboutusData.find(
      (item) => item.correlative === "products-alarmas-2section"
    );
  

  return (
    <section>
      <div className="flex flex-col relative gap-10 xl:gap-16 w-full px-[5%] 4xl:px-[8%] pt-10 md:pt-16 md:pb-4 bg-white mt-[70px]">
        
        <div className="grid grid-cols-2 xl:grid-cols-12 gap-10">
          {!!incendiosSection1?.visible && (
            <>
            <div className="order-1 xl:order-none col-span-2 xl:col-span-6 flex flex-col justify-center">
              <div className="flex flex-col p-0 md:p-2 justify-center items-start gap-5">
                  <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                      {incendiosSection1?.name}
                  </h2>
                
                  <HtmlContent
                      className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                      html={incendiosSection1?.description}
                  />

                  {/* <div className="flex flex-row mt-2">
                      <a href="/"
                          className="group bg-black text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                          {incendiosSection1?.button_text}
                          <div className="rounded-full flex flex-row justify-center items-center ml-2">
                              <i className="mdi mdi-arrow-up-circle text-2xl text-white group-hover:rotate-180 transition-all duration-500"></i>
                          </div>
                      </a>
                  </div> */}
              </div>
            </div>
          
            <div className="order-2 xl:order-none col-span-2 xl:col-span-6 flex flex-col justify-end items-center">
              <img 
                className="h-auto xl:h-96 4xl:h-[450px] object-contain object-center rounded-xl xl:rounded-2xl 4xl:rounded-3xl" 
                src={`/api/aboutus/media/${incendiosSection1?.image}`} 
                alt={incendiosSection1?.name}
                onError={handleImageError} 
              />
            </div>
            </>
          )}
          
          {!!incendiosSection2?.visible && (
            <>
            <div className="order-3 lg:order-4 col-span-2 xl:col-span-6 flex flex-col justify-center">
              <div className="flex flex-col p-0 md:p-2 justify-center items-start gap-5">
                  <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                      {incendiosSection2?.name}
                  </h2>
                
                  <HtmlContent
                      className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                      html={incendiosSection2?.description}
                  />

                  {/* <div className="flex flex-row mt-2">
                      <a href="/"
                          className="group bg-black text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                          {incendiosSection2?.button_text}
                          <div className="rounded-full flex flex-row justify-center items-center ml-2">
                              <i className="mdi mdi-arrow-up-circle text-2xl text-white group-hover:rotate-180 transition-all duration-500"></i>
                          </div>
                      </a>
                  </div> */}
              </div>
            </div>
           
            
            <div className="order-4 lg:order-3 col-span-2 xl:col-span-6 flex flex-col justify-end items-center">
              <img 
                className="h-auto xl:h-96 4xl:h-[450px] object-contain object-center rounded-xl xl:rounded-2xl 4xl:rounded-3xl" 
                src={`/api/aboutus/media/${incendiosSection2?.image}`} 
                alt={incendiosSection2?.name}
                onError={handleImageError} 
              />
            </div>
          </>
        )}
        </div>

      </div>
    </section>
  );
};

export default SectionAlarmasRobos;