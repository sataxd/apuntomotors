import { useEffect, useState, useRef, useContext } from "react";
import ImageOverSection from "./ImageOverSection";
import HtmlContent from "../../../Utils/HtmlContent";
import GeneralRest from "../../../actions/GeneralRest";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const AboutSection = ({dataAbout}) => {
    
    const [activeImage, setActiveImage] = useState(1);

    const handleToggleImage = () => {
        setActiveImage(prev => prev === 1 ? 2 : 1);
    };

    const aboutusData = dataAbout || [];

    const firstSection = aboutusData.find(
        (item) => item.correlative === "home-about-title"
    );

    const secondSection = aboutusData.find(
        (item) => item.correlative === "home-about-description"
    );

    const thirdSection = aboutusData.find(
        (item) => item.correlative === "home-about-cardone"
    );

    const fourSection = aboutusData.find(
        (item) => item.correlative === "home-about-cardsecond"
    );

    

    return (

        <div className="relative overflow-hidden mt-[70px]">
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-20">

                    {!!firstSection?.visible && (
                        <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                            <h3 className="font-dmsans text-[#5e5e60] text-base sm:text-lg 2xl:text-xl 4xl:text-2xl tracking-normal font-light">
                                {firstSection?.subtitle}
                            </h3>
                            <h2 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            {firstSection?.name}
                            </h2>
                        </div>
                    )}

                    <div className="flex flex-col xl:flex-row gap-10 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                         {!!secondSection?.visible && (   
                            <>
                                <h3 className="font-sora text-[#5e5e60] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight">
                                    {secondSection?.name}
                                </h3>

                                <HtmlContent
                                    className="prose font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                    html={secondSection?.description}
                                />
                            </>
                        )}
                            <div className="flex flex-col sm:flex-row justify-start items-start gap-5 md:gap-8 lg:gap-5 2xl:gap-12 4xl:gap-14 w-full mt-4">
                                
                            {!!thirdSection?.visible && (
                                <div onMouseEnter={() => setActiveImage(1)}
                                    className={`w-full lg:w-1/2 flex flex-col justify-center items-start border-2 rounded-xl p-6 gap-4 transition-all duration-300 cursor-default
                                    ${activeImage === 1 ? 'border-[#5e5e60]' : ' border-[#5e5e60] border-opacity-20'}`}
                                    >
                                        <div className="w-14 h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#ff9003] flex flex-col justify-center items-center">
                                            <img className="w-8 h-8 4xl:w-10 4xl:h-10" src={`/api/aboutus/media/${thirdSection?.icon}`}></img>
                                        </div>
                                        <h3 className="font-sora text-[#5e5e60] text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight">
                                            {thirdSection?.name}
                                        </h3>
                                        <HtmlContent
                                            className="prose font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                            html={thirdSection?.description}
                                        /> 
                                </div>
                            )}
                            {!!fourSection?.visible && (
                                <div onMouseEnter={() => setActiveImage(2)}
                                    className={`w-full lg:w-1/2 flex flex-col justify-center items-start border-2 rounded-xl p-6 gap-4 transition-all duration-300 cursor-default
                                    ${activeImage === 2 ? 'border-[#5e5e60]' : ' border-[#5e5e60] border-opacity-20'}`}
                                    >
                                        <div className="w-14 h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#ff9003] flex flex-col justify-center items-center">
                                            <img className="w-9 h-9 4xl:w-12 4xl:h-12"src={`/api/aboutus/media/${fourSection?.icon}`}></img>
                                        </div>
                                        <h3 className="font-sora text-[#5e5e60] text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-tight !leading-tight">
                                            {fourSection?.name}
                                        </h3>
                                        <HtmlContent
                                            className="prose font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                            html={fourSection?.description}
                                        /> 
                                </div>
                            )}
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col gap-4 justify-center items-end">
                           <ImageOverSection activeImage={activeImage} 
                                onToggle={handleToggleImage}
                                image1={`/api/aboutus/media/${thirdSection?.image}`}
                                visible1 = {thirdSection?.visible}
                                image2={`/api/aboutus/media/${fourSection?.image}`}
                                visible2 = {fourSection?.visible}
                            />
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default AboutSection;
