import React, { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from '../../../actions/GeneralRest';
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const SectionElectrico = ({ dataAbout }) => {
  const handleImageError = (e) => {
    e.currentTarget.src = '/images/imagen/noimagen.jpg';
    e.currentTarget.onerror = null; 
  };

    const aboutusData = dataAbout || [];
  
    const electricoSection1 = aboutusData.find(
      (item) => item.correlative === "products-cerco-1section"
    );

    const electricoSection2 = aboutusData.find(
      (item) => item.correlative === "products-cerco-2section"
    );
  

  return (
    <section>
      <div className="flex flex-col relative gap-10 xl:gap-16 w-full px-[5%] 4xl:px-[8%] pt-10 md:pt-16 md:pb-4 bg-white mt-[70px]">
        
        <div className="grid grid-cols-2 xl:grid-cols-12 gap-10">
          {!!electricoSection1?.visible && (
            <>
            <div className="order-1 xl:order-none col-span-2 xl:col-span-6 flex flex-col justify-center">
              <div className="flex flex-col p-0 md:p-2 justify-center items-start gap-5">
                  <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                      {electricoSection1?.name}
                  </h2>
                
                  <HtmlContent
                      className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                      html={electricoSection1?.description}
                  />

                  {/* <div className="flex flex-row mt-2">
                      <a href="/"
                          className="group bg-black text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                          {electricoSection1?.button_text}
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
                src={`/api/aboutus/media/${electricoSection1?.image}`} 
                alt={electricoSection1?.name}
                onError={handleImageError} 
              />
            </div>
            </>
          )}
          
          {!!electricoSection2?.visible && (
            <>
            <div className="order-3 lg:order-4 col-span-2 xl:col-span-6 flex flex-col justify-center">
              <div className="flex flex-col p-0 md:p-2 justify-center items-start gap-5">
                  <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                      {electricoSection2?.name}
                  </h2>
                
                  <HtmlContent
                      className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                      html={electricoSection2?.description}
                  />

                  {/* <div className="flex flex-row mt-2">
                      <a href="/"
                          className="group bg-black text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                          {electricoSection2?.button_text}
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
                src={`/api/aboutus/media/${electricoSection2?.image}`} 
                alt={electricoSection2?.name}
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

export default SectionElectrico;