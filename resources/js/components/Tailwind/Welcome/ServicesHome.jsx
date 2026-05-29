import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const ServicesHome = ({ dataAbout, services, is_home = false }) => {
    
    const aboutusData = dataAbout || [];

    const headsectionServices = aboutusData.find(
        (item) => item.correlative === "head-section-services"
    );
    
    return (
        <div className={`relative bg-white ${is_home ? 'mt-0' : 'mt-[70px]'} `}>
            <div className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center pb-2 ${is_home ? 'pt-10 xl:pt-20' : 'py-10 xl:py-20'} `}>

                {!!headsectionServices?.visible && (
                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                        <h3 className="font-dmsans text-[#707c84] text-base sm:text-lg 2xl:text-xl 4xl:text-2xl tracking-normal font-light">
                            {headsectionServices?.subtitle}
                        </h3>
                        <h2 className="font-sora text-[#131e2e] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            {headsectionServices?.name}
                        </h2>
                    </div>
                )}   

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
                
                    {/* Iteramos directamente, ya que Laravel manda los datos filtrados */}
                    {services?.map((service) => (
                        <div key={service.id} className="service-card bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col">
                            <div className="relative h-60 overflow-hidden bg-gray-200">
                                <img className="service-img w-full h-full object-cover" 
                                     src={`/api/services/media/${service?.image}`}
                                     alt={`Servicio de ${service.name}`} 
                                     loading="lazy" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                
                                <h3 className="font-sora text-[#324050] text-base sm:text-lg 2xl:text-xl 4xl:text-2xl font-semibold tracking-tight !leading-tight mb-3">
                                    {service.name}
                                </h3>
                                
                                <HtmlContent
                                    className="prose font-dmsans text-[#324050] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light mb-5 h-28 overflow-hidden"
                                    html={service?.description}
                                />
                                
                                <div className="flex flex-row mt-auto">
                                    <a href={`/servicios/${service.slug}`}
                                        className="bg-[#7c231c] cursor-pointer hover:animate-wiggle font-dmsans border-[2px] text-white flex flex-row items-center px-3 md:px-6 py-2 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                                        Más información
                                    </a>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
               
            </div>
        </div>
    );
};

export default ServicesHome;