import React, { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from '../../../actions/GeneralRest';
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const SectionAlarmasIndencios = ({ dataAbout }) => {
  const handleImageError = (e) => {
    e.currentTarget.src = '/images/imagen/noimagen.jpg';
    e.currentTarget.onerror = null; 
  };

    const aboutusData = dataAbout || [];
  
    const incendiosSection = aboutusData.find(
      (item) => item.correlative === "products-incendios-section"
    );

    const ibeneficio1 = aboutusData.find(
      (item) => item.correlative === "products-incendios-1benefit"
    );

    const ibeneficio2 = aboutusData.find(
      (item) => item.correlative === "products-incendios-2benefit"
    );

    const ibeneficio3 = aboutusData.find(
      (item) => item.correlative === "products-incendios-3benefit"
    );

  // 1. Creamos el arreglo igual que antes
  const rawBenefits = [
  {
    id: ibeneficio1?.id,
    title: ibeneficio1?.name,
    description: ibeneficio1?.description,
    image: ibeneficio1?.image,
    visible: ibeneficio1?.visible,
  },
  {
    id: ibeneficio2?.id,
    title: ibeneficio2?.name,
    description: ibeneficio2?.description,
    image: ibeneficio2?.image,
    visible: ibeneficio2?.visible,
  },
  {
    id: ibeneficio3?.id,
    title: ibeneficio3?.name,
    description: ibeneficio3?.description,
    image: ibeneficio3?.image,
    visible: ibeneficio3?.visible,
  },
];


const benefits = rawBenefits.filter(
    (b) => b.title && (b.visible === true || b.visible === 1 || b.visible === "1")
);

  return (
    <section>
      <div className="flex flex-col relative gap-10 xl:gap-16 w-full px-[5%] 4xl:px-[8%] py-10 md:py-16 bg-white mt-[70px]">
        
        <div className="grid grid-cols-2 xl:grid-cols-12 gap-5 lg:gap-0">
          
          <div className="col-span-2 xl:col-span-4 flex flex-col justify-center">
            <div className="flex flex-col p-2 justify-center items-start gap-5">
                <h2 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                    {incendiosSection?.name}
                </h2>
              
                <HtmlContent
                    className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                    html={incendiosSection?.description}
                />
            </div>
          </div>

          {/* Columna Central: Imagen */}
          <div className="col-span-2 xl:col-span-5 flex flex-col justify-end items-center">
            {/* ... Tu código de la columna central (sin cambios) ... */}
            <img 
              className="h-96 md:h-[550px] w-full object-contain object-center" 
              src={`/api/aboutus/media/${incendiosSection?.image}`} 
              alt={incendiosSection?.name}
              onError={handleImageError} 
            />
          </div>

          {/* Columna Derecha: Lista de Beneficios */}
          <div className="col-span-2 xl:col-span-3 flex flex-col sm:flex-row gap-5 sm:gap-10 lg:flex-col justify-around items-start lg:items-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-10 xl:gap-7 w-full">
              
              {/* 3. AL HABER FILTRADO ARRIBA, AQUÍ SOLO SE RENDERIZAN LOS VISIBLES */}
              {benefits && benefits.map((beneficio, index) => {
                const content = (
                  <div className="flex flex-col gap-1.5 pl-2 max-w-lg text-left xl:text-right justify-center items-start xl:items-end mx-auto">
                    
                    <div className="w-14 h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#030e16] flex flex-col justify-center items-center">
                        <img className="w-8 4xl:w-10" 
                        src={`/api/aboutus/media/${beneficio?.image}`} 
                        alt={beneficio?.title}
                       ></img>
                    </div>
                    
                    <h2 className="font-sora text-black text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight">
                      {beneficio?.title}
                    </h2>

                    <HtmlContent
                        className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                        html={beneficio?.description}
                    />

                  </div>
                );

                return (
                  <React.Fragment key={`benefit-${beneficio.id || index}`}>
                      <div>
                        {content}
                      </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SectionAlarmasIndencios;