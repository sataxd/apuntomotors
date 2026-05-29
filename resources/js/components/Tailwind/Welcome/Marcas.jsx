import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import { LoadingContext } from "../Base";
import Beneficios from "./Beneficios";

const generalRest = new GeneralRest();

const Marcas = ({ brands, apiFolder, dataAbout }) => {

    const aboutusData = dataAbout || [];

    const nineSection = aboutusData.find(
        (item) => item.correlative === "home-brands-section"
    );
    
    return (

        <div className="relative overflow-hidden">
            
            {!!nineSection?.visible && (
                <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center pb-10">
                        <div className="w-full flex flex-col items-center justify-center gap-5 max-w-2xl 4xl:max-w-3xl text-center">
                            <h3 className="font-dmsans text-[#707c84] text-lg 2xl:text-xl 4xl:text-2xl tracking-normal font-light">
                                {nineSection?.subtitle}
                            </h3>
                            <h2 className="font-sora text-[#131e2e] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                                {nineSection?.name}
                            </h2>
                        </div>
                </div>
            )} 

            <Beneficios brands={brands} apiFolder={apiFolder} />

        </div>
    );
};

export default Marcas;
