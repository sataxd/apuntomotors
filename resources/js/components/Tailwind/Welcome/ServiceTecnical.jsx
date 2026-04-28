import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const ServiceTecnical = ({ indeci = true, marginTop = true, dataAbout }) => {
    
    const aboutusData = dataAbout || [];

    const sixtSection = aboutusData.find(
        (item) => item.correlative === "home-tecnician-title"
    );

    const sevenSection = aboutusData.find(
        (item) => item.correlative === "home-tecnico-section"
    );

     const eightSection = aboutusData.find(
        (item) => item.correlative === "home-certified-section"
    );
    
    return (

        <div className="relative overflow-hidden">
            <div className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center ${
                marginTop 
                ? "py-10 xl:py-20"   // Si marginTop es true (por defecto)
                : "py-10 xl:pb-20"   // Si marginTop es false
            }`}>
                {!!sixtSection?.visible && (
                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                        <h3 className="font-dmsans text-[#5e5e60] text-base sm:text-lg 2xl:text-xl 4xl:text-2xl tracking-normal font-light">
                            {sixtSection?.subtitle}
                        </h3>
                        <h2 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            {sixtSection?.name}
                        </h2>
                    </div>
                )}   

                {!!sevenSection?.visible && (
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start order-2 lg:order-1">
                            <h3 className="font-sora text-[#5e5e60] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                {sevenSection?.name}
                            </h3>
                            <HtmlContent
                                    className="prose font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                    html={sevenSection?.description}
                                    
                            />
                            <div className="flex flex-row mt-2">
                                <a href={sevenSection?.button_link}
                                    className="bg-[#ff9003] cursor-pointer hover:animate-wiggle font-dmsans border-[2px] text-white flex flex-row items-center px-3 md:px-6 py-2 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                                    {sevenSection?.button_text}
                                </a>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center  order-1 lg:order-2">
                            <div className="relative h-[250px] sm:h-[350px] 4xl:h-[450px] overflow-hidden rounded-xl xl:rounded-2xl 4xl:rounded-3xl group">
                                <img src={`/api/aboutus/media/${sevenSection?.image}`} alt={sevenSection?.name} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 " />
                            </div>
                        </div>
                    </div>
                )}  
                {/* {!!eightSection?.visible && indeci && (
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                            <div className="relative h-[250px] sm:h-[350px] 4xl:h-[450px] overflow-hidden rounded-xl xl:rounded-2xl 4xl:rounded-3xl group">
                                <img src={`/api/aboutus/media/${eightSection?.image}`} alt={eightSection?.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 " />
                            </div>
                        </div>
                        
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center lg:items-end">
                            <h3 className="font-sora text-black text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                               {eightSection?.name}
                            </h3>
                            <HtmlContent
                                    className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light lg:text-right"
                                    html={eightSection?.description}
                            />
                        </div>
                        
                    </div>
                )}  */}
            </div>
        </div>
    );
};

export default ServiceTecnical;
